/**
 * POST /api/payments/paymongo/verify
 * Manually verify and process a PayMongo payment by reference number
 * Used as a fallback when webhooks are delayed
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { paymongoService } from '@/server/services/paymongo.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { prisma } from '@/server/config/database';
import { z } from 'zod';

const verifyPaymentSchema = z.object({
  referenceNumber: z.string().min(1),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const { referenceNumber } = verifyPaymentSchema.parse(body);

    // Check if user already has premium
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true },
    });

    if (user?.isPremium) {
      return createSuccessResponse(
        { isPremium: true, alreadyActivated: true },
        'Premium already activated'
      );
    }

    // Check if payment was already processed
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId,
        metadata: {
          path: ['referenceNumber'],
          equals: referenceNumber,
        },
      },
    });

    if (existingPayment) {
      return createSuccessResponse(
        { isPremium: user?.isPremium || false, alreadyProcessed: true },
        'Payment already processed'
      );
    }

    // CRITICAL: Verify payment with PayMongo API before activating premium
    let paymentLink;
    try {
      paymentLink = await paymongoService.getPaymentLinkByReference(referenceNumber);
    } catch (error) {
      console.error('Failed to retrieve payment link:', error);
      return createErrorResponse(
        new Error('Invalid reference number or payment not found'),
        404
      );
    }

    // Verify payment status is 'paid'
    if (paymentLink.attributes.status !== 'paid') {
      return createErrorResponse(
        new Error(`Payment not completed. Status: ${paymentLink.attributes.status}`),
        400
      );
    }

    // Extract the actual amount paid from PayMongo (in centavos)
    const amountPaid = paymentLink.attributes.amount / 100; // Convert to pesos

    // Verify this is the correct amount for Season Pass (₱399)
    if (amountPaid !== 399) {
      console.warn(`Payment amount mismatch: expected 399, got ${amountPaid}`);
      // Still process but log the discrepancy
    }

    // Process the verified payment
    await prisma.$transaction(async (tx) => {
      // 1. Create payment record with actual PayMongo data
      await tx.payment.create({
        data: {
          userId,
          amount: amountPaid,
          currency: paymentLink.attributes.currency,
          provider: 'paymongo',
          status: 'paid',
          description: paymentLink.attributes.description || 'Season Pass Purchase (Manual Verification)',
          metadata: {
            referenceNumber,
            linkId: paymentLink.id,
            manualVerification: true,
            verifiedAt: new Date().toISOString(),
            paymongoStatus: paymentLink.attributes.status,
          },
        },
      });

      // 2. Create or update subscription
      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          planName: 'Season Pass',
          planPrice: amountPaid,
          purchaseDate: new Date(),
          paymentMethod: 'paymongo',
          amountPaid: amountPaid,
          transactionId: referenceNumber,
          status: 'active',
          expiresAt: null,
          referenceNumber,
          paymentProvider: 'paymongo',
        },
        update: {
          planName: 'Season Pass',
          planPrice: amountPaid,
          purchaseDate: new Date(),
          paymentMethod: 'paymongo',
          amountPaid: amountPaid,
          transactionId: referenceNumber,
          status: 'active',
          expiresAt: null,
          referenceNumber,
          paymentProvider: 'paymongo',
        },
      });

      // 3. Update user premium status
      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumExpiry: null,
        },
      });
    });

    return createSuccessResponse(
      { isPremium: true, activated: true },
      'Premium activated successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    console.error('Payment verification error:', error);
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
