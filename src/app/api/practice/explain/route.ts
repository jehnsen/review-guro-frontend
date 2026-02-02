/**
 * POST /api/practice/explain
 * Get AI-generated explanation for a question
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { ExplainRequestDTO } from '@/server/types';
import { z } from 'zod';

const explainSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  customPrompt: z.string().optional(),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = explainSchema.parse(body);

    // Get explanation
    const result = await practiceService.getExplanation(
      validatedData as ExplainRequestDTO
    );

    return createSuccessResponse(result, 'Explanation retrieved successfully');
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
