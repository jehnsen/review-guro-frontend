/**
 * MockExam Repository Layer
 * Handles all database operations for Mock Examination sessions
 */

import { PrismaClient, ExamStatus, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

export class MockExamRepository {
  /**
   * Create a new mock exam session
   */
  async create(data: {
    userId: string;
    totalQuestions: number;
    timeLimitMinutes: number;
    passingScore: number;
    categories: string;
    difficulty?: Difficulty;
    questions: string[] | any; // Array of question IDs, Prisma handles Json serialization
  }) {
    return prisma.mockExamSession.create({
      data: {
        userId: data.userId,
        totalQuestions: data.totalQuestions,
        timeLimitMinutes: data.timeLimitMinutes,
        passingScore: data.passingScore,
        categories: data.categories,
        difficulty: data.difficulty,
        questions: data.questions,
        answers: {},
        flaggedQuestions: [],
        status: ExamStatus.IN_PROGRESS,
      },
    });
  }

  /**
   * Find exam by ID with user validation
   */
  async findById(examId: string, userId: string) {
    return prisma.mockExamSession.findFirst({
      where: {
        id: examId,
        userId: userId,
      },
    });
  }

  /**
   * Update exam answers (partial update)
   */
  async updateAnswers(examId: string, answers: Record<string, string> | any) {
    return prisma.mockExamSession.update({
      where: { id: examId },
      data: { answers },
    });
  }

  /**
   * Update flagged questions
   */
  async updateFlags(examId: string, flaggedQuestions: string[] | any) {
    return prisma.mockExamSession.update({
      where: { id: examId },
      data: { flaggedQuestions },
    });
  }

  /**
   * Mark exam as completed with final score
   */
  async complete(examId: string, score: number) {
    return prisma.mockExamSession.update({
      where: { id: examId },
      data: {
        status: ExamStatus.COMPLETED,
        score,
        completedAt: new Date(),
      },
    });
  }

  /**
   * Mark exam as abandoned
   */
  async abandon(examId: string) {
    return prisma.mockExamSession.update({
      where: { id: examId },
      data: {
        status: ExamStatus.ABANDONED,
      },
    });
  }

  /**
   * Get user's exam history with optional filtering
   */
  async findByUserId(
    userId: string,
    filters?: {
      status?: ExamStatus;
      limit?: number;
    }
  ) {
    return prisma.mockExamSession.findMany({
      where: {
        userId,
        ...(filters?.status && { status: filters.status }),
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: filters?.limit || 10,
    });
  }

  /**
   * Get statistics for user's completed exams
   */
  async getUserExamStats(userId: string) {
    const completedExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: ExamStatus.COMPLETED,
      },
      select: {
        score: true,
        passingScore: true,
      },
    });

    if (completedExams.length === 0) {
      return {
        totalCompleted: 0,
        averageScore: 0,
        passRate: 0,
      };
    }

    const totalScore = completedExams.reduce((sum, exam) => sum + (exam.score || 0), 0);
    const passedExams = completedExams.filter(
      (exam) => (exam.score || 0) >= exam.passingScore
    ).length;

    return {
      totalCompleted: completedExams.length,
      averageScore: Math.round(totalScore / completedExams.length),
      passRate: Math.round((passedExams / completedExams.length) * 100),
    };
  }
}

export const mockExamRepository = new MockExamRepository();
