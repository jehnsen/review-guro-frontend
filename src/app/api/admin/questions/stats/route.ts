/**
 * Admin Question Statistics API Route
 * GET /api/admin/questions/stats - Get question statistics (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminQuestionService } from '@/server/services/admin.question.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';

/**
 * GET /api/admin/questions/stats
 * Get question statistics for admin dashboard
 */
async function getHandler(request: AuthenticatedRequest) {
  try {
    const stats = await adminQuestionService.getQuestionStats();

    return createSuccessResponse(stats, 'Question statistics retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
