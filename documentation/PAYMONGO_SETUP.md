# PayMongo Integration Setup Guide

## Overview

This application uses PayMongo for payment processing. After a successful payment, the user's premium status is automatically activated via webhooks.

## How It Works

### Payment Flow

1. User clicks "Upgrade to Season Pass"
2. Backend creates a PayMongo payment link via `POST /api/payments/paymongo/create-checkout`
3. User is redirected to PayMongo checkout page
4. User completes payment (GCash, Maya, Card, etc.)
5. PayMongo redirects user to success page: `/checkout/success?ref=REFERENCE_NUMBER`
6. **PayMongo sends webhook to your server**: `POST /api/payments/paymongo/webhook`
7. Webhook handler:
   - Creates `Payment` record in database
   - Creates/updates `Subscription` record
   - Updates `User.isPremium = true`
8. Success page verifies premium status and shows confirmation

### Fallback Mechanism

If the webhook is delayed or fails:
- The success page calls `POST /api/payments/paymongo/verify` with the reference number
- This endpoint manually processes the payment and activates premium
- Ensures users get their premium access even if webhooks have issues

## PayMongo Dashboard Setup

### 1. Get API Keys

1. Log in to [PayMongo Dashboard](https://dashboard.paymongo.com)
2. Go to **Developers** → **API Keys**
3. Copy your **Secret Key** and **Public Key**
4. Add to `.env`:
   ```env
   PAYMONGO_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   PAYMONGO_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
   ```

### 2. Configure Webhooks

1. Go to **Developers** → **Webhooks**
2. Click **Create Webhook**
3. Set the following:

   **Webhook URL:**
   ```
   https://your-domain.com/api/payments/paymongo/webhook
   ```

   **Events to listen for:**
   - ✅ `link.payment.paid` - When a payment link is paid
   - ✅ `payment.paid` - When a payment is completed

   **Description:**
   ```
   ReviewGuro Season Pass Payment Webhook
   ```

4. Click **Create**
5. PayMongo will send a test event to verify your endpoint

### 3. Verify Webhook is Working

After creating the webhook:

1. Make a test payment using PayMongo test cards
2. Check your server logs for webhook events:
   ```
   PayMongo webhook received: { type: 'link.payment.paid', ... }
   Processing payment: { userId: '...', referenceNumber: '...', ... }
   Payment processed successfully for user: [userId]
   ```

3. Check the database:
   ```sql
   -- Check payment record was created
   SELECT * FROM payment_verifications WHERE provider = 'paymongo' ORDER BY created_at DESC LIMIT 1;

   -- Check subscription was created
   SELECT * FROM subscriptions WHERE payment_provider = 'paymongo' ORDER BY created_at DESC LIMIT 1;

   -- Check user premium status
   SELECT id, email, is_premium, premium_expiry FROM users WHERE is_premium = true;
   ```

## Testing

### Test Cards (PayMongo Sandbox)

Use these test cards in development:

**Successful Payment:**
```
Card Number: 4343 4343 4343 4345
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

**Failed Payment:**
```
Card Number: 4571 7360 0000 0005
Expiry: Any future date
CVC: Any 3 digits
```

**GCash Test:**
- Use test phone numbers provided by PayMongo
- Or use the sandbox GCash credentials from PayMongo docs

### Testing the Full Flow

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Create a test payment link:**
   - Log in to your app
   - Click "Upgrade to Season Pass"
   - You'll be redirected to PayMongo checkout

3. **Complete test payment:**
   - Use a test card number above
   - Complete the payment

4. **Verify webhook received:**
   - Check terminal logs for webhook event
   - Should see: `Payment processed successfully for user: [userId]`

5. **Check user status:**
   - Refresh the page or check dashboard
   - "Upgrade" badge should be gone
   - `is_premium` in database should be `TRUE`

## Webhook Security (Optional)

For production, you should verify webhook signatures:

1. PayMongo includes a signature header: `paymongo-signature`
2. Update the webhook handler to verify signatures:

```typescript
// In webhook route handler
const signature = request.headers.get('paymongo-signature');
const rawBody = await request.text();

if (signature) {
  const isValid = paymongoService.verifyWebhookSignature(
    rawBody,
    signature,
    config.paymongo.webhookSecret
  );

  if (!isValid) {
    return createErrorResponse(new Error('Invalid signature'), 401);
  }
}

const body = JSON.parse(rawBody);
// ... continue processing
```

## Troubleshooting

### User Paid But Still Not Premium

**Check webhooks in PayMongo Dashboard:**
1. Go to **Developers** → **Webhooks**
2. Click on your webhook
3. Check **Recent Deliveries** tab
4. Look for failed deliveries

**Common issues:**
- ❌ Webhook URL is incorrect
- ❌ Server is not accessible (localhost in production)
- ❌ Server returned an error (check logs)
- ❌ Webhook event type not handled

**Manual fix:**
1. Get the reference number from the payment
2. Call the manual verification endpoint:
   ```bash
   curl -X POST https://your-domain.com/api/payments/paymongo/verify \
     -H "Authorization: Bearer USER_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"referenceNumber": "RG-1234567890"}'
   ```

### Webhook Not Firing

**For local development:**
- Use [ngrok](https://ngrok.com/) to expose localhost:
  ```bash
  ngrok http 3000
  ```
- Use the ngrok URL in PayMongo webhook settings:
  ```
  https://abc123.ngrok.io/api/payments/paymongo/webhook
  ```

**For production:**
- Make sure your server is publicly accessible
- Webhook URL must be HTTPS (not HTTP)
- No authentication required on the webhook endpoint

### Database Connection Issues

If you see database errors in webhook logs:
- Check `DATABASE_URL` is correct
- Verify database is accessible from your server
- Check if Prisma client is generated: `npm run prisma:generate`

## Environment Variables

Required for PayMongo integration:

```env
# PayMongo API Keys
PAYMONGO_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYMONGO_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

# Payment Configuration
PAYMENT_CURRENCY=PHP
PAYMENT_SEASON_PASS_PRICE=399

# Frontend URL (for redirects)
FRONTEND_URL=https://your-domain.com
```

## API Endpoints Reference

### Create Checkout Session
```
POST /api/payments/paymongo/create-checkout
Authorization: Bearer {token}

Request:
{
  "successUrl": "https://your-domain.com/checkout/success",
  "cancelUrl": "https://your-domain.com/checkout/cancel"
}

Response:
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.paymongo.com/...",
    "referenceNumber": "RG-1234567890"
  }
}
```

### Webhook Handler
```
POST /api/payments/paymongo/webhook
Content-Type: application/json

Request (from PayMongo):
{
  "data": {
    "type": "link.payment.paid",
    "attributes": {
      "data": {
        "id": "pay_xxxxx",
        "attributes": {
          "amount": 39900,
          "payment_method_used": "gcash",
          "metadata": {
            "userId": "user-uuid",
            "referenceNumber": "RG-1234567890"
          }
        }
      }
    }
  }
}

Response:
{
  "success": true,
  "message": "Webhook processed"
}
```

### Manual Verification (Fallback)
```
POST /api/payments/paymongo/verify
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "referenceNumber": "RG-1234567890"
}

Response:
{
  "success": true,
  "data": {
    "isPremium": true,
    "activated": true
  }
}
```

## Support

For PayMongo-specific issues, refer to:
- [PayMongo Documentation](https://developers.paymongo.com/docs)
- [PayMongo Support](https://paymongo.com/support)
