# 🍸 DaruGPT - AI-Powered Alcohol Recommendation Platform

An intelligent bartender powered by AI that provides personalized alcohol recommendations with a focus on responsible drinking.

## 🌟 Features

- **AI Bartender Chat** - Conversational AI that recommends drinks based on preferences
- **Smart Discovery** - AI-powered recommendations using Groq LLM
- **Brand Database** - Comprehensive database of premium alcohol brands
- **Responsible Drinking** - Built-in age verification and safety guidelines
- **Regional Availability** - Location-based brand recommendations across India

## 🚀 Quick Start

### Local Development

1. **Clone and Install**
```bash
git clone https://github.com/YOUR_USERNAME/darugpt.git
cd darugpt
npm install
```

2. **Setup Environment**
```bash
# Create .env file
cp .env.example .env

# Add your credentials:
# - DATABASE_URL (PostgreSQL)
# - GROQ_API_KEY (from console.groq.com)
```

3. **Setup Database**
```bash
npm run db:deploy  # Run migrations
npm run db:seed    # Seed with sample data
```

4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI/ML**: Groq API, LangChain
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🌐 Deployment

### Quick Deploy (5 minutes)
See [DEPLOY_QUICKSTART.md](./DEPLOY_QUICKSTART.md) for a rapid deployment guide.

### Detailed Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Database setup options (Vercel Postgres, Railway, Supabase, Neon)
- Environment configuration
- Migration setup
- Production best practices
- Troubleshooting guide

### Deployment Checklist
Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) to ensure nothing is missed.

## 📚 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Local development setup
- [README_DATABASE.md](./README_DATABASE.md) - Database schema and management
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical architecture
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Database commands
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations (dev)
npm run db:deploy    # Deploy migrations (prod)
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://..."
GROQ_API_KEY="gsk_..."
GEMINI_API_KEY="..."  # Optional
NODE_ENV="development"
```

## 🗃️ Database Schema

### Brand Model
- `name` - Brand name (unique)
- `category` - Type (Whiskey, Vodka, Rum, etc.)
- `abv` - Alcohol by Volume
- `rating` - Rating out of 5
- `quality` - Premium, Standard, or Luxury
- `region` - Location availability

See [README_DATABASE.md](./README_DATABASE.md) for more details.

## 🧪 Features Overview

### 1. Age Verification
- Mandatory age check before accessing content
- Responsible drinking promotion

### 2. Bartender Chat
- AI-powered conversational interface
- Personalized recommendations
- Context-aware responses

### 3. Discover Page
- AI-driven brand suggestions
- Filter by preferences
- Detailed brand information

### 4. Brand Directory
- Browse all available brands
- Filter by category, quality, region
- Detailed ratings and specifications

### 5. Responsible Drinking
- Educational content
- Safety guidelines
- Resource links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## ⚠️ Responsible Drinking

This application promotes responsible drinking. Please consume alcohol responsibly:
- Never drink and drive
- Know your limits
- Stay hydrated
- Must be of legal drinking age

## 📧 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Review troubleshooting guides

---

Built with ❤️ using Next.js and AI
