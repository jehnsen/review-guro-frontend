/**
 * POST /api/auth/change-password
 * Change password for authenticated user
 */

import { NextRequest } from 'next/server';
import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = changePasswordSchema.parse(body);

    // Change password
    await authService.changePassword(
      userId,
      validatedData.currentPassword,
      validatedData.newPassword,
      validatedData.confirmPassword
    );

    return createSuccessResponse(
      null,
      'Password changed successfully'
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

export const POST = withAuth(handler);
