/**
 * PATCH /api/mock-exams/[examId]/flag
 * Flag or unflag a question for review
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { BadRequestError } from '@/server/utils/errors';

interface ToggleFlagRequest {
  questionId: string;
  flagged: boolean;
}

async function handler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const { userId } = getAuthUser(request);
    const { examId } = await params;

    // Parse request body
    const body: ToggleFlagRequest = await request.json();
    const { questionId, flagged } = body;

    // Validate input
    if (!questionId || typeof flagged !== 'boolean') {
      throw new BadRequestError('Missing or invalid fields: questionId, flagged');
    }

    // Toggle flag
    const result = await mockExamService.toggleFlag(userId, examId, questionId, flagged);

    return createSuccessResponse(result, `Question ${flagged ? 'flagged' : 'unflagged'} successfully`);
  } catch (error) {
    console.error('Error toggling flag:', error);
    return createErrorResponse(error as Error);
  }
}

export const PATCH = withAuth(handler);
