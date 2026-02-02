/**
 * Subscription Repository
 * Data access layer for Subscription entity
 *
 * TODO: Most methods in this repository don't match the actual Prisma Subscription schema.
 * The schema only has: id, userId, status, plan, startedAt, expiresAt, autoRenew, and feature flags.
 * This repository needs to be refactored to match the schema.
 */

import { prisma } from '../config/database';
import { SubscriptionStatus } from '@prisma/client';

class SubscriptionRepository {
  /**
   * Find subscription by user ID
   */
  async findByUserId(userId: string) {
    return prisma.subscription.findUnique({
      where: { userId },
    });
  }

  /**
   * Find subscription by reference number
   * TODO: referenceNumber field doesn't exist in Subscription model
   */
  async findByReferenceNumber(_referenceNumber: string) {
    // Placeholder - reference number should be tracked in Payment model instead
    return null;
  }

  /**
   * Create subscription
   * TODO: This method signature doesn't match the Prisma schema
   */
  async create(_data: any) {
    // Placeholder - needs to be updated to match actual Subscription model fields
    throw new Error('Subscription create method not implemented - model mismatch');
  }

  /**
   * Update subscription
   * TODO: This method signature doesn't match the Prisma schema
   */
  async update(_userId: string, _data: any) {
    // Placeholder - needs to be updated to match actual Subscription model fields
    throw new Error('Subscription update method not implemented - model mismatch');
  }

  /**
   * Create subscription with user premium update in atomic transaction
   * TODO: This method signature doesn't match the Prisma schema
   */
  async createWithUserUpdate(_data: any) {
    throw new Error('Subscription createWithUserUpdate method not implemented - model mismatch');
  }

  /**
   * Activate premium subscription (matches actual schema)
   */
  async activatePremium(userId: string, expiresAt: Date) {
    return prisma.subscription.upsert({
      where: { userId },
      update: {
        status: SubscriptionStatus.SEASON_PASS,
        plan: 'SEASON_PASS',
        expiresAt,
        unlimitedPractice: true,
        aiTutoring: true,
        mockExams: true,
        analytics: true,
      },
      create: {
        userId,
        status: SubscriptionStatus.SEASON_PASS,
        plan: 'SEASON_PASS',
        startedAt: new Date(),
        expiresAt,
        unlimitedPractice: true,
        aiTutoring: true,
        mockExams: true,
        analytics: true,
      },
    });
  }
}

export const subscriptionRepository = new SubscriptionRepository();
