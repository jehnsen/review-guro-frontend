/**
 * DELETE /api/auth/sessions/[sessionId]
 * Revoke a specific session (logout from specific device)
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { userId } = getAuthUser(request);
    const { sessionId } = await params;

    // Revoke the session
    await authService.revokeSession(sessionId, userId);

    return createSuccessResponse(
      { sessionId },
      'Session revoked successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const DELETE = withAuth(handler);
