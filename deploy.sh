#!/bin/sh

echo "🚚 Dploying application"

echo "⬇️ PM2 down"

pm2 stop all

echo "⬇️ Updating base code: main branch"

git pull

echo "📦 Installing Npm dependencies"

npm install

echo "🏗️ Compiling assets"

npm run build

echo "⬆️ Rising PM2"

pm2 start npm --name "Arber" -- run start -- -p 3005

echo "🎉 Deployed application"
