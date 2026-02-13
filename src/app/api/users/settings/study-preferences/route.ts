/**
 * PATCH /api/users/settings/study-preferences - Update study preference settings
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const updateStudyPreferencesSchema = z.object({
  dailyGoal: z.number().min(1).max(500).optional(),
  showExplanations: z.boolean().optional(),
  soundEffects: z.boolean().optional(),
});

async function patchHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = updateStudyPreferencesSchema.parse(body);

    // Update study preferences in database
    await userRepository.updateSettings(userId, validatedData);

    // Return updated settings from database
    const settings = await userRepository.getSettings(userId);

    return createSuccessResponse(settings, 'Study preferences updated successfully');
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
