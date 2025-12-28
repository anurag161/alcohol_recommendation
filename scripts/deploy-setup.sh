#!/bin/bash

# DaruGPT Deployment Setup Script
# This script helps prepare your project for deployment

set -e

echo "🚀 DaruGPT Deployment Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "Creating .env from .env.example..."
    
    # Create .env.example if it doesn't exist
    if [ ! -f .env.example ]; then
        echo "Creating .env.example..."
        cat > .env.example << 'EOF'
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# AI Services
GROQ_API_KEY="your_groq_api_key_here"

# Optional: Only if you use Google Gemini features
GEMINI_API_KEY="your_gemini_api_key_here"

# Node Environment
NODE_ENV="development"
EOF
    fi
    
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}Please edit .env and add your actual values${NC}"
    exit 1
fi

# Check for required environment variables
echo "Checking environment variables..."
source .env

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL not set in .env${NC}"
    exit 1
else
    echo -e "${GREEN}✅ DATABASE_URL found${NC}"
fi

if [ -z "$GROQ_API_KEY" ]; then
    echo -e "${RED}❌ GROQ_API_KEY not set in .env${NC}"
    exit 1
else
    echo -e "${GREEN}✅ GROQ_API_KEY found${NC}"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing dependencies..."
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi

# Generate Prisma Client
echo ""
echo "Generating Prisma Client..."
npm run db:generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"

# Check database connection
echo ""
echo "Testing database connection..."
if npx prisma db push --skip-generate > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo "Please check your DATABASE_URL"
    exit 1
fi

# Run migrations
echo ""
echo "Running database migrations..."
npm run db:deploy
echo -e "${GREEN}✅ Migrations completed${NC}"

# Seed database
echo ""
read -p "Do you want to seed the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:seed
    echo -e "${GREEN}✅ Database seeded${NC}"
fi

# Build check
echo ""
echo "Running build check..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    echo "Please fix build errors before deploying"
    exit 1
fi

# Final checklist
echo ""
echo "=============================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=============================="
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Import project on Vercel (https://vercel.com/new)"
echo "3. Add environment variables in Vercel dashboard:"
echo "   - DATABASE_URL"
echo "   - GROQ_API_KEY"
echo "4. Deploy!"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
echo ""

