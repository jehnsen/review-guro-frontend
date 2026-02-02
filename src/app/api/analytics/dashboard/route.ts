/**
 * GET /api/analytics/dashboard
 * Get dashboard analytics overview
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsService } from '@/server/services/analytics.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get dashboard analytics
    const analytics = await analyticsService.getDashboardMetrics(userId);

    return createSuccessResponse(analytics, 'Analytics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
