#!/bin/bash

# Environment Variables Checker for DaruGPT

echo "🔍 Checking Environment Variables..."
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "💡 Create one with:"
    echo "   DATABASE_URL=your_postgresql_url"
    echo "   GROQ_API_KEY=your_groq_key"
    exit 1
fi

# Source the .env file
source .env

# Check DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
else
    echo "✅ DATABASE_URL is set"
    # Check if it's a placeholder
    if [[ "$DATABASE_URL" == *"USER:PASSWORD"* ]]; then
        echo "⚠️  DATABASE_URL appears to be a placeholder"
    fi
fi

# Check GROQ_API_KEY
if [ -z "$GROQ_API_KEY" ]; then
    echo "❌ GROQ_API_KEY not set"
else
    echo "✅ GROQ_API_KEY is set"
    # Check if it starts with gsk_
    if [[ "$GROQ_API_KEY" == gsk_* ]]; then
        echo "✅ GROQ_API_KEY format looks correct"
    else
        echo "⚠️  GROQ_API_KEY doesn't start with 'gsk_' - verify it's correct"
    fi
fi

echo ""
echo "===================================="
echo "📝 Next Steps:"
echo ""
echo "1. Make sure these same variables are in Vercel:"
echo "   https://vercel.com/anurag161/alcohol-recommendation/settings/environment-variables"
echo ""
echo "2. After adding variables in Vercel, redeploy:"
echo "   - Click 'Redeploy' in Vercel dashboard"
echo "   - Or push an empty commit: git commit --allow-empty -m 'Trigger redeploy' && git push"
echo ""
echo "3. Run migrations on production database:"
echo "   npx vercel env pull .env.local"
echo "   npm run db:deploy"
echo "   npm run db:seed"
echo ""

