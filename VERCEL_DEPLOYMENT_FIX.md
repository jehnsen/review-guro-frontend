# Vercel Deployment Fix Guide

## Issues Fixed

The 500 Internal Server Error on `/api/practice/submit` was caused by:

1. **Missing Prisma Client generation** during Vercel build
2. **Incorrect binary targets** for Vercel's serverless environment (RHEL-based)
3. **Insufficient error logging** in production

## Changes Made

### 1. Updated [package.json](package.json)
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 2. Updated [prisma/schema.prisma](prisma/schema.prisma)
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}
```

### 3. Updated [src/server/config/database.ts](src/server/config/database.ts)
- Added explicit datasource configuration for better serverless compatibility

### 4. Updated Error Logging
- Added detailed error logging in [src/server/utils/nextResponse.ts](src/server/utils/nextResponse.ts)
- Added error logging in [src/app/api/practice/submit/route.ts](src/app/api/practice/submit/route.ts)

### 5. Created [vercel.json](vercel.json)
- Explicit build command configuration
- Environment variable placeholders

## Deployment Steps

### 1. Environment Variables in Vercel

Make sure these environment variables are set in your Vercel project:

**Required:**
```
DATABASE_URL=postgresql://user:password@host:port/database?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=production
```

**Optional:**
```
OPENAI_API_KEY=your-openai-key
PAYMONGO_SECRET_KEY=your-paymongo-secret
PAYMONGO_PUBLIC_KEY=your-paymongo-public-key
REDIS_URL=your-redis-url (optional)
```

### 2. Database Configuration

If using **Supabase** or **Neon** PostgreSQL:

- `DATABASE_URL` should use connection pooling (pgbouncer=true)
- `DIRECT_URL` should be the direct connection URL
- Add `connection_limit=1` to prevent serverless connection issues

Example:
```
# Supabase/Neon Pooled Connection (for Prisma queries)
DATABASE_URL=postgresql://user:pass@aws-0-region.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1

# Supabase/Neon Direct Connection (for migrations)
DIRECT_URL=postgresql://user:pass@aws-0-region.supabase.com:5432/postgres
```

### 3. Deploy to Vercel

#### Option A: Git Push (Recommended)
```bash
git add .
git commit -m "fix: vercel deployment prisma configuration"
git push origin main
```

Vercel will automatically detect the changes and redeploy.

#### Option B: Manual Deploy
```bash
vercel --prod
```

### 4. Run Database Migrations

After deployment, if you have new migrations:
```bash
# Using Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

Or use your database provider's console to run:
```sql
-- Run any pending migrations manually
```

### 5. Generate Prisma Client (if needed)
```bash
npm run prisma:generate
```

### 6. Test the Deployment

After deployment:

1. Go to your Vercel deployment URL
2. Sign in to your account
3. Try submitting a practice question answer
4. Check Vercel logs for any errors:
   ```bash
   vercel logs --follow
   ```

## Verifying the Fix

### Check Vercel Build Logs

Look for these lines in the build output:
```
✓ Prisma schema loaded from prisma/schema.prisma
✓ Generated Prisma Client to ./node_modules/@prisma/client
```

### Check Runtime Logs

If errors still occur, check Vercel Function logs:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Go to "Functions" tab
4. Click on any failing function to see logs

Look for:
- Database connection errors
- Prisma Client errors
- Missing environment variables

## Common Issues & Solutions

### Issue: "PrismaClient is unable to be run in the browser"

**Solution:** Make sure you're not importing Prisma in client components. Use `'use server'` directive or keep database calls in API routes.

### Issue: "Can't reach database server"

**Solution:**
- Check `DATABASE_URL` is correctly set in Vercel
- Verify your database accepts connections from Vercel's IP ranges
- Use connection pooling (pgbouncer=true)

### Issue: "Too many connections"

**Solution:**
- Add `connection_limit=1` to your DATABASE_URL
- Use `DIRECT_URL` for migrations
- Consider using a connection pooler (PgBouncer, Supabase Pooler, Neon, etc.)

### Issue: Still getting 500 errors

**Solution:**
1. Check Vercel Function logs for the actual error
2. Verify all environment variables are set
3. Run the API endpoint locally with production env vars:
   ```bash
   vercel env pull .env.local
   npm run dev
   ```
4. Check if Redis is required but not configured

## Testing Locally with Production Config

```bash
# Pull production environment variables
vercel env pull .env.production

# Test locally
NODE_ENV=production npm run dev

# Test the exact endpoint
curl -X POST http://localhost:3000/api/practice/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"questionId":"uuid","selectedOptionId":"uuid","timeSpentSeconds":30}'
```

## Rollback Plan

If issues persist, you can rollback:

```bash
# Revert to previous deployment
vercel rollback
```

## Additional Resources

- [Prisma in Serverless Environments](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Connection Pooling with Prisma](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)

## Support

If the issue persists after following this guide:

1. Check the Vercel Function logs
2. Check your database logs
3. Verify all environment variables are correctly set
4. Ensure your database accepts connections from Vercel

---

**Last Updated**: 2026-02-02
