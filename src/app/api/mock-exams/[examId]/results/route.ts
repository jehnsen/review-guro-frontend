/**
 * GET /api/mock-exams/[examId]/results
 * Get detailed exam results
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

    // Get detailed exam results
    const results = await mockExamService.getResults(userId, examId);

    return createSuccessResponse(results, 'Exam results retrieved successfully');
  } catch (error) {
    console.error('Error fetching exam results:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
