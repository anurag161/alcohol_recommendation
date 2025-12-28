#!/bin/bash

# Production Database Setup Script for DaruGPT
# This script helps you set up your cloud database

set -e

echo "🗄️  DaruGPT Production Database Setup"
echo "======================================"
echo ""

# Check if DATABASE_URL argument is provided
if [ -z "$1" ]; then
    echo "❌ Error: No database URL provided"
    echo ""
    echo "Usage:"
    echo "  ./scripts/setup-production-db.sh 'postgresql://user:pass@host:5432/db'"
    echo ""
    echo "Get your database URL from:"
    echo "  - Neon: https://neon.tech (recommended)"
    echo "  - Vercel Postgres: https://vercel.com/storage"
    echo "  - Supabase: https://supabase.com"
    echo ""
    exit 1
fi

DATABASE_URL="$1"

echo "📊 Database URL provided"
echo "🔗 Connection string: ${DATABASE_URL:0:30}..."
echo ""

# Export DATABASE_URL
export DATABASE_URL

echo "1️⃣  Generating Prisma Client..."
npm run db:generate
echo "✅ Prisma Client generated"
echo ""

echo "2️⃣  Running database migrations..."
npm run db:deploy
echo "✅ Migrations completed"
echo ""

echo "3️⃣  Seeding database with sample data..."
npm run db:seed
echo "✅ Database seeded"
echo ""

echo "======================================"
echo "🎉 Production Database Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Add this DATABASE_URL to Vercel:"
echo "   https://vercel.com/anurag161/alcohol-recommendation/settings/environment-variables"
echo ""
echo "2. Also add GROQ_API_KEY if not already done"
echo ""
echo "3. Redeploy your application:"
echo "   git commit --allow-empty -m 'Connect production database' && git push"
echo ""
echo "4. Test your app:"
echo "   https://alcohol-recommendation-3.vercel.app"
echo ""
echo "✨ Your database is ready for production!"
echo ""

