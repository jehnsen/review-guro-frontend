/**
 * Authentication Service
 * Handles user registration, login, and token management
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { sessionRepository } from '../repositories/session.repository';
import {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  AuthTokenPayload,
  SafeUser,
} from '../types';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../utils/errors';

class AuthService {
  private readonly SALT_ROUNDS = 12;

  /**
   * Register a new user
   *
   * @param dto - Registration data (email, password)
   * @param userAgent - User agent string from request
   * @param ipAddress - IP address from request
   * @returns AuthResponse with user data, access token, and refresh token
   * @throws ConflictError if email already exists
   * @throws BadRequestError if validation fails
   */
  async register(
    dto: RegisterDTO,
    userAgent?: string,
    ipAddress?: string
  ): Promise<AuthResponse> {
    const { email, password } = dto;

    // Validate password strength
    this.validatePassword(password);

    // Check if email already exists
    const existingUser = await userRepository.emailExists(email);
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user in database
    const user = await userRepository.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Generate tokens
    const safeUser = userRepository.toSafeUser(user);
    const accessToken = this.generateToken(safeUser);
    const refreshToken = this.generateRefreshToken();

    // Store refresh token in database
    await sessionRepository.create({
      userId: user.id,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt: this.getRefreshTokenExpiry(),
    });

    return {
      user: safeUser,
      accessToken,
      refreshToken,
      expiresIn: config.jwt.expiresIn,
    };
  }

  /**
   * Login user with email and password
   *
   * @param dto - Login credentials
   * @param userAgent - User agent string from request
   * @param ipAddress - IP address from request
   * @returns AuthResponse with user data, access token, and refresh token
   * @throws UnauthorizedError if credentials are invalid
   */
  async login(
    dto: LoginDTO,
    userAgent?: string,
    ipAddress?: string
  ): Promise<AuthResponse> {
    const { email, password } = dto;

    // Find user by email
    const user = await userRepository.findByEmail(email.toLowerCase().trim());
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const safeUser = userRepository.toSafeUser(user);
    const accessToken = this.generateToken(safeUser);
    const refreshToken = this.generateRefreshToken();

    // Store refresh token in database
    await sessionRepository.create({
      userId: user.id,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt: this.getRefreshTokenExpiry(),
    });

    return {
      user: safeUser,
      accessToken,
      refreshToken,
      expiresIn: config.jwt.expiresIn,
    };
  }

  /**
   * Verify and decode a JWT token
   *
   * @param token - JWT token to verify
   * @returns Decoded token payload
   * @throws UnauthorizedError if token is invalid or expired
   */
  verifyToken(token: string): AuthTokenPayload {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as AuthTokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }
      throw new UnauthorizedError('Token verification failed');
    }
  }

  /**
   * Get user by ID
   *
   * @param userId - User ID
   * @returns SafeUser or null
   */
  async getUserById(userId: string): Promise<SafeUser | null> {
    const user = await userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return userRepository.toSafeUser(user);
  }

  /**
   * Generate JWT access token for a user
   */
  private generateToken(user: SafeUser): string {
    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Generate secure refresh token
   * Uses crypto.randomBytes for cryptographically strong tokens
   */
  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Calculate expiry date for refresh token
   */
  private getRefreshTokenExpiry(): Date {
    // Parse the refresh token expiry (e.g., "7d" -> 7 days)
    const expiryString = config.jwt.refreshTokenExpiresIn;
    const match = expiryString.match(/^(\d+)([dhms])$/);

    if (!match) {
      // Default to 7 days if parsing fails
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let milliseconds = 0;
    switch (unit) {
      case 'd':
        milliseconds = value * 24 * 60 * 60 * 1000;
        break;
      case 'h':
        milliseconds = value * 60 * 60 * 1000;
        break;
      case 'm':
        milliseconds = value * 60 * 1000;
        break;
      case 's':
        milliseconds = value * 1000;
        break;
    }

    return new Date(Date.now() + milliseconds);
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> {
    // Validate new passwords match
    if (newPassword !== confirmPassword) {
      throw new BadRequestError('New passwords do not match');
    }

    // Validate new password strength
    this.validatePassword(newPassword);

    // Get user
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // Update password
    await userRepository.updatePassword(userId, newPasswordHash);
  }

  /**
   * Refresh access token using refresh token (with rotation)
   *
   * @param refreshToken - Current refresh token
   * @param userAgent - User agent from request
   * @param ipAddress - IP address from request
   * @returns New access token and new refresh token
   * @throws UnauthorizedError if refresh token is invalid or expired
   */
  async refreshAccessToken(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string
  ): Promise<AuthResponse> {
    // Find session by refresh token
    const session = await sessionRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Check if token has expired
    if (session.expiresAt < new Date()) {
      // Delete expired session
      await sessionRepository.deleteByRefreshToken(refreshToken);
      throw new UnauthorizedError('Refresh token has expired');
    }

    // Get user
    const user = await userRepository.findById(session.userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const safeUser = userRepository.toSafeUser(user);

    // Generate new tokens (rotation)
    const newAccessToken = this.generateToken(safeUser);
    const newRefreshToken = this.generateRefreshToken();

    // Update session with new refresh token (rotation)
    await sessionRepository.updateRefreshToken(
      refreshToken,
      newRefreshToken,
      this.getRefreshTokenExpiry()
    );

    return {
      user: safeUser,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: config.jwt.expiresIn,
    };
  }

  /**
   * Get active sessions for user
   */
  async getSessions(userId: string) {
    const sessions = await sessionRepository.findAllByUserId(userId);

    return sessions.map((session) => ({
      id: session.id,
      device: this.parseUserAgent(session.userAgent),
      ipAddress: session.ipAddress,
      lastActive: session.createdAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
    }));
  }

  /**
   * Sign out user from current session (invalidate refresh token)
   */
  async signout(refreshToken: string): Promise<void> {
    try {
      await sessionRepository.deleteByRefreshToken(refreshToken);
    } catch (error) {
      // Session might already be deleted, ignore error
    }
  }

  /**
   * Sign out user from all devices (invalidate all refresh tokens)
   */
  async signoutAllDevices(userId: string): Promise<void> {
    await sessionRepository.deleteAllByUserId(userId);
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(sessionId: string, userId: string): Promise<void> {
    const session = await sessionRepository.findAllByUserId(userId);
    const targetSession = session.find((s) => s.id === sessionId);

    if (!targetSession) {
      throw new UnauthorizedError('Session not found');
    }

    await sessionRepository.deleteById(sessionId);
  }

  /**
   * Parse user agent string to friendly device name
   */
  private parseUserAgent(userAgent?: string | null): string {
    if (!userAgent) return 'Unknown Device';

    // Simple parsing - in production, use a library like ua-parser-js
    if (userAgent.includes('Chrome')) return 'Chrome Browser';
    if (userAgent.includes('Safari')) return 'Safari Browser';
    if (userAgent.includes('Firefox')) return 'Firefox Browser';
    if (userAgent.includes('Edge')) return 'Edge Browser';

    return 'Unknown Browser';
  }

  /**
   * Validate password strength
   */
  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters long');
    }

    // Check for at least one uppercase, one lowercase, and one number
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      throw new BadRequestError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
    }
  }
}

export const authService = new AuthService();
