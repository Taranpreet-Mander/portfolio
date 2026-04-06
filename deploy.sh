#!/bin/bash

# GitHub Pages Deployment Script for Portfolio
# This script will push your portfolio to GitHub Pages

# ===== INSTRUCTIONS =====
# 1. Create a new GitHub repository named "portfolio"
# 2. Update the variables below with your information
# 3. Run this script: bash deploy.sh
# 4. Your portfolio will be live at: https://yourusername.github.io/portfolio

# ===== CONFIGURATION =====
GITHUB_USERNAME="Taranpreetsingh077"
REPO_NAME="portfolio"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
BRANCH="gh-pages"

echo "🚀 GitHub Pages Deployment Script"
echo "=================================="
echo "Username: $GITHUB_USERNAME"
echo "Repository: $REPO_NAME"
echo "URL: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial portfolio commit"
fi

# Add remote origin if not already added
if ! git remote get-url origin &> /dev/null; then
    echo "📝 Adding remote origin..."
    git remote add origin $REPO_URL
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main 2>/dev/null || true

# Add all changes
echo "📝 Staging files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Update portfolio - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to main branch
echo "🚀 Pushing to main branch..."
git push -u origin main

# Deploy to gh-pages
echo "🌐 Deploying to GitHub Pages..."
git push origin main:gh-pages

# Final message
echo ""
echo "✅ Deployment Complete!"
echo "=================================="
echo "🎉 Your portfolio is live at:"
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""
echo "⏱️  It may take a few minutes to appear."
echo "💪 Share this link everywhere!"
