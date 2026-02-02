/**
 * Streak Repository
 * Data access layer for streak management
 * Streak data is stored in the User model
 */

import { prisma } from '../config/database';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  streakRepairedAt: Date | null;
}

interface StreakUpdate {
  currentStreak?: number;
  longestStreak?: number;
  lastActivityDate?: Date;
  streakRepairedAt?: Date;
}

class StreakRepository {
  /**
   * Find or create streak data for a user
   */
  async findOrCreate(userId: string): Promise<StreakData> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        lastActivityDate: true,
        streakRepairedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Update streak data for a user
   */
  async update(userId: string, data: StreakUpdate): Promise<StreakData> {
    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        currentStreak: true,
        longestStreak: true,
        lastActivityDate: true,
        streakRepairedAt: true,
      },
    });

    return updated;
  }
}

export const streakRepository = new StreakRepository();
