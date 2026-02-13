/**
 * Admin Questionnaire Statistics API Routes
 * GET /api/admin/questionnaires/stats - Get questionnaire statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';

/**
 * GET /api/admin/questionnaires/stats
 * Get questionnaire statistics
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  try {
    const stats = await AdminQuestionnaireService.getStatistics();

    return NextResponse.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: stats,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
