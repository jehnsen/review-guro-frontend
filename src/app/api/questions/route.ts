/**
 * GET /api/questions
 * Get paginated list of questions with filters
 */

import { NextRequest } from 'next/server';
import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { questionService } from '@/server/services/question.service';
import { createPaginatedResponse, createErrorResponse, getPaginationParams } from '@/server/utils/nextResponse';
import { QuestionCategory, Difficulty } from '@prisma/client';

async function handler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get pagination params
    const { page, limit } = getPaginationParams(searchParams);

    // Get filters
    const category = searchParams.get('category') as QuestionCategory | null;
    const difficulty = searchParams.get('difficulty') as Difficulty | null;

    // Get questions
    const { result: data, cached, cacheKey } = await questionService.getQuestions({
      category: category || undefined,
      difficulty: difficulty || undefined,
      page,
      limit,
    });

    return createPaginatedResponse(
      data.items,
      page,
      limit,
      data.meta.total,
      'Questions retrieved successfully',
      {
        cached,
        cacheKey,
      }
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
