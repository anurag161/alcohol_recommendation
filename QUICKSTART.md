# 🚀 Quick Start Guide

## 1. Install PostgreSQL

**Choose your platform:**

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Ubuntu
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows
Download from: https://www.postgresql.org/download/windows/

---

## 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Run these commands:
CREATE DATABASE darugpt;
\q
```

---

## 3. Update `.env.local`

Edit your `.env.local` file with your PostgreSQL credentials:

```env
# Replace 'password' with your PostgreSQL password
DATABASE_URL="postgresql://postgres:password@localhost:5432/darugpt"

# Your API keys (get from https://console.groq.com)
GROQ_API_KEY=your_groq_api_key_here
```

---

## 4. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:migrate

# Seed with liquor data
npm run db:seed
```

---

## 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## ✅ That's it!

Your bartender AI will now use the PostgreSQL database!

## 🔧 Useful Commands

```bash
# View database in GUI
npm run db:studio

# Reset database (⚠️ deletes all data)
npm run db:reset

# Apply migrations in production
npm run db:deploy
```

## ❓ Troubleshooting

**Can't connect to database?**
- Check PostgreSQL is running: `brew services list` (macOS)
- Verify DATABASE_URL in `.env.local`
- Check password is correct

**Migration errors?**
```bash
npm run db:reset
npm run db:migrate
npm run db:seed
```

For detailed documentation, see `README_DATABASE.md`
