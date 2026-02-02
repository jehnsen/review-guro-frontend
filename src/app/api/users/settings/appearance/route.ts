/**
 * PATCH /api/users/settings/appearance - Update appearance settings (dark mode)
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const updateAppearanceSchema = z.object({
  darkMode: z.boolean(),
});

async function patchHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = updateAppearanceSchema.parse(body);

    // Update appearance
    const updatedSettings = await userRepository.updateSettings(userId, {
      theme: validatedData.darkMode ? 'dark' : 'light',
    });

    const settings = {
      theme: updatedSettings.theme,
    };

    return createSuccessResponse(settings, 'Appearance updated successfully');
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
