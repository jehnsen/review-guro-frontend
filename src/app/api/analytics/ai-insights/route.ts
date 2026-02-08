/**
 * GET /api/analytics/ai-insights
 * Get AI-generated insights and recommendations
 * Rate limited: 5 requests per minute per IP
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { withRateLimit, RATE_LIMITS } from '@/server/middlewares/rateLimit';
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

// Apply both rate limiting and authentication
export const GET = withRateLimit(
  withAuth(handler),
  { limit: RATE_LIMITS.AI_INSIGHTS, endpoint: 'analytics/ai-insights' }
);
