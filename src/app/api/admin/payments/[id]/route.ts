/**
 * Admin Payment Details API Routes
 * GET /api/admin/payments/[id] - Get payment details (admin only)
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
 * GET /api/admin/payments/[id]
 * Get payment details
 */
async function getHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const payment = await adminPaymentService.getPaymentDetails(id);

    return createSuccessResponse(payment, 'Payment details retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
