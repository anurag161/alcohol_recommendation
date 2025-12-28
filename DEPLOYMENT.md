# Deployment Guide for DaruGPT

This guide will walk you through deploying your DaruGPT application to production.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account (to push your code)
- A Vercel account (free tier works)
- A Groq API key (get one at https://console.groq.com)
- A PostgreSQL database (options below)

## Step 1: Prepare Your Repository

### 1.1 Create a `.env.example` file

Create this file in your project root to document required environment variables:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# AI Services
GROQ_API_KEY="your_groq_api_key_here"

# Optional: Only if you use Google Gemini features
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 1.2 Ensure `.env` is in `.gitignore`

Check that your `.gitignore` includes:
```
.env
.env.local
.env*.local
```

### 1.3 Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/darugpt.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Database

You have several options for PostgreSQL hosting:

### Option A: Vercel Postgres (Recommended for simplicity)

1. Go to https://vercel.com/dashboard
2. Click on "Storage" → "Create Database"
3. Select "Postgres"
4. Choose a name and region
5. Copy the `DATABASE_URL` from the connection string

### Option B: Railway

1. Go to https://railway.app
2. Create a new project
3. Add PostgreSQL from the service catalog
4. Copy the `DATABASE_URL` from the connection tab

### Option C: Supabase

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (choose "Connection Pooling" mode)

### Option D: Neon (Serverless Postgres)

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

## Step 3: Deploy to Vercel

### 3.1 Connect Your Repository

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "darugpt" project

### 3.2 Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or leave as default)
- **Output Directory**: Leave as default (`.next`)
- **Install Command**: `npm install` (or leave as default)

### 3.3 Add Environment Variables

In the Vercel deployment settings, add these environment variables:

```
DATABASE_URL=your_postgres_connection_string
GROQ_API_KEY=your_groq_api_key
```

**Important**: If using Vercel Postgres, the `DATABASE_URL` will be automatically injected if you connected the database to your project.

### 3.4 Deploy

Click "Deploy" and wait for the build to complete.

## Step 4: Run Database Migrations

After the first deployment, you need to set up your database schema:

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.local
```

5. Run migrations:
```bash
npm run db:deploy
```

6. Seed the database (if you have a seed file):
```bash
npm run db:seed
```

### Option B: Using Prisma Studio in Development

1. Create a local `.env` file with your production `DATABASE_URL`
2. Run migrations:
```bash
npx prisma migrate deploy
```

3. Seed the database:
```bash
npm run db:seed
```

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://darugpt.vercel.app`)
2. Test the age verification page
3. Navigate to the bartender page and test the AI chat
4. Check the discover page for recommendations
5. Verify the brands page loads correctly

## Step 6: Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for SSL certificate provisioning (automatic)

## Environment Variables Reference

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | Your database provider |
| `GROQ_API_KEY` | Yes | Groq AI API key for chat | https://console.groq.com |
| `GEMINI_API_KEY` | No | Google Gemini API key (if needed) | https://makersuite.google.com/app/apikey |

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Age verification works
- [ ] Database queries return data
- [ ] AI chat responds correctly
- [ ] All pages are accessible
- [ ] No console errors in browser
- [ ] Responsive design works on mobile
- [ ] SSL certificate is active

## Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"
- **Solution**: Ensure your build script includes `prisma generate`: `"build": "prisma generate && next build"`

**Error**: Database connection fails
- **Solution**: Check that `DATABASE_URL` is correctly set in Vercel environment variables
- Ensure the database allows connections from Vercel's IP addresses

### Runtime Errors

**Error**: "PrismaClient is unable to be run in the browser"
- **Solution**: Ensure you're only importing `prisma` in server components or API routes, not client components

**Error**: "GROQ_API_KEY is not defined"
- **Solution**: Add the environment variable in Vercel dashboard and redeploy

### Database Issues

**Error**: "Table does not exist"
- **Solution**: Run migrations using `npx prisma migrate deploy`

**Error**: "No brands found"
- **Solution**: Run the seed script to populate the database

## Continuous Deployment

Once set up, any push to your `main` branch will automatically trigger a new deployment on Vercel.

To deploy a different branch to preview:
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
```

Vercel will create a preview deployment automatically.

## Monitoring and Logs

- **View Logs**: Go to your Vercel project → Deployments → Click on a deployment → View Function Logs
- **Analytics**: Enable Vercel Analytics in your project settings for visitor insights
- **Speed Insights**: Enable Speed Insights to monitor performance

## Scaling Considerations

As your app grows:
- Consider upgrading your database plan for more connections
- Monitor API usage for Groq API (they have rate limits)
- Enable Vercel's Edge Functions for faster response times globally
- Add caching strategies for frequently accessed data

## Security Best Practices

- [ ] Never commit `.env` files
- [ ] Rotate API keys periodically
- [ ] Use environment variables for all sensitive data
- [ ] Enable Vercel's DDoS protection
- [ ] Keep dependencies updated (`npm audit fix`)
- [ ] Implement rate limiting for API routes if needed

## Support

For issues specific to:
- **Vercel**: https://vercel.com/support
- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs

---

## Quick Deployment Checklist

For experienced users, here's the TL;DR:

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Deploy"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Deploy on Vercel
# - Import from GitHub
# - Add DATABASE_URL and GROQ_API_KEY
# - Deploy

# 3. Run migrations
vercel env pull .env.local
npm run db:deploy
npm run db:seed

# 4. Verify
# Visit your-app.vercel.app
```

Good luck with your deployment! 🚀

