#!/bin/bash
# ICELINE PRO — Quick Update Script
# Run: bash update.sh

set -e
APP_DIR="/var/www/iceline-pro"
APP_NAME="iceline-pro"

echo "🔄 Updating ICELINE PRO..."
echo "Time: $(date)"

cd "$APP_DIR"

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build
echo "🔨 Building..."
npm run build

# Restart app
echo "♻️ Restarting app..."
pm2 restart "$APP_NAME"

echo "✅ Update complete!"
pm2 status "$APP_NAME"
