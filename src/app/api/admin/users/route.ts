/**
 * Admin User Management API Routes
 * GET /api/admin/users - List all users (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminUserService } from '@/server/services/admin.user.service';
import {
  createPaginatedResponse,
  createErrorResponse,
  getPaginationParams,
} from '@/server/utils/nextResponse';
import { UserRole } from '@prisma/client';

/**
 * GET /api/admin/users
 * List users with admin filters including search
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get pagination params
    const { page, limit } = getPaginationParams(searchParams);

    // Get filters
    const role = searchParams.get('role') as UserRole | null;
    const isPremiumParam = searchParams.get('isPremium');
    const emailVerifiedParam = searchParams.get('emailVerified');
    const search = searchParams.get('search');

    // Convert string params to boolean
    const isPremium =
      isPremiumParam !== null ? isPremiumParam === 'true' : undefined;
    const emailVerified =
      emailVerifiedParam !== null ? emailVerifiedParam === 'true' : undefined;

    // List users
    const data = await adminUserService.listUsers({
      role: role || undefined,
      isPremium,
      emailVerified,
      search: search || undefined,
      page,
      limit,
    });

    return createPaginatedResponse(
      data.items,
      page,
      limit,
      data.meta.total,
      'Users retrieved successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
