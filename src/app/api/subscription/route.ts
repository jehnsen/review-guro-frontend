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

    // Primary check: use user.isPremium as the source of truth
    // This correctly handles Season Pass where expiresAt is null (never expires)
    if (user.isPremium) {
      // Check if subscription has expired (only if expiresAt is set)
      if (subscription?.expiresAt) {
        const now = new Date();
        const expiresAt = new Date(subscription.expiresAt);

        if (expiresAt > now) {
          status = 'PREMIUM';
        } else {
          status = 'EXPIRED';
        }
      } else {
        // No expiry date means never expires (Season Pass)
        status = 'PREMIUM';
      }
    } else if (subscription?.expiresAt) {
      // User not premium but has subscription with expiry - check if expired
      const now = new Date();
      const expiresAt = new Date(subscription.expiresAt);
      status = expiresAt > now ? 'PREMIUM' : 'EXPIRED';
    }

    if (status === 'PREMIUM') {
      features = [
        'Unlimited Practice Questions',
        'AI-Powered Tutoring',
        'Mock Exams',
        'Advanced Analytics',
        'Study Progress Tracking',
      ];
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
