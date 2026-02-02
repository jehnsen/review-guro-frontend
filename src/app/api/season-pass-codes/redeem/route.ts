/**
 * POST /api/season-pass-codes/redeem
 * Redeem a season pass code to activate premium subscription
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { seasonPassCodeService } from '@/server/services/seasonPassCode.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const redeemCodeSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = redeemCodeSchema.parse(body);

    // Redeem code
    const result = await seasonPassCodeService.redeemCode(
      userId,
      validatedData.code
    );

    return createSuccessResponse(result, 'Season pass code redeemed successfully');
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
