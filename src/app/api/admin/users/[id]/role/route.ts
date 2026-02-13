/**
 * Admin User Role Management API Route
 * POST /api/admin/users/[id]/role - Change user role (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminUserService } from '@/server/services/admin.user.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';
import { ChangeUserRoleDTO } from '@/server/types';

/**
 * POST /api/admin/users/[id]/role
 * Change user role (promote to admin or demote to user)
 * Validates that the last admin cannot be demoted
 */
async function postHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as ChangeUserRoleDTO;

    const user = await adminUserService.changeUserRole(id, body);

    return createSuccessResponse(user, 'User role updated successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const POST = withAdminAuth(postHandler);
