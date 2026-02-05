/**
 * POST /api/webhooks/paymongo
 * Handle PayMongo webhook events (payment notifications)
 * This is the endpoint configured in PayMongo dashboard
 */

import { NextRequest } from 'next/server';
import { createSuccessResponse } from '@/server/utils/nextResponse';
import { prisma } from '@/server/config/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the complete raw payload for debugging
    console.log('PayMongo webhook RAW payload:', JSON.stringify(body, null, 2));

    // PayMongo webhook structure:
    // { data: { id: "evt_...", type: "event", attributes: { type: "link.payment.paid", data: {...} } } }

    const eventData = body.data;
    if (!eventData) {
      console.error('Invalid webhook: missing data field');
      return createSuccessResponse(null, 'Webhook received');
    }

    const eventType = eventData.attributes?.type;

    console.log('Webhook event received:', {
      eventId: eventData.id,
      eventType: eventType,
      hasNestedData: !!eventData.attributes?.data
    });

    if (!eventType) {
      console.error('Cannot determine event type from webhook payload');
      return createSuccessResponse(null, 'Webhook received');
    }

    // Handle payment events
    if (eventType === 'link.payment.paid' || eventType === 'payment.paid') {
      await handlePaymentPaid(eventData);
    } else if (eventType === 'payment.failed') {
      console.log('Payment failed event received:', eventData.id);
      // TODO: Handle payment failure if needed
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
 *
 * PayMongo webhook structure:
 * {
 *   data: {
 *     id: "evt_...",
 *     type: "event",
 *     attributes: {
 *       type: "link.payment.paid",
 *       data: {
 *         id: "pay_...",
 *         type: "payment",
 *         attributes: {
 *           amount: 39900,
 *           metadata: { userId, referenceNumber },
 *           payment_method_used: "gcash",
 *           ...
 *         }
 *       }
 *     }
 *   }
 * }
 */
async function handlePaymentPaid(eventData: any) {
  try {
    // Extract payment data from event
    const paymentData = eventData.attributes?.data;

    if (!paymentData) {
      console.error('Invalid event structure: missing payment data', {
        eventId: eventData.id,
        hasAttributes: !!eventData.attributes
      });
      return;
    }

    const paymentAttributes = paymentData.attributes;

    if (!paymentAttributes) {
      console.error('Invalid payment data: missing attributes', {
        paymentId: paymentData.id,
        paymentType: paymentData.type
      });
      return;
    }

    // Extract payment details
    const metadata = paymentAttributes.metadata || {};
    const userId = metadata.userId;
    const referenceNumber = metadata.referenceNumber || paymentAttributes.reference_number;
    const amount = paymentAttributes.amount || 0;
    const paymentMethodUsed = paymentAttributes.source?.type || paymentAttributes.payment_method_used || 'unknown';
    const paymentId = paymentData.id;
    const status = paymentAttributes.status;

    console.log('Processing payment:', {
      paymentId,
      userId,
      referenceNumber,
      amount,
      status,
      paymentMethodUsed,
      metadata
    });

    if (!userId) {
      console.error('Cannot process payment: userId not found in metadata', {
        paymentId,
        metadata,
        allAttributes: paymentAttributes
      });
      return;
    }

    if (status !== 'paid') {
      console.warn('Payment status is not "paid":', status);
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
          providerPaymentId: paymentId,
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
          transactionId: paymentId,
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
          transactionId: paymentId,
          status: 'active',
          expiresAt: null,
          referenceNumber,
          paymentProvider: 'paymongo',
        },
      });

      // 3. Update user premium status - THIS IS THE CRITICAL PART
      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true, // ✅ Setting isPremium to TRUE
          premiumExpiry: null, // No expiry for season pass
        },
      });

      console.log('✅ Payment processed successfully for user:', userId);
      console.log('✅ User isPremium set to TRUE');
      console.log('✅ Payment ID:', paymentId);
      console.log('✅ Reference Number:', referenceNumber);
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}
