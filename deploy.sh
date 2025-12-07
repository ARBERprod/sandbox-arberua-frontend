#!/bin/sh

echo "🚚 Dploying application"

echo "⬇️ PM2 down"

pm2 stop all

echo "⬇️ Updating base code: main branch"

git pull

echo "📦 Installing Yarn dependencies"

yarn install

echo "🏗️ Compiling assets"

yarn build

echo "⬆️ Rising PM2"

pm2 start yarn --name "Arber" -- start -p 3005

echo "🎉 Deployed application"
