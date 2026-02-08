/**
 * PATCH /api/users/settings/daily-goal - Update daily goal
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const updateDailyGoalSchema = z.object({
  dailyGoal: z.number().min(1).max(500),
});

async function patchHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = updateDailyGoalSchema.parse(body);

    // Update daily goal in database
    const updatedSettings = await userRepository.updateSettings(userId, {
      dailyGoal: validatedData.dailyGoal,
    });

    return createSuccessResponse(
      { dailyGoal: updatedSettings.dailyGoal },
      'Daily goal updated successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    return createErrorResponse(error as Error);
  }
}

export const PATCH = withAuth(patchHandler);
