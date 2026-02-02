/**
 * GET /api/auth/me
 * Get current authenticated user profile
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    // Get user from database
    const user = await userRepository.findById(userId);

    if (!user) {
      return createErrorResponse(new Error('User not found'), 404);
    }

    const safeUser = userRepository.toSafeUser(user);

    return createSuccessResponse(safeUser, 'Profile retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
