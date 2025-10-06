# Billing Configuration

This document captures the billing configuration for FastimateAI mobile app.

## Stripe Configuration

### Test/Staging Keys
- **Publishable Key**: `pk_test_...` (safe for client-side)
- **Secret Key**: `sk_test_...` (server-side only)

### Products & Prices
- **Product ID**: `fastimateai_pro` (placeholder)
- **Price ID**: `price_...` (placeholder)

### Environment Variables
```bash
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## RevenueCat Configuration

### API Keys
- **API Key**: `rc_staging_...` (staging)
- **API Key**: `rc_live_...` (production)

### Entitlements
- **Pro Features**: `pro_features` (placeholder)
- **Unlimited Proposals**: `unlimited_proposals` (placeholder)

### Product Identifiers
- **iOS**: `com.fastimateai.pro` (placeholder)
- **Android**: `com.fastimateai.pro` (placeholder)

### Environment Variables
```bash
EXPO_PUBLIC_REVENUECAT_API_KEY=rc_staging_...
```

## Configuration Files

### config/billing.ts
Contains public-only configuration values (no secrets):
- Product identifiers
- Entitlement names
- Feature flags

### .env files
Contains sensitive keys:
- Stripe secret keys
- RevenueCat API keys
- Service role keys (server-side only)

## Security Notes

- Never commit secret keys to git
- Use environment variables for all sensitive data
- Public keys are safe for client-side use
- Secret keys must stay server-side only
- Test with staging keys before production deployment
