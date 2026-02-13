/**
 * Admin User Engagement API Route
 * GET /api/admin/analytics/engagement - Get user engagement trends (admin only)
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
 * GET /api/admin/analytics/engagement
 * Get user engagement trends
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const days = parseInt(searchParams.get('days') || '30');

    const trends = await adminAnalyticsService.getUserEngagementTrends(days);

    return createSuccessResponse(trends, 'Engagement trends retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
