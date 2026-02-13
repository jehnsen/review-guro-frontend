/**
 * Admin Payment Management API Routes
 * GET /api/admin/payments - List all payments (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminPaymentService } from '@/server/services/admin.payment.service';
import {
  createPaginatedResponse,
  createErrorResponse,
  getPaginationParams,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/payments
 * List payments with filters
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get pagination params
    const { page, limit } = getPaginationParams(searchParams);

    // Get filters
    const status = searchParams.get('status');
    const provider = searchParams.get('provider');
    const userId = searchParams.get('userId');
    const search = searchParams.get('search');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // List payments
    const data = await adminPaymentService.listPayments({
      page,
      limit,
      status: status || undefined,
      provider: provider || undefined,
      userId: userId || undefined,
      search: search || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });

    return createPaginatedResponse(
      data.items,
      page,
      limit,
      data.meta.total,
      'Payments retrieved successfully'
    );
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
