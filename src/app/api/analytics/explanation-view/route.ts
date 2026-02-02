/**
 * POST /api/analytics/explanation-view
 * Track explanation view for analytics (taste test feature)
 */

import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest, getAuthUser } from '@/server/middlewares/withAuth';
import { explanationAccessService } from '@/server/services/explanationAccess.service';

export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const { userId } = getAuthUser(request);

    // Parse request body with error handling
    let body;
    try {
      const text = await request.text();
      body = text ? JSON.parse(text) : {};
    } catch (parseError) {
      return createErrorResponse(new Error('Invalid JSON in request body'), 400);
    }

    const { questionId } = body;

    // Record the explanation view and check limits
    const result = await explanationAccessService.recordExplanationView(userId);

    return createSuccessResponse(
      {
        tracked: true,
        ...(questionId && { questionId }),
        ...result
      },
      'Explanation view tracked'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
