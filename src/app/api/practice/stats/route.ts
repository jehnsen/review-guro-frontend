/**
 * GET /api/practice/stats
 * Get user's practice statistics
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { practiceService } from '@/server/services/practice.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get user stats
    const stats = await practiceService.getUserStats(userId);

    return createSuccessResponse(stats, 'Statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
