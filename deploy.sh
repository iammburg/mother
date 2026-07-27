#!/bin/bash

# Stop on error
set -e

echo "🚀 Starting deployment update..."

# 1. Pull latest code
echo "📥 Pulling latest changes from Git..."
git pull

# 2. Install dependencies if package.json updated
echo "📦 Installing dependencies..."
pnpm install

# 3. Prisma generate
echo "🗄️ Generating Prisma client..."
pnpm run prisma-generate

# 4. Build application
echo "🏗️ Building application..."
pnpm run build

# 5. Restart PM2 process
echo "🔄 Restarting PM2 process..."
pm2 restart mother-app

echo "✅ Deployment updated successfully!"
