@echo off
REM GitHub Pages Deployment Script for Portfolio (Windows)
REM This script will push your portfolio to GitHub Pages

REM ===== INSTRUCTIONS =====
REM 1. Create a new GitHub repository named "portfolio"
REM 2. Update the variables below with your information
REM 3. Run this script: deploy.bat
REM 4. Your portfolio will be live at: https://yourusername.github.io/portfolio

REM ===== CONFIGURATION =====
set GITHUB_USERNAME=Taranpreetsingh077
set REPO_NAME=portfolio
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
set BRANCH=gh-pages

echo.
echo ========================================
echo 🚀 GitHub Pages Deployment Script
echo ========================================
echo Username: %GITHUB_USERNAME%
echo Repository: %REPO_NAME%
echo URL: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo.

REM Check if git is installed
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed. Please install Git first.
    exit /b 1
)

REM Initialize git if not already done
if not exist ".git" (
    echo 📝 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial portfolio commit"
)

REM Add remote origin if not already added
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 📝 Adding remote origin...
    git remote add origin %REPO_URL%
)

REM Pull latest changes
echo 📥 Pulling latest changes...
git pull origin main 2>nul || echo.

REM Add all changes
echo 📝 Staging files...
git add .

REM Commit
echo 💾 Creating commit...
git commit -m "Update portfolio - %date% %time%" || echo No changes to commit

REM Push to main branch
echo 🚀 Pushing to main branch...
git push -u origin main

REM Deploy to gh-pages
echo 🌐 Deploying to GitHub Pages...
git push origin main:gh-pages

REM Final message
echo.
echo ========================================
echo ✅ Deployment Complete!
echo ========================================
echo.
echo 🎉 Your portfolio is live at:
echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo.
echo ⏱️  It may take a few minutes to appear.
echo 💪 Share this link everywhere!
echo.
pause
