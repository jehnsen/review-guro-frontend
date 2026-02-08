import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const TEST_JWT_SECRET = 'test-jwt-secret-key-for-testing-at-least-32-characters-long';
const TEST_REFRESH_SECRET = 'test-refresh-token-secret-at-least-32-characters-long';

// Mock config module first (this is hoisted)
vi.mock('@/server/config/env', () => ({
  config: {
    jwt: {
      secret: 'test-jwt-secret-key-for-testing-at-least-32-characters-long',
      expiresIn: '15m',
      refreshTokenSecret: 'test-refresh-token-secret-at-least-32-characters-long',
      refreshTokenExpiresIn: '7d',
    },
    server: {
      nodeEnv: 'test',
      isProduction: false,
      isDevelopment: false,
      isTest: true,
    },
  },
  env: {
    NODE_ENV: 'test',
  },
}));

// Mock dependencies before importing the service
vi.mock('@/server/repositories/user.repository', () => ({
  userRepository: {
    emailExists: vi.fn(),
    create: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    findByVerificationToken: vi.fn(),
    findByPasswordResetToken: vi.fn(),
    updateVerificationStatus: vi.fn(),
    updateVerificationToken: vi.fn(),
    updatePassword: vi.fn(),
    updatePasswordResetToken: vi.fn(),
    clearPasswordResetToken: vi.fn(),
    toSafeUser: vi.fn((user) => ({
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
    })),
  },
}));

vi.mock('@/server/repositories/session.repository', () => ({
  sessionRepository: {
    create: vi.fn(),
    findByRefreshToken: vi.fn(),
    deleteByRefreshToken: vi.fn(),
    deleteAllByUserId: vi.fn(),
    findAllByUserId: vi.fn(),
    deleteById: vi.fn(),
    updateRefreshToken: vi.fn(),
  },
}));

vi.mock('@/server/services/email.service', () => ({
  emailService: {
    sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
    sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
  },
}));

import { authService } from '@/server/services/auth.service';
import { userRepository } from '@/server/repositories/user.repository';
import { sessionRepository } from '@/server/repositories/session.repository';
import { UnauthorizedError, ConflictError, BadRequestError } from '@/server/utils/errors';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'USER',
        firstName: null,
        lastName: null,
        avatarUrl: null,
        isPremium: false,
        premiumExpiry: null,
        examDate: null,
        emailVerified: false,
        createdAt: new Date(),
      };

      vi.mocked(userRepository.emailExists).mockResolvedValue(false);
      vi.mocked(userRepository.create).mockResolvedValue(mockUser as any);
      vi.mocked(sessionRepository.create).mockResolvedValue({} as any);

      const result = await authService.register(
        { email: 'test@example.com', password: 'Password123' },
        'Mozilla/5.0',
        '127.0.0.1'
      );

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
      expect(userRepository.emailExists).toHaveBeenCalledWith('test@example.com');
    });

    it('should reject registration with existing email', async () => {
      vi.mocked(userRepository.emailExists).mockResolvedValue(true);

      await expect(
        authService.register({ email: 'existing@example.com', password: 'Password123' })
      ).rejects.toThrow(ConflictError);
    });

    it('should reject weak passwords', async () => {
      vi.mocked(userRepository.emailExists).mockResolvedValue(false);

      // Too short
      await expect(
        authService.register({ email: 'test@example.com', password: 'Pass1' })
      ).rejects.toThrow(BadRequestError);

      // No uppercase
      await expect(
        authService.register({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow(BadRequestError);

      // No number
      await expect(
        authService.register({ email: 'test@example.com', password: 'Password' })
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('Password123', 12);
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
        firstName: null,
        lastName: null,
        avatarUrl: null,
        isPremium: false,
        premiumExpiry: null,
        examDate: null,
        emailVerified: true,
        createdAt: new Date(),
      };

      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
      vi.mocked(sessionRepository.create).mockResolvedValue({} as any);

      const result = await authService.login(
        { email: 'test@example.com', password: 'Password123' },
        'Mozilla/5.0',
        '127.0.0.1'
      );

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should reject login with invalid email', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

      await expect(
        authService.login({ email: 'nonexistent@example.com', password: 'Password123' })
      ).rejects.toThrow(UnauthorizedError);
    });

    it('should reject login with invalid password', async () => {
      const hashedPassword = await bcrypt.hash('Password123', 12);
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
        emailVerified: true,
        createdAt: new Date(),
      };

      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);

      await expect(
        authService.login({ email: 'test@example.com', password: 'WrongPassword123' })
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', () => {
      const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
      const token = jwt.sign(payload, TEST_JWT_SECRET);

      const decoded = authService.verifyToken(token);

      expect(decoded.userId).toBe('user-123');
      expect(decoded.email).toBe('test@example.com');
    });

    it('should reject an expired token', () => {
      const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
      const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '-1h' });

      expect(() => authService.verifyToken(token)).toThrow(UnauthorizedError);
    });

    it('should reject an invalid token', () => {
      expect(() => authService.verifyToken('invalid-token')).toThrow(UnauthorizedError);
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token with valid refresh token', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        refreshToken: 'valid-refresh-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed',
        role: 'USER',
        emailVerified: true,
        createdAt: new Date(),
      };

      vi.mocked(sessionRepository.findByRefreshToken).mockResolvedValue(mockSession as any);
      vi.mocked(userRepository.findById).mockResolvedValue(mockUser as any);
      vi.mocked(sessionRepository.updateRefreshToken).mockResolvedValue({} as any);

      const result = await authService.refreshAccessToken('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(sessionRepository.updateRefreshToken).toHaveBeenCalled();
    });

    it('should reject invalid refresh token', async () => {
      vi.mocked(sessionRepository.findByRefreshToken).mockResolvedValue(null);

      await expect(authService.refreshAccessToken('invalid-token')).rejects.toThrow(
        UnauthorizedError
      );
    });

    it('should reject expired refresh token', async () => {
      const mockSession = {
        id: 'session-123',
        userId: 'user-123',
        refreshToken: 'expired-token',
        expiresAt: new Date(Date.now() - 1000), // Expired
      };

      vi.mocked(sessionRepository.findByRefreshToken).mockResolvedValue(mockSession as any);
      vi.mocked(sessionRepository.deleteByRefreshToken).mockResolvedValue({} as any);

      await expect(authService.refreshAccessToken('expired-token')).rejects.toThrow(
        UnauthorizedError
      );
      expect(sessionRepository.deleteByRefreshToken).toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with valid token', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        emailVerified: false,
        emailVerificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };

      vi.mocked(userRepository.findByVerificationToken).mockResolvedValue(mockUser as any);
      vi.mocked(userRepository.updateVerificationStatus).mockResolvedValue({
        ...mockUser,
        emailVerified: true,
      } as any);

      const result = await authService.verifyEmail('valid-token');

      expect(result.emailVerified).toBe(true);
      expect(userRepository.updateVerificationStatus).toHaveBeenCalledWith('user-123', true);
    });

    it('should reject already verified email', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        emailVerified: true,
      };

      vi.mocked(userRepository.findByVerificationToken).mockResolvedValue(mockUser as any);

      await expect(authService.verifyEmail('valid-token')).rejects.toThrow(BadRequestError);
    });

    it('should reject expired verification token', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        emailVerified: false,
        emailVerificationExpiry: new Date(Date.now() - 1000), // Expired
      };

      vi.mocked(userRepository.findByVerificationToken).mockResolvedValue(mockUser as any);

      await expect(authService.verifyEmail('expired-token')).rejects.toThrow(BadRequestError);
    });
  });

  describe('resetPassword', () => {
    it('should reset password with valid token', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        passwordResetExpiry: new Date(Date.now() + 60 * 60 * 1000),
      };

      vi.mocked(userRepository.findByPasswordResetToken).mockResolvedValue(mockUser as any);
      vi.mocked(userRepository.updatePassword).mockResolvedValue({} as any);
      vi.mocked(userRepository.clearPasswordResetToken).mockResolvedValue({} as any);
      vi.mocked(sessionRepository.deleteAllByUserId).mockResolvedValue({} as any);

      await authService.resetPassword('valid-token', 'NewPassword123');

      expect(userRepository.updatePassword).toHaveBeenCalled();
      expect(userRepository.clearPasswordResetToken).toHaveBeenCalledWith('user-123');
      expect(sessionRepository.deleteAllByUserId).toHaveBeenCalledWith('user-123');
    });

    it('should reject expired reset token', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        passwordResetExpiry: new Date(Date.now() - 1000), // Expired
      };

      vi.mocked(userRepository.findByPasswordResetToken).mockResolvedValue(mockUser as any);
      vi.mocked(userRepository.clearPasswordResetToken).mockResolvedValue({} as any);

      await expect(authService.resetPassword('expired-token', 'NewPassword123')).rejects.toThrow(
        BadRequestError
      );
    });
  });

  describe('signout', () => {
    it('should invalidate refresh token on signout', async () => {
      vi.mocked(sessionRepository.deleteByRefreshToken).mockResolvedValue({} as any);

      await authService.signout('valid-refresh-token');

      expect(sessionRepository.deleteByRefreshToken).toHaveBeenCalledWith('valid-refresh-token');
    });
  });

  describe('signoutAllDevices', () => {
    it('should invalidate all sessions for user', async () => {
      vi.mocked(sessionRepository.deleteAllByUserId).mockResolvedValue({} as any);

      await authService.signoutAllDevices('user-123');

      expect(sessionRepository.deleteAllByUserId).toHaveBeenCalledWith('user-123');
    });
  });
});
