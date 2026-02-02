/**
 * POST /api/subscription/purchase
 * Process subscription purchase
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { prisma } from '@/server/config/database';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { BadRequestError } from '@/server/utils/errors';

interface PurchaseRequest {
  paymentMethod: string;
  amount: number;
  transactionId: string;
}

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Parse request body
    const body: PurchaseRequest = await request.json();
    const { paymentMethod, amount, transactionId } = body;

    // Validate input
    if (!paymentMethod || !amount || !transactionId) {
      throw new BadRequestError('Missing required fields: paymentMethod, amount, transactionId');
    }

    // Calculate expiration date (1 year from now)
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Create or update subscription in a transaction
    const subscription = await prisma.$transaction(async (tx) => {
      // Create subscription record
      const sub = await tx.subscription.upsert({
        where: { userId },
        update: {
          planName: 'Season Pass',
          planPrice: amount,
          purchaseDate: now,
          paymentMethod,
          amountPaid: amount,
          transactionId,
          status: 'ACTIVE',
          expiresAt,
          paymentProvider: paymentMethod === 'GCash' || paymentMethod === 'Maya' ? paymentMethod : 'Card',
        },
        create: {
          userId,
          planName: 'Season Pass',
          planPrice: amount,
          purchaseDate: now,
          paymentMethod,
          amountPaid: amount,
          transactionId,
          status: 'ACTIVE',
          expiresAt,
          paymentProvider: paymentMethod === 'GCash' || paymentMethod === 'Maya' ? paymentMethod : 'Card',
        },
      });

      // Update user's premium status
      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumExpiry: expiresAt,
        },
      });

      return sub;
    });

    // Build response
    const response = {
      status: 'PREMIUM' as const,
      plan: subscription.planName,
      expiresAt: subscription.expiresAt?.toISOString(),
      startedAt: subscription.purchaseDate.toISOString(),
      features: [
        'Unlimited Practice Questions',
        'AI-Powered Tutoring',
        'Mock Exams',
        'Advanced Analytics',
        'Study Progress Tracking',
      ],
    };

    return createSuccessResponse(response, 'Subscription purchased successfully', 201);
  } catch (error) {
    console.error('Error purchasing subscription:', error);
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
