# Supabase Backend Operations

This directory contains the Supabase backend configuration, migrations, and operations for FastimateAI.

## Safety Rules

- **NEVER** point to production from this repo
- **NEVER** commit service role keys or secrets
- **ALWAYS** use staging for development and testing
- **ALWAYS** backup production before making changes

## Project Linking

### Link to Production (Read-Only)
```bash
# Get your project ref from Supabase Studio → Project Settings → General
./supabase-cli link --project-ref <your-prod-project-ref>
```

### Link to Staging
```bash
# Create staging project in Supabase Studio first
./supabase-cli link --project-ref <your-staging-project-ref>
```

## Database Operations

### Apply Migrations to Staging
```bash
npm run db:push
```

### Reset Database with Schema
```bash
npm run db:reset
```

### Generate TypeScript Types
```bash
npm run db:types
```

### Start Local Development
```bash
npm run db:start
npm run db:stop
```

## Schema Management

- `supabase/schema/schema.sql` - Generated baseline schema (DO NOT EDIT)
- `supabase/migrations/` - Versioned database changes
- `supabase/seed/seed.sql` - Development seed data

## Environment Variables

Required environment variables (see `env.template`):

- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `EXPO_PUBLIC_REVENUECAT_API_KEY` - RevenueCat API key

## Security Notes

- Anonymous keys are safe for client-side use
- Service role keys must stay server-side only
- Row Level Security (RLS) policies control data access
- Mobile app uses read-only policies for anon role
