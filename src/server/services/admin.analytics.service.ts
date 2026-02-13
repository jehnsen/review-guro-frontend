/**
 * Admin Analytics Service
 * Handles platform-wide analytics, question performance, and engagement metrics
 */

import { prisma } from '@/server/config/database';
import {
  PlatformStatistics,
  QuestionPerformanceMetrics,
  UserEngagementTrends,
  RevenueChartData,
} from '@/server/types';
import { QuestionCategory, Difficulty } from '@prisma/client';

class AdminAnalyticsService {
  /**
   * Get platform-wide statistics
   */
  async getPlatformStatistics(): Promise<PlatformStatistics> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // User statistics
    const [
      totalUsers,
      premiumUsers,
      freeUsers,
      activeUsers,
      newUsersThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isPremium: true } }),
      prisma.user.count({ where: { isPremium: false } }),
      prisma.user.count({
        where: {
          lastActivityDate: { gte: thirtyDaysAgo },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

    // Revenue statistics
    const [totalRevenueResult, thisMonthRevenueResult, lastMonthRevenueResult] =
      await Promise.all([
        prisma.subscription.aggregate({
          _sum: { amountPaid: true },
        }),
        prisma.subscription.aggregate({
          where: { purchaseDate: { gte: startOfMonth } },
          _sum: { amountPaid: true },
        }),
        prisma.subscription.aggregate({
          where: {
            purchaseDate: {
              gte: startOfLastMonth,
              lte: endOfLastMonth,
            },
          },
          _sum: { amountPaid: true },
        }),
      ]);

    const totalRevenue = Number(totalRevenueResult._sum.amountPaid || 0);
    const thisMonthRevenue = Number(thisMonthRevenueResult._sum.amountPaid || 0);
    const lastMonthRevenue = Number(lastMonthRevenueResult._sum.amountPaid || 0);
    const revenueGrowth =
      lastMonthRevenue > 0
        ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
        : 0;

    // Question statistics
    const [totalQuestions, questionsByCategory, questionsByDifficulty] =
      await Promise.all([
        prisma.question.count(),
        prisma.question.groupBy({
          by: ['category'],
          _count: true,
        }),
        prisma.question.groupBy({
          by: ['difficulty'],
          _count: true,
        }),
      ]);

    // Activity statistics
    const [
      totalPracticeQuestions,
      totalMockExams,
      completedMockExams,
    ] = await Promise.all([
      prisma.userProgress.count(),
      prisma.mockExamSession.count(),
      prisma.mockExamSession.count({
        where: { status: 'COMPLETED' },
      }),
    ]);

    const completionRate =
      totalMockExams > 0
        ? (completedMockExams / totalMockExams) * 100
        : 0;

    return {
      users: {
        total: totalUsers,
        premium: premiumUsers,
        free: freeUsers,
        active: activeUsers,
        newThisMonth: newUsersThisMonth,
      },
      revenue: {
        total: totalRevenue,
        thisMonth: thisMonthRevenue,
        lastMonth: lastMonthRevenue,
        growth: revenueGrowth,
      },
      questions: {
        total: totalQuestions,
        byCategory: questionsByCategory.map((item) => ({
          category: item.category,
          count: item._count,
        })),
        byDifficulty: questionsByDifficulty.map((item) => ({
          difficulty: item.difficulty,
          count: item._count,
        })),
      },
      activity: {
        totalPracticeQuestions,
        totalMockExams,
        mockExamsCompleted: completedMockExams,
        completionRate,
      },
    };
  }

  /**
   * Get question performance metrics
   */
  async getQuestionPerformanceMetrics(
    limit: number = 50,
    sortBy: 'hardest' | 'easiest' | 'most_attempted' = 'hardest'
  ): Promise<QuestionPerformanceMetrics[]> {
    // Get all questions with their performance stats
    const questionsWithStats = await prisma.question.findMany({
      select: {
        id: true,
        questionText: true,
        category: true,
        difficulty: true,
        progress: {
          select: {
            isCorrect: true,
            timeSpentSeconds: true,
          },
        },
      },
    });

    // Calculate metrics for each question
    const metrics: QuestionPerformanceMetrics[] = questionsWithStats
      .filter((q) => q.progress.length > 0) // Only questions with attempts
      .map((question) => {
        const totalAttempts = question.progress.length;
        const correctAttempts = question.progress.filter(
          (p) => p.isCorrect
        ).length;
        const accuracyRate =
          totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
        const averageTimeSeconds =
          totalAttempts > 0
            ? question.progress.reduce((sum, p) => sum + p.timeSpentSeconds, 0) /
              totalAttempts
            : 0;

        return {
          questionId: question.id,
          questionText:
            question.questionText.length > 100
              ? question.questionText.substring(0, 100) + '...'
              : question.questionText,
          category: question.category,
          difficulty: question.difficulty,
          totalAttempts,
          correctAttempts,
          accuracyRate,
          averageTimeSeconds,
        };
      });

    // Sort based on criteria
    let sorted: QuestionPerformanceMetrics[];
    if (sortBy === 'hardest') {
      sorted = metrics.sort((a, b) => a.accuracyRate - b.accuracyRate);
    } else if (sortBy === 'easiest') {
      sorted = metrics.sort((a, b) => b.accuracyRate - a.accuracyRate);
    } else {
      sorted = metrics.sort((a, b) => b.totalAttempts - a.totalAttempts);
    }

    return sorted.slice(0, limit);
  }

  /**
   * Get user engagement trends
   */
  async getUserEngagementTrends(days: number = 30): Promise<UserEngagementTrends> {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);

    // Daily active users
    const dailyActiveUsers = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT
        DATE(last_activity_date) as date,
        COUNT(DISTINCT id)::INTEGER as count
      FROM users
      WHERE last_activity_date >= ${startDate}
      GROUP BY DATE(last_activity_date)
      ORDER BY date DESC
    `;

    // Weekly active users
    const weeklyActiveUsers = await prisma.$queryRaw<
      { week: string; count: number }[]
    >`
      SELECT
        TO_CHAR(last_activity_date, 'IYYY-IW') as week,
        COUNT(DISTINCT id)::INTEGER as count
      FROM users
      WHERE last_activity_date >= ${startDate}
      GROUP BY TO_CHAR(last_activity_date, 'IYYY-IW')
      ORDER BY week DESC
    `;

    // Practice questions per day
    const practiceQuestionsPerDay = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT
        DATE(created_at) as date,
        COUNT(*)::INTEGER as count
      FROM user_progress
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    // Mock exams per day
    const mockExamsPerDay = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT
        DATE(started_at) as date,
        COUNT(*)::INTEGER as count
      FROM mock_exams
      WHERE started_at >= ${startDate}
      GROUP BY DATE(started_at)
      ORDER BY date DESC
    `;

    return {
      dailyActiveUsers,
      weeklyActiveUsers,
      practiceQuestionsPerDay,
      mockExamsPerDay,
    };
  }

  /**
   * Get revenue chart data
   */
  async getRevenueChartData(days: number = 30): Promise<RevenueChartData> {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);

    // Daily revenue from payments
    const dailyRevenue = await prisma.$queryRaw<
      { date: string; revenue: number; count: number }[]
    >`
      SELECT
        DATE(created_at) as date,
        SUM(amount)::FLOAT as revenue,
        COUNT(*)::INTEGER as count
      FROM payment_verifications
      WHERE created_at >= ${startDate}
        AND status = 'paid'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    // Monthly revenue (last 12 months)
    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(now.getMonth() - 12);

    const monthlyRevenue = await prisma.$queryRaw<
      { month: string; revenue: number; count: number }[]
    >`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') as month,
        SUM(amount)::FLOAT as revenue,
        COUNT(*)::INTEGER as count
      FROM payment_verifications
      WHERE created_at >= ${twelveMonthsAgo}
        AND status = 'paid'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
    `;

    // Revenue by payment method
    const byPaymentMethod = await prisma.$queryRaw<
      { method: string; revenue: number; count: number }[]
    >`
      SELECT
        provider as method,
        SUM(amount)::FLOAT as revenue,
        COUNT(*)::INTEGER as count
      FROM payment_verifications
      WHERE status = 'paid'
      GROUP BY provider
      ORDER BY revenue DESC
    `;

    return {
      daily: dailyRevenue,
      monthly: monthlyRevenue,
      byPaymentMethod,
    };
  }

  /**
   * Get question accuracy by category
   */
  async getQuestionAccuracyByCategory(): Promise<
    { category: QuestionCategory; accuracy: number; totalAttempts: number }[]
  > {
    const categories = Object.values(QuestionCategory);

    const results = await Promise.all(
      categories.map(async (category) => {
        const [totalAttempts, correctAttempts] = await Promise.all([
          prisma.userProgress.count({
            where: { question: { category } },
          }),
          prisma.userProgress.count({
            where: { question: { category }, isCorrect: true },
          }),
        ]);

        const accuracy =
          totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

        return {
          category,
          accuracy,
          totalAttempts,
        };
      })
    );

    return results.sort((a, b) => b.accuracy - a.accuracy);
  }

  /**
   * Get question accuracy by difficulty
   */
  async getQuestionAccuracyByDifficulty(): Promise<
    { difficulty: Difficulty; accuracy: number; totalAttempts: number }[]
  > {
    const difficulties = Object.values(Difficulty);

    const results = await Promise.all(
      difficulties.map(async (difficulty) => {
        const [totalAttempts, correctAttempts] = await Promise.all([
          prisma.userProgress.count({
            where: { question: { difficulty } },
          }),
          prisma.userProgress.count({
            where: { question: { difficulty }, isCorrect: true },
          }),
        ]);

        const accuracy =
          totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

        return {
          difficulty,
          accuracy,
          totalAttempts,
        };
      })
    );

    return results.sort((a, b) => {
      const order = { EASY: 0, MEDIUM: 1, HARD: 2 };
      return order[a.difficulty] - order[b.difficulty];
    });
  }
}

export const adminAnalyticsService = new AdminAnalyticsService();
