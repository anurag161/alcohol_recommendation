# Daru GPT Database Setup Guide

## Prerequisites

1. **PostgreSQL** installed and running
2. **Node.js** and **npm** installed

## Quick Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download and install from [PostgreSQL.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Access PostgreSQL
psql postgres

# Create database
CREATE DATABASE darugpt;

# Create user (optional, or use default 'postgres')
CREATE USER darugpt_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE darugpt TO darugpt_user;

# Exit
\q
```

### 3. Configure Environment

Update your `.env.local` file with the correct database URL:

```env
# If using default postgres user:
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/darugpt"

# Or if you created a specific user:
DATABASE_URL="postgresql://darugpt_user:your_password@localhost:5432/darugpt"
```

### 4. Run Migrations & Seed

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:migrate

# Seed with initial data
npm run db:seed
```

## Database Schema

### Brand Table

| Column    | Type     | Description                              |
|-----------|----------|------------------------------------------|
| id        | String   | Unique identifier (CUID)                 |
| name      | String   | Brand name (unique)                      |
| category  | String   | Whiskey, Vodka, Rum, Gin, Tequila, etc. |
| abv       | Float    | Alcohol By Volume (percentage)           |
| rating    | Float    | Rating out of 5                          |
| quality   | String   | Premium, Standard, Luxury                |
| region    | String   | Delhi, Bangalore, Goa, etc.              |
| createdAt | DateTime | Record creation timestamp                |
| updatedAt | DateTime | Record update timestamp                  |

**Indexes:**
- category
- region
- quality

## NPM Scripts

```bash
# Generate Prisma client
npm run db:generate

# Create migration
npm run db:migrate

# Apply migrations (production)
npm run db:deploy

# Seed database
npm run db:seed

# Open Prisma Studio (GUI)
npm run db:studio

# Reset database (⚠️ DELETES ALL DATA)
npm run db:reset
```

## API Usage

### Query Brands from Database

```typescript
import { prisma } from '@/lib/db'

// Get all brands
const brands = await prisma.brand.findMany()

// Filter by category
const whiskies = await prisma.brand.findMany({
  where: { category: 'Whiskey' }
})

// Filter by region and quality
const premiumDelhiBrands = await prisma.brand.findMany({
  where: {
    region: 'Delhi',
    quality: 'Premium'
  }
})

// Search by name
const searchResults = await prisma.brand.findMany({
  where: {
    name: {
      contains: 'Jack',
      mode: 'insensitive'
    }
  }
})

// Get brands with rating > 4.5
const topRated = await prisma.brand.findMany({
  where: {
    rating: {
      gte: 4.5
    }
  },
  orderBy: {
    rating: 'desc'
  }
})
```

## Troubleshooting

### Connection Issues

**Error: "Can't reach database server"**
- Ensure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check DATABASE_URL in `.env.local`
- Verify PostgreSQL is listening on port 5432

**Error: "Authentication failed"**
- Check username and password in DATABASE_URL
- Ensure user has access to the database

### Migration Issues

**Error: "Migration failed"**
```bash
# Reset and recreate
npm run db:reset
npm run db:migrate
npm run db:seed
```

### Prisma Client Issues

**Error: "PrismaClient is unable to be run in the browser"**
- Ensure you're only importing `prisma` in server-side code (API routes)
- Never use Prisma in client components

## Production Deployment

### Vercel/Railway/Render

1. Add DATABASE_URL to environment variables
2. Use connection pooling for better performance:
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true"
   ```

3. Run migrations during build:
   ```json
   {
     "scripts": {
       "build": "prisma generate && prisma migrate deploy && next build"
     }
   }
   ```

### Connection Pooling

For production, use a connection pooler like **PgBouncer** or **Supabase Pooler**:

```env
# Direct connection
DATABASE_URL="postgresql://..."

# Pooled connection
DATABASE_POOLED_URL="postgresql://...?pgbouncer=true"
```

## Maintenance

### Backup Database

```bash
pg_dump darugpt > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql darugpt < backup_20240101.sql
```

### Add New Brands

```typescript
await prisma.brand.create({
  data: {
    name: 'New Brand',
    category: 'Whiskey',
    abv: 40.0,
    rating: 4.5,
    quality: 'Premium',
    region: 'Mumbai'
  }
})
```

## Support

For issues or questions:
1. Check Prisma docs: https://www.prisma.io/docs
2. PostgreSQL docs: https://www.postgresql.org/docs/
3. Check application logs
