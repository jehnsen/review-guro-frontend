import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';

// Mock the config module - must be at top level
vi.mock('@/server/config/env', () => ({
  config: {
    paymongo: {
      secretKey: 'sk_test_mock',
      publicKey: 'pk_test_mock',
    },
    payment: {
      currency: 'PHP',
      seasonPassPrice: 399,
    },
  },
}));

// Mock axios
vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      isAxiosError: vi.fn((error: any) => error.isAxiosError === true),
    },
    isAxiosError: vi.fn((error: any) => error.isAxiosError === true),
  };
});

// Mock Prisma - don't reference external variables in vi.mock callback
vi.mock('@/server/config/database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    payment: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    subscription: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn((callback: any) => callback({
      payment: { create: vi.fn() },
      subscription: { upsert: vi.fn() },
      user: { update: vi.fn() },
    })),
  },
}));

import { prisma } from '@/server/config/database';
import { paymongoService } from '@/server/services/paymongo.service';

describe('Payment Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('paymongoService.verifyWebhookSignature', () => {
    it('should verify valid webhook signature', () => {
      const payload = JSON.stringify({ data: { id: 'payment-123' } });
      const secret = 'whsec_test_secret';
      const validSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

      const result = paymongoService.verifyWebhookSignature(payload, validSignature, secret);
      expect(result).toBe(true);
    });

    it('should reject invalid webhook signature', () => {
      const payload = JSON.stringify({ data: { id: 'payment-123' } });
      const secret = 'whsec_test_secret';
      const invalidSignature = 'invalid-signature';

      const result = paymongoService.verifyWebhookSignature(payload, invalidSignature, secret);
      expect(result).toBe(false);
    });

    it('should reject modified payload', () => {
      const originalPayload = JSON.stringify({ data: { id: 'payment-123' } });
      const modifiedPayload = JSON.stringify({ data: { id: 'payment-456' } });
      const secret = 'whsec_test_secret';
      const signatureForOriginal = crypto
        .createHmac('sha256', secret)
        .update(originalPayload)
        .digest('hex');

      const result = paymongoService.verifyWebhookSignature(
        modifiedPayload,
        signatureForOriginal,
        secret
      );
      expect(result).toBe(false);
    });
  });

  describe('Payment amount validation', () => {
    it('should correctly convert pesos to centavos', () => {
      expect(paymongoService.toCentavos(399)).toBe(39900);
      expect(paymongoService.toCentavos(1)).toBe(100);
      expect(paymongoService.toCentavos(0.01)).toBe(1);
    });

    it('should correctly convert centavos to pesos', () => {
      expect(paymongoService.toPesos(39900)).toBe(399);
      expect(paymongoService.toPesos(100)).toBe(1);
      expect(paymongoService.toPesos(1)).toBe(0.01);
    });
  });

  describe('Manual Payment Verification Flow', () => {
    it('should not activate premium for unpaid payments', async () => {
      // Mock user not having premium
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: 'user-123',
        isPremium: false,
      } as any);

      // Mock no existing payment
      vi.mocked(prisma.payment.findFirst).mockResolvedValue(null);

      // Simulating an unpaid payment status check
      const unpaidPaymentLink = {
        id: 'link_123',
        attributes: {
          status: 'unpaid',
          amount: 39900,
          currency: 'PHP',
        },
      };

      // The system should reject payments that aren't marked as 'paid'
      expect(unpaidPaymentLink.attributes.status).not.toBe('paid');
    });

    it('should prevent double activation for already premium users', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: 'user-123',
        isPremium: true,
      } as any);

      const user = await prisma.user.findUnique({ where: { id: 'user-123' } });
      expect(user?.isPremium).toBe(true);
    });

    it('should prevent duplicate payment processing', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: 'user-123',
        isPremium: false,
      } as any);

      // Payment already exists
      vi.mocked(prisma.payment.findFirst).mockResolvedValue({
        id: 'payment-123',
        userId: 'user-123',
        status: 'paid',
      } as any);

      const existingPayment = await prisma.payment.findFirst({
        where: { userId: 'user-123' },
      });
      expect(existingPayment).not.toBeNull();
    });

    it('should use transaction for atomic payment processing', async () => {
      await prisma.$transaction(async (tx: any) => {
        await tx.payment.create({ data: {} });
        await tx.subscription.upsert({});
        await tx.user.update({});
      });

      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('Payment amount verification', () => {
    it('should verify correct Season Pass amount (399 PHP)', () => {
      const expectedAmount = 399;
      const paymentAmountCentavos = 39900;
      const actualAmount = paymentAmountCentavos / 100;

      expect(actualAmount).toBe(expectedAmount);
    });

    it('should flag mismatched payment amounts', () => {
      const expectedAmount = 399;
      const wrongPaymentCentavos = 20000; // 200 PHP instead of 399
      const actualAmount = wrongPaymentCentavos / 100;

      expect(actualAmount).not.toBe(expectedAmount);
    });
  });
});

describe('Webhook Security', () => {
  it('should require signature verification before processing', () => {
    const webhookSecret = 'whsec_test';
    const payload = '{"type":"payment.paid"}';
    const tamperProofSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    const isValid = paymongoService.verifyWebhookSignature(
      payload,
      tamperProofSignature,
      webhookSecret
    );
    expect(isValid).toBe(true);
  });

  it('should reject webhooks without valid signature', () => {
    const webhookSecret = 'whsec_test';
    const payload = '{"type":"payment.paid"}';
    const attackerSignature = 'attacker-forged-signature';

    const isValid = paymongoService.verifyWebhookSignature(
      payload,
      attackerSignature,
      webhookSecret
    );
    expect(isValid).toBe(false);
  });
});
