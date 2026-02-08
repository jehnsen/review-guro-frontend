/**
 * Streak Service
 * Business logic for streak tracking and repair
 *
 * TIMEZONE HANDLING:
 * All streak calculations use Philippine Time (PHT / GMT+8) to ensure
 * consistent behavior for Filipino users. A user practicing at 11 PM PHT
 * should have that count towards their current day's streak, not the next day.
 */

import { streakRepository } from '../repositories/streak.repository';
import { userRepository } from '../repositories/user.repository';
import { getUserAccessLimits } from '../utils/accessControl';
import { BadRequestError, NotFoundError } from '../utils/errors';
import {
  getTodayDatePHT,
  daysBetweenPHT,
  isSameDayPHT,
  getYesterdayDatePHT,
} from '../utils/timezone';

// Streak repair costs (can be configured)
const STREAK_REPAIR_COST = 50; // points or currency
const MAX_REPAIRABLE_DAYS = 1; // Can only repair up to 1 missed day

class StreakService {
  /**
   * Update user's streak based on activity
   * Called when user completes a practice question
   *
   * Uses Philippine Time (PHT) for all date calculations to ensure
   * consistent behavior for Filipino users.
   */
  async updateStreak(userId: string): Promise<{
    currentStreak: number;
    longestStreak: number;
    isNewRecord: boolean;
  }> {
    const today = getTodayDatePHT();
    const streak = await streakRepository.findOrCreate(userId);

    // If no previous activity, start streak at 1
    if (!streak.lastActivityDate) {
      const updated = await streakRepository.update(userId, {
        currentStreak: 1,
        longestStreak: Math.max(1, streak.longestStreak),
        lastActivityDate: today,
      });

      return {
        currentStreak: updated.currentStreak,
        longestStreak: updated.longestStreak,
        isNewRecord: updated.currentStreak === updated.longestStreak,
      };
    }

    // Calculate days since last activity using PHT
    const lastActivity = new Date(streak.lastActivityDate);
    const daysSinceLastActivity = daysBetweenPHT(lastActivity, new Date());

    // Same day in PHT - no change
    if (daysSinceLastActivity === 0) {
      return {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        isNewRecord: false,
      };
    }

    // Consecutive day - increment streak
    if (daysSinceLastActivity === 1) {
      const newStreak = streak.currentStreak + 1;
      const updated = await streakRepository.update(userId, {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streak.longestStreak),
        lastActivityDate: today,
      });

      return {
        currentStreak: updated.currentStreak,
        longestStreak: updated.longestStreak,
        isNewRecord: updated.currentStreak === updated.longestStreak,
      };
    }

    // Missed days - reset streak
    const updated = await streakRepository.update(userId, {
      currentStreak: 1,
      lastActivityDate: today,
    });

    return {
      currentStreak: updated.currentStreak,
      longestStreak: updated.longestStreak,
      isNewRecord: false,
    };
  }

  /**
   * Get streak status with repair information
   * Uses Philippine Time (PHT) for all date calculations
   */
  async getStreakStatus(userId: string): Promise<{
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date | null;
    canRepair: boolean;
    missedDays: number;
    repairCost: number;
  }> {
    const streak = await streakRepository.findOrCreate(userId);
    const today = getTodayDatePHT();

    // Calculate missed days using PHT
    let missedDays = 0;
    let canRepair = false;

    if (streak.lastActivityDate) {
      const lastActivity = new Date(streak.lastActivityDate);
      const daysSinceLastActivity = daysBetweenPHT(lastActivity, new Date());

      // Missed days = daysSince - 1 (excluding today)
      missedDays = Math.max(0, daysSinceLastActivity - 1);

      // Can repair if:
      // 1. Missed exactly 1 day
      // 2. Haven't repaired today already
      canRepair = missedDays === 1 && daysSinceLastActivity === 2;

      // Check if already repaired today (in PHT)
      if (canRepair && streak.streakRepairedAt) {
        const repairedDate = new Date(streak.streakRepairedAt);
        const repairedToday = isSameDayPHT(repairedDate, new Date());
        canRepair = !repairedToday;
      }
    }

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate,
      canRepair,
      missedDays,
      repairCost: canRepair ? STREAK_REPAIR_COST : 0,
    };
  }

  /**
   * Repair a broken streak
   */
  async repairStreak(userId: string): Promise<{
    success: boolean;
    message: string;
    currentStreak: number;
    repairCost: number;
  }> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Get current streak status
    const status = await this.getStreakStatus(userId);

    // Validate repair eligibility
    if (!status.canRepair) {
      if (status.missedDays === 0) {
        throw new BadRequestError('Your streak is not broken. Keep it up!');
      } else if (status.missedDays > MAX_REPAIRABLE_DAYS) {
        throw new BadRequestError(
          `You missed ${status.missedDays} days. Streak repair is only available for 1 missed day.`
        );
      } else {
        throw new BadRequestError('Streak repair not available');
      }
    }

    // Check if premium user (free streak repair)
    const accessLimits = getUserAccessLimits(user);
    const isPremium = accessLimits.canAccessPremiumFeatures;

    // For now, we'll allow free repairs for all users
    // You can add points/currency deduction logic here later
    if (!isPremium) {
      // TODO: Deduct points/currency for free users
      // For now, we'll allow it for free
    }

    // Repair the streak using PHT dates
    const today = getTodayDatePHT();
    const yesterday = getYesterdayDatePHT();

    const updated = await streakRepository.update(userId, {
      lastActivityDate: yesterday, // Set to yesterday to allow continuation
      streakRepairedAt: today,
    });

    return {
      success: true,
      message: 'Streak repaired successfully! Your streak continues.',
      currentStreak: updated.currentStreak,
      repairCost: isPremium ? 0 : STREAK_REPAIR_COST,
    };
  }

}

export const streakService = new StreakService();
