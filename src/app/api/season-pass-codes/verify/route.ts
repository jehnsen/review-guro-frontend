/**
 * POST /api/season-pass-codes/verify
 * Verify a season pass code without redeeming it
 */

import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { seasonPassCodeService } from '@/server/services/seasonPassCode.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const verifyCodeSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = verifyCodeSchema.parse(body);

    // Verify code
    const result = await seasonPassCodeService.verifyCode(validatedData.code);

    return createSuccessResponse(result, 'Code verified successfully');
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
