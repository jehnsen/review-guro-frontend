/**
 * POST /api/webhooks/paymongo
 * Handle PayMongo webhook events (payment notifications)
 * This is the endpoint configured in PayMongo dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse } from '@/server/utils/nextResponse';
import { prisma } from '@/server/config/database';
import { paymongoService } from '@/server/services/paymongo.service';
import { auditService } from '@/server/services/audit.service';
import { config } from '@/server/config/env';

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Verify webhook signature before processing
    const signature = request.headers.get('paymongo-signature');
    const webhookSecret = config.paymongo.webhookSecret;

    // Get raw body for signature verification
    const rawBody = await request.text();

    // Signature verification is mandatory in production
    if (!webhookSecret) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Webhook rejected: PAYMONGO_WEBHOOK_SECRET is not configured');
        return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
      }
      console.warn('[DEV] Webhook secret not set — skipping signature verification');
    } else {
      if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
      }
      const isValid = paymongoService.verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const body = JSON.parse(rawBody);

    const eventData = body.data;
    if (!eventData) {
      console.error('[Webhook] Missing data field in payload');
      return createSuccessResponse(null, 'Webhook received');
    }

    const eventType = eventData.attributes?.type;
    if (!eventType) {
      console.error('[Webhook] Cannot determine event type');
      return createSuccessResponse(null, 'Webhook received');
    }

    if (eventType === 'checkout_session.payment.paid') {
      await handleCheckoutSessionPaid(eventData);
    } else if (eventType === 'link.payment.paid' || eventType === 'payment.paid') {
      await handlePaymentPaid(eventData);
    } else if (eventType === 'payment.failed') {
      console.error('[Webhook] Payment failed:', eventData.id);
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
 * Extract userId from remarks field
 * Format: "Season Pass for User {userId}"
 */
function extractUserIdFromRemarks(remarks: string | undefined): string | undefined {
  if (!remarks) return undefined;
  const match = remarks.match(/Season Pass for User ([a-f0-9-]+)/i);
  return match ? match[1] : undefined;
}

/**
 * Handle checkout_session.payment.paid events (Checkout Sessions API)
 * This is the preferred method as it properly supports redirects
 *
 * PayMongo Checkout Session webhook structure:
 * {
 *   data: {
 *     id: "evt_...",
 *     type: "event",
 *     attributes: {
 *       type: "checkout_session.payment.paid",
 *       data: {
 *         id: "cs_...",
 *         type: "checkout_session",
 *         attributes: {
 *           metadata: { userId, referenceNumber, productType },
 *           payment_intent: { ... },
 *           payments: [{ id: "pay_...", ... }],
 *           ...
 *         }
 *       }
 *     }
 *   }
 * }
 */
async function handleCheckoutSessionPaid(eventData: any) {
  try {
    const sessionData = eventData.attributes?.data;

    if (!sessionData) {
      console.error('Invalid checkout session event: missing data', {
        eventId: eventData.id
      });
      return;
    }

    const sessionAttributes = sessionData.attributes;

    if (!sessionAttributes) {
      console.error('Invalid checkout session: missing attributes', {
        sessionId: sessionData.id
      });
      return;
    }

    // Extract from metadata - Checkout Sessions properly preserve metadata!
    const metadata = sessionAttributes.metadata || {};
    const userId = metadata.userId;
    const referenceNumber = metadata.referenceNumber || sessionAttributes.reference_number;

    // Get payment details from the payments array or payment_intent
    const payments = sessionAttributes.payments || [];
    const firstPayment = payments[0];
    const paymentId = firstPayment?.id || sessionData.id;
    const amount = sessionAttributes.line_items?.[0]?.amount || 39900; // Default to season pass price
    const paymentMethodUsed = firstPayment?.attributes?.source?.type || 'checkout_session';

    if (process.env.NODE_ENV === 'development') {
      console.log('[Webhook/dev] Processing checkout session:', { sessionId: sessionData.id, userId });
    }

    if (!userId) {
      console.error('[Webhook] userId not found in checkout session metadata:', sessionData.id);
      return;
    }

    // Create payment record and update user premium status
    await prisma.$transaction(async (tx) => {
      // 1. Create payment record
      await tx.payment.create({
        data: {
          userId,
          amount: amount / 100,
          currency: 'PHP',
          provider: 'paymongo',
          providerPaymentId: paymentId,
          status: 'paid',
          description: 'Season Pass Purchase',
          metadata: {
            referenceNumber,
            paymentMethodUsed,
            checkoutSessionId: sessionData.id,
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
          expiresAt: null,
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

      // 3. Update user premium status
      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumExpiry: null,
        },
      });

      console.log('[Webhook] Checkout session payment processed:', { userId, sessionId: sessionData.id });
      auditService.log({ userId, action: 'payment.activated', resource: 'subscription', metadata: { paymentId, referenceNumber } });
    });
  } catch (error) {
    console.error('Error processing checkout session payment:', error);
    throw error;
  }
}

/**
 * Handle payment.paid or link.payment.paid events
 *
 * PayMongo webhook structures vary by event type:
 *
 * For link.payment.paid (payment links):
 * {
 *   data: {
 *     id: "evt_...",
 *     type: "event",
 *     attributes: {
 *       type: "link.payment.paid",
 *       data: {
 *         id: "link_...",
 *         type: "link",
 *         attributes: {
 *           amount: 39900,
 *           remarks: "Season Pass for User {userId}",
 *           payments: [{ data: { id: "pay_...", attributes: {...} } }]
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * For payment.paid (direct payments):
 * {
 *   data: {
 *     id: "evt_...",
 *     type: "event",
 *     attributes: {
 *       type: "payment.paid",
 *       data: {
 *         id: "pay_...",
 *         type: "payment",
 *         attributes: {
 *           amount: 39900,
 *           metadata: { userId, referenceNumber },
 *           ...
 *         }
 *       }
 *     }
 *   }
 * }
 */
async function handlePaymentPaid(eventData: any) {
  try {
    // Extract data from event
    const nestedData = eventData.attributes?.data;

    if (!nestedData) {
      console.error('Invalid event structure: missing nested data', {
        eventId: eventData.id,
        hasAttributes: !!eventData.attributes
      });
      return;
    }

    const nestedAttributes = nestedData.attributes;

    if (!nestedAttributes) {
      console.error('Invalid data: missing attributes', {
        dataId: nestedData.id,
        dataType: nestedData.type
      });
      return;
    }

    // Determine if this is a link event or direct payment event
    const isLinkEvent = nestedData.type === 'link';

    let userId: string | undefined;
    let referenceNumber: string | undefined;
    let amount: number;
    let paymentMethodUsed: string;
    let paymentId: string;
    let status: string;

    if (isLinkEvent) {
      // For link.payment.paid events, extract from link attributes and nested payment
      const linkAttributes = nestedAttributes;
      const paymentArray = linkAttributes.payments || [];
      const firstPayment = paymentArray[0]?.data;
      const paymentAttrs = firstPayment?.attributes || {};

      userId = linkAttributes.metadata?.userId
        || extractUserIdFromRemarks(linkAttributes.remarks)
        || paymentAttrs.metadata?.userId;

      referenceNumber = linkAttributes.reference_number || paymentAttrs.external_reference_number;
      amount = linkAttributes.amount || 0;
      status = linkAttributes.status;
      paymentMethodUsed = paymentAttrs.source?.type || 'unknown';
      paymentId = firstPayment?.id || nestedData.id;

      if (process.env.NODE_ENV === 'development') {
        console.log('[Webhook/dev] Processing link payment:', { linkId: nestedData.id, userId });
      }
    } else {
      // For payment.paid events, extract directly from payment attributes
      const metadata = nestedAttributes.metadata || {};

      // Check if this payment originated from a link (has pm_reference_number in metadata)
      // If so, skip processing here - the link.payment.paid event will handle it with full user info
      if (metadata.pm_reference_number && nestedAttributes.origin === 'links') {
        console.log('Skipping payment.paid event for link payment - will be handled by link.payment.paid', {
          paymentId: nestedData.id,
          pmReferenceNumber: metadata.pm_reference_number
        });
        return;
      }

      userId = metadata.userId;
      referenceNumber = metadata.referenceNumber || nestedAttributes.reference_number || nestedAttributes.external_reference_number;
      amount = nestedAttributes.amount || 0;
      paymentMethodUsed = nestedAttributes.source?.type || nestedAttributes.payment_method_used || 'unknown';
      paymentId = nestedData.id;
      status = nestedAttributes.status;

      if (process.env.NODE_ENV === 'development') {
        console.log('[Webhook/dev] Processing direct payment:', { paymentId, userId });
      }
    }

    if (!userId) {
      console.error('[Webhook] userId not found in payment event:', { paymentId, isLinkEvent });
      return;
    }

    if (status !== 'paid') {
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

      console.log('[Webhook] Payment processed:', { userId, paymentId });
      auditService.log({ userId, action: 'payment.activated', resource: 'subscription', metadata: { paymentId, referenceNumber } });
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}
