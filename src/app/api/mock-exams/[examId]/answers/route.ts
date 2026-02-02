/**
 * POST /api/mock-exams/[examId]/answers
 * Save answer for a question
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { BadRequestError } from '@/server/utils/errors';

interface SaveAnswerRequest {
  questionId: string;
  selectedOptionId: string;
}

async function handler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const { userId } = getAuthUser(request);
    const { examId } = await params;

    // Parse request body
    const body: SaveAnswerRequest = await request.json();
    const { questionId, selectedOptionId } = body;

    // Validate input
    if (!questionId || !selectedOptionId) {
      throw new BadRequestError('Missing required fields: questionId, selectedOptionId');
    }

    // Save answer
    const result = await mockExamService.saveAnswer(userId, examId, questionId, selectedOptionId);

    return createSuccessResponse(result, 'Answer saved successfully');
  } catch (error) {
    console.error('Error saving answer:', error);
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
