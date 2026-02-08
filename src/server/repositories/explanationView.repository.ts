/**
 * Explanation View Repository
 * Tracks daily explanation views for taste test feature
 *
 * TIMEZONE HANDLING:
 * All dates are stored in Philippine Time (PHT / GMT+8) to ensure consistent
 * daily limits for users. This prevents confusion where users viewing explanations
 * late at night PHT would have those views count towards the next UTC day.
 */

import { prisma } from '../config/database';
import { getTodayDatePHT, getDateOnlyPHT, getDaysAgoPHT } from '../utils/timezone';

class ExplanationViewRepository {
  /**
   * Get today's explanation view count for a user
   */
  async getTodayCount(userId: string): Promise<number> {
    const today = getTodayDatePHT();

    const record = await prisma.dailyExplanationView.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    return record?.viewCount || 0;
  }

  /**
   * Increment today's explanation view count
   */
  async incrementTodayCount(userId: string): Promise<number> {
    const today = getTodayDatePHT();

    const record = await prisma.dailyExplanationView.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        viewCount: {
          increment: 1,
        },
      },
      create: {
        userId,
        date: today,
        viewCount: 1,
      },
    });

    return record.viewCount;
  }

  /**
   * Get view count for a specific date
   */
  async getCountForDate(userId: string, date: Date): Promise<number> {
    const dateOnly = getDateOnlyPHT(date);

    const record = await prisma.dailyExplanationView.findUnique({
      where: {
        userId_date: {
          userId,
          date: dateOnly,
        },
      },
    });

    return record?.viewCount || 0;
  }

  /**
   * Get user's view history for the last N days
   */
  async getHistory(userId: string, days: number = 7): Promise<Array<{ date: Date; count: number }>> {
    const startDate = getDaysAgoPHT(days);

    const records = await prisma.dailyExplanationView.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return records.map(r => ({
      date: r.date,
      count: r.viewCount,
    }));
  }
}

export const explanationViewRepository = new ExplanationViewRepository();
