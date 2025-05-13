#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git fetch origin
git reset --hard origin/main

git pull origin main
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload aidfastbd_nextjs

echo "Deployment Finished!"