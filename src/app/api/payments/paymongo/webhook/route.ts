/**
 * POST /api/payments/paymongo/webhook
 * Handle PayMongo webhook events (payment notifications)
 */

import { NextRequest } from 'next/server';
import { paymongoService } from '@/server/services/paymongo.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { prisma } from '@/server/config/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('PayMongo webhook received:', {
      type: body.data?.type,
      id: body.data?.id,
      attributes: body.data?.attributes
    });

    // Extract webhook data
    const webhookData = body.data;

    if (!webhookData) {
      console.error('Invalid webhook payload: missing data field');
      return createSuccessResponse(null, 'Webhook received');
    }

    // Handle different webhook event types
    const eventType = webhookData.attributes?.type || webhookData.type;

    if (eventType === 'link.payment.paid' || eventType === 'payment.paid') {
      await handlePaymentPaid(webhookData);
    } else {
      console.log('Unhandled webhook event type:', eventType);
    }

    return createSuccessResponse(null, 'Webhook processed');
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 200 even on error to prevent PayMongo from retrying
    // We log the error for manual investigation
    return createSuccessResponse(null, 'Webhook received');
  }
}

/**
 * Handle payment.paid or link.payment.paid events
 */
async function handlePaymentPaid(webhookData: any) {
  try {
    const attributes = webhookData.attributes;
    const paymentData = attributes?.data || webhookData;

    // Extract metadata
    const metadata = paymentData.attributes?.metadata || attributes?.metadata || {};
    const userId = metadata.userId;
    const referenceNumber = metadata.referenceNumber || paymentData.attributes?.reference_number;
    const amount = paymentData.attributes?.amount || 0;
    const paymentMethodUsed = paymentData.attributes?.payment_method_used || 'unknown';

    console.log('Processing payment:', {
      userId,
      referenceNumber,
      amount,
      paymentMethodUsed
    });

    if (!userId) {
      console.error('Cannot process payment: userId not found in metadata', metadata);
      return;
    }

    // Create payment record and update user premium status in a transaction
    await prisma.$transaction(async (tx) => {
      // 1. Create payment record
      await tx.payment.create({
        data: {
          userId,
          amount: amount / 100, // Convert centavos to pesos
          currency: 'PHP',
          provider: 'paymongo',
          providerPaymentId: paymentData.id,
          status: 'paid',
          description: 'Season Pass Purchase',
          metadata: {
            referenceNumber,
            paymentMethodUsed,
            webhookReceived: new Date().toISOString(),
          },
        },
      });

      // 2. Create or update subscription
      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          planName: 'Season Pass',
          planPrice: amount / 100,
          purchaseDate: new Date(),
          paymentMethod: paymentMethodUsed,
          amountPaid: amount / 100,
          transactionId: paymentData.id,
          status: 'active',
          expiresAt: null, // Season pass doesn't expire
          referenceNumber,
          paymentProvider: 'paymongo',
        },
        update: {
          planName: 'Season Pass',
          planPrice: amount / 100,
          purchaseDate: new Date(),
          paymentMethod: paymentMethodUsed,
          amountPaid: amount / 100,
          transactionId: paymentData.id,
          status: 'active',
          expiresAt: null,
          referenceNumber,
          paymentProvider: 'paymongo',
        },
      });

      // 3. Update user premium status
      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumExpiry: null, // No expiry for season pass
        },
      });

      console.log('Payment processed successfully for user:', userId);
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}
