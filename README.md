# Review Guro - Exam Preparation Platform

A comprehensive exam preparation platform built with Next.js 16, TypeScript, and Prisma. Review Guro helps students prepare for standardized exams through practice questions, mock exams, AI-powered explanations, and detailed analytics.

## Features

### Core Features
- **Practice Mode**: Answer questions by category and difficulty with AI explanations
- **Mock Exams**: Full-length timed exams with detailed results
- **Analytics Dashboard**: Track progress, streaks, and performance trends
- **AI Insights**: Personalized study recommendations based on performance
- **Subscription System**: Free tier with daily limits, Season Pass for unlimited access

### Authentication & Security
- Secure authentication with httpOnly cookies (XSS protection)
- Email verification system with verification links
- Password reset via email with secure tokens
- Rate limiting on sensitive endpoints
- CSRF protection with SameSite cookies
- Webhook signature verification for payments

### User Experience
- Dark/Light mode theme switching
- Daily goal tracking and streak system
- Progress tracking per question
- Question flagging during exams
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM 6.1.0
- **Authentication**: JWT with httpOnly cookies
- **Payment**: PayMongo integration (GCash, Card, etc.)
- **AI**: OpenAI API for explanations
- **Email**: Resend for transactional emails
- **Caching**: Redis (IORedis)
- **Frontend**: React 19, TailwindCSS 4, Lucide React icons
- **API Client**: Axios, TanStack React Query
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd review-guro-ver2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/reviewguro"
   DIRECT_URL="postgresql://user:password@localhost:5432/reviewguro"

   # Authentication
   JWT_SECRET="your-jwt-secret-key-here"
   JWT_EXPIRES_IN="15m"
   REFRESH_TOKEN_SECRET="your-refresh-token-secret-here"
   REFRESH_TOKEN_EXPIRES_IN="7d"

   # AI
   OPENAI_API_KEY="your-openai-api-key"

   # Payments
   PAYMONGO_SECRET_KEY="your-paymongo-secret-key"
   PAYMONGO_PUBLIC_KEY="your-paymongo-public-key"
   PAYMONGO_WEBHOOK_SECRET="your-webhook-secret"

   # Email
   RESEND_API_KEY="your-resend-api-key"
   EMAIL_FROM="noreply@reviewguro.com"

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NODE_ENV="development"

   # Optional
   REDIS_URL="redis://localhost:6379"
   ```

4. **Setup the database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Push schema to database
   npm run prisma:push

   # Seed the database with questions
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Testing
```bash
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage report
```

### Database
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Create and run migrations
npm run prisma:push      # Push schema changes to database
npm run prisma:studio    # Open Prisma Studio (database GUI)
npm run seed             # Seed database with sample questions
```

## Project Structure

```
review-guro-ver2/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API route handlers
│   │   ├── dashboard/        # Dashboard page
│   │   ├── practice/         # Practice mode
│   │   ├── mock-exam/        # Mock exams
│   │   ├── analytics/        # Analytics dashboard
│   │   ├── settings/         # User settings
│   │   ├── pricing/          # Pricing page
│   │   ├── sign-in/          # Sign in page
│   │   ├── sign-up/          # Sign up page
│   │   ├── verify-email/     # Email verification
│   │   ├── forgot-password/  # Password reset request
│   │   └── reset-password/   # Password reset
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   └── layout/           # Layout components
│   ├── contexts/
│   │   ├── AuthContext.tsx   # Authentication context
│   │   └── ThemeContext.tsx  # Theme context
│   ├── providers/
│   │   └── QueryProvider.tsx # React Query provider
│   ├── server/               # Backend logic
│   │   ├── config/           # Configuration
│   │   ├── middlewares/      # Middleware functions
│   │   ├── repositories/     # Database access layer
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   └── __tests__/            # Test files
├── middleware.ts              # Next.js middleware
└── documentation/             # Additional docs
```

## Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Practice Mode
- `GET /api/questions` - Get practice questions
- `POST /api/practice/submit` - Submit answer
- `POST /api/practice/explain` - Get AI explanation
- `GET /api/practice/stats` - Get statistics
- `GET /api/practice/limits` - Check daily limits

### Mock Exams
- `GET /api/mock-exams` - List user's exams
- `POST /api/mock-exams` - Create new exam
- `GET /api/mock-exams/[id]` - Get exam details
- `POST /api/mock-exams/[id]/submit` - Submit exam
- `GET /api/mock-exams/[id]/results` - Get results

### Analytics
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/weekly-activity` - Weekly activity
- `GET /api/analytics/streak` - Streak information
- `GET /api/analytics/ai-insights` - AI recommendations

### Payments
- `POST /api/payments/paymongo/create-checkout` - Create checkout
- `GET /api/payments/paymongo/status/[ref]` - Check payment status
- `POST /api/payments/paymongo/webhook` - Payment webhook

## Database Schema

### Main Models
- **User** - User accounts with authentication and subscription
- **Question** - Exam questions with categories and difficulty
- **UserProgress** - User answers and performance tracking
- **MockExamSession** - Mock exam sessions and results
- **Subscription** - Premium subscription management
- **Payment** - Payment transaction records
- **DailyAnalytics** - Daily practice statistics
- **DailyExplanationView** - AI explanation usage tracking

## Security

### Recent Security Fixes (2026-02-07)
1. **XSS Vulnerability**: Migrated JWT storage from localStorage to httpOnly cookies
2. **Webhook Security**: Added signature verification for PayMongo webhooks
3. **Payment Verification**: Fixed exploitable manual payment verification
4. **Environment Validation**: Application exits on missing critical environment variables
5. **Token Flow**: Removed dangerous manual refresh token flow

For detailed security information, see [SECURITY_FIX_XSS_JWT.md](SECURITY_FIX_XSS_JWT.md).

### Security Features
- httpOnly cookies for JWT storage (XSS protection)
- CSRF protection with SameSite cookies
- HTTPS enforcement in production
- Rate limiting on authentication endpoints
- Email verification for new accounts
- Secure password reset with time-limited tokens
- PayMongo webhook signature verification

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- Database credentials
- JWT secrets
- API keys (OpenAI, PayMongo, Resend)
- Application URL
- Set `NODE_ENV=production`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Use TypeScript for all new code
- Follow Next.js App Router conventions
- Use Prisma for all database operations
- Implement proper error handling
- Write tests for new features
- Keep services focused and single-purpose
- Use repositories for database abstraction
- Prefer server components over client components

## Testing

Run the test suite:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## License
Developer: Jehnsen Enrique
This project is private and proprietary.

## Support

For issues and feature requests, please use the GitHub issue tracker.

---

**Last Updated**: 2026-02-08
**Version**: 0.1.0
**Status**: Active Development
