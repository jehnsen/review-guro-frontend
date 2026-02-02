# Vercel 500 Error - Fixes Applied

## Problem
`POST /api/practice/submit` returning 500 Internal Server Error on Vercel deployment.

## Root Causes Identified

1. **Prisma Client not generated during build** - Vercel wasn't generating the Prisma Client
2. **Wrong binary targets** - Prisma needs RHEL binary for Vercel's serverless environment
3. **Required environment variables** - Some optional services were marked as required
4. **No error logging** - Production errors were hidden, making debugging difficult

## Files Changed

### 1. [package.json](package.json)
**Added:**
- `postinstall` script to auto-generate Prisma Client
- Prisma generate in build command

```diff
"scripts": {
-   "build": "next build",
+   "build": "prisma generate && next build",
+   "postinstall": "prisma generate",
}
```

### 2. [prisma/schema.prisma](prisma/schema.prisma)
**Added binary targets for Vercel:**

```diff
generator client {
-  provider = "prisma-client-js"
+  provider      = "prisma-client-js"
+  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}
```

### 3. [src/server/config/env.ts](src/server/config/env.ts)
**Made optional services optional:**
- `REDIS_URL` - now optional (app works without Redis)
- `PAYMONGO_SECRET_KEY` - optional
- `PAYMONGO_PUBLIC_KEY` - optional
- `FRONTEND_URL` - optional
- Added `REFRESH_TOKEN_SECRET` and `REFRESH_TOKEN_EXPIRES_IN`

### 4. [src/server/config/database.ts](src/server/config/database.ts)
**Added explicit datasource configuration:**

```typescript
datasources: {
  db: {
    url: process.env.DATABASE_URL,
  },
}
```

### 5. [src/server/utils/nextResponse.ts](src/server/utils/nextResponse.ts)
**Added production error logging:**

```typescript
console.error('Unexpected API error:', {
  message: error.message,
  stack: error.stack,
  name: error.name,
});
```

### 6. [src/app/api/practice/submit/route.ts](src/app/api/practice/submit/route.ts)
**Added detailed error logging for debugging:**

```typescript
console.error('Submit answer error:', {
  userId: request.user?.id,
  error: error instanceof Error ? error.message : 'Unknown error',
  stack: error instanceof Error ? error.stack : undefined,
});
```

### 7. [src/server/services/cache.service.ts](src/server/services/cache.service.ts)
**Made Redis optional:**

```typescript
if (!config.redis.url) {
  console.log('⚠️  Redis URL not configured - running without cache');
  return;
}
```

### 8. [vercel.json](vercel.json) (NEW)
**Created Vercel configuration:**

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Required Environment Variables for Vercel

### Minimum Required
```bash
DATABASE_URL=postgresql://...?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://...
JWT_SECRET=your-secret-min-32-chars
REFRESH_TOKEN_SECRET=your-refresh-secret-min-32-chars
NODE_ENV=production
```

### Optional (app will work without these)
```bash
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
PAYMONGO_SECRET_KEY=sk_...
PAYMONGO_PUBLIC_KEY=pk_...
FRONTEND_URL=https://...
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FREE_TIER_PRACTICE_LIMIT_PER_DAY=15
```

## Deployment Steps

### 1. Generate Prisma Client locally (verify it works)
```bash
npm run prisma:generate
```

### 2. Commit and push changes
```bash
git add .
git commit -m "fix: vercel deployment - prisma, env, and error logging"
git push origin main
```

### 3. Verify Vercel environment variables
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Ensure at minimum these are set:
- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`

### 4. Trigger redeployment
Vercel will automatically deploy on push, or manually trigger via dashboard.

### 5. Monitor deployment logs
```bash
# Using Vercel CLI
vercel logs --follow

# Or check in Vercel Dashboard → Deployments → [Latest] → Functions
```

### 6. Test the endpoint
After deployment:
```bash
# Test the practice submit endpoint
curl -X POST https://reviewguro.vercel.app/api/practice/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "questionId": "some-uuid",
    "selectedOptionId": "some-uuid",
    "timeSpentSeconds": 30
  }'
```

## What to Check if Still Failing

### 1. Check Vercel Function Logs
Go to: Vercel Dashboard → Deployments → [Latest] → Functions → Click on failing function

Look for:
- Prisma Client errors
- Database connection errors
- Missing environment variables
- Authentication errors

### 2. Verify Database Connection
Check that:
- `DATABASE_URL` has `pgbouncer=true&connection_limit=1`
- `DIRECT_URL` is set for migrations
- Your database accepts connections from Vercel

### 3. Test locally with production config
```bash
# Pull Vercel env vars
vercel env pull .env.production

# Test with production environment
NODE_ENV=production npm run dev
```

### 4. Check Prisma Client generation in build logs
Look for in Vercel build logs:
```
✓ Prisma schema loaded from prisma/schema.prisma
✓ Generated Prisma Client
```

## Expected Behavior After Fix

✅ `/api/practice/submit` returns 200 with successful response
✅ Detailed errors logged to Vercel Functions logs
✅ App works without Redis (gracefully degrades)
✅ App works without PayMongo keys (payment features disabled)
✅ Prisma Client auto-generates during deployment

## Rollback Plan

If issues persist:

```bash
# Rollback via Vercel CLI
vercel rollback

# Or use Vercel Dashboard → Deployments → [Previous Working] → Promote to Production
```

## Additional Resources

- [VERCEL_DEPLOYMENT_FIX.md](VERCEL_DEPLOYMENT_FIX.md) - Detailed deployment guide
- [Prisma in Serverless](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Date Fixed:** 2026-02-02
**Issue:** 500 Internal Server Error on `/api/practice/submit`
**Status:** ✅ Ready for deployment
