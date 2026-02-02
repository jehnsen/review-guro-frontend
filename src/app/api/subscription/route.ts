/**
 * GET /api/subscription
 * Get current subscription info for authenticated user
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { prisma } from '@/server/config/database';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get user and subscription data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return createErrorResponse(new Error('User not found'), 404);
    }

    // Build subscription response
    const subscription = user.subscription;

    let status: 'FREE' | 'PREMIUM' | 'EXPIRED' = 'FREE';
    let features: string[] = [];

    if (subscription && subscription.expiresAt) {
      const now = new Date();
      const expiresAt = new Date(subscription.expiresAt);

      if (expiresAt > now) {
        status = 'PREMIUM';
        features = [
          'Unlimited Practice Questions',
          'AI-Powered Tutoring',
          'Mock Exams',
          'Advanced Analytics',
          'Study Progress Tracking',
        ];
      } else {
        status = 'EXPIRED';
      }
    }

    const response = {
      status,
      plan: subscription?.planName || 'Free',
      expiresAt: subscription?.expiresAt?.toISOString(),
      startedAt: subscription?.purchaseDate?.toISOString(),
      features,
    };

    return createSuccessResponse(response, 'Subscription retrieved successfully');
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
