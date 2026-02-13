/**
 * Admin Payment Refund API Route
 * POST /api/admin/payments/[id]/refund - Mark payment as refunded (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminPaymentService } from '@/server/services/admin.payment.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';
import { RefundRequestDTO } from '@/server/types';

/**
 * POST /api/admin/payments/[id]/refund
 * Mark payment as refunded
 */
async function postHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as RefundRequestDTO;

    await adminPaymentService.refundPayment(id, body.reason);

    return createSuccessResponse(
      { paymentId: id },
      'Payment marked as refunded successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const POST = withAdminAuth(postHandler);
