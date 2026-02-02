/**
 * GET /api/mock-exams/[examId]
 * Get a specific mock exam session
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const { userId } = getAuthUser(request);
    const { examId } = await params;

    // Get exam
    const exam = await mockExamService.getExamState(userId, examId);

    return createSuccessResponse(exam, 'Exam retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
