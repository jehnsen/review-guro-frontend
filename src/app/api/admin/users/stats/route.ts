/**
 * Admin User Statistics API Route
 * GET /api/admin/users/stats - Get platform-wide user statistics (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminUserService } from '@/server/services/admin.user.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/users/stats
 * Get platform-wide user statistics for admin dashboard
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const stats = await adminUserService.getUserStats();

    return createSuccessResponse(stats, 'User statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
