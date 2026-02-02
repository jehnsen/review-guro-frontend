# 🚀 Quick Setup Guide - ReviewGuro

Follow these steps to get your ReviewGuro backend up and running.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Redis installed locally OR use a cloud Redis service (optional)
- OpenAI API key (optional - for AI features)

## Step-by-Step Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Set Up Supabase Database

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **Settings** → **Database** → **Connection String**
4. Copy the **Connection pooling** string (select **Transaction mode**)
5. Save it for the next step

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values:

```env
# REQUIRED - Database
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# REQUIRED - Authentication
JWT_SECRET="your-super-secret-minimum-32-characters-long-key-here"

# REQUIRED - Frontend
FRONTEND_URL="http://localhost:3000"

# REQUIRED - PayMongo (use test keys for development)
PAYMONGO_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxx"
PAYMONGO_PUBLIC_KEY="pk_test_xxxxxxxxxxxxxxxx"

# OPTIONAL - Redis (caching will be disabled if not provided)
REDIS_URL="redis://localhost:6379"

# OPTIONAL - OpenAI (AI features will use fallbacks)
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxx"
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4️⃣ Set Up the Database Schema

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database (for development)
npm run prisma:push

# OR run migrations (recommended for production)
npm run prisma:migrate
```

### 5️⃣ Seed the Database

```bash
npm run seed
```

This will create:
- 12 sample questions across all categories
- A test user account (email: `test@reviewguro.com`, password: `TestPass123`)

### 6️⃣ Start the Development Server

```bash
npm run dev
```

Your API will be running at **http://localhost:3000/api**

## 🧪 Test Your Setup

### Test 1: Health Check

Open your browser and go to:
```
http://localhost:3000
```

You should see the ReviewGuro landing page.

### Test 2: Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yourname@example.com",
    "password": "YourPassword123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc...",
    "expiresIn": "7d"
  }
}
```

### Test 3: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@reviewguro.com",
    "password": "TestPass123"
  }'
```

Save the `accessToken` from the response for the next tests.

### Test 4: Get Questions

```bash
# Replace YOUR_TOKEN with the token from login
curl "http://localhost:3000/api/questions?limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test 5: Submit an Answer

```bash
# Get a question first, then use its ID and an option ID
curl -X POST http://localhost:3000/api/practice/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "QUESTION_ID_FROM_PREVIOUS_STEP",
    "selectedOptionId": "opt-1"
  }'
```

## 🔧 Optional: Set Up Redis (for caching)

### Using Docker (Recommended)

```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

### Using Homebrew (macOS)

```bash
brew install redis
brew services start redis
```

### Using APT (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
```

Test Redis connection:
```bash
redis-cli ping
# Should respond with: PONG
```

## 🎨 View Your Database

### Using Prisma Studio

```bash
npm run prisma:studio
```

This opens a visual database editor at `http://localhost:5555`

### Using Supabase Dashboard

1. Go to your Supabase project
2. Click **Table Editor** in the sidebar
3. Browse your tables and data

## 📱 Connect the Frontend

The frontend is already configured to use the local API. Make sure:

1. The Next.js dev server is running (`npm run dev`)
2. Open `http://localhost:3000` in your browser
3. Sign in with: `test@reviewguro.com` / `TestPass123`

## 🐛 Troubleshooting

### "Environment validation failed"

Make sure all required environment variables are set in `.env`. Check the error message for which variable is missing.

### "Cannot connect to database"

- Verify your `DATABASE_URL` is correct
- Check if your Supabase database is active
- Make sure you're using the connection pooling URL, not the direct connection

### "Redis connection error"

If you don't have Redis installed:
- Either install it following the steps above
- Or remove/comment out `REDIS_URL` from `.env` (caching will be disabled but the app will work)

### "Prisma Client is not generated"

Run:
```bash
npm run prisma:generate
```

### Port 3000 is already in use

Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Next Steps

- Read [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for full API documentation
- Configure PayMongo test credentials
- Set up OpenAI API for AI explanations
- Deploy to production (Vercel + Supabase)

## 🆘 Need Help?

Check the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

Happy coding! 🎉
