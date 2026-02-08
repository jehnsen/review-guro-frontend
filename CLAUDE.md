# Review Guro - Project Documentation for Claude

## Project Overview

Review Guro is a comprehensive exam preparation platform built with Next.js 16, TypeScript, and Prisma. The application helps users prepare for standardized exams through practice questions, mock exams, AI-powered explanations, and detailed analytics.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM 6.1.0
- **Authentication**: JWT-based with bcrypt
- **Payment**: PayMongo integration
- **AI**: OpenAI API for explanations
- **Caching**: Redis (IORedis)
- **Frontend**: React 19, TailwindCSS 4, Lucide React icons
- **API Client**: Axios, TanStack React Query
- **Deployment**: Vercel

## Project Structure

```
review-guro-ver2/
├── prisma/
│   ├── schema.prisma          # Database schema with User, Question, MockExam, etc.
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── api/              # API routes (Next.js route handlers)
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── practice/     # Practice mode endpoints
│   │   │   ├── mock-exams/   # Mock exam endpoints
│   │   │   ├── analytics/    # Analytics & insights
│   │   │   ├── payments/     # PayMongo integration
│   │   │   ├── questions/    # Question management
│   │   │   └── users/        # User settings & profile
│   │   ├── dashboard/        # Dashboard page
│   │   ├── practice/         # Practice mode page
│   │   ├── mock-exam/        # Mock exam page
│   │   ├── settings/         # User settings page
│   │   ├── pricing/          # Pricing page
│   │   ├── checkout/         # Checkout flow (success/cancel)
│   │   ├── sign-in/          # Sign in page
│   │   └── sign-up/          # Sign up page
│   ├── components/
│   │   ├── ui/               # Reusable UI components (Button, Card, Input, Badge)
│   │   └── layout/           # Layout components (Navbar, Sidebar, Footer)
│   ├── contexts/
│   │   ├── AuthContext.tsx   # Authentication context
│   │   └── ThemeContext.tsx  # Theme (light/dark mode) context
│   ├── providers/
│   │   └── QueryProvider.tsx # React Query provider
│   ├── server/               # Backend logic
│   │   ├── config/           # Configuration (env, database)
│   │   ├── middlewares/      # Auth, error handling, upload
│   │   ├── repositories/     # Database access layer
│   │   ├── services/         # Business logic
│   │   ├── routes/           # Express-style routes (legacy)
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   └── lib/                  # Shared utilities
└── documentation/            # Additional documentation

```

## Database Schema

### Core Models

1. **User** - User accounts with authentication, subscription, and streak tracking
2. **Question** - Exam questions with categories, difficulty, and explanations
3. **UserProgress** - Tracks user answers and performance per question
4. **MockExamSession** - Full mock exam sessions with timing and results
5. **Subscription** - Premium subscription management
6. **Payment** - Payment transaction records (PayMongo)
7. **DailyAnalytics** - Daily practice question counts
8. **DailyExplanationView** - Daily AI explanation usage tracking

### Key Enums

- **UserRole**: USER, ADMIN
- **SubscriptionStatus**: FREE, SEASON_PASS, EXPIRED
- **QuestionCategory**: VERBAL_ABILITY, NUMERICAL_ABILITY, ANALYTICAL_ABILITY, GENERAL_INFORMATION, CLERICAL_ABILITY
- **Difficulty**: EASY, MEDIUM, HARD
- **ExamStatus**: IN_PROGRESS, COMPLETED, ABANDONED

## Key Features

### 1. Authentication System
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Session management with expiry tracking

**Files**: [src/server/services/auth.service.ts](src/server/services/auth.service.ts), [src/server/middlewares/withAuth.ts](src/server/middlewares/withAuth.ts), [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)

### 2. Practice Mode
- Fetch questions by category and difficulty
- Submit answers with time tracking
- Daily practice limits for free users
- AI-powered explanations with usage limits
- Progress tracking per question

**API Routes**:
- `GET /api/questions` - Fetch practice questions
- `POST /api/practice/submit` - Submit answers
- `POST /api/practice/explain` - Get AI explanation
- `GET /api/practice/stats` - Get practice statistics
- `GET /api/practice/limits` - Check daily limits

### 3. Mock Exam System
- Timed full-length mock exams
- Question flagging during exam
- Auto-submit on time expiry
- Detailed results with category breakdown
- Answer review after completion

**API Routes**:
- `GET /api/mock-exams` - List user's exams
- `POST /api/mock-exams` - Create new exam
- `GET /api/mock-exams/[examId]` - Get exam details
- `POST /api/mock-exams/[examId]/submit` - Submit exam
- `GET /api/mock-exams/[examId]/results` - Get results

### 4. Analytics Dashboard
- Weekly activity heatmap
- Streak tracking with repair feature
- Strengths and weaknesses by category
- AI-generated study insights
- Performance trends over time

**API Routes**:
- `GET /api/analytics/dashboard` - Main dashboard data
- `GET /api/analytics/weekly-activity` - Weekly activity
- `GET /api/analytics/streak` - Streak information
- `GET /api/analytics/strengths-weaknesses` - Category analysis
- `GET /api/analytics/ai-insights` - AI study recommendations
- `GET /api/analytics/explanation-limits` - Explanation usage limits

### 5. Subscription & Payment
- Free tier with daily limits
- Season Pass subscription
- PayMongo integration (GCash, Card, etc.)
- Checkout flow with success/cancel handling
- Payment verification and webhook handling

**API Routes**:
- `POST /api/payments/paymongo/create-checkout` - Create checkout session
- `GET /api/payments/paymongo/public-key` - Get PayMongo public key
- `GET /api/payments/paymongo/status/[ref]` - Check payment status
- `POST /api/payments/paymongo/webhook` - Handle PayMongo webhooks
- `POST /api/season-pass-codes/redeem` - Redeem season pass code
- `POST /api/season-pass-codes/verify` - Verify season pass code

### 6. User Settings
- Profile management
- Daily goal setting
- Theme preferences (light/dark mode)
- Exam date tracking

**API Routes**:
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/settings` - Get user settings
- `PUT /api/users/settings` - Update settings
- `PUT /api/users/settings/daily-goal` - Update daily goal
- `PUT /api/users/settings/appearance` - Update theme preference

## Architecture Patterns

### API Route Structure
All API routes follow this pattern:
1. Use Next.js route handlers (`route.ts` files)
2. Wrapped with `withAuth()` middleware for protected routes
3. Use service layer for business logic
4. Return standardized JSON responses with proper HTTP status codes

Example:
```typescript
export const GET = withAuth(async (req, context) => {
  try {
    const result = await someService.getData(context.user.id);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
});
```

### Service Layer Pattern
- Services contain business logic
- Repositories handle database operations
- Clear separation of concerns
- Services are reusable across routes

### Authentication Flow
1. User logs in via `POST /api/auth/login`
2. Receives JWT access token + refresh token
3. Access token stored in memory, refresh token in DB
4. Protected routes validated via `withAuth()` middleware
5. Token refresh handled automatically

### Daily Limits System
Free users have limits on:
- Practice questions per day (configurable)
- AI explanation views per day (configurable)
- Tracked via `DailyAnalytics` and `DailyExplanationView` tables

### Streak Tracking
- Increments on daily activity
- Resets if user misses a day
- "Repair streak" feature allows one-time restore
- Tracks both current and longest streak

## Important Configuration

### Environment Variables
Required in `.env`:
```env
DATABASE_URL=          # PostgreSQL connection string
DIRECT_URL=            # Direct PostgreSQL connection (Prisma)
JWT_SECRET=            # JWT signing secret
JWT_EXPIRES_IN=        # Access token expiry (e.g., "15m")
REFRESH_TOKEN_SECRET=  # Refresh token secret
REFRESH_TOKEN_EXPIRES_IN= # Refresh token expiry (e.g., "7d")
OPENAI_API_KEY=        # OpenAI API key for explanations
PAYMONGO_SECRET_KEY=   # PayMongo secret key
PAYMONGO_PUBLIC_KEY=   # PayMongo public key
REDIS_URL=             # Redis connection string (optional)
NODE_ENV=              # development/production
```

### Database Commands
```bash
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations (dev)
npm run prisma:push       # Push schema to DB
npm run prisma:studio     # Open Prisma Studio
npm run seed              # Seed database with questions
```

## Common Development Tasks

### Adding a New API Endpoint
1. Create route handler in `src/app/api/[feature]/route.ts`
2. Add service logic in `src/server/services/[feature].service.ts`
3. Add repository methods in `src/server/repositories/[feature].repository.ts`
4. Update types in `src/server/types/index.ts`
5. Wrap with `withAuth()` if authentication required

### Adding a New Question Category
1. Update `QuestionCategory` enum in [prisma/schema.prisma](prisma/schema.prisma)
2. Run `npm run prisma:migrate`
3. Update frontend category constants
4. Add category to seeding script if needed

### Adding a New Database Model
1. Define model in [prisma/schema.prisma](prisma/schema.prisma)
2. Add relations to existing models
3. Create migration: `npm run prisma:migrate`
4. Create repository in `src/server/repositories/`
5. Create service in `src/server/services/`
6. Add TypeScript types in `src/server/types/`

### Debugging Authentication Issues
- Check JWT_SECRET is set correctly
- Verify token expiry times
- Check `withAuth()` middleware logs
- Verify refresh token in database
- Check CORS settings if frontend/backend separated

## Known Issues & Notes

### Vercel Deployment
- Branch: `vercelize`
- Recent commits focused on Vercel compatibility
- Backend logic migrated to Next.js API routes for serverless

### Legacy Code
- [src/server/routes/](src/server/routes/) contains Express-style routes (mostly unused now)
- Main API logic migrated to Next.js route handlers in `src/app/api/`

### Documentation Files
- Some documentation files were deleted (CHECKLIST.md, IMPLEMENTATION_SUMMARY.md, etc.)
- Active docs now in [documentation/](documentation/) folder

## Testing Recommendations

### Manual Testing Checklist
1. **Authentication**: Sign up, login, logout, token refresh
2. **Practice Mode**: Fetch questions, submit answers, view explanations
3. **Mock Exams**: Create exam, take exam, submit, view results
4. **Daily Limits**: Test free user limits, verify reset at midnight
5. **Payments**: Test PayMongo checkout, verify subscription activation
6. **Analytics**: Check dashboard data accuracy, streak calculation
7. **Settings**: Update profile, change theme, set daily goals

### Key Test Scenarios
- Free user hitting daily limits
- Season Pass activation via payment
- Season Pass activation via code
- Streak repair functionality
- Mock exam auto-submit on timer expiry
- AI explanation limit enforcement

## API Response Formats

### Success Response
```json
{
  "data": { /* response data */ },
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": { /* optional error details */ }
}
```

## Code Style & Conventions

- Use TypeScript for all new code
- Follow Next.js App Router conventions
- Use Prisma for all database operations
- Implement proper error handling in all routes
- Use middleware for cross-cutting concerns
- Keep services focused and single-purpose
- Use repositories for database abstraction
- Write descriptive commit messages
- Prefer server components over client components when possible

## Getting Started for Development

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd review-guro-ver2
   npm install
   ```

2. **Setup Database**
   ```bash
   # Create PostgreSQL database
   # Add DATABASE_URL to .env
   npm run prisma:generate
   npm run prisma:push
   npm run seed
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Fill in all required variables

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   - Navigate to http://localhost:3000
   - Sign up for a new account
   - Start practicing!

## Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run prisma:studio    # Open database GUI
npm run seed             # Populate questions
```

## Contact & Support

For issues and feedback, refer to the project repository issue tracker.

---

## Security Features

### Authentication Security
- **httpOnly Cookies**: JWT tokens stored in httpOnly cookies (XSS protection)
- **CSRF Protection**: SameSite cookie attribute prevents cross-site attacks
- **HTTPS Enforcement**: Secure flag ensures tokens only sent over HTTPS
- **Automatic Cookie Management**: Browser-managed token storage and expiry
- **Signature Verification**: PayMongo webhook signatures verified to prevent tampering
- **Rate Limiting**: Protection against brute force attacks on auth endpoints
- **Environment Validation**: Application exits on missing critical ENV variables

**Security Documentation**: [SECURITY_FIX_XSS_JWT.md](SECURITY_FIX_XSS_JWT.md)

### Recent Security Fixes (2026-02-07)
1. **XSS Vulnerability (CRITICAL)**: Migrated from localStorage to httpOnly cookies
2. **Webhook Security**: Added signature verification for PayMongo webhooks
3. **Payment Verification**: Fixed exploitable manual payment verification
4. **Environment Security**: Added validation that crashes app on missing critical ENV vars
5. **Token Flow**: Removed dangerous manual refresh token flow

## Testing

### Test Infrastructure
- **Testing Framework**: Vitest
- **Testing Library**: React Testing Library
- **DOM Environment**: jsdom

### Test Commands
```bash
npm run test              # Run tests in watch mode
npm run test:run          # Run tests once
npm run test:coverage     # Run tests with coverage report
```

### Test Files
Located in [src/__tests__/](src/__tests__/)

## New Authentication Features

### Email Verification System
- Email verification required for new accounts
- Verification token sent via email (Resend)
- Verification banner shown to unverified users
- Resend verification email functionality

**API Routes**:
- `POST /api/auth/verify-email` - Verify email with token
- `POST /api/auth/resend-verification` - Resend verification email

**Files**: [src/app/verify-email/](src/app/verify-email/), [src/components/ui/VerificationBanner.tsx](src/components/ui/VerificationBanner.tsx)

### Password Reset System
- Secure password reset via email
- Time-limited reset tokens
- Token invalidation after use
- Rate limiting on reset requests

**API Routes**:
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

**Files**: [src/app/forgot-password/](src/app/forgot-password/), [src/app/reset-password/](src/app/reset-password/)

### Enhanced Middleware
- **Rate Limiting**: Protection against abuse on sensitive endpoints
- **Email Service**: Integrated Resend for transactional emails
- **Timezone Utilities**: Proper timezone handling for analytics

**Files**: [src/server/middlewares/rateLimit.ts](src/server/middlewares/rateLimit.ts), [src/server/services/email.service.ts](src/server/services/email.service.ts), [src/server/utils/timezone.ts](src/server/utils/timezone.ts)

## Error Handling

### Global Error Boundaries
- **Page-Level**: [src/app/error.tsx](src/app/error.tsx) - Catches errors in page components
- **Global**: [src/app/global-error.tsx](src/app/global-error.tsx) - Catches errors across entire app
- **Component-Level**: [src/components/ui/ErrorBoundary.tsx](src/components/ui/ErrorBoundary.tsx) - Reusable error boundary

## Layout Structure

The application uses nested layouts for better code organization:
- [src/app/analytics/layout.tsx](src/app/analytics/layout.tsx) - Analytics section layout
- [src/app/mock-exam/layout.tsx](src/app/mock-exam/layout.tsx) - Mock exam section layout
- [src/app/practice/layout.tsx](src/app/practice/layout.tsx) - Practice section layout
- [src/app/pricing/layout.tsx](src/app/pricing/layout.tsx) - Pricing section layout
- [src/app/settings/layout.tsx](src/app/settings/layout.tsx) - Settings section layout
- [src/app/sign-in/layout.tsx](src/app/sign-in/layout.tsx) - Sign in page layout
- [src/app/sign-up/layout.tsx](src/app/sign-up/layout.tsx) - Sign up page layout

## Updated Environment Variables

Required in `.env`:
```env
# Database
DATABASE_URL=              # PostgreSQL connection string
DIRECT_URL=                # Direct PostgreSQL connection (Prisma)

# Authentication
JWT_SECRET=                # JWT signing secret
JWT_EXPIRES_IN=            # Access token expiry (e.g., "15m")
REFRESH_TOKEN_SECRET=      # Refresh token secret
REFRESH_TOKEN_EXPIRES_IN=  # Refresh token expiry (e.g., "7d")

# AI
OPENAI_API_KEY=            # OpenAI API key for explanations

# Payments
PAYMONGO_SECRET_KEY=       # PayMongo secret key
PAYMONGO_PUBLIC_KEY=       # PayMongo public key
PAYMONGO_WEBHOOK_SECRET=   # PayMongo webhook signature secret

# Email
RESEND_API_KEY=            # Resend API key for transactional emails
EMAIL_FROM=                # From email address (e.g., "noreply@reviewguro.com")

# App
NEXT_PUBLIC_APP_URL=       # Application URL (e.g., "https://reviewguro.com")
NODE_ENV=                  # development/production

# Optional
REDIS_URL=                 # Redis connection string (optional)
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations (dev)
npm run prisma:push      # Push schema to DB
npm run prisma:studio    # Open database GUI
npm run seed             # Populate questions
```

---

**Last Updated**: 2026-02-08
**Project Status**: Active Development
**Current Branch**: main
**Latest Security Update**: 2026-02-07
