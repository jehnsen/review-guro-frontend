/**
 * POST /api/mock-exams/[examId]/abandon
 * Abandon an in-progress exam
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

    // Abandon the exam
    const result = await mockExamService.abandonExam(userId, examId);

    return createSuccessResponse(result, 'Exam abandoned successfully');
  } catch (error) {
    console.error('Error abandoning exam:', error);
    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
