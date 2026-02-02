/**
 * GET /api/analytics/explanation-limits
 * Get explanation access limits (taste test feature)
 */

import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { explanationAccessService } from '@/server/services/explanationAccess.service';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId;
    const limits = await explanationAccessService.getExplanationLimits(userId);

    return createSuccessResponse(limits);
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
