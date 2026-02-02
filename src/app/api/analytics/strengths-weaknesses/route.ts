/**
 * GET /api/analytics/strengths-weaknesses
 * Get top 3 strengths and weaknesses by category
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsService } from '@/server/services/analytics.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const strengthsWeaknesses = await analyticsService.getStrengthsWeaknesses(userId);

    return createSuccessResponse(
      strengthsWeaknesses,
      'Strengths and weaknesses retrieved successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
