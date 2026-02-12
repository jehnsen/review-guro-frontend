/**
 * POST /api/users/reset-progress - Reset user progress data
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { resetProgressService, ResetType } from '@/server/services/resetProgress.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { BadRequestError } from '@/server/utils/errors';
import { z } from 'zod';

const resetProgressSchema = z.object({
  type: z.enum(['practice', 'mock_exams', 'everything']),
});

async function postHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    const validatedData = resetProgressSchema.parse(body);

    const result = await resetProgressService.resetProgress(
      userId,
      validatedData.type as ResetType
    );

    return createSuccessResponse(result, 'Progress reset successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new BadRequestError(error.errors[0]?.message || 'Invalid reset type'),
      );
    }

    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(postHandler);
