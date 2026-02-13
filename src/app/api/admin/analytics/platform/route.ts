/**
 * Admin Platform Analytics API Route
 * GET /api/admin/analytics/platform - Get platform-wide statistics (admin only)
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
 * GET /api/admin/analytics/platform
 * Get platform-wide statistics
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const stats = await adminAnalyticsService.getPlatformStatistics();

    return createSuccessResponse(stats, 'Platform statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
