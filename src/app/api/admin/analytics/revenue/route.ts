/**
 * Admin Revenue Analytics API Route
 * GET /api/admin/analytics/revenue - Get revenue chart data (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminAnalyticsService } from '@/server/services/admin.analytics.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/analytics/revenue
 * Get revenue chart data
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const days = parseInt(searchParams.get('days') || '30');

    const revenueData = await adminAnalyticsService.getRevenueChartData(days);

    return createSuccessResponse(revenueData, 'Revenue data retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
