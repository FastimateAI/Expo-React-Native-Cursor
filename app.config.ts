import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  // Load environment variables
  const isStaging = process.env.EXPO_PUBLIC_ENVIRONMENT === 'staging';
  const supabaseUrl = isStaging 
    ? process.env.EXPO_PUBLIC_SUPABASE_URL_STAGING 
    : process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = isStaging
    ? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY_STAGING
    : process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  return {
    ...config,
    name: isStaging ? 'FastimateAI (Staging)' : 'FastimateAI',
    slug: 'fastimateai',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: isStaging ? 'com.fastimateai.staging' : 'com.fastimateai',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundColor: '#ffffff',
      },
      package: isStaging ? 'com.fastimateai.staging' : 'com.fastimateai',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-constants',
        {
          extra: {
            environment: isStaging ? 'staging' : 'production',
            supabaseUrl,
            supabaseAnonKey,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
