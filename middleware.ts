import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function decodeJwtPayload(token: string): { role?: string; exp?: number } | null {
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection: redirect non-admins before the page renders.
  // Real security is enforced server-side by withAdminAuth; this prevents
  // the loading flash and direct page access for non-admin users.
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    const payload = decodeJwtPayload(token);
    const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : true;
    if (!payload || isExpired || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // CSRF: for mutation API requests verify Origin matches the app host.
  // This is defense-in-depth — cookies already use SameSite=Strict.
  if (pathname.startsWith('/api/') && MUTATION_METHODS.has(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    // Allow requests with no Origin (e.g. server-to-server, curl in dev)
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
  }

  // Get the response
  const response = NextResponse.next();

  // Content Security Policy
  // This policy allows:
  // - Scripts from self and inline (needed for Next.js)
  // - Styles from self and inline (needed for Tailwind)
  // - Images from self, data URIs, and common image sources
  // - Fonts from self and Google Fonts
  // - Connections to self, API endpoints, and payment providers
  const cspHeader = [
    "default-src 'self'",
    // Scripts: self, inline (required for Next.js), and eval in dev mode
    process.env.NODE_ENV === 'development'
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'",
    // Styles: self and inline (required for Tailwind CSS)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Images: self, data URIs, blob, and common image providers
    "img-src 'self' data: blob: https:",
    // Fonts: self and Google Fonts
    "font-src 'self' https://fonts.gstatic.com",
    // Connections: self, PayMongo, OpenAI, Resend
    "connect-src 'self' https://api.paymongo.com https://api.openai.com https://api.resend.com",
    // Frames: deny embedding in iframes (clickjacking protection)
    "frame-ancestors 'none'",
    // Forms: only allow form submissions to self
    "form-action 'self'",
    // Base URI: only allow base tag to reference self
    "base-uri 'self'",
    // Object sources: disallow plugins
    "object-src 'none'",
    // Upgrade insecure requests in production
    process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests' : '',
  ].filter(Boolean).join('; ');

  // Set security headers
  response.headers.set('Content-Security-Policy', cspHeader);

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy - don't leak full URL when navigating
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy - restrict browser features
  response.headers.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()', // Disable FLoC
    ].join(', ')
  );

  // HSTS - force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
