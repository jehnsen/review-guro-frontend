/**
 * GET /api/practice/questions
 * Get smart practice questions prioritized by user progress
 * Returns unanswered questions first, then incorrect, then correct — all randomized
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { QuestionCategory, Difficulty } from '@prisma/client';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') as QuestionCategory | null;
    const difficulty = searchParams.get('difficulty') as Difficulty | null;
    const questionnaireNumber = searchParams.get('questionnaireNumber');
    const limit = searchParams.get('limit');

    const questions = await practiceService.getSmartQuestions(userId, {
      category: category || undefined,
      difficulty: difficulty || undefined,
      questionnaireNumber: questionnaireNumber ? parseInt(questionnaireNumber, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });

    return createSuccessResponse(questions, 'Smart practice questions retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
