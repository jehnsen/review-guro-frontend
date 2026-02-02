/**
 * GET /api/mock-exams/history
 * Get user's exam history
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { prisma } from '@/server/config/database';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { ExamStatus } from '@prisma/client';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const statusParam = searchParams.get('status') as ExamStatus | null;
    const limitParam = parseInt(searchParams.get('limit') || '10', 10);

    // Build query filter
    const where: any = { userId };
    if (statusParam && Object.values(ExamStatus).includes(statusParam)) {
      where.status = statusParam;
    }

    // Get exams
    const exams = await prisma.mockExamSession.findMany({
      where,
      orderBy: { startedAt: 'desc' },
      take: limitParam,
      select: {
        id: true,
        totalQuestions: true,
        timeLimitMinutes: true,
        passingScore: true,
        categories: true,
        status: true,
        score: true,
        passed: true,
        startedAt: true,
        completedAt: true,
      },
    });

    // Calculate statistics for completed exams
    const completedExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: ExamStatus.COMPLETED,
      },
      select: {
        score: true,
        passed: true,
      },
    });

    const totalCompleted = completedExams.length;
    const averageScore =
      totalCompleted > 0
        ? Math.round(
            completedExams.reduce((sum, exam) => sum + (exam.score || 0), 0) / totalCompleted
          )
        : 0;
    const passedCount = completedExams.filter((exam) => exam.passed).length;
    const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;

    const response = {
      exams: exams.map((exam) => ({
        examId: exam.id,
        totalQuestions: exam.totalQuestions,
        timeLimitMinutes: exam.timeLimitMinutes,
        passingScore: exam.passingScore,
        categories: exam.categories,
        status: exam.status,
        score: exam.score,
        passed: exam.passed,
        startedAt: exam.startedAt.toISOString(),
        completedAt: exam.completedAt?.toISOString() || null,
      })),
      totalCompleted,
      averageScore,
      passRate,
    };

    return createSuccessResponse(response, 'Exam history retrieved successfully');
  } catch (error) {
    console.error('Error fetching exam history:', error);
    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(handler);
