import { NextRequest } from 'next/server';
import { z } from 'zod';
import { paymongoService } from '@/server/services/paymongo.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

const referenceSchema = z.string().min(1).max(100).regex(/^[A-Za-z0-9_\-]+$/);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ referenceNumber: string }> }
) {
  try {
    const { referenceNumber } = await params;

    const validated = referenceSchema.safeParse(referenceNumber);
    if (!validated.success) {
      return createErrorResponse(new Error('Invalid reference number'), 400);
    }

    const status = await paymongoService.getPayment(validated.data);
    return createSuccessResponse(status, 'Payment status retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}
