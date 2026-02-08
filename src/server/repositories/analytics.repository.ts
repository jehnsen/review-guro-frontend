/**
 * Analytics Repository Layer
 * Data access for analytics and statistics
 * Combines data from UserProgress (practice) and MockExamSession (mock exams)
 */

import { prisma } from '../config/database';
import { QuestionCategory } from '@prisma/client';

export class AnalyticsRepository {
  /**
   * Get total questions attempted by user (practice mode only)
   */
  async getTotalQuestionsAttempted(userId: string): Promise<number> {
    return prisma.userProgress.count({
      where: { userId },
    });
  }

  /**
   * Get total correct answers by user (practice mode only)
   */
  async getTotalCorrectAnswers(userId: string): Promise<number> {
    return prisma.userProgress.count({
      where: {
        userId,
        isCorrect: true,
      },
    });
  }

  /**
   * Get user's overall accuracy (practice mode only)
   */
  async getOverallAccuracy(userId: string): Promise<number> {
    const total = await this.getTotalQuestionsAttempted(userId);
    if (total === 0) return 0;

    const correct = await this.getTotalCorrectAnswers(userId);
    return Math.round((correct / total) * 100);
  }

  /**
   * Get total study time in minutes from UserProgress attempts and mock exams
   */
  async getTotalStudyTimeMinutes(userId: string): Promise<number> {
    // Get practice time (estimate 1.5 min per question)
    const practiceQuestions = await this.getTotalQuestionsAttempted(userId);
    const practiceTime = Math.round(practiceQuestions * 1.5);

    // Get mock exam time from completed exams
    const completedExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: { not: null },
      },
      select: {
        startedAt: true,
        completedAt: true,
        timeLimitMinutes: true,
      },
    });

    const mockExamTime = completedExams.reduce((total, exam) => {
      if (exam.completedAt && exam.startedAt) {
        const timeSpent = Math.floor(
          (exam.completedAt.getTime() - exam.startedAt.getTime()) / (1000 * 60)
        );
        return total + Math.min(timeSpent, exam.timeLimitMinutes);
      }
      return total;
    }, 0);

    return practiceTime + mockExamTime;
  }

  /**
   * Get combined stats from both practice and mock exams
   */
  async getCombinedStats(userId: string): Promise<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    practiceQuestions: number;
    mockExamQuestions: number;
  }> {
    // Get practice stats
    const practiceQuestions = await this.getTotalQuestionsAttempted(userId);
    const practiceCorrect = await this.getTotalCorrectAnswers(userId);

    // Get mock exam stats
    const completedExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
      },
      select: {
        totalQuestions: true,
        correctAnswers: true,
      },
    });

    const mockExamQuestions = completedExams.reduce(
      (sum, exam) => sum + exam.totalQuestions,
      0
    );
    const mockExamCorrect = completedExams.reduce(
      (sum, exam) => sum + (exam.correctAnswers || 0),
      0
    );

    const totalQuestions = practiceQuestions + mockExamQuestions;
    const totalCorrect = practiceCorrect + mockExamCorrect;

    return {
      totalQuestions,
      correctAnswers: totalCorrect,
      accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      practiceQuestions,
      mockExamQuestions,
    };
  }

  /**
   * Get weekly activity (last 7 days) - combines practice and mock exams
   */
  async getWeeklyActivity(userId: string): Promise<
    Array<{
      date: string;
      questionsAttempted: number;
      correctAnswers: number;
      accuracy: number;
      practiceQuestions: number;
      mockExamQuestions: number;
    }>
  > {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get practice attempts
    const practiceAttempts = await prisma.userProgress.findMany({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Get mock exam sessions completed in last 7 days
    const mockExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        completedAt: true,
        totalQuestions: true,
        correctAnswers: true,
      },
    });

    // Group by date
    const dailyStats = new Map<string, {
      practiceTotal: number;
      practiceCorrect: number;
      mockTotal: number;
      mockCorrect: number;
    }>();

    // Initialize all 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dailyStats.set(dateKey, { practiceTotal: 0, practiceCorrect: 0, mockTotal: 0, mockCorrect: 0 });
    }

    // Populate with practice data
    practiceAttempts.forEach((attempt) => {
      const dateKey = attempt.createdAt.toISOString().split('T')[0];
      const stats = dailyStats.get(dateKey);
      if (stats) {
        stats.practiceTotal++;
        if (attempt.isCorrect) stats.practiceCorrect++;
      }
    });

    // Populate with mock exam data
    mockExams.forEach((exam) => {
      if (exam.completedAt) {
        const dateKey = exam.completedAt.toISOString().split('T')[0];
        const stats = dailyStats.get(dateKey);
        if (stats) {
          stats.mockTotal += exam.totalQuestions;
          stats.mockCorrect += exam.correctAnswers || 0;
        }
      }
    });

    return Array.from(dailyStats.entries()).map(([date, stats]) => {
      const total = stats.practiceTotal + stats.mockTotal;
      const correct = stats.practiceCorrect + stats.mockCorrect;
      return {
        date,
        questionsAttempted: total,
        correctAnswers: correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        practiceQuestions: stats.practiceTotal,
        mockExamQuestions: stats.mockTotal,
      };
    });
  }

  /**
   * Get performance by category
   */
  async getPerformanceByCategory(userId: string): Promise<
    Array<{
      category: QuestionCategory;
      totalAttempted: number;
      correctAnswers: number;
      accuracy: number;
      averageDifficulty: string;
    }>
  > {
    const attempts = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            category: true,
            difficulty: true,
          },
        },
      },
    });

    // Group by category
    const categoryMap = new Map<
      QuestionCategory,
      {
        total: number;
        correct: number;
        difficulties: string[];
      }
    >();

    attempts.forEach((attempt) => {
      const category = attempt.question.category;
      const stats = categoryMap.get(category) || {
        total: 0,
        correct: 0,
        difficulties: [],
      };

      stats.total++;
      if (attempt.isCorrect) stats.correct++;
      stats.difficulties.push(attempt.question.difficulty);

      categoryMap.set(category, stats);
    });

    return Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      totalAttempted: stats.total,
      correctAnswers: stats.correct,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      averageDifficulty: this.calculateAverageDifficulty(stats.difficulties),
    }));
  }

  /**
   * Calculate average difficulty
   */
  private calculateAverageDifficulty(difficulties: string[]): string {
    const difficultyScores = { EASY: 1, MEDIUM: 2, HARD: 3 };
    const total = difficulties.reduce(
      (sum, d) => sum + (difficultyScores[d as keyof typeof difficultyScores] || 2),
      0
    );
    const avg = total / difficulties.length;

    if (avg <= 1.5) return 'EASY';
    if (avg <= 2.5) return 'MEDIUM';
    return 'HARD';
  }

  /**
   * Get user's study streak (consecutive days) - includes both practice and mock exams
   */
  async getStudyStreak(userId: string): Promise<{
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
  }> {
    // Get practice attempt dates
    const practiceAttempts = await prisma.userProgress.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
      },
    });

    // Get mock exam completion dates
    const mockExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: { not: null },
      },
      orderBy: {
        completedAt: 'desc',
      },
      select: {
        completedAt: true,
      },
    });

    // Combine all activity dates
    const allDates: Date[] = [
      ...practiceAttempts.map((a) => a.createdAt),
      ...mockExams.filter((e) => e.completedAt).map((e) => e.completedAt as Date),
    ];

    if (allDates.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
      };
    }

    // Sort by date descending
    allDates.sort((a, b) => b.getTime() - a.getTime());

    // Get unique dates
    const uniqueDates = new Set<string>();
    allDates.forEach((date) => {
      uniqueDates.add(date.toISOString().split('T')[0]);
    });

    const sortedDates = Array.from(uniqueDates).sort().reverse();

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (sortedDates[0] === today || sortedDates[0] === yesterdayStr) {
      currentStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i - 1]);
        const prevDate = new Date(sortedDates[i]);
        const diffDays = Math.floor(
          (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = sortedDates.length > 0 ? 1 : 0;
    let tempStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i - 1]);
      const prevDate = new Date(sortedDates[i]);
      const diffDays = Math.floor(
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      lastActivityDate: allDates[0].toISOString(),
    };
  }

  /**
   * Get time breakdown by category (estimated)
   */
  async getTimeBreakdownByCategory(userId: string): Promise<
    Array<{
      category: QuestionCategory;
      timeSpentMinutes: number;
      percentage: number;
    }>
  > {
    const attempts = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            category: true,
          },
        },
      },
    });

    // Count attempts per category
    const categoryCount = new Map<QuestionCategory, number>();
    attempts.forEach((attempt) => {
      const category = attempt.question.category;
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });

    const totalAttempts = attempts.length;

    return Array.from(categoryCount.entries()).map(([category, count]) => ({
      category,
      timeSpentMinutes: Math.round(count * 1.5), // Estimate 1.5 min per question
      percentage: Math.round((count / totalAttempts) * 100),
    }));
  }

  /**
   * Get mock exam statistics
   */
  async getMockExamStats(userId: string): Promise<{
    totalExams: number;
    completedExams: number;
    averageScore: number;
    passRate: number;
  }> {
    const [totalExams, completedExams] = await Promise.all([
      prisma.mockExamSession.count({
        where: { userId },
      }),
      prisma.mockExamSession.findMany({
        where: {
          userId,
          status: 'COMPLETED',
        },
        select: {
          score: true,
          passingScore: true,
        },
      }),
    ]);

    if (completedExams.length === 0) {
      return {
        totalExams,
        completedExams: 0,
        averageScore: 0,
        passRate: 0,
      };
    }

    const totalScore = completedExams.reduce((sum, exam) => sum + (exam.score || 0), 0);
    const passedExams = completedExams.filter(
      (exam) => (exam.score || 0) >= exam.passingScore
    ).length;

    return {
      totalExams,
      completedExams: completedExams.length,
      averageScore: Math.round(totalScore / completedExams.length),
      passRate: Math.round((passedExams / completedExams.length) * 100),
    };
  }
}

export const analyticsRepository = new AnalyticsRepository();
