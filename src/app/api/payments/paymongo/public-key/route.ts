import { NextRequest } from 'next/server';
import { config } from '@/server/config/env';
import { createSuccessResponse } from '@/server/utils/nextResponse';
import { rateLimiters } from '@/server/middlewares/rateLimit';

async function handler(_request: NextRequest) {
  return createSuccessResponse(
    { publicKey: config.paymongo.publicKey },
    'Public key retrieved successfully'
  );
}

export const GET = rateLimiters.general(handler);
