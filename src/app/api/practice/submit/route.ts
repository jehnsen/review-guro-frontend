/**
 * POST /api/practice/submit
 * Submit an answer to a practice question
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { SubmitAnswerDTO } from '@/server/types';
import { z } from 'zod';

const submitAnswerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedOptionId: z.string().min(1, 'Selected option ID is required'),
  timeSpentSeconds: z.number().optional(),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = submitAnswerSchema.parse(body);

    // Submit answer
    const result = await practiceService.submitAnswer(
      userId,
      validatedData as SubmitAnswerDTO
    );

    return createSuccessResponse(result, 'Answer submitted successfully');
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

export const POST = withAuth(handler);
