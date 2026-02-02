#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================================="
echo "   Vercel Deployment Fix - Validation Script"
echo "=================================================="
echo ""

# Check if Prisma Client can be generated
echo "1. Testing Prisma Client generation..."
if npm run prisma:generate > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Prisma Client generated successfully${NC}"
else
  echo -e "${RED}✗ Failed to generate Prisma Client${NC}"
  exit 1
fi

# Check if schema has correct binary targets
echo ""
echo "2. Checking Prisma schema binary targets..."
if grep -q "rhel-openssl-3.0.x" prisma/schema.prisma; then
  echo -e "${GREEN}✓ Binary targets configured for Vercel${NC}"
else
  echo -e "${RED}✗ Missing rhel-openssl-3.0.x binary target${NC}"
  exit 1
fi

# Check if package.json has postinstall script
echo ""
echo "3. Checking package.json scripts..."
if grep -q '"postinstall": "prisma generate"' package.json; then
  echo -e "${GREEN}✓ postinstall script configured${NC}"
else
  echo -e "${RED}✗ Missing postinstall script${NC}"
  exit 1
fi

# Check for required environment variables
echo ""
echo "4. Checking environment variables..."
MISSING_VARS=()

if [ -z "$DATABASE_URL" ]; then
  MISSING_VARS+=("DATABASE_URL")
fi

if [ -z "$JWT_SECRET" ]; then
  MISSING_VARS+=("JWT_SECRET")
fi

if [ -z "$REFRESH_TOKEN_SECRET" ]; then
  MISSING_VARS+=("REFRESH_TOKEN_SECRET")
fi

if [ ${#MISSING_VARS[@]} -eq 0 ]; then
  echo -e "${GREEN}✓ Required environment variables present${NC}"
else
  echo -e "${YELLOW}⚠ Missing environment variables (will need to be set in Vercel):${NC}"
  for var in "${MISSING_VARS[@]}"; do
    echo "  - $var"
  done
fi

# Check if vercel.json exists
echo ""
echo "5. Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
  echo -e "${GREEN}✓ vercel.json exists${NC}"
else
  echo -e "${YELLOW}⚠ vercel.json not found (optional)${NC}"
fi

# Try to build the project
echo ""
echo "6. Testing Next.js build..."
echo -e "${YELLOW}Running: npm run build${NC}"
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  echo "Run 'npm run build' to see detailed errors"
  exit 1
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✓ All checks passed!${NC}"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Ensure Vercel environment variables are set:"
echo "   - DATABASE_URL (with pgbouncer=true&connection_limit=1)"
echo "   - DIRECT_URL"
echo "   - JWT_SECRET"
echo "   - REFRESH_TOKEN_SECRET"
echo ""
echo "2. Commit and push changes:"
echo "   git add ."
echo "   git commit -m 'fix: vercel deployment configuration'"
echo "   git push origin main"
echo ""
echo "3. Monitor Vercel deployment logs"
echo "   vercel logs --follow"
echo ""
