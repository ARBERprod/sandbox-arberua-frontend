#!/bin/sh

echo "🚚 Deploying application"

echo "⬇️ PM2 down"

pm2 stop all

echo "⬇️ Updating base code: main branch"

git pull

echo "📦 Installing dependencies"

npm ci --legacy-peer-deps

echo "🧹 Clearing Next.js build cache"

# Wipe the compiled output and webpack persistent cache. git pull can leave file
# mtimes such that an incremental build reuses stale chunks (a changed source file
# is not recompiled), so a deploy ends up serving old code under a new build id.
# A clean build guarantees every changed chunk is rebuilt.
rm -rf .next

echo "🏗️ Compiling assets"

npm run build

echo "⬆️ Rising PM2"

pm2 start npm --name "Arber" -- run start -- -p 3005

echo "🎉 Deployed application"
