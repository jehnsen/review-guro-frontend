/**
 * Admin Question Performance API Route
 * GET /api/admin/analytics/questions - Get question performance metrics (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminAnalyticsService } from '@/server/services/admin.analytics.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/analytics/questions
 * Get question performance metrics
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = (searchParams.get('sortBy') || 'hardest') as
      | 'hardest'
      | 'easiest'
      | 'most_attempted';

    const [metrics, byCategory, byDifficulty] = await Promise.all([
      adminAnalyticsService.getQuestionPerformanceMetrics(limit, sortBy),
      adminAnalyticsService.getQuestionAccuracyByCategory(),
      adminAnalyticsService.getQuestionAccuracyByDifficulty(),
    ]);

    return createSuccessResponse(
      {
        questions: metrics,
        byCategory,
        byDifficulty,
      },
      'Question performance metrics retrieved successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
