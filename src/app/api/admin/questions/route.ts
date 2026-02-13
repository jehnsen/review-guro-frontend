/**
 * Admin Question Management API Routes
 * GET /api/admin/questions - List all questions (admin only)
 * POST /api/admin/questions - Create new question (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminQuestionService } from '@/server/services/admin.question.service';
import {
  createPaginatedResponse,
  createSuccessResponse,
  createErrorResponse,
  getPaginationParams,
} from '@/server/utils/nextResponse';
import { QuestionCategory, Difficulty } from '@prisma/client';
import { CreateQuestionDTO } from '@/server/types';

/**
 * GET /api/admin/questions
 * List questions with admin filters including search
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get pagination params
    const { page, limit } = getPaginationParams(searchParams);

    // Get filters
    const category = searchParams.get('category') as QuestionCategory | null;
    const difficulty = searchParams.get('difficulty') as Difficulty | null;
    const questionnaireNumber = searchParams.get('questionnaireNumber');
    const search = searchParams.get('search');

    // List questions
    const data = await adminQuestionService.listQuestions({
      category: category || undefined,
      difficulty: difficulty || undefined,
      questionnaireNumber: questionnaireNumber ? parseInt(questionnaireNumber, 10) : undefined,
      search: search || undefined,
      page,
      limit,
    });

    return createPaginatedResponse(
      data.items,
      page,
      limit,
      data.meta.total,
      'Questions retrieved successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

/**
 * POST /api/admin/questions
 * Create a new question
 */
async function postHandler(request: AuthenticatedRequest) {
  try {
    const body = (await request.json()) as CreateQuestionDTO;

    // Create question
    const question = await adminQuestionService.createQuestion(body);

    return createSuccessResponse(question, 'Question created successfully', 201);
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
export const POST = withAdminAuth(postHandler);
