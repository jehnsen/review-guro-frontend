/**
 * POST /api/payments/paymongo/create-checkout
 * Create PayMongo checkout session for Season Pass purchase
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { paymongoService } from '@/server/services/paymongo.service';
import { config } from '@/server/config/env';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const createCheckoutSchema = z.object({
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = createCheckoutSchema.parse(body);

    // Create payment link
    const result = await paymongoService.createPaymentLink({
      userId,
      amount: config.payment.seasonPassPrice,
      description: 'ReviewGuro Season Pass',
      successUrl: validatedData.successUrl || `${config.frontend.url}/payment/success`,
      failedUrl: validatedData.cancelUrl || `${config.frontend.url}/payment/failed`,
    });

    return createSuccessResponse(
      {
        checkoutUrl: result.checkoutUrl,
        referenceNumber: result.referenceNumber,
      },
      'Checkout session created successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    return createErrorResponse(error as Error);
  }
}

export const POST = withAuth(handler);
