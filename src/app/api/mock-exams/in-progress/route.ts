/**
 * GET /api/mock-exams/in-progress
 * Check if user has an in-progress exam
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Check for in-progress exam
    const result = await mockExamService.getInProgressExam(userId);

    return createSuccessResponse(result, 'In-progress exam status retrieved successfully');
  } catch (error) {
    console.error('Error checking in-progress exam:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
