# ✅ Backend Integration Checklist

Use this checklist to verify your ReviewGuro backend setup is working correctly.

---

## 📋 Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Supabase account created
- [ ] PayMongo account created (use test mode for development)
- [ ] (Optional) Redis installed or cloud Redis service ready
- [ ] (Optional) OpenAI API key obtained

---

## 🔧 Installation Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`
- [ ] All required environment variables filled in `.env`:
  - [ ] `DATABASE_URL` (from Supabase)
  - [ ] `JWT_SECRET` (generated random string ≥32 chars)
  - [ ] `FRONTEND_URL` (`http://localhost:3000`)
  - [ ] `PAYMONGO_SECRET_KEY` (test key)
  - [ ] `PAYMONGO_PUBLIC_KEY` (test key)
  - [ ] `SEASON_PASS_PRICE` (e.g., `399`)
  - [ ] `FREE_TIER_PRACTICE_LIMIT_PER_DAY` (e.g., `15`)
- [ ] Optional environment variables (if using these features):
  - [ ] `REDIS_URL` (for caching)
  - [ ] `OPENAI_API_KEY` (for AI explanations)

---

## 🗄️ Database Setup Checklist

- [ ] Prisma client generated (`npm run prisma:generate`)
- [ ] Database schema pushed (`npm run prisma:push` OR `npm run prisma:migrate`)
- [ ] Database seeded (`npm run seed`)
- [ ] Prisma Studio accessible (`npm run prisma:studio` → `http://localhost:5555`)
- [ ] Tables visible in Supabase dashboard:
  - [ ] User
  - [ ] Question
  - [ ] UserProgress
  - [ ] MockExamSession
  - [ ] Subscription
  - [ ] Payment
  - [ ] DailyAnalytics
  - [ ] UserSession

---

## 🧪 API Testing Checklist

### Authentication Endpoints

- [ ] **POST /api/auth/register** works
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"newuser@test.com","password":"TestPass123"}'
  ```
  Expected: 201 status, returns user object and token

- [ ] **POST /api/auth/login** works
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@reviewguro.com","password":"TestPass123"}'
  ```
  Expected: 200 status, returns user object and token

- [ ] **GET /api/auth/me** works (requires token)
  ```bash
  curl http://localhost:3000/api/auth/me \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns current user profile

### Question Endpoints

- [ ] **GET /api/questions** works without filters
  ```bash
  curl http://localhost:3000/api/questions \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns paginated questions

- [ ] **GET /api/questions** works with category filter
  ```bash
  curl "http://localhost:3000/api/questions?category=VERBAL_ABILITY" \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns filtered questions

- [ ] **GET /api/questions** works with difficulty filter
  ```bash
  curl "http://localhost:3000/api/questions?difficulty=EASY" \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns filtered questions

- [ ] **GET /api/questions** works with pagination
  ```bash
  curl "http://localhost:3000/api/questions?page=1&limit=5" \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns 5 questions max

### Practice Endpoints

- [ ] **POST /api/practice/submit** works
  ```bash
  curl -X POST http://localhost:3000/api/practice/submit \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"questionId":"QUESTION_ID","selectedOptionId":"opt-1"}'
  ```
  Expected: 200 status, returns correct/incorrect status

- [ ] **POST /api/practice/explain** works
  ```bash
  curl -X POST http://localhost:3000/api/practice/explain \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"questionId":"QUESTION_ID"}'
  ```
  Expected: 200 status, returns explanation

- [ ] **GET /api/practice/stats** works
  ```bash
  curl http://localhost:3000/api/practice/stats \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns user statistics

### Mock Exam Endpoints

- [ ] **POST /api/mock-exams** works (create exam)
  ```bash
  curl -X POST http://localhost:3000/api/mock-exams \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "totalQuestions": 10,
      "timeLimitMinutes": 20,
      "passingScore": 70,
      "categories": "MIXED",
      "difficulty": "EASY"
    }'
  ```
  Expected: 201 status, returns new exam object

- [ ] **GET /api/mock-exams** works (history)
  ```bash
  curl http://localhost:3000/api/mock-exams \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns exam history

- [ ] **GET /api/mock-exams/[examId]** works
  ```bash
  curl http://localhost:3000/api/mock-exams/EXAM_ID \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns exam details

- [ ] **POST /api/mock-exams/[examId]/submit** works
  ```bash
  curl -X POST http://localhost:3000/api/mock-exams/EXAM_ID/submit \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns exam results

### Analytics Endpoints

- [ ] **GET /api/analytics/dashboard** works
  ```bash
  curl http://localhost:3000/api/analytics/dashboard \
    -H "Authorization: Bearer YOUR_TOKEN"
  ```
  Expected: 200 status, returns dashboard analytics

---

## 🎨 Frontend Integration Checklist

- [ ] Frontend runs successfully (`npm run dev`)
- [ ] Landing page loads at `http://localhost:3000`
- [ ] Sign up page works
- [ ] Sign in page works
- [ ] Dashboard loads after login
- [ ] Practice questions load
- [ ] Answer submission works
- [ ] Mock exam creation works
- [ ] Analytics dashboard displays data

---

## 🔒 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] JWT secret is strong (≥32 characters)
- [ ] Passwords are hashed (never stored in plain text)
- [ ] API requires authentication for protected routes
- [ ] Invalid tokens are rejected (test with expired/invalid token)
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (Next.js handles this)

---

## 🚀 Performance Checklist

- [ ] Redis caching enabled (if REDIS_URL is set)
- [ ] Question queries use caching
- [ ] Pagination works on large datasets
- [ ] Database queries are optimized (check with `prisma:studio`)
- [ ] Response times are acceptable (<500ms for most endpoints)

---

## 📊 Data Validation Checklist

- [ ] Invalid email format is rejected
- [ ] Short passwords are rejected (< 8 characters)
- [ ] Invalid question IDs return 404
- [ ] Invalid pagination params are handled gracefully
- [ ] Missing required fields return 400 errors

---

## 🐛 Error Handling Checklist

- [ ] API returns proper HTTP status codes
- [ ] Error messages are clear and helpful
- [ ] Stack traces are hidden in production
- [ ] Validation errors show field-specific messages
- [ ] Database errors are caught and handled

---

## 📝 Documentation Checklist

- [ ] [SETUP.md](SETUP.md) read and followed
- [ ] [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) reviewed
- [ ] [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) understood
- [ ] API endpoints documented
- [ ] Environment variables documented

---

## 🎯 Optional Features Checklist

### Redis Caching
- [ ] Redis installed/configured
- [ ] `REDIS_URL` set in `.env`
- [ ] Cache service connects successfully
- [ ] Questions are cached (check logs for cache hits)

### OpenAI Integration
- [ ] OpenAI API key obtained
- [ ] `OPENAI_API_KEY` set in `.env`
- [ ] AI explanations work
- [ ] Fallback explanations work (when OpenAI fails)

### PayMongo Integration
- [ ] PayMongo test account created
- [ ] Test API keys configured
- [ ] Payment endpoints work (when implemented)

---

## ✅ Final Verification

- [ ] All tests pass
- [ ] No console errors in browser
- [ ] No errors in terminal/server logs
- [ ] Can complete full user flow:
  1. [ ] Register new account
  2. [ ] Login
  3. [ ] View questions
  4. [ ] Submit answer
  5. [ ] Get explanation
  6. [ ] Create mock exam
  7. [ ] View analytics
- [ ] Ready for development work!

---

## 🆘 Troubleshooting

If any item fails, refer to:
- [SETUP.md](SETUP.md) → Setup instructions
- [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) → API documentation
- Terminal/browser console for error messages
- Supabase logs for database errors

---

**Completion:** When all core items are checked, your backend is ready! 🎉
