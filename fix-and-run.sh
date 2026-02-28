#!/bin/bash

echo "🔧 Fixing npm permissions and installing..."
echo ""

# Fix npm cache permissions
echo "Step 1: Fixing npm cache permissions..."
sudo chown -R $(whoami) ~/.npm

# Install dependencies
echo ""
echo "Step 2: Installing dependencies..."
npm install

# Run the dev server
echo ""
echo "Step 3: Starting development server..."
echo "🎂 Your birthday site will open at http://localhost:5173"
echo ""
npm run dev
