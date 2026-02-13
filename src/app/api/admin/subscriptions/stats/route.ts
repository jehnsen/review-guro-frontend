/**
 * Admin Subscription Statistics API Route
 * GET /api/admin/subscriptions/stats - Get subscription statistics (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminPaymentService } from '@/server/services/admin.payment.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/subscriptions/stats
 * Get subscription statistics
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const stats = await adminPaymentService.getSubscriptionStatistics();

    return createSuccessResponse(stats, 'Subscription statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
