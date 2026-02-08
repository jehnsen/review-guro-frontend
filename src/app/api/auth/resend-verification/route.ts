/**
 * POST /api/auth/resend-verification
 * Resend email verification email to authenticated user
 * Rate limited: 3 requests per minute per IP
 */

import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { withAuth, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { withRateLimit, RATE_LIMITS } from '@/server/middlewares/rateLimit';

async function handler(request: AuthenticatedRequest) {
  try {
    const userId = request.user!.userId;

    // Resend verification email
    await authService.resendVerificationEmail(userId);

    return createSuccessResponse(
      null,
      'Verification email sent. Please check your inbox.'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

// Apply both rate limiting and authentication
export const POST = withRateLimit(
  withAuth(handler),
  { limit: RATE_LIMITS.RESEND_VERIFICATION, endpoint: 'auth/resend-verification' }
);
