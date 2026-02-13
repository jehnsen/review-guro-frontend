/**
 * Admin User Management API Routes (Single User)
 * GET /api/admin/users/[id] - Get user details (admin only)
 * PATCH /api/admin/users/[id] - Update user (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminUserService } from '@/server/services/admin.user.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';
import { AdminUpdateUserDTO } from '@/server/types';

/**
 * GET /api/admin/users/[id]
 * Get detailed user information
 */
async function getHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const userDetails = await adminUserService.getUserDetails(id);

    return createSuccessResponse(userDetails, 'User details retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

/**
 * PATCH /api/admin/users/[id]
 * Update user profile (admin can force email verification)
 */
async function patchHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as AdminUpdateUserDTO;

    const user = await adminUserService.updateUser(id, body);

    return createSuccessResponse(user, 'User updated successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
