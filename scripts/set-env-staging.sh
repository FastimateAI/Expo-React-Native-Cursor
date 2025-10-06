#!/bin/bash

# Set environment to staging
echo "Setting environment to staging..."

# Copy staging env to .env
if [ -f ".env.staging" ]; then
    cp .env.staging .env
    echo "✅ Copied .env.staging to .env"
else
    echo "❌ .env.staging not found. Please create it first."
    exit 1
fi

# Set environment variable for app.config.ts
export EXPO_PUBLIC_ENVIRONMENT=staging
echo "✅ Set EXPO_PUBLIC_ENVIRONMENT=staging"

echo "Environment switched to staging. Run 'npm run start' to test."
