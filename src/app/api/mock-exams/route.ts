/**
 * POST /api/mock-exams
 * Create a new mock exam session
 *
 * GET /api/mock-exams
 * Get user's mock exam history
 */

import { NextRequest } from 'next/server';
import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse, getPaginationParams } from '@/server/utils/nextResponse';
import { CreateMockExamDTO } from '@/server/types';
import { QuestionCategory, Difficulty } from '@prisma/client';
import { z } from 'zod';

const createMockExamSchema = z.object({
  totalQuestions: z.number().min(1).max(200),
  timeLimitMinutes: z.number().min(1).max(300),
  passingScore: z.number().min(0).max(100),
  categories: z.union([
    z.array(z.nativeEnum(QuestionCategory)),
    z.literal('MIXED')
  ]),
  difficulty: z.nativeEnum(Difficulty).optional(),
});

async function postHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = createMockExamSchema.parse(body);

    // Create mock exam
    const result = await mockExamService.createMockExam(
      userId,
      validatedData as CreateMockExamDTO
    );

    return createSuccessResponse(result, 'Mock exam created successfully', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    return createErrorResponse(error as Error);
  }
}

async function getHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const { searchParams } = new URL(request.url);

    const { limit } = getPaginationParams(searchParams);

    // Get exam history
    const result = await mockExamService.getHistory(userId, { limit });

    return createSuccessResponse(result, 'Exam history retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(postHandler);
export const GET = withAuth(getHandler);
