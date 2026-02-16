/**
 * Admin User Service
 * Business logic for admin user management operations
 */

import { User, UserRole, SubscriptionStatus } from '@prisma/client';
import { userRepository } from '../repositories/user.repository';
import { prisma } from '../config/database';
import {
  AdminUserListFilters,
  AdminUserResponse,
  AdminUserDetailsResponse,
  GrantSubscriptionDTO,
  ChangeUserRoleDTO,
  AdminUpdateUserDTO,
  UserActivityResponse,
  UserStatsOverview,
  PaginatedResult,
} from '../types';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors';

class AdminUserService {
  /**
   * List users with admin filters including search
   */
  async listUsers(filters: AdminUserListFilters): Promise<PaginatedResult<AdminUserResponse>> {
    const {
      role,
      isPremium,
      emailVerified,
      search,
      page = 1,
      limit = 20,
    } = filters;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (role) {
      where.role = role;
    }

    if (isPremium !== undefined) {
      where.isPremium = isPremium;
    }

    if (emailVerified !== undefined) {
      where.emailVerified = emailVerified;
    }

    // Search by email or name
    if (search && search.trim()) {
      where.OR = [
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Execute count and find in parallel
    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          isPremium: true,
          premiumExpiry: true,
          examDate: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          currentStreak: true,
          longestStreak: true,
          lastActivityDate: true,
          _count: {
            select: {
              progress: true,
              mockExams: {
                where: {
                  status: 'COMPLETED',
                },
              },
            },
          },
        },
      }),
    ]);

    // Calculate stats for each user
    const items: AdminUserResponse[] = await Promise.all(
      users.map(async (user) => {
        // Get question stats
        const [totalQuestions, correctAnswers] = await Promise.all([
          prisma.userProgress.count({
            where: { userId: user.id },
          }),
          prisma.userProgress.count({
            where: { userId: user.id, isCorrect: true },
          }),
        ]);

        const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

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
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
          lastActivityDate: user.lastActivityDate,
          totalQuestions,
          correctAnswers,
          accuracy: Math.round(accuracy * 10) / 10,
          totalMockExams: user._count.mockExams,
          updatedAt: user.updatedAt,
        };
      })
    );

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get detailed user information for admin view
   */
  async getUserDetails(userId: string): Promise<AdminUserDetailsResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isPremium: true,
        premiumExpiry: true,
        examDate: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        currentStreak: true,
        longestStreak: true,
        lastActivityDate: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Get question stats
    const [totalQuestions, correctAnswers, mockExamStats] = await Promise.all([
      prisma.userProgress.count({
        where: { userId },
      }),
      prisma.userProgress.count({
        where: { userId, isCorrect: true },
      }),
      prisma.mockExamSession.aggregate({
        where: {
          userId,
          status: 'COMPLETED',
        },
        _count: true,
        _avg: {
          score: true,
        },
      }),
    ]);

    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    const totalMockExams = await prisma.mockExamSession.count({
      where: { userId },
    });

    const completedMockExams = mockExamStats._count || 0;
    const averageMockScore = mockExamStats._avg?.score ?? 0;

    // Get subscription
    const sub = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        id: true,
        status: true,
        purchaseDate: true,
        expiresAt: true,
      },
    });

    const subscription = sub
      ? { ...sub, status: sub.status as SubscriptionStatus }
      : null;

    return {
      user: {
        ...user,
        totalQuestions,
        correctAnswers,
        accuracy: Math.round(accuracy * 10) / 10,
        totalMockExams,
      },
      stats: {
        totalQuestions,
        correctAnswers,
        accuracy: Math.round(accuracy * 10) / 10,
        totalMockExams,
        completedMockExams,
        averageMockScore: Math.round(averageMockScore * 10) / 10,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
      },
      subscription,
    };
  }

  /**
   * Grant or revoke Season Pass subscription
   */
  async manageSubscription(userId: string, data: GrantSubscriptionDTO): Promise<User> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Update user premium status
    const updatedUser = await userRepository.updatePremiumStatus(
      userId,
      data.isPremium,
      data.premiumExpiry !== undefined ? data.premiumExpiry : user.premiumExpiry
    );

    // Update or create subscription record
    const planStatus = data.isPremium ? 'SEASON_PASS' : 'FREE';
    await prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        status: planStatus,
        planName: planStatus,
        planPrice: 0,
        purchaseDate: new Date(),
        paymentMethod: 'admin',
        amountPaid: 0,
        transactionId: `admin-${userId}-${Date.now()}`,
        expiresAt: data.premiumExpiry,
      },
      update: {
        status: planStatus,
        planName: planStatus,
        expiresAt: data.premiumExpiry,
      },
    });

    return updatedUser;
  }

  /**
   * Change user role (promote to admin or demote to user)
   */
  async changeUserRole(userId: string, data: ChangeUserRoleDTO): Promise<User> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // If demoting from ADMIN, check if there's at least one other admin
    if (user.role === 'ADMIN' && data.role === 'USER') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount <= 1) {
        throw new ForbiddenError('Cannot demote the last admin user');
      }
    }

    // Update user role
    return userRepository.update(userId, { role: data.role });
  }

  /**
   * Update user profile (admin can modify more fields)
   */
  async updateUser(userId: string, data: AdminUpdateUserDTO): Promise<User> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updateData: Record<string, unknown> = {};

    if (data.firstName !== undefined) {
      updateData.firstName = data.firstName;
    }

    if (data.lastName !== undefined) {
      updateData.lastName = data.lastName;
    }

    if (data.examDate !== undefined) {
      updateData.examDate = data.examDate ? new Date(data.examDate) : null;
    }

    if (data.emailVerified !== undefined) {
      updateData.emailVerified = data.emailVerified;
      if (data.emailVerified) {
        updateData.emailVerificationToken = null;
        updateData.emailVerificationExpiry = null;
      }
    }

    return userRepository.update(userId, updateData);
  }

  /**
   * Get user activity history
   */
  async getUserActivity(userId: string): Promise<UserActivityResponse> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Get practice history (aggregated by date)
    const dailyAnalytics = await prisma.dailyAnalytics.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30, // Last 30 days
      select: {
        date: true,
        questionsCount: true,
      },
    });

    // Calculate practice history
    const practiceHistory = await Promise.all(
      dailyAnalytics.map(async (analytics) => {
        const startOfDay = new Date(analytics.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(analytics.date);
        endOfDay.setHours(23, 59, 59, 999);

        const [questionsAnswered, correctAnswers] = await Promise.all([
          prisma.userProgress.count({
            where: {
              userId,
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
          prisma.userProgress.count({
            where: {
              userId,
              isCorrect: true,
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
        ]);

        const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;

        return {
          date: analytics.date,
          questionsAnswered,
          correctAnswers,
          accuracy: Math.round(accuracy * 10) / 10,
        };
      })
    );

    // Get mock exam history
    const mockExams = await prisma.mockExamSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
      },
      orderBy: { completedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        completedAt: true,
        totalQuestions: true,
        score: true,
        passingScore: true,
      },
    });

    const mockExamHistory = mockExams.map((exam) => ({
      examId: exam.id,
      completedAt: exam.completedAt!,
      totalQuestions: exam.totalQuestions,
      score: exam.score || 0,
      passed: (exam.score || 0) >= exam.passingScore,
    }));

    return {
      practiceHistory,
      mockExamHistory,
    };
  }

  /**
   * Get platform-wide user statistics
   */
  async getUserStats(): Promise<UserStatsOverview> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const [
      totalUsers,
      premiumUsers,
      adminUsers,
      verifiedUsers,
      activeToday,
      activeThisWeek,
      activeThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isPremium: true } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({ where: { emailVerified: true } }),
      prisma.user.count({
        where: {
          lastActivityDate: {
            gte: today,
          },
        },
      }),
      prisma.user.count({
        where: {
          lastActivityDate: {
            gte: weekAgo,
          },
        },
      }),
      prisma.user.count({
        where: {
          lastActivityDate: {
            gte: monthAgo,
          },
        },
      }),
    ]);

    const freeUsers = totalUsers - premiumUsers;
    const unverifiedUsers = totalUsers - verifiedUsers;

    return {
      totalUsers,
      premiumUsers,
      freeUsers,
      adminUsers,
      verifiedUsers,
      unverifiedUsers,
      activeToday,
      activeThisWeek,
      activeThisMonth,
    };
  }
}

export const adminUserService = new AdminUserService();
