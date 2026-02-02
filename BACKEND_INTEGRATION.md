# Backend Integration Guide - ReviewGuro Next.js

This document outlines the complete backend integration into the Next.js application, maintaining the controller-service-repository pattern with OpenAI and Supabase integration.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Setup Instructions](#setup-instructions)
3. [API Routes Implemented](#api-routes-implemented)
4. [Database Schema](#database-schema)
5. [Services & Business Logic](#services--business-logic)
6. [Testing the API](#testing-the-api)
7. [Next Steps](#next-steps)

---

## 🏗️ Architecture Overview

### Directory Structure

```
src/
├── app/
│   └── api/                      # Next.js App Router API Routes
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   └── me/route.ts
│       ├── questions/route.ts
│       ├── practice/
│       │   ├── submit/route.ts
│       │   ├── explain/route.ts
│       │   └── stats/route.ts
│       ├── mock-exams/
│       │   ├── route.ts
│       │   ├── [examId]/route.ts
│       │   └── [examId]/submit/route.ts
│       └── analytics/
│           └── dashboard/route.ts
│
├── server/                        # Backend Logic
│   ├── config/
│   │   ├── env.ts                # Environment configuration (Zod validated)
│   │   └── database.ts           # Prisma client singleton
│   ├── repositories/             # Data Access Layer
│   │   ├── user.repository.ts
│   │   ├── question.repository.ts
│   │   ├── progress.repository.ts
│   │   └── mockExam.repository.ts
│   ├── services/                 # Business Logic Layer
│   │   ├── auth.service.ts
│   │   ├── question.service.ts
│   │   ├── practice.service.ts
│   │   ├── mockExam.service.ts
│   │   ├── analytics.service.ts
│   │   ├── ai.service.ts         # OpenAI integration
│   │   └── cache.service.ts      # Redis caching
│   ├── middlewares/
│   │   ├── withAuth.ts           # Next.js authentication HOC
│   │   └── error.middleware.ts
│   ├── utils/
│   │   ├── nextResponse.ts       # Next.js response helpers
│   │   ├── errors.ts             # Custom error classes
│   │   └── hash.ts               # Password hashing
│   └── types/
│       └── index.ts              # TypeScript definitions
│
└── prisma/
    └── schema.prisma             # Database schema
```

### Design Patterns Used

1. **Repository Pattern**: Isolates data access logic
2. **Service Layer**: Contains all business logic
3. **Middleware Pattern**: Authentication and error handling
4. **Factory Pattern**: Singleton instances for services
5. **Cache-Aside Pattern**: Redis caching for performance

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_EXPIRES_IN="7d"

# Redis Cache (Optional - caching will be disabled if not provided)
REDIS_URL="redis://localhost:6379"

# OpenAI API (Optional - AI features will use fallbacks if not provided)
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxx"
OPENAI_MODEL="gpt-4o-mini"
OPENAI_MAX_TOKENS="500"

# PayMongo Payment Gateway
PAYMONGO_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
PAYMONGO_PUBLIC_KEY="pk_test_xxxxxxxxxxxxx"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Free Tier Limits
FREE_TIER_PRACTICE_LIMIT_PER_DAY="15"
FREE_TIER_MOCK_EXAM_QUESTIONS_LIMIT="20"
FREE_TIER_MOCK_EXAMS_PER_MONTH="3"

# Pricing
SEASON_PASS_PRICE="399"
SEASON_PASS_CURRENCY="PHP"

# Cache TTL (seconds)
CACHE_TTL_QUESTIONS="3600"
CACHE_TTL_EXPLANATIONS="86400"
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to Supabase (for development)
npm run prisma:push

# OR run migrations (for production)
npm run prisma:migrate
```

### 4. Seed Database with Sample Questions

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

---

## 🛣️ API Routes Implemented

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |

**Example: Register**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

**Example: Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clxxx",
      "email": "test@example.com",
      "role": "FREE",
      "isPremium": false,
      "subscriptionStatus": "FREE"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### Questions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/questions?category=VERBAL_ABILITY&difficulty=EASY&page=1&limit=10` | Get paginated questions | Yes |

**Example:**
```bash
curl http://localhost:3000/api/questions?category=VERBAL_ABILITY&page=1&limit=10 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Practice

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/practice/submit` | Submit answer | Yes |
| `POST` | `/api/practice/explain` | Get AI explanation | Yes |
| `GET` | `/api/practice/stats` | Get user statistics | Yes |

**Example: Submit Answer**
```bash
curl -X POST http://localhost:3000/api/practice/submit \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"questionId":"clxxx","selectedOptionId":"option-a","timeSpentSeconds":45}'
```

**Response:**
```json
{
  "success": true,
  "message": "Answer submitted successfully",
  "data": {
    "isCorrect": true,
    "correctOptionId": "option-a",
    "selectedOptionId": "option-a",
    "explanation": "This is the correct answer because...",
    "pointsEarned": 10,
    "streakUpdated": true,
    "newStreak": 5
  }
}
```

### Mock Exams

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/mock-exams` | Create new mock exam | Yes |
| `GET` | `/api/mock-exams` | Get exam history | Yes |
| `GET` | `/api/mock-exams/[examId]` | Get specific exam | Yes |
| `POST` | `/api/mock-exams/[examId]/submit` | Submit completed exam | Yes |

**Example: Create Mock Exam**
```bash
curl -X POST http://localhost:3000/api/mock-exams \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "totalQuestions": 50,
    "timeLimitMinutes": 60,
    "passingScore": 70,
    "categories": "MIXED",
    "difficulty": "MEDIUM"
  }'
```

### Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/analytics/dashboard` | Get dashboard analytics | Yes |

---

## 🗄️ Database Schema

### Key Models

#### User
- Authentication & profile data
- Subscription status (FREE, SEASON_PASS, EXPIRED)
- Statistics (attempts, streak, study time)
- Rate limiting counters

#### Question
- Question content and options (JSON)
- Category and difficulty
- AI explanations
- Usage statistics

#### UserProgress
- User answer history
- Performance tracking
- Time spent per question

#### MockExamSession
- Exam configuration
- Questions (JSON array)
- Answers (JSON object)
- Scoring and results

#### Subscription & Payment
- Subscription management
- Payment history
- PayMongo integration

---

## ⚙️ Services & Business Logic

### Auth Service
- **User registration** with password hashing (bcrypt)
- **JWT token generation** and validation
- **Session management**

### Question Service
- **Redis caching** for frequently accessed questions
- **Category-based filtering**
- **Pagination support**

### Practice Service
- **Answer submission** with validation
- **AI explanations** via OpenAI API
- **Progress tracking** and statistics
- **Streak management**

### Mock Exam Service
- **Random question selection** based on criteria
- **Timed exam sessions**
- **Auto-scoring** and result generation
- **Flagging system** for review

### Analytics Service
- **Dashboard metrics** (accuracy, study time, etc.)
- **Category performance** analysis
- **Weekly activity** tracking
- **AI-generated insights**

### Cache Service (Redis)
- **Cache-Aside pattern** implementation
- **TTL-based expiration**
- **Pattern-based invalidation**

### AI Service (OpenAI)
- **Explanation generation** with context
- **AI insights** for analytics
- **Fallback responses** when API unavailable

---

## 🧪 Testing the API

### 1. Test Authentication Flow

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# Login (save the token)
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}' \
  | jq -r '.data.accessToken')

# Get profile
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Test Practice Flow

```bash
# Get questions
curl "http://localhost:3000/api/questions?category=VERBAL_ABILITY&limit=1" \
  -H "Authorization: Bearer $TOKEN"

# Submit answer (replace with actual question/option IDs)
curl -X POST http://localhost:3000/api/practice/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"questionId":"QUESTION_ID","selectedOptionId":"OPTION_ID"}'

# Get explanation
curl -X POST http://localhost:3000/api/practice/explain \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"questionId":"QUESTION_ID"}'
```

### 3. Test with Frontend

Update your frontend [api.ts](src/server/api.ts) to use local backend:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
```

---

## 📝 Next Steps

### Immediate Tasks

1. **Create Seed Script**
   ```bash
   # Create prisma/seed.ts with sample questions
   npm run seed
   ```

2. **Set Up Redis** (Optional but recommended)
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:alpine
   ```

3. **Configure Supabase**
   - Create a Supabase project
   - Copy the connection string to `.env`
   - Run migrations

4. **Test All Endpoints**
   - Use the provided curl examples
   - Verify responses match expected format

### Additional API Routes to Implement

The following routes exist as Express-style but need conversion to Next.js:

- `/api/users/profile` - Update profile
- `/api/users/settings` - User settings
- `/api/payments/paymongo/create-checkout` - Payment checkout
- `/api/season-pass-code/*` - Season pass code redemption
- `/api/practice/limits` - Practice limits
- `/api/analytics/*` - Remaining analytics endpoints

### Enhancements

1. **Add Request Validation Middleware** - Centralize Zod schemas
2. **Implement Rate Limiting** - Protect against abuse
3. **Add Request Logging** - Monitor API usage
4. **Set Up Error Monitoring** - Sentry integration
5. **Write Unit Tests** - Jest/Vitest for services
6. **Add API Documentation** - Swagger/OpenAPI spec

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong JWT secrets** - Minimum 32 characters
3. **Enable CORS properly** - Configure allowed origins
4. **Sanitize user input** - Zod validation on all endpoints
5. **Hash passwords** - Using bcrypt with salt rounds
6. **Implement rate limiting** - Prevent brute force attacks

---

## 🤝 Contributing

When adding new API routes:

1. Follow the established pattern (service → route handler)
2. Add Zod validation schemas
3. Use `withAuth` middleware for protected routes
4. Return standardized responses using `createSuccessResponse`
5. Handle errors with `createErrorResponse`
6. Update this documentation

---

## 📚 References

- [Next.js App Router](https://nextjs.org/docs/app)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Redis Documentation](https://redis.io/documentation)
- [PayMongo API](https://developers.paymongo.com)

---

**Last Updated:** 2026-02-01
**Version:** 1.0.0
