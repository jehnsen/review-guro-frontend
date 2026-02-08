/**
 * POST /api/auth/reset-password
 * Reset password using a token
 * Rate limited: 5 requests per minute per IP
 */

import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { rateLimiters } from '@/server/middlewares/rateLimit';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

async function handler(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = resetPasswordSchema.parse(body);

    // Reset password
    await authService.resetPassword(validatedData.token, validatedData.password);

    return createSuccessResponse(
      null,
      'Password has been reset successfully. You can now sign in with your new password.'
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

export const POST = rateLimiters.resetPassword(handler);
