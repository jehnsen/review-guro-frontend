/**
 * Admin User Subscription Management API Route
 * POST /api/admin/users/[id]/subscription - Grant/revoke Season Pass (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminUserService } from '@/server/services/admin.user.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';
import { GrantSubscriptionDTO } from '@/server/types';

/**
 * POST /api/admin/users/[id]/subscription
 * Manually grant or revoke Season Pass subscription
 */
async function postHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as GrantSubscriptionDTO;

    // Convert date string to Date object if provided
    if (body.premiumExpiry && typeof body.premiumExpiry === 'string') {
      body.premiumExpiry = new Date(body.premiumExpiry);
    }

    const user = await adminUserService.manageSubscription(id, body);

    return createSuccessResponse(
      user,
      body.isPremium ? 'Season Pass granted successfully' : 'Premium revoked successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const POST = withAdminAuth(postHandler);
