# 🚀 Deployment Checklist

Use this checklist to ensure a smooth deployment of DaruGPT.

## Pre-Deployment Setup

### 1. Code Repository
- [ ] All code is committed
- [ ] No sensitive data (API keys, passwords) in code
- [ ] `.gitignore` properly configured
- [ ] `.env.example` created (see below for template)
- [ ] Code pushed to GitHub

### 2. Environment Variables Obtained
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `GROQ_API_KEY` - Groq API key from console.groq.com
- [ ] `GEMINI_API_KEY` (Optional) - if using Google Gemini features

### 3. Database Setup
- [ ] PostgreSQL database created (Vercel Postgres, Railway, Supabase, or Neon)
- [ ] Database connection string tested locally
- [ ] Database allows external connections

## Deployment Steps

### 1. Deploy to Vercel
- [ ] Logged into Vercel (vercel.com)
- [ ] Connected GitHub repository
- [ ] Project imported successfully
- [ ] Environment variables added in Vercel dashboard
- [ ] Build settings verified (should auto-detect Next.js)
- [ ] Initial deployment successful

### 2. Database Migration
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Logged into Vercel CLI (`vercel login`)
- [ ] Project linked (`vercel link`)
- [ ] Environment variables pulled (`vercel env pull .env.local`)
- [ ] Migrations run (`npm run db:deploy`)
- [ ] Database seeded (`npm run db:seed`)

### 3. Post-Deployment Verification
- [ ] Homepage loads correctly
- [ ] Age verification page works
- [ ] Bartender chat responds to queries
- [ ] Discover page shows recommendations
- [ ] Brands page displays correctly
- [ ] No console errors in browser developer tools
- [ ] Responsive design works on mobile
- [ ] SSL certificate active (https)

## Testing Checklist

### Functionality Tests
- [ ] Age verification accepts valid age
- [ ] Age verification rejects underage users
- [ ] Chat receives and displays messages
- [ ] AI responds with relevant recommendations
- [ ] Brand filtering works (if applicable)
- [ ] Navigation between pages smooth
- [ ] All API endpoints return 200 status

### Performance Tests
- [ ] Initial page load < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No memory leaks in console
- [ ] Images load properly
- [ ] API responses < 2 seconds

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Common Issues & Solutions

### Build Fails
**Issue**: "Cannot find module '@prisma/client'"
- ✅ **Solution**: Added `"postinstall": "prisma generate"` to package.json

**Issue**: "Environment variable DATABASE_URL not found"
- ✅ **Solution**: Add DATABASE_URL in Vercel environment variables

### Runtime Errors
**Issue**: Database connection timeout
- ✅ **Solution**: Check database allows connections from 0.0.0.0/0 or Vercel IPs

**Issue**: GROQ API key invalid
- ✅ **Solution**: Verify key is correct, check for extra spaces

### Database Issues
**Issue**: Tables don't exist
- ✅ **Solution**: Run `npm run db:deploy` to create tables

**Issue**: No data returned
- ✅ **Solution**: Run `npm run db:seed` to populate database

## Environment Variables Template

Create `.env.example` in project root:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# AI Services
GROQ_API_KEY="your_groq_api_key_here"

# Optional: Only if you use Google Gemini features
GEMINI_API_KEY="your_gemini_api_key_here"

# Node Environment
NODE_ENV="development"
```

## Production URLs

**Deployment URL**: _____________________________

**Custom Domain**: _____________________________

**Database Dashboard**: _____________________________

**Vercel Project**: _____________________________

## Monitoring Setup (Post-Launch)

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (optional: Sentry)
- [ ] Performance monitoring enabled
- [ ] Logs reviewed for errors
- [ ] API rate limits understood

## Maintenance Notes

### Regular Tasks
- **Weekly**: Check error logs in Vercel dashboard
- **Monthly**: Review API usage (Groq, Gemini)
- **Quarterly**: Update dependencies (`npm update`)
- **As needed**: Database backups (if not automatic)

### Scaling Considerations
- Monitor database connection pool usage
- Check API rate limits aren't being exceeded
- Review Vercel bandwidth usage
- Consider CDN for static assets if traffic increases

## Contact & Support

- **Vercel Support**: https://vercel.com/support
- **Groq Support**: https://console.groq.com/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

**Deployment Date**: _____________________________

**Deployed By**: _____________________________

**Version**: _____________________________

**Notes**: _____________________________

