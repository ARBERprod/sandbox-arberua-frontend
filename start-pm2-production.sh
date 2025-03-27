#!/bin/sh

echo "Останавливаем и удаляем все процессы в PM2."

pm2 stop all

pm2 delete all

# Установка зависимостей Npm
echo "📦 Установка зависимостей Npm"

npm install

# Компиляция ассетов
echo "🏗️ Компиляция ассетов"

npm run build

echo "Запускаем новый процесс 'Arber' на порту 3005."

pm2 start npm --name "Arber" -- run start -- -p 3005
