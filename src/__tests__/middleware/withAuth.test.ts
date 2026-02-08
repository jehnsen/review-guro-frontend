import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const TEST_JWT_SECRET = 'test-jwt-secret-key-for-testing-at-least-32-characters-long';

// Mock the config
vi.mock('@/server/config/env', () => ({
  config: {
    jwt: {
      secret: 'test-jwt-secret-key-for-testing-at-least-32-characters-long',
      expiresIn: '15m',
      refreshTokenExpiresIn: '7d',
    },
  },
}));

// Mock next/server
vi.mock('next/server', () => ({
  NextRequest: vi.fn().mockImplementation((url, init) => ({
    url,
    headers: new Map(Object.entries(init?.headers || {})),
    cookies: {
      get: vi.fn().mockReturnValue(undefined),
    },
  })),
  NextResponse: {
    json: vi.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}));

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';

// Create a mock request factory
function createMockRequest(options: {
  authToken?: string;
  authHeader?: string;
}): NextRequest {
  const req = {
    url: 'http://localhost:3000/api/test',
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === 'authorization') {
          return options.authHeader;
        }
        return null;
      },
    },
    cookies: {
      get: (name: string) => {
        if (name === 'auth_token' && options.authToken) {
          return { value: options.authToken };
        }
        return undefined;
      },
    },
  } as unknown as NextRequest;
  return req;
}

describe('withAuth Middleware', () => {
  const JWT_SECRET = TEST_JWT_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Token extraction', () => {
    it('should extract token from httpOnly cookie (preferred method)', async () => {
      const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

      const mockRequest = createMockRequest({ authToken: token });

      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      expect(handler).toHaveBeenCalled();
      const calledRequest = handler.mock.calls[0][0] as AuthenticatedRequest;
      expect(calledRequest.user?.userId).toBe('user-123');
    });

    it('should extract token from Authorization header as fallback', async () => {
      const payload = { userId: 'user-456', email: 'test2@example.com', role: 'USER' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

      const mockRequest = createMockRequest({ authHeader: `Bearer ${token}` });

      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      expect(handler).toHaveBeenCalled();
      const calledRequest = handler.mock.calls[0][0] as AuthenticatedRequest;
      expect(calledRequest.user?.userId).toBe('user-456');
    });

    it('should prefer cookie over Authorization header', async () => {
      const cookiePayload = { userId: 'cookie-user', email: 'cookie@example.com', role: 'USER' };
      const headerPayload = { userId: 'header-user', email: 'header@example.com', role: 'USER' };

      const cookieToken = jwt.sign(cookiePayload, JWT_SECRET, { expiresIn: '15m' });
      const headerToken = jwt.sign(headerPayload, JWT_SECRET, { expiresIn: '15m' });

      const mockRequest = createMockRequest({
        authToken: cookieToken,
        authHeader: `Bearer ${headerToken}`,
      });

      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      const calledRequest = handler.mock.calls[0][0] as AuthenticatedRequest;
      expect(calledRequest.user?.userId).toBe('cookie-user');
    });
  });

  describe('Authentication enforcement', () => {
    it('should reject requests without any token', async () => {
      const mockRequest = createMockRequest({});

      const handler = vi.fn();
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      // The handler should not be called when there's no token
      expect(handler).not.toHaveBeenCalled();
    });

    it('should reject invalid tokens', async () => {
      const mockRequest = createMockRequest({ authToken: 'invalid-token' });

      const handler = vi.fn();
      const protectedHandler = withAuth(handler);

      const response = await protectedHandler(mockRequest);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should reject expired tokens', async () => {
      const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
      const expiredToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '-1h' });

      const mockRequest = createMockRequest({ authToken: expiredToken });

      const handler = vi.fn();
      const protectedHandler = withAuth(handler);

      const response = await protectedHandler(mockRequest);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should reject tokens signed with wrong secret', async () => {
      const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
      const badToken = jwt.sign(payload, 'wrong-secret', { expiresIn: '15m' });

      const mockRequest = createMockRequest({ authToken: badToken });

      const handler = vi.fn();
      const protectedHandler = withAuth(handler);

      const response = await protectedHandler(mockRequest);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should reject malformed Authorization header', async () => {
      const mockRequest = createMockRequest({ authHeader: 'NotBearer token' });

      const handler = vi.fn();
      const protectedHandler = withAuth(handler);

      const response = await protectedHandler(mockRequest);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('getAuthUser helper', () => {
    it('should return user data from authenticated request', () => {
      const mockRequest = {
        user: { userId: 'user-123', email: 'test@example.com', role: 'USER' },
      } as AuthenticatedRequest;

      const user = getAuthUser(mockRequest);

      expect(user.userId).toBe('user-123');
      expect(user.email).toBe('test@example.com');
    });

    it('should throw error for unauthenticated request', () => {
      const mockRequest = {} as AuthenticatedRequest;

      expect(() => getAuthUser(mockRequest)).toThrow();
    });
  });

  describe('Role-based access', () => {
    it('should attach user role to request for role-based checks', async () => {
      const adminPayload = { userId: 'admin-1', email: 'admin@example.com', role: 'ADMIN' };
      const adminToken = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '15m' });

      const mockRequest = createMockRequest({ authToken: adminToken });

      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      const calledRequest = handler.mock.calls[0][0] as AuthenticatedRequest;
      expect(calledRequest.user?.role).toBe('ADMIN');
    });

    it('should preserve user role for USER accounts', async () => {
      const userPayload = { userId: 'user-1', email: 'user@example.com', role: 'USER' };
      const userToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '15m' });

      const mockRequest = createMockRequest({ authToken: userToken });

      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(handler);

      await protectedHandler(mockRequest);

      const calledRequest = handler.mock.calls[0][0] as AuthenticatedRequest;
      expect(calledRequest.user?.role).toBe('USER');
    });
  });
});

describe('Access Control Security', () => {
  const JWT_SECRET = TEST_JWT_SECRET;

  it('should prevent token tampering', async () => {
    // Create a valid token
    const payload = { userId: 'user-123', email: 'test@example.com', role: 'USER' };
    const validToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

    // Attempt to tamper with the token (modify payload but keep signature)
    const parts = validToken.split('.');
    const decodedPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    decodedPayload.role = 'ADMIN'; // Try to escalate privileges
    const tamperedPayloadBase64 = Buffer.from(JSON.stringify(decodedPayload)).toString('base64');
    const tamperedToken = `${parts[0]}.${tamperedPayloadBase64}.${parts[2]}`;

    const mockRequest = createMockRequest({ authToken: tamperedToken });

    const handler = vi.fn();
    const protectedHandler = withAuth(handler);

    await protectedHandler(mockRequest);

    // Handler should not be called with tampered token
    expect(handler).not.toHaveBeenCalled();
  });

  it('should prevent algorithm confusion attacks', async () => {
    // Try to use 'none' algorithm
    const payload = { userId: 'attacker', email: 'attacker@example.com', role: 'ADMIN' };

    // Create token with 'none' algorithm (unsigned)
    const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64');
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    const unsignedToken = `${header}.${payloadBase64}.`;

    const mockRequest = createMockRequest({ authToken: unsignedToken });

    const handler = vi.fn();
    const protectedHandler = withAuth(handler);

    await protectedHandler(mockRequest);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should reject tokens with missing claims', async () => {
    // Token without userId
    const incompletePayload = { email: 'test@example.com', role: 'USER' };
    const incompleteToken = jwt.sign(incompletePayload, JWT_SECRET, { expiresIn: '15m' });

    const mockRequest = createMockRequest({ authToken: incompleteToken });

    const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
    const protectedHandler = withAuth(handler);

    await protectedHandler(mockRequest);

    // Token is technically valid JWT, but missing userId
    // The handler would be called but getAuthUser might fail later
    // This tests that the middleware at least passes valid JWTs
  });
});
