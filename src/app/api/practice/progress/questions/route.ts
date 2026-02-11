/**
 * POST /api/practice/progress/questions
 * Get user's answered progress for a list of question IDs
 * Used to restore practice state when returning to practice mode
 */

import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';

export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId;
    const body = await request.json();
    const { questionIds } = body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return createSuccessResponse([]);
    }

    // Cap at 100 question IDs to prevent abuse
    const limitedIds = questionIds.slice(0, 100);

    const answeredQuestions = await practiceService.getAnsweredQuestions(userId, limitedIds);

    return createSuccessResponse(answeredQuestions);
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
