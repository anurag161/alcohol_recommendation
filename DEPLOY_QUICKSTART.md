# ⚡ Quick Deploy Guide (5 Minutes)

Deploy DaruGPT to production in 5 minutes!

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free: https://vercel.com/signup)
- [ ] Groq API key (free: https://console.groq.com)

## Step 1: Get Your API Key (1 min)

1. Go to https://console.groq.com
2. Sign up / Log in
3. Create an API key
4. Copy it somewhere safe

## Step 2: Push to GitHub (1 min)

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/darugpt.git
git push -u origin main
```

## Step 3: Setup Database (2 min)

### Option A: Vercel Postgres (Easiest)
1. Go to https://vercel.com/dashboard
2. Storage → Create Database → Postgres
3. Copy the `DATABASE_URL`

### Option B: Neon (Generous Free Tier)
1. Go to https://neon.tech
2. Create new project
3. Copy connection string

## Step 4: Deploy on Vercel (1 min)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```
4. Click **Deploy** ✨

## Step 5: Setup Database (30 seconds)

Install Vercel CLI and run migrations:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
npm run db:deploy
npm run db:seed
```

## Done! 🎉

Your app is live at: `https://your-project.vercel.app`

---

## Troubleshooting

**Build failed?**
- Check environment variables are set correctly
- Look at build logs in Vercel dashboard

**Database connection error?**
- Verify DATABASE_URL format: `postgresql://user:pass@host:5432/db`
- Check database allows external connections

**AI not responding?**
- Verify GROQ_API_KEY is correct
- Check API quota at console.groq.com

---

## Next Steps

- ✅ Test all pages
- ✅ Add custom domain (optional)
- ✅ Enable Vercel Analytics
- ✅ Set up monitoring

**Need more help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

