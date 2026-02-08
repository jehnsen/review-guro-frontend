/**
 * POST /api/auth/verify-email
 * Verify user email address using verification token
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { token } = verifyEmailSchema.parse(body);

    // Verify email
    const user = await authService.verifyEmail(token);

    return createSuccessResponse(
      { user },
      'Email verified successfully'
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
