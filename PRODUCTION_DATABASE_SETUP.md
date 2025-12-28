# 🗄️ Production Database Setup Guide

## Quick Setup: Neon Database (Recommended)

### Step 1: Create Neon Account (2 minutes)

1. Go to: https://neon.tech
2. Click **"Sign Up"** (can use GitHub)
3. Complete registration

### Step 2: Create a New Project (1 minute)

1. Click **"Create Project"**
2. **Project name:** `darugpt` (or any name you like)
3. **Region:** Choose closest to you (e.g., US East for faster speeds)
4. **Postgres version:** Leave default (16)
5. Click **"Create Project"**

### Step 3: Get Connection String (30 seconds)

After project creation, you'll see a connection string. Copy it:

**Format:**
```
postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Important:** Save this connection string - you'll need it!

### Step 4: Update Vercel Environment Variables

1. Go to: https://vercel.com/anurag161/alcohol-recommendation/settings/environment-variables
2. Find `DATABASE_URL` (or add it if missing)
3. **Replace the value** with your Neon connection string
4. Make sure it's enabled for: Production ✅, Preview ✅, Development ✅
5. Click **"Save"**

### Step 5: Run Database Migrations

```bash
# From your project directory
cd /Users/anuragkumarbharti/Documents/daruai/darugpt

# Pull the production environment variables
npx vercel env pull .env.production

# Copy the production DATABASE_URL to a temporary env
export DATABASE_URL="paste_your_neon_connection_string_here"

# Run migrations
npm run db:deploy

# Seed the database with brands
npm run db:seed
```

### Step 6: Redeploy Your Application

After database is set up:

**Option A: From Vercel Dashboard**
1. Go to: https://vercel.com/anurag161/alcohol-recommendation
2. Click "Deployments"
3. Click ⋮ on latest deployment → "Redeploy"

**Option B: From Terminal**
```bash
git commit --allow-empty -m "Connect to production database"
git push origin main
```

### Step 7: Verify Everything Works

1. Wait 2-3 minutes for deployment to complete
2. Visit: https://alcohol-recommendation-3.vercel.app/bartender
3. Send a message to Bart
4. ✅ You should get a response!

---

## Alternative Options

### Option 2: Vercel Postgres (All-in-One)

**Pros:** Integrated with Vercel, simple setup
**Cons:** Smaller free tier (256 MB)

1. Go to: https://vercel.com/anurag161/alcohol-recommendation/stores
2. Click "Create Database" → "Postgres"
3. Name: `darugpt-db`
4. Region: Select nearest
5. Click "Create"
6. Vercel automatically sets DATABASE_URL environment variable
7. Follow Step 5 above (migrations) and Step 6 (redeploy)

### Option 3: Supabase (Feature-Rich)

**Pros:** 500 MB free, includes auth, storage, real-time
**Cons:** Slightly more complex

1. Go to: https://supabase.com
2. Sign up / Log in
3. Create new project
4. Get connection string from Settings → Database
5. Use "Connection Pooling" URL for better performance
6. Follow Steps 4-6 above

---

## Troubleshooting

### "Connection refused"
- Make sure you copied the full connection string including password
- Verify `?sslmode=require` is at the end

### "Schema not found"
- Run migrations: `npm run db:deploy`
- This creates all necessary tables

### "No brands found"
- Run seed: `npm run db:seed`
- This populates the database with sample data

### "Too many connections"
- Use connection pooling URL (most providers offer this)
- In Neon: Use the "Pooled connection" string instead

---

## Security Best Practices

- ✅ Never commit database URLs to Git
- ✅ Use different databases for development and production
- ✅ Enable connection pooling for production
- ✅ Regular backups (most providers do this automatically)
- ✅ Rotate passwords periodically

---

## Next Steps After Setup

1. ✅ Database created
2. ✅ Connection string added to Vercel
3. ✅ Migrations run
4. ✅ Database seeded
5. ✅ Application redeployed
6. ✅ Test chat functionality
7. ✅ Monitor logs for any issues

---

**Need help?** Check the provider-specific documentation:
- Neon: https://neon.tech/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Supabase: https://supabase.com/docs/guides/database

