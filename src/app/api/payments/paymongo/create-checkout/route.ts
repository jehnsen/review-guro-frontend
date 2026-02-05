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
      // Include reference number in success URL for verification
      // Note: We'll replace TEMP_REF after getting the actual reference from PayMongo
      successUrl: validatedData.successUrl || `${config.frontend.url}/checkout/success`,
      failedUrl: validatedData.cancelUrl || `${config.frontend.url}/checkout/cancel`,
    });

    // Build success URL with the actual reference number
    const successUrlWithRef = validatedData.successUrl
      ? `${validatedData.successUrl}?ref=${encodeURIComponent(result.referenceNumber)}`
      : `${config.frontend.url}/checkout/success?ref=${encodeURIComponent(result.referenceNumber)}`;

    return createSuccessResponse(
      {
        checkoutUrl: result.checkoutUrl,
        referenceNumber: result.referenceNumber,
        successUrl: successUrlWithRef,
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
