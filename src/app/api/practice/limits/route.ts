/**
 * GET /api/practice/limits
 * Get daily practice limits and current usage
 */

import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId;
    const limits = await practiceService.getDailyLimits(userId);

    return createSuccessResponse(limits);
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
