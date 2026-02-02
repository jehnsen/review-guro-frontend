/**
 * GET /api/analytics/ai-insights
 * Get AI-generated insights and recommendations
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsService } from '@/server/services/analytics.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const insights = await analyticsService.generateAIInsights(userId);

    return createSuccessResponse(insights, 'AI insights retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
