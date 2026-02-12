/**
 * Reset Progress Service
 * Orchestrates resetting user progress data
 */

import { prisma } from '../config/database';
import { progressRepository } from '../repositories/progress.repository';
import { mockExamRepository } from '../repositories/mockExam.repository';
import { dailyAnalyticsRepository } from '../repositories/dailyPracticeUsage.repository';
import { explanationViewRepository } from '../repositories/explanationView.repository';
import { streakRepository } from '../repositories/streak.repository';
import { BadRequestError } from '../utils/errors';

export type ResetType = 'practice' | 'mock_exams' | 'everything';

interface ResetResult {
  type: ResetType;
  deletedRecords: {
    userProgress?: number;
    dailyAnalytics?: number;
    mockExamSessions?: number;
    explanationViews?: number;
    streakReset?: boolean;
  };
}

class ResetProgressService {
  /**
   * Reset user progress based on the specified type
   */
  async resetProgress(userId: string, type: ResetType): Promise<ResetResult> {
    switch (type) {
      case 'practice':
        return this.resetPracticeProgress(userId);
      case 'mock_exams':
        return this.resetMockExamHistory(userId);
      case 'everything':
        return this.resetEverything(userId);
      default:
        throw new BadRequestError(`Invalid reset type: ${type}`);
    }
  }

  private async resetPracticeProgress(userId: string): Promise<ResetResult> {
    const [userProgressCount, dailyAnalyticsCount] = await Promise.all([
      progressRepository.deleteAllByUserId(userId),
      dailyAnalyticsRepository.deleteAllByUserId(userId),
    ]);

    return {
      type: 'practice',
      deletedRecords: {
        userProgress: userProgressCount,
        dailyAnalytics: dailyAnalyticsCount,
      },
    };
  }

  private async resetMockExamHistory(userId: string): Promise<ResetResult> {
    const mockExamCount = await mockExamRepository.deleteAllByUserId(userId);

    return {
      type: 'mock_exams',
      deletedRecords: {
        mockExamSessions: mockExamCount,
      },
    };
  }

  private async resetEverything(userId: string): Promise<ResetResult> {
    const [
      userProgressResult,
      dailyAnalyticsResult,
      mockExamResult,
      explanationViewResult,
    ] = await prisma.$transaction([
      prisma.userProgress.deleteMany({ where: { userId } }),
      prisma.dailyAnalytics.deleteMany({ where: { userId } }),
      prisma.mockExamSession.deleteMany({ where: { userId } }),
      prisma.dailyExplanationView.deleteMany({ where: { userId } }),
    ]);

    await streakRepository.reset(userId);

    return {
      type: 'everything',
      deletedRecords: {
        userProgress: userProgressResult.count,
        dailyAnalytics: dailyAnalyticsResult.count,
        mockExamSessions: mockExamResult.count,
        explanationViews: explanationViewResult.count,
        streakReset: true,
      },
    };
  }
}

export const resetProgressService = new ResetProgressService();
