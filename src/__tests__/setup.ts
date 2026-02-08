import { vi } from 'vitest';

// Mock environment variables BEFORE any module loads
// These must meet the validation requirements in env.ts
// Using Object.assign to avoid TypeScript readonly property errors
Object.assign(process.env, {
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
  DIRECT_URL: 'postgresql://test:test@localhost:5432/test',
  JWT_SECRET: 'test-jwt-secret-key-for-testing-at-least-32-characters-long',
  REFRESH_TOKEN_SECRET: 'test-refresh-token-secret-at-least-32-characters-long',
  JWT_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  NODE_ENV: 'test',
  OPENAI_API_KEY: 'test-openai-key',
  PAYMONGO_SECRET_KEY: 'sk_test_mock_key_value',
  PAYMONGO_PUBLIC_KEY: 'pk_test_mock_key_value',
  RESEND_API_KEY: 'test-resend-key',
  EMAIL_FROM: 'test@example.com',
  NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
});

// Global database mock
vi.mock('@/server/config/database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    userSettings: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    userSession: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    payment: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    subscription: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback({
      user: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      payment: {
        create: vi.fn(),
      },
      subscription: {
        upsert: vi.fn(),
      },
    })),
  },
}));
