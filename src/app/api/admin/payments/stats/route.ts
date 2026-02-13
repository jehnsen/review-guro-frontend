/**
 * Admin Payment Statistics API Route
 * GET /api/admin/payments/stats - Get payment reconciliation data (admin only)
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
 * GET /api/admin/payments/stats
 * Get payment reconciliation statistics
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const stats = await adminPaymentService.getPaymentReconciliation();

    return createSuccessResponse(stats, 'Payment statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
