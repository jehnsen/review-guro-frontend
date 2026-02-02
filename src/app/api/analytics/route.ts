/**
 * GET /api/analytics
 * Get all analytics data in one request
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get base URL for internal requests
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const token = request.headers.get('authorization');

    // Fetch all analytics data in parallel
    const [
      dashboardRes,
      weeklyActivityRes,
      strengthsWeaknessesRes,
      performanceByCategoryRes,
      aiInsightsRes,
      streakRes,
      timeTrackingRes,
    ] = await Promise.all([
      fetch(`${baseUrl}/api/analytics/dashboard`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/weekly-activity`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/strengths-weaknesses`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/performance-by-category`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/ai-insights`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/streak`, {
        headers: { Authorization: token || '' },
      }),
      fetch(`${baseUrl}/api/analytics/time-tracking`, {
        headers: { Authorization: token || '' },
      }),
    ]);

    // Parse all responses
    const [
      dashboard,
      weeklyActivity,
      strengthsWeaknesses,
      performanceByCategory,
      aiInsights,
      streak,
      timeTracking,
    ] = await Promise.all([
      dashboardRes.json(),
      weeklyActivityRes.json(),
      strengthsWeaknessesRes.json(),
      performanceByCategoryRes.json(),
      aiInsightsRes.json(),
      streakRes.json(),
      timeTrackingRes.json(),
    ]);

    const response = {
      dashboard: dashboard.data,
      weeklyActivity: weeklyActivity.data,
      strengthsWeaknesses: strengthsWeaknesses.data,
      performanceByCategory: performanceByCategory.data,
      aiInsights: aiInsights.data,
      streak: streak.data,
      timeTracking: timeTracking.data,
    };

    return createSuccessResponse(response, 'All analytics retrieved successfully');
  } catch (error) {
    console.error('Error fetching all analytics:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
