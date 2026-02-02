/**
 * User Repository
 * Data access layer for User entity
 */

import { User, Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { SafeUser } from '../types';

class UserRepository {
  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create a new user
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Update user by ID
   */
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete user by ID
   */
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  /**
   * Convert User to SafeUser (without password)
   */
  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      isPremium: user.isPremium,
      premiumExpiry: user.premiumExpiry,
      examDate: user.examDate,
      createdAt: user.createdAt,
    };
  }

  /**
   * Get user profile with additional fields
   */
  async getProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        examDate: true,
        role: true,
        isPremium: true,
        premiumExpiry: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    examDate?: Date;
  }) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        examDate: true,
        isPremium: true,
        premiumExpiry: true,
      },
    });
  }

  /**
   * Update password
   */
  async updatePassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  }

  /**
   * Get or create user settings
   */
  async getSettings(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    // Return default settings
    // Note: Settings are stored in user_settings table in the database
    // This is a placeholder that returns defaults
    return {
      dailyGoal: 10,
      studyReminderEnabled: false,
      emailNotifications: true,
      darkMode: false,
    };
  }

  /**
   * Update user settings
   * Note: Settings are stored in user_settings table in the database
   * This method currently doesn't update the database
   */
  async updateSettings(userId: string, data: {
    theme?: string;
    dailyGoal?: number;
    showExplanations?: boolean;
    soundEffects?: boolean;
    weeklyProgressReport?: boolean;
    examReminders?: boolean;
    dailyStudyReminder?: boolean;
    reminderTime?: string;
    pushNotifications?: boolean;
  }) {
    // TODO: Implement actual settings update in user_settings table
    return {
      id: userId,
      ...data,
    };
  }

  /**
   * Update premium status
   */
  async updatePremiumStatus(userId: string, isPremium: boolean, premiumExpiry: Date | null) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        isPremium,
        premiumExpiry,
      },
    });
  }
}

export const userRepository = new UserRepository();
