/**
 * GET /api/analytics/performance-by-category
 * Get detailed performance breakdown by category
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { analyticsRepository } from '@/server/repositories/analytics.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { prisma } from '@/server/config/database';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get performance data by category
    const performanceData = await analyticsRepository.getPerformanceByCategory(userId);

    // Get total questions count per category for completeness
    const categoriesWithTotals = await Promise.all(
      performanceData.map(async (perf) => {
        const totalQuestions = await prisma.question.count({
          where: { category: perf.category },
        });

        const averageTime = await prisma.userProgress.aggregate({
          where: {
            userId,
            question: { category: perf.category },
          },
          _avg: {
            timeSpentSeconds: true,
          },
        });

        return {
          category: perf.category,
          totalQuestions,
          attemptedQuestions: perf.totalAttempted,
          correctAnswers: perf.correctAnswers,
          accuracy: perf.accuracy,
          averageTimeSeconds: Math.round(averageTime._avg.timeSpentSeconds || 0),
        };
      })
    );

    const response = {
      categories: categoriesWithTotals,
    };

    return createSuccessResponse(response, 'Performance by category retrieved successfully');
  } catch (error) {
    console.error('Error fetching performance by category:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
