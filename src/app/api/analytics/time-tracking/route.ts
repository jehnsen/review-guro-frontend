/**
 * GET /api/analytics/time-tracking
 * Get time breakdown by category
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsRepository } from '@/server/repositories/analytics.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get total study time
    const totalMinutes = await analyticsRepository.getTotalStudyTimeMinutes(userId);
    const totalHours = parseFloat((totalMinutes / 60).toFixed(1));

    // Get time breakdown by category
    const timeBreakdown = await analyticsRepository.getTimeBreakdownByCategory(userId);

    const byCategory = timeBreakdown.map((item) => ({
      category: item.category,
      totalMinutes: item.timeSpentMinutes,
      averageSessionMinutes: Math.round(item.timeSpentMinutes / Math.max(1, item.timeSpentMinutes / 1.5)),
    }));

    const response = {
      totalHours,
      totalMinutes,
      byCategory,
    };

    return createSuccessResponse(response, 'Time tracking retrieved successfully');
  } catch (error) {
    console.error('Error fetching time tracking:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
