# Security Fix: Refresh Token Rotation Flow

## Vulnerability Description

**Issue**: JWT access tokens expire in 15 minutes (`JWT_EXPIRES_IN: '15m'`), but there was no refresh token mechanism implemented. This caused users to be silently logged out every 15 minutes.

**Problems**:
1. **Poor User Experience**: Users forced to re-login every 15 minutes
2. **Security Risk (Workaround)**: Likely temptation to set long-lived access tokens (e.g., 7 days), which is a major security risk if tokens are compromised
3. **Missing Infrastructure**: While the database had a `UserSession` table and config had `REFRESH_TOKEN_SECRET`, no actual refresh logic was implemented
4. **Stub Methods**: `getSessions()` and `signout()` returned mock data instead of managing real sessions

**Severity**: High
**Impact**: Security vs. usability tradeoff, likely leading to insecure workarounds

## Solution Implemented

Implemented a complete **refresh token rotation flow** following OWASP best practices:

### Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. Login/Register
       ↓
┌─────────────────────────────┐
│  POST /api/auth/login       │
│  - Validates credentials    │
│  - Generates access token   │  (15 min expiry)
│  - Generates refresh token  │  (7 day expiry)
│  - Stores session in DB     │
└──────┬──────────────────────┘
       │
       │ 2. Set httpOnly Cookies
       ↓
┌─────────────────────────────┐
│  Cookies (httpOnly)         │
│  - auth_token (15 min)      │
│  - refresh_token (7 days)   │
└──────┬──────────────────────┘
       │
       │ 3. Auto-refresh every 14 minutes
       ↓
┌─────────────────────────────┐
│  POST /api/auth/refresh     │
│  - Validates refresh token  │
│  - Rotates both tokens      │  (Security: old token invalidated)
│  - Updates session in DB    │
└──────┬──────────────────────┘
       │
       │ 4. Logout
       ↓
┌─────────────────────────────┐
│  POST /api/auth/logout      │
│  - Revokes refresh token    │
│  - Deletes session from DB  │
│  - Clears cookies           │
└─────────────────────────────┘
```

## Changes Made

### 1. Database Session Repository

**Created**: [src/server/repositories/session.repository.ts](src/server/repositories/session.repository.ts)

Manages refresh token storage with methods for:
- `create()` - Store new session with refresh token
- `findByRefreshToken()` - Validate refresh tokens
- `updateRefreshToken()` - Token rotation (invalidate old, store new)
- `deleteByRefreshToken()` - Logout from current device
- `deleteAllByUserId()` - Logout from all devices
- `findAllByUserId()` - Get active sessions for user
- `deleteExpired()` - Cleanup expired sessions

**Schema Used** (already existed):
```prisma
model UserSession {
  id           String   @id @default(uuid())
  userId       String
  refreshToken String   @unique
  userAgent    String?
  ipAddress    String?
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}
```

### 2. Auth Service Enhancements

**Updated**: [src/server/services/auth.service.ts](src/server/services/auth.service.ts)

**New Methods**:

#### `generateRefreshToken()` (private)
- Uses `crypto.randomBytes(64)` for cryptographically secure tokens
- Returns 128-character hex string (512 bits of entropy)

#### `getRefreshTokenExpiry()` (private)
- Parses `REFRESH_TOKEN_EXPIRES_IN` (e.g., "7d" → 7 days)
- Returns Date object for expiry

#### `refreshAccessToken()` (public)
- Validates refresh token from database
- Checks expiration
- **Rotates tokens** (generates new access + refresh tokens)
- Updates session with new refresh token (old one invalidated)
- Returns new tokens

#### `getSessions()` (updated)
- Now queries database instead of returning mock data
- Returns active sessions with device info and expiry

#### `signout()` (updated)
- Revokes refresh token in database
- Deletes session record

#### `signoutAllDevices()` (new)
- Revokes all refresh tokens for user
- Useful for security incidents

#### `revokeSession()` (new)
- Revoke specific session by ID
- Allows users to logout from individual devices

**Updated Signatures**:
```typescript
// Added userAgent and ipAddress tracking
login(dto: LoginDTO, userAgent?: string, ipAddress?: string)
register(dto: RegisterDTO, userAgent?: string, ipAddress?: string)
```

### 3. API Endpoints

#### **Login** ([src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts))
- Extracts `user-agent` and `x-forwarded-for` headers
- Creates session in database
- Sets TWO httpOnly cookies:
  - `auth_token` - Short-lived (15 min), path: `/`
  - `refresh_token` - Long-lived (7 days), path: `/api/auth/refresh` (scoped!)

#### **Register** ([src/app/api/auth/register/route.ts](src/app/api/auth/register/route.ts))
- Same dual-cookie approach as login
- Tracks first session on registration

#### **Refresh** ([src/app/api/auth/refresh/route.ts](src/app/api/auth/refresh/route.ts)) - NEW
- Reads `refresh_token` from cookie
- Validates and rotates tokens
- Sets new `auth_token` and `refresh_token` cookies
- **Security**: Old refresh token is invalidated (one-time use)

#### **Logout** ([src/app/api/auth/logout/route.ts](src/app/api/auth/logout/route.ts))
- Reads `refresh_token` from cookie
- Revokes token in database (deletes session)
- Clears both cookies

#### **Sessions** ([src/app/api/auth/sessions/route.ts](src/app/api/auth/sessions/route.ts)) - NEW
- `GET /api/auth/sessions` - List all active sessions
- `DELETE /api/auth/sessions/[sessionId]` - Revoke specific session

### 4. Client-Side Auto-Refresh

**Updated**: [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)

**Auto-Refresh Logic**:
```typescript
// Refresh every 14 minutes (token expires in 15)
const REFRESH_INTERVAL = 14 * 60 * 1000;

useEffect(() => {
  if (!user) return;

  // Periodic refresh
  const interval = setInterval(refreshAccessToken, REFRESH_INTERVAL);

  // Refresh on window focus (user returns from being away)
  window.addEventListener('focus', refreshAccessToken);

  return () => {
    clearInterval(interval);
    window.removeEventListener('focus', refreshAccessToken);
  };
}, [user, refreshAccessToken]);
```

**`refreshAccessToken()` method**:
- Calls `POST /api/auth/refresh`
- Updates user state on success
- Logs out on failure (invalid/expired refresh token)

## Security Features

### 1. **Token Rotation** (OWASP Recommendation)
- Every refresh generates NEW access and refresh tokens
- Old refresh token is immediately invalidated
- Prevents replay attacks if token is stolen

### 2. **Refresh Token Scoping**
```typescript
// Refresh token only sent to refresh endpoint
path: '/api/auth/refresh'
```
- Limits exposure surface
- Access token goes to all `/api/*` routes

### 3. **httpOnly + Secure + SameSite**
```typescript
httpOnly: true,         // XSS protection
secure: true,           // HTTPS only (production)
sameSite: 'strict',     // CSRF protection
```

### 4. **Session Tracking**
- User agent and IP address stored
- Users can see all active sessions
- Can revoke individual sessions
- Detect suspicious activity

### 5. **Automatic Cleanup**
- `deleteExpired()` method removes stale sessions
- Can be run as a cron job

### 6. **Short-Lived Access Tokens**
- 15-minute expiry reduces window of compromise
- Even if stolen, limited damage
- Refresh token required for extended access

## Token Lifetimes

| Token Type | Lifetime | Storage | Purpose |
|------------|----------|---------|---------|
| **Access Token** | 15 minutes | httpOnly cookie (`auth_token`) | API authentication |
| **Refresh Token** | 7 days | httpOnly cookie (`refresh_token`) + Database | Get new access tokens |

## Configuration

### Environment Variables Required

Already configured in [src/server/config/env.ts](src/server/config/env.ts):

```env
# Short-lived access tokens
JWT_SECRET=<32+ character secret>
JWT_EXPIRES_IN=15m

# Long-lived refresh tokens
REFRESH_TOKEN_SECRET=<32+ character secret>
REFRESH_TOKEN_EXPIRES_IN=7d
```

### Cookie Configuration

**Access Token Cookie**:
```typescript
{
  name: 'auth_token',
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15 * 60,           // 15 minutes
  path: '/',                 // All API routes
}
```

**Refresh Token Cookie**:
```typescript
{
  name: 'refresh_token',
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7,  // 7 days
  path: '/api/auth/refresh', // Only refresh endpoint
}
```

## User Experience

### Before Fix
- ❌ Logged out every 15 minutes
- ❌ Must re-enter credentials frequently
- ❌ Poor mobile experience (backgrounding apps)

### After Fix
- ✅ Stay logged in for 7 days (with activity)
- ✅ Automatic background refresh (14-min intervals)
- ✅ Refresh on window focus (seamless return)
- ✅ No re-authentication needed

## API Flow Examples

### 1. Login Flow
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

→ Response:
Set-Cookie: auth_token=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=900; Path=/
Set-Cookie: refresh_token=<token>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/api/auth/refresh

{
  "success": true,
  "data": {
    "user": { ... },
    "expiresIn": "15m"
  }
}
```

### 2. Auto-Refresh Flow (14 min later)
```http
POST /api/auth/refresh
Cookie: refresh_token=<old_token>

→ Response:
Set-Cookie: auth_token=<new_jwt>; HttpOnly; ...
Set-Cookie: refresh_token=<new_token>; HttpOnly; ... (rotated!)

{
  "success": true,
  "data": {
    "user": { ... },
    "expiresIn": "15m"
  }
}
```

### 3. Protected API Call
```http
GET /api/practice/stats
Cookie: auth_token=<jwt>

→ Middleware extracts JWT from cookie
→ Validates signature and expiry
→ Returns data if valid
```

### 4. Logout Flow
```http
POST /api/auth/logout
Cookie: refresh_token=<token>

→ Revokes refresh token in database
→ Response:
Set-Cookie: auth_token=; Max-Age=0
Set-Cookie: refresh_token=; Max-Age=0
```

## Session Management

### View Active Sessions
```http
GET /api/auth/sessions
Cookie: auth_token=<jwt>

→ Response:
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "uuid",
        "device": "Chrome Browser",
        "ipAddress": "192.168.1.1",
        "lastActive": "2026-02-07T10:30:00Z",
        "expiresAt": "2026-02-14T10:30:00Z"
      }
    ]
  }
}
```

### Revoke Specific Session
```http
DELETE /api/auth/sessions/[sessionId]
Cookie: auth_token=<jwt>

→ Deletes session from database
→ User logged out on that device
```

## Testing Recommendations

### Manual Testing

1. **Login and verify cookies**
   - Login via `/api/auth/login`
   - Check DevTools → Application → Cookies
   - Verify `auth_token` (15 min) and `refresh_token` (7 days) exist

2. **Test auto-refresh**
   - Wait 14 minutes (or mock the timer)
   - Verify new cookies are set
   - Verify old refresh token is invalid

3. **Test token expiry**
   - Wait 15+ minutes without refresh
   - Make API call - should fail with 401
   - Refresh should still work (7 days)

4. **Test session revocation**
   - Login on two devices/browsers
   - View sessions via `/api/auth/sessions`
   - Revoke one session
   - Verify that device is logged out

5. **Test logout**
   - Logout via `/api/auth/logout`
   - Verify cookies are cleared
   - Verify session removed from database
   - Verify subsequent API calls fail

### Security Testing

```bash
# Test token rotation (old refresh token should fail)
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Cookie: refresh_token=OLD_TOKEN"
# Should return 401

# Test expired refresh token
# Wait 7+ days or manually expire in DB
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Cookie: refresh_token=EXPIRED_TOKEN"
# Should return 401 and delete session

# Test refresh token reuse detection
# Try using same refresh token twice
# Second attempt should fail (rotation)
```

## Database Queries

### Check Active Sessions
```sql
SELECT * FROM refresh_tokens
WHERE "user_id" = '<uuid>'
AND "expires_at" > NOW();
```

### Cleanup Expired Sessions (Cron Job)
```sql
DELETE FROM refresh_tokens
WHERE "expires_at" < NOW();
```

### Count Sessions Per User
```sql
SELECT "user_id", COUNT(*) as session_count
FROM refresh_tokens
WHERE "expires_at" > NOW()
GROUP BY "user_id"
ORDER BY session_count DESC;
```

## Monitoring & Maintenance

### Recommended Cron Jobs

1. **Expired Session Cleanup** (daily)
```typescript
// Run daily at midnight
cron.schedule('0 0 * * *', async () => {
  await sessionRepository.deleteExpired();
});
```

2. **Session Metrics** (hourly)
```typescript
// Track active sessions for monitoring
cron.schedule('0 * * * *', async () => {
  const count = await prisma.userSession.count({
    where: { expiresAt: { gt: new Date() } }
  });
  console.log(`Active sessions: ${count}`);
});
```

### Security Alerts

Monitor for:
- **High session count per user** (potential account sharing)
- **Sessions from unusual IPs** (potential account compromise)
- **Rapid token refresh** (potential abuse)

## Migration from Old System

### For Existing Users

1. **No Data Migration Needed**
   - Old sessions (if any) will expire naturally
   - New refresh tokens created on next login

2. **User Experience**
   - Users will be logged out once (old short-lived token expires)
   - After re-login, full 7-day session with auto-refresh

3. **Backwards Compatibility**
   - `withAuth` middleware still accepts Authorization header (fallback)
   - Gradual migration as users re-login

## Files Modified/Created

### Created
- [src/server/repositories/session.repository.ts](src/server/repositories/session.repository.ts) - Session management
- [src/app/api/auth/refresh/route.ts](src/app/api/auth/refresh/route.ts) - Token refresh endpoint
- [src/app/api/auth/sessions/route.ts](src/app/api/auth/sessions/route.ts) - Session listing
- [src/app/api/auth/sessions/[sessionId]/route.ts](src/app/api/auth/sessions/[sessionId]/route.ts) - Session revocation

### Modified
- [src/server/services/auth.service.ts](src/server/services/auth.service.ts) - Refresh token logic
- [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts) - Issue refresh tokens
- [src/app/api/auth/register/route.ts](src/app/api/auth/register/route.ts) - Issue refresh tokens
- [src/app/api/auth/logout/route.ts](src/app/api/auth/logout/route.ts) - Revoke refresh tokens
- [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) - Auto-refresh logic

## Compliance

This implementation aligns with:
- **OWASP**: Token rotation, httpOnly cookies, short-lived access tokens
- **NIST**: Session management best practices
- **OAuth 2.0**: Refresh token grant type (RFC 6749)

## References

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [RFC 6749: OAuth 2.0 - Refresh Tokens](https://datatracker.ietf.org/doc/html/rfc6749#section-1.5)
- [OWASP Token Handling](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

---

**Date Fixed**: 2026-02-08
**Severity**: High
**Status**: ✅ Fixed
