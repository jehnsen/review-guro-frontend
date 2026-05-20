/**
 * POST /api/auth/forgot-password
 * Request a password reset email
 * Rate limited: 3 requests per minute per IP
 */

import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { rateLimiters } from '@/server/middlewares/rateLimit';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

async function handler(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);

    await authService.requestPasswordReset(validatedData.email);
    // Opportunistically clean up expired tokens (fire-and-forget)
    userRepository.deleteExpiredPasswordResetTokens().catch(() => {});

    // Always return success to prevent email enumeration
    return createSuccessResponse(
      null,
      'If an account with that email exists, we have sent a password reset link.'
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

export const POST = rateLimiters.forgotPassword(handler);
