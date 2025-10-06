// Public billing configuration (no secrets)
// All sensitive keys are stored in environment variables

export const BILLING_CONFIG = {
  // Stripe product identifiers (public)
  stripe: {
    productId: process.env.EXPO_PUBLIC_STRIPE_PRODUCT_ID || 'fastimateai_pro',
    priceId: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID || 'price_placeholder',
  },
  
  // RevenueCat configuration (public)
  revenueCat: {
    entitlements: {
      proFeatures: 'pro_features',
      unlimitedProposals: 'unlimited_proposals',
    },
    productIdentifiers: {
      ios: process.env.EXPO_PUBLIC_RC_IOS_PRODUCT_ID || 'com.fastimateai.pro',
      android: process.env.EXPO_PUBLIC_RC_ANDROID_PRODUCT_ID || 'com.fastimateai.pro',
    },
  },
  
  // Feature flags
  features: {
    enablePaywall: process.env.EXPO_PUBLIC_ENABLE_PAYWALL === 'true',
    enableStripe: process.env.EXPO_PUBLIC_ENABLE_STRIPE === 'true',
    enableRevenueCat: process.env.EXPO_PUBLIC_ENABLE_REVENUECAT === 'true',
  },
} as const;

export type BillingConfig = typeof BILLING_CONFIG;
