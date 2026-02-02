/**
 * GET /api/analytics/weekly-activity
 * Get weekly activity breakdown (last 7 days)
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsService } from '@/server/services/analytics.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const weeklyActivity = await analyticsService.getWeeklyActivity(userId);

    return createSuccessResponse(weeklyActivity, 'Weekly activity retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
