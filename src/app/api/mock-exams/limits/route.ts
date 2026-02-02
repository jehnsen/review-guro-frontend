/**
 * GET /api/mock-exams/limits
 * Get mock exam limits and current usage
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { prisma } from '@/server/config/database';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get user to check premium status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        isPremium: true,
        premiumExpiry: true,
      },
    });

    if (!user) {
      return createErrorResponse(new Error('User not found'), 404);
    }

    // Check if premium is active
    const now = new Date();
    const isPremium = user.isPremium && user.premiumExpiry && user.premiumExpiry > now;

    // Get exams created this month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const examsThisMonth = await prisma.mockExamSession.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Define limits based on premium status
    const maxQuestionsPerExam = isPremium ? 200 : 50;
    const maxExamsPerMonth = isPremium ? -1 : 5; // -1 means unlimited
    const examsUsedThisMonth = examsThisMonth;
    const remainingExamsThisMonth = isPremium ? -1 : Math.max(0, maxExamsPerMonth - examsThisMonth);

    const response = {
      isPremium,
      maxQuestionsPerExam,
      maxExamsPerMonth,
      examsUsedThisMonth,
      remainingExamsThisMonth,
    };

    return createSuccessResponse(response, 'Mock exam limits retrieved successfully');
  } catch (error) {
    console.error('Error fetching mock exam limits:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
