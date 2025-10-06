# FastimateAI Mobile App

Customer-facing mobile app for FastimateAI built with Expo React Native, TypeScript, and Expo Router.

## Tech Stack

- **Expo React Native** (latest)
- **TypeScript**
- **Expo Router** (file-based routing)
- **NativeBase** (UI components)
- **@tanstack/react-query** (data fetching)
- **@supabase/supabase-js** (backend)
- **Supabase** (database & auth)

## Features

- 🔐 **Authentication** - Supabase Auth with sign-in/sign-up
- 📊 **Dashboard** - KPIs for customers, proposals, and revenue
- 👥 **Customers** - Paginated list with details and recent proposals
- 🏥 **Health Check** - Database connectivity verification
- 🔒 **Read-Only** - Mobile app has read-only access to data

## Environment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

Copy the template and fill in your values:
```bash
cp env.template .env
```

Required variables:
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### 3. Environment Switching

**Staging Environment:**
```bash
./scripts/set-env-staging.sh
npm run start
```

**Production Environment:**
```bash
# Set EXPO_PUBLIC_ENVIRONMENT=production in .env
npm run start
```

## Development

### Start Development Server
```bash
npm run start
```

### Database Operations
```bash
# Generate TypeScript types
npm run db:types

# Apply migrations to staging
npm run db:push

# Reset database with schema
npm run db:reset
```

### Health Check
The app includes a Health tab that verifies:
- Database connectivity
- Environment (staging/production)
- Basic data access

## Project Structure

```
app/
├── (auth)/          # Authentication screens
├── (tabs)/          # Tab navigation screens
│   ├── dashboard.tsx    # KPIs dashboard
│   ├── customers/       # Customer management
│   └── health.tsx       # Health check
└── customers/       # Customer details (non-tab)

lib/
├── auth.tsx         # Auth provider & hooks
├── db.ts           # Type-safe Supabase client
└── queries.ts      # Database query helpers

supabase/
├── migrations/     # Database migrations
├── schema/         # Schema dumps
└── seed/          # Seed data

types/
└── database.types.ts  # Generated TypeScript types
```

## Backend Migration

This repo includes Supabase backend infrastructure:

- **Migrations** - Versioned database changes
- **Schema** - Baseline schema from production
- **Types** - Auto-generated TypeScript types
- **RLS Policies** - Row-level security for read-only access

See `supabase/README.md` for backend operations.

## Security

- **Read-Only Access** - Mobile app uses anonymous key with RLS policies
- **No Secrets** - All sensitive keys stored in environment variables
- **Staging First** - All development targets staging environment
- **Production Safety** - Never commit production credentials

## Billing Integration

- **Stripe** - Payment processing (staging keys)
- **RevenueCat** - Subscription management (staging keys)

See `docs/billing-config.md` for configuration details.

## Contributing

1. Make changes in staging environment
2. Test with Health tab
3. Commit with clear messages
4. Never commit secrets or production configs

## Support

For issues or questions, check:
- Health tab for connectivity issues
- `supabase/README.md` for backend operations
- `docs/billing-config.md` for billing setup