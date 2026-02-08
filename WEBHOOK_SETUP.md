# PayMongo Webhook Setup Guide

## 🚨 CRITICAL: This Must Be Completed Before Production Deployment

The webhook signature verification fix requires the `PAYMONGO_WEBHOOK_SECRET` environment variable to be set in production. Without it, your webhook endpoint is vulnerable to forged requests.

## Quick Setup (5 minutes)

### Step 1: Get Your Webhook Secret from PayMongo

1. Log in to [PayMongo Dashboard](https://dashboard.paymongo.com/)
2. Navigate to **Developers** → **Webhooks**
3. Find your webhook for `checkout_session.payment.paid` events
4. Copy the **Webhook Signing Secret** (format: `whsec_...`)

**If you don't have a webhook yet:**

1. Click **Create Webhook**
2. Set the URL to: `https://your-domain.com/api/webhooks/paymongo`
3. Select events to listen for:
   - ✅ `checkout_session.payment.paid`
   - ✅ `link.payment.paid` (if using payment links)
   - ✅ `payment.paid`
   - ✅ `payment.failed`
4. Save and copy the webhook secret

### Step 2: Add to Your Environment

**For Local Development (.env):**
```bash
PAYMONGO_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

**For Production (Vercel):**
```bash
# Via Vercel CLI
vercel env add PAYMONGO_WEBHOOK_SECRET

# Or via Vercel Dashboard:
# 1. Go to Project Settings → Environment Variables
# 2. Add: PAYMONGO_WEBHOOK_SECRET = whsec_...
# 3. Select: Production
# 4. Save
```

**For Production (Other platforms):**

Add to your deployment platform's environment variables:
- **Heroku**: `heroku config:set PAYMONGO_WEBHOOK_SECRET=whsec_...`
- **Railway**: Add in Variables section
- **AWS/Docker**: Add to environment configuration

### Step 3: Verify Setup

1. Deploy your updated code
2. Trigger a test webhook from PayMongo dashboard
3. Check your logs for:
   ```
   ✅ Webhook signature verified successfully
   ```

If you see this instead, **the secret is not configured**:
```
⚠️ WARNING: Webhook secret not configured - signature verification disabled
```

## Testing

### Test from PayMongo Dashboard (Recommended)

1. Go to **Developers** → **Webhooks**
2. Click your webhook
3. Go to **Events** tab
4. Click **Send test event**
5. Check your application logs

### Manual Testing with curl

**Valid request (will fail without real signature):**
```bash
# This will be rejected because signature is invalid
curl -X POST https://your-domain.com/api/webhooks/paymongo \
  -H "Content-Type: application/json" \
  -H "paymongo-signature: invalid_signature" \
  -d '{"data": {"attributes": {"type": "checkout_session.payment.paid"}}}'

# Expected: 401 Unauthorized
```

## Troubleshooting

### ❌ "Missing signature" error

**Cause**: PayMongo is not sending the `paymongo-signature` header

**Solutions**:
1. Verify your webhook is created in PayMongo dashboard
2. Check webhook events include `checkout_session.payment.paid`
3. Ensure webhook URL is correct

### ❌ "Invalid signature" error

**Cause**: Webhook secret mismatch

**Solutions**:
1. Verify `PAYMONGO_WEBHOOK_SECRET` matches the secret in PayMongo dashboard
2. Check for extra spaces or newlines in the secret
3. Regenerate webhook secret in PayMongo and update environment variable
4. Redeploy after updating environment variable

### ⚠️ "Webhook secret not configured" warning

**Cause**: `PAYMONGO_WEBHOOK_SECRET` environment variable is not set

**Solutions**:
1. Add the variable to your `.env` file (local)
2. Add the variable to your deployment platform (production)
3. Redeploy/restart your application

## Security Checklist

Before deploying to production:

- [ ] `PAYMONGO_WEBHOOK_SECRET` is set in production environment
- [ ] Webhook endpoint URL is HTTPS (not HTTP)
- [ ] Webhook secret is kept secure (not in git, not in client code)
- [ ] Test webhook sends successfully and signature validates
- [ ] Old suspicious subscriptions have been audited
- [ ] Monitoring/alerting is set up for webhook failures

## What Happens in Each Environment

### Production (with secret configured)
```
✅ Signature verification: ENABLED
✅ Forged webhooks: REJECTED (401)
✅ Security: PROTECTED
```

### Development (without secret)
```
⚠️ Signature verification: DISABLED
⚠️ Forged webhooks: ACCEPTED (with warning)
⚠️ Security: VULNERABLE (OK for local testing only)
```

### Production (without secret) - DO NOT DO THIS
```
❌ Signature verification: DISABLED
❌ Forged webhooks: ACCEPTED
❌ Security: CRITICAL VULNERABILITY
❌ Anyone can grant themselves premium access
```

## PayMongo Webhook Documentation

- [Webhooks Overview](https://developers.paymongo.com/docs/webhooks)
- [Webhook Signatures](https://developers.paymongo.com/docs/webhooks#webhook-signatures)
- [Checkout Session Events](https://developers.paymongo.com/docs/checkout#checkout-session-events)

## Need Help?

If you encounter issues:

1. Check PayMongo dashboard webhook event logs
2. Check your application logs for detailed error messages
3. Verify environment variables are correctly set
4. Test with PayMongo's test event feature
5. Contact PayMongo support if webhook secret is not appearing

---

**Last Updated**: 2026-02-07
**Related Fix**: SECURITY_FIX_WEBHOOK_SIGNATURE.md
