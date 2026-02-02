/**
 * GET /api/analytics/streak - Get streak status
 * POST /api/analytics/streak/repair - Repair broken streak
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { streakService } from '@/server/services/streak.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function getHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const streak = await streakService.getStreakStatus(userId);

    return createSuccessResponse(streak, 'Streak status retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

async function postHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Repair streak
    const result = await streakService.repairStreak(userId);

    return createSuccessResponse(result, 'Streak repaired successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
