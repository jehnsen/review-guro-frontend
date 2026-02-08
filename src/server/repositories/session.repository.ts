/**
 * User Session Repository
 * Manages refresh token storage and active sessions
 */

import { prisma } from '../config/database';
import { UserSession } from '@prisma/client';

class SessionRepository {
  /**
   * Create a new session with refresh token
   */
  async create(data: {
    userId: string;
    refreshToken: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }): Promise<UserSession> {
    return prisma.userSession.create({
      data: {
        userId: data.userId,
        refreshToken: data.refreshToken,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        expiresAt: data.expiresAt,
      },
    });
  }

  /**
   * Find session by refresh token
   */
  async findByRefreshToken(refreshToken: string): Promise<UserSession | null> {
    return prisma.userSession.findUnique({
      where: { refreshToken },
    });
  }

  /**
   * Delete session by refresh token (logout)
   */
  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    await prisma.userSession.delete({
      where: { refreshToken },
    });
  }

  /**
   * Delete all sessions for a user (logout from all devices)
   */
  async deleteAllByUserId(userId: string): Promise<void> {
    await prisma.userSession.deleteMany({
      where: { userId },
    });
  }

  /**
   * Delete expired sessions (cleanup)
   */
  async deleteExpired(): Promise<void> {
    await prisma.userSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * Get all active sessions for a user
   */
  async findAllByUserId(userId: string): Promise<UserSession[]> {
    return prisma.userSession.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(), // Only non-expired sessions
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Count active sessions for a user
   */
  async countByUserId(userId: string): Promise<number> {
    return prisma.userSession.count({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  /**
   * Update session expiry (refresh rotation)
   */
  async updateRefreshToken(
    oldRefreshToken: string,
    newRefreshToken: string,
    expiresAt: Date
  ): Promise<UserSession> {
    return prisma.userSession.update({
      where: { refreshToken: oldRefreshToken },
      data: {
        refreshToken: newRefreshToken,
        expiresAt,
      },
    });
  }

  /**
   * Delete session by ID
   */
  async deleteById(sessionId: string): Promise<void> {
    await prisma.userSession.delete({
      where: { id: sessionId },
    });
  }
}

export const sessionRepository = new SessionRepository();
