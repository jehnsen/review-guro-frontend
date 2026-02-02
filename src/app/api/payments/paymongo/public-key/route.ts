/**
 * GET /api/payments/paymongo/public-key
 * Get PayMongo public key for frontend use
 */

import { config } from '@/server/config/env';
import { createSuccessResponse } from '@/server/utils/nextResponse';

export async function GET() {
  return createSuccessResponse(
    {
      publicKey: config.paymongo.publicKey,
    },
    'Public key retrieved successfully'
  );
}
