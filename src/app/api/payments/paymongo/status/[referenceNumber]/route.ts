/**
 * GET /api/payments/paymongo/status/[referenceNumber]
 * Check payment status by reference number
 */

import { NextRequest } from 'next/server';
import { paymongoService } from '@/server/services/paymongo.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ referenceNumber: string }> }
) {
  try {
    const { referenceNumber } = await params;

    // Get payment status
    const status = await paymongoService.getPayment(referenceNumber);

    return createSuccessResponse(status, 'Payment status retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}
