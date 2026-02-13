/**
 * Admin User Activity API Route
 * GET /api/admin/users/[id]/activity - Get user activity history (admin only)
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
 * GET /api/admin/users/[id]/activity
 * Get user's practice and mock exam activity history
 */
async function getHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const activity = await adminUserService.getUserActivity(id);

    return createSuccessResponse(activity, 'User activity retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
