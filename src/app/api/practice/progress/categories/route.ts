/**
 * GET /api/practice/progress/categories
 * Get user's progress by category (for practice dashboard)
 */

import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId;
    const categoryProgress = await practiceService.getCategoryProgress(userId);

    return createSuccessResponse(categoryProgress);
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
