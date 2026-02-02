/**
 * GET /api/users/settings - Get all user settings
 * PATCH /api/users/settings - Update user settings
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const updateSettingsSchema = z.object({
  dailyGoal: z.number().min(1).max(500).optional(),
  studyReminderEnabled: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
  darkMode: z.boolean().optional(),
});

async function getHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const user = await userRepository.findById(userId);

    if (!user) {
      return createErrorResponse(new Error('User not found'), 404);
    }

    const settings = {
      dailyGoal: user.dailyGoal,
      studyReminderEnabled: user.studyReminderEnabled,
      emailNotifications: user.emailNotifications,
      darkMode: user.darkMode,
    };

    return createSuccessResponse(settings, 'Settings retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

async function patchHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = updateSettingsSchema.parse(body);

    // Update settings
    const updatedUser = await userRepository.updateSettings(userId, validatedData);

    const settings = {
      dailyGoal: updatedUser.dailyGoal,
      studyReminderEnabled: updatedUser.studyReminderEnabled,
      emailNotifications: updatedUser.emailNotifications,
      darkMode: updatedUser.darkMode,
    };

    return createSuccessResponse(settings, 'Settings updated successfully');
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

export const GET = withAuth(getHandler);
export const PATCH = withAuth(patchHandler);
