/**
 * GET /api/analytics
 * Get all analytics data in one request
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsService } from '@/server/services/analytics.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Call service methods directly instead of making HTTP requests
    // This is more efficient and avoids cookie forwarding issues
    const analyticsData = await analyticsService.getAllAnalytics(userId);

    return createSuccessResponse(analyticsData, 'All analytics retrieved successfully');
  } catch (error) {
    console.error('Error fetching all analytics:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
