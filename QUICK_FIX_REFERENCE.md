# Quick Fix Reference - Vercel 500 Error

## TL;DR - What Was Fixed

✅ Prisma Client now auto-generates during build
✅ Correct binary targets for Vercel (RHEL)
✅ Optional services made truly optional (Redis, PayMongo)
✅ Better error logging for debugging
✅ Database connection configured for serverless

---

## Files Modified (8 files)

| File | Change |
|------|--------|
| [package.json](package.json#L7) | Added `postinstall` and updated `build` script |
| [prisma/schema.prisma](prisma/schema.prisma#L4-L6) | Added `binaryTargets = ["native", "rhel-openssl-3.0.x"]` |
| [src/server/config/env.ts](src/server/config/env.ts) | Made Redis, PayMongo, FRONTEND_URL optional |
| [src/server/config/database.ts](src/server/config/database.ts#L19-L23) | Added explicit datasource config |
| [src/server/utils/nextResponse.ts](src/server/utils/nextResponse.ts#L58-L64) | Added production error logging |
| [src/app/api/practice/submit/route.ts](src/app/api/practice/submit/route.ts#L32-L37) | Added detailed error logging |
| [src/server/services/cache.service.ts](src/server/services/cache.service.ts#L30-L35) | Made Redis optional with graceful degradation |
| [vercel.json](vercel.json) _(NEW)_ | Created Vercel config file |

---

## Vercel Environment Variables Needed

### ✅ Required
```bash
DATABASE_URL=postgresql://...?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://...
JWT_SECRET=minimum-32-characters-long
REFRESH_TOKEN_SECRET=minimum-32-characters-long
```

### ⚠️ Optional (but recommended)
```bash
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
PAYMONGO_SECRET_KEY=sk_...
PAYMONGO_PUBLIC_KEY=pk_...
```

---

## Quick Deploy Checklist

- [ ] Set required env vars in Vercel Dashboard
- [ ] Add `connection_limit=1` to DATABASE_URL
- [ ] Commit changes: `git add . && git commit -m "fix: vercel deployment"`
- [ ] Push to trigger deploy: `git push origin main`
- [ ] Monitor logs: `vercel logs --follow`
- [ ] Test endpoint after deployment

---

## Quick Test Commands

```bash
# Test Prisma generation locally
npm run prisma:generate

# Run validation script
./test-deployment-fix.sh

# Build locally to check for errors
npm run build

# Pull Vercel env vars and test
vercel env pull .env.production
NODE_ENV=production npm run dev
```

---

## If Still Failing

1. **Check Vercel Function Logs**
   - Dashboard → Deployments → [Latest] → Functions → Click failing function

2. **Look for in build logs:**
   ```
   ✓ Prisma schema loaded
   ✓ Generated Prisma Client
   ```

3. **Common issues:**
   - Missing environment variables
   - Database connection string missing `pgbouncer=true`
   - Prisma Client not generated (check build logs)

4. **Get detailed errors:**
   - Check Vercel function logs for the actual error message
   - Now logged with full stack trace in production

---

## Verification

After deployment, the endpoint should return:

**Success:**
```json
{
  "success": true,
  "message": "Answer submitted successfully",
  "data": {
    "isCorrect": true,
    "correctOptionId": "...",
    "selectedOptionId": "...",
    "explanation": "...",
    "pointsEarned": 2
  }
}
```

**Error (with details in logs):**
```json
{
  "success": false,
  "message": "An unexpected error occurred",
  "data": null
}
```
But now the actual error will be in Vercel Function logs!

---

## Documentation

- 📄 [FIXES_SUMMARY.md](FIXES_SUMMARY.md) - Complete list of changes
- 📄 [VERCEL_DEPLOYMENT_FIX.md](VERCEL_DEPLOYMENT_FIX.md) - Detailed deployment guide
- 🧪 [test-deployment-fix.sh](test-deployment-fix.sh) - Validation script

---

**Status:** ✅ Ready to deploy
**Date:** 2026-02-02
**Issue:** 500 error on `/api/practice/submit`
