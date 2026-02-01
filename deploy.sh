#!/bin/bash

# Vercel Deployment Script - JavaScript Learning Hub

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       🚀 JavaScript Learning Hub - Deployment                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the design-patterns-react directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run this script from the design-patterns-react directory"
    exit 1
fi

echo "✅ Project: JavaScript Learning Hub"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build the React application
echo "🔨 Building React application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

# Try Vercel CLI deployment
echo "🌐 Attempting Vercel CLI deployment..."
echo ""

vercel --prod --yes > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║              ✅ DEPLOYMENT SUCCESSFUL! 🎉                    ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Your JavaScript Learning Hub is now live!"
    echo ""
else
    echo "⚠️  Vercel CLI deployment blocked by network restrictions"
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║          📤 MANUAL DEPLOYMENT OPTIONS                         ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "✅ Build completed successfully - Ready for deployment!"
    echo "📦 Output directory: dist/"
    echo ""
    echo "Choose one of these methods:"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  METHOD 1: Vercel Drag & Drop (Easiest)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  1. Open: https://vercel.com/new"
    echo "  2. Drag the 'dist' folder into the browser"
    echo "  3. Your site will be live instantly!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  METHOD 2: GitHub Import (Auto-deployments)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  1. Push to GitHub: git push origin main"
    echo "  2. Go to: https://vercel.com/new"
    echo "  3. Import: javascript-learning-hub"
    echo "  4. Click Deploy"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🚀 Opening Vercel and dist folder..."
    echo ""

    sleep 2
    open "https://vercel.com/new"
    sleep 1
    open dist

    echo "✨ Ready for manual deployment!"
    echo ""
fi

echo "🔄 To redeploy: ./deploy.sh"
echo ""
