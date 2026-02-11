/**
 * GET /api/mock-exams/questionnaire-status
 * Get completion status for all 7 questionnaires for the authenticated user
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { mockExamService } from '@/server/services/mockExam.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const status = await mockExamService.getQuestionnaireCompletionStatus(userId);
    return createSuccessResponse(status, 'Questionnaire status retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
