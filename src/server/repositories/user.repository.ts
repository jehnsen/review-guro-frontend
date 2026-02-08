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
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }

  /**
   * Find user by email verification token
   */
  async findByVerificationToken(token: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { emailVerificationToken: token },
    });
  }

  /**
   * Update email verification status
   */
  async updateVerificationStatus(
    userId: string,
    verified: boolean
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: verified,
        emailVerificationToken: null,
        emailVerificationExpiry: null,
      },
    });
  }

  /**
   * Update email verification token
   */
  async updateVerificationToken(
    userId: string,
    token: string,
    expiry: Date
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        emailVerificationToken: token,
        emailVerificationExpiry: expiry,
      },
    });
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
   * Find user by password reset token
   */
  async findByPasswordResetToken(token: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { passwordResetToken: token },
    });
  }

  /**
   * Update password reset token
   */
  async updatePasswordResetToken(
    userId: string,
    token: string | null,
    expiry: Date | null
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: token,
        passwordResetExpiry: expiry,
      },
    });
  }

  /**
   * Clear password reset token (after successful reset)
   */
  async clearPasswordResetToken(userId: string): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });
  }

  /**
   * Get or create user settings
   */
  async getSettings(userId: string) {
    // Try to find existing settings
    let settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    // If no settings exist, create default settings
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId,
          theme: 'system',
          dailyGoal: 20,
          showExplanations: true,
          soundEffects: true,
          weeklyProgressReport: true,
          examReminders: true,
          dailyStudyReminder: false,
          reminderTime: '09:00',
          pushNotifications: false,
        },
      });
    }

    return {
      appearance: {
        theme: settings.theme as 'light' | 'dark' | 'system',
      },
      studyPreferences: {
        dailyGoal: settings.dailyGoal,
        showExplanations: settings.showExplanations,
        soundEffects: settings.soundEffects,
      },
      notifications: {
        weeklyProgressReport: settings.weeklyProgressReport,
        examReminders: settings.examReminders,
        dailyStudyReminder: settings.dailyStudyReminder,
        reminderTime: settings.reminderTime,
        pushNotifications: settings.pushNotifications,
      },
    };
  }

  /**
   * Update user settings
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
    // Upsert settings - create if doesn't exist, update if it does
    const settings = await prisma.userSettings.upsert({
      where: { userId },
      create: {
        userId,
        theme: data.theme ?? 'system',
        dailyGoal: data.dailyGoal ?? 20,
        showExplanations: data.showExplanations ?? true,
        soundEffects: data.soundEffects ?? true,
        weeklyProgressReport: data.weeklyProgressReport ?? true,
        examReminders: data.examReminders ?? true,
        dailyStudyReminder: data.dailyStudyReminder ?? false,
        reminderTime: data.reminderTime ?? '09:00',
        pushNotifications: data.pushNotifications ?? false,
      },
      update: data,
    });

    return {
      id: settings.id,
      theme: settings.theme,
      dailyGoal: settings.dailyGoal,
      showExplanations: settings.showExplanations,
      soundEffects: settings.soundEffects,
      weeklyProgressReport: settings.weeklyProgressReport,
      examReminders: settings.examReminders,
      dailyStudyReminder: settings.dailyStudyReminder,
      reminderTime: settings.reminderTime,
      pushNotifications: settings.pushNotifications,
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
