/**
 * POST /api/mock-exams/[examId]/submit
 * Submit and complete a mock exam
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

    // Submit exam
    const result = await mockExamService.submitExam(userId, examId);

    return createSuccessResponse(result, 'Exam submitted successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
