/**
 * Admin Questionnaire Reorder API Routes
 * PATCH /api/admin/questionnaires/[id]/reorder - Reorder questions in questionnaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';
import { ReorderQuestionsDTO } from '@/server/types/admin';

/**
 * PATCH /api/admin/questionnaires/[id]/reorder
 * Reorder questions in a questionnaire
 */
export const PATCH = withAdminAuth(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const data: ReorderQuestionsDTO = {
      questionOrders: body.questionOrders || [],
    };

    const questionnaire = await AdminQuestionnaireService.reorderQuestions(id, data);

    return NextResponse.json({
      success: true,
      message: 'Questions reordered successfully',
      data: questionnaire,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
