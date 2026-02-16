/**
 * Admin Payment Management Service
 * Handles payment transactions, subscription statistics, and refunds
 */

import { prisma } from '@/server/config/database';
import {
  AdminPaymentFilters,
  AdminPaymentResponse,
  SubscriptionStatistics,
  PaymentReconciliation,
} from '@/server/types';
import { NotFoundError } from '@/server/utils/errors';
import { PaginatedResult } from '@/server/types';

class AdminPaymentService {
  /**
   * List all payments with filters
   */
  async listPayments(
    filters: AdminPaymentFilters
  ): Promise<PaginatedResult<AdminPaymentResponse>> {
    const {
      page = 1,
      limit = 20,
      status,
      provider,
      userId,
      search,
      dateFrom,
      dateTo,
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (provider) {
      where.provider = provider;
    }

    if (userId) {
      where.userId = userId;
    }

    if (search) {
      where.OR = [
        { providerPaymentId: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }

    // Fetch payments
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    return {
      items: payments as AdminPaymentResponse[],
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get payment details
   */
  async getPaymentDetails(paymentId: string): Promise<AdminPaymentResponse> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isPremium: true,
            premiumExpiry: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    return payment as unknown as AdminPaymentResponse;
  }

  /**
   * Get subscription statistics
   */
  async getSubscriptionStatistics(): Promise<SubscriptionStatistics> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get all subscriptions
    const [total, active, expired] = await Promise.all([
      prisma.subscription.count(),
      prisma.subscription.count({
        where: {
          OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
        },
      }),
      prisma.subscription.count({
        where: {
          expiresAt: { lt: now },
        },
      }),
    ]);

    // Calculate total revenue
    const totalRevenueResult = await prisma.subscription.aggregate({
      _sum: {
        amountPaid: true,
      },
    });

    // Calculate monthly revenue
    const monthlyRevenueResult = await prisma.subscription.aggregate({
      where: {
        purchaseDate: { gte: startOfMonth },
      },
      _sum: {
        amountPaid: true,
      },
    });

    // Calculate average subscription value
    const avgValueResult = await prisma.subscription.aggregate({
      _avg: {
        amountPaid: true,
      },
    });

    // Get revenue by month (last 12 months)
    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(now.getMonth() - 12);

    const revenueByMonth = await prisma.$queryRaw<
      { month: string; revenue: number; count: number }[]
    >`
      SELECT
        TO_CHAR(purchase_date, 'YYYY-MM') as month,
        SUM(amount_paid)::FLOAT as revenue,
        COUNT(*)::INTEGER as count
      FROM subscriptions
      WHERE purchase_date >= ${twelveMonthsAgo}
      GROUP BY TO_CHAR(purchase_date, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `;

    return {
      total,
      active,
      expired,
      totalRevenue: Number(totalRevenueResult._sum.amountPaid || 0),
      monthlyRevenue: Number(monthlyRevenueResult._sum.amountPaid || 0),
      averageSubscriptionValue: Number(avgValueResult._avg.amountPaid || 0),
      revenueByMonth,
    };
  }

  /**
   * Get payment reconciliation data
   */
  async getPaymentReconciliation(): Promise<PaymentReconciliation> {
    const [
      totalPayments,
      successfulPayments,
      failedPayments,
      pendingPayments,
    ] = await Promise.all([
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'paid' } }),
      prisma.payment.count({ where: { status: 'failed' } }),
      prisma.payment.count({ where: { status: 'pending' } }),
    ]);

    // Calculate total revenue (successful payments only)
    const revenueResult = await prisma.payment.aggregate({
      where: { status: 'paid' },
      _sum: { amount: true },
    });

    // Calculate refunded amount
    const refundedResult = await prisma.payment.aggregate({
      where: { status: 'refunded' },
      _sum: { amount: true },
    });

    return {
      totalPayments,
      successfulPayments,
      failedPayments,
      pendingPayments,
      totalRevenue: revenueResult._sum.amount || 0,
      refundedAmount: refundedResult._sum.amount || 0,
    };
  }

  /**
   * Mark payment as refunded
   */
  async refundPayment(paymentId: string, reason?: string): Promise<void> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'refunded',
        metadata: {
          ...(payment.metadata as object),
          refundReason: reason,
          refundedAt: new Date().toISOString(),
        },
      },
    });

    // If this was a subscription payment, revoke premium access
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: payment.userId,
        transactionId: payment.providerPaymentId || '',
      },
    });

    if (subscription) {
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          isPremium: false,
          premiumExpiry: null,
        },
      });
    }
  }

  /**
   * Get payment statistics by date range
   */
  async getPaymentStatsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalPayments: number;
    totalRevenue: number;
    averagePayment: number;
    byStatus: { status: string; count: number; revenue: number }[];
  }> {
    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalPayments = payments.length;
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const averagePayment = totalPayments > 0 ? totalRevenue / totalPayments : 0;

    // Group by status
    const byStatus = Object.entries(
      payments.reduce(
        (acc, p) => {
          if (!acc[p.status]) {
            acc[p.status] = { count: 0, revenue: 0 };
          }
          acc[p.status].count++;
          acc[p.status].revenue += p.amount;
          return acc;
        },
        {} as Record<string, { count: number; revenue: number }>
      )
    ).map(([status, data]) => ({
      status,
      count: data.count,
      revenue: data.revenue,
    }));

    return {
      totalPayments,
      totalRevenue,
      averagePayment,
      byStatus,
    };
  }
}

export const adminPaymentService = new AdminPaymentService();
