/**
 * Admin Questionnaire Question Removal API Routes
 * DELETE /api/admin/questionnaires/[id]/questions/[questionId] - Remove question from questionnaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';

/**
 * DELETE /api/admin/questionnaires/[id]/questions/[questionId]
 * Remove a question from a questionnaire
 */
export const DELETE = withAdminAuth(
  async (req: NextRequest, context: { params: Promise<{ id: string; questionId: string }> }) => {
    try {
      const { id, questionId } = await context.params;

      const questionnaire = await AdminQuestionnaireService.removeQuestion(id, questionId);

      return NextResponse.json({
        success: true,
        message: 'Question removed successfully',
        data: questionnaire,
      });
    } catch (error) {
      return createErrorResponse(error as Error);
    }
  }
);
