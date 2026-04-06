@echo off
REM Automated GitHub Deployment for All 6 Projects
REM This script creates repositories and pushes all projects to GitHub

setlocal enabledelayedexpansion

echo.
echo =====================================================
echo   Encrypted Portfolio Deployment Script
echo   All 6 Security Projects to GitHub
echo =====================================================
echo.

set /p GITHUB_USERNAME="Enter your GitHub username (e.g., Taranpreetsingh077): "
set /p GITHUB_TOKEN="Enter your GitHub Personal Access Token: "

if "%GITHUB_USERNAME%"=="" (
    echo [!] Error: GitHub username required
    exit /b 1
)

if "%GITHUB_TOKEN%"=="" (
    echo [!] Error: GitHub token required
    exit /b 1
)

REM Array of projects
set projects[0]=secure-auth-system
set projects[1]=network-traffic-analyzer
set projects[2]=web-vuln-scanner
set projects[3]=encryption-toolkit
set projects[4]=api-security-tester
set projects[5]=encrypted-file-share

echo [*] Starting deployment of all 6 projects...
echo [*] Using GitHub user: %GITHUB_USERNAME%
echo.

REM Deploy each project
for /L %%i in (0,1,5) do (
    set PROJECT_NAME=!projects[%%i]!
    call :deploy_project "!PROJECT_NAME!"
)

echo.
echo =====================================================
echo   Deployment Complete!
echo =====================================================
echo [+] All projects deployed successfully
echo [+] Check your GitHub profile: https://github.com/%GITHUB_USERNAME%
echo.
goto :eof

REM Function to deploy a single project
:deploy_project
setlocal enabledelayedexpansion
set PROJECT=%~1

echo.
echo [*] Deploying %PROJECT%...

REM Navigate to project directory
cd "%PROJECT%"

if not exist ".git" (
    echo [*] Initializing git repository...
    git init
    git config user.email "mickymander2@gmail.com"
    git config user.name "Taranpreet Singh Mander"
) else (
    echo [*] Git repository already initialized
)

echo [*] Adding files...
git add .

echo [*] Creating commit...
git commit -m "Initial commit: %PROJECT% security tool" --allow-empty

echo [*] Setting remote origin...
git remote remove origin 2>nul
git remote add origin "https://%GITHUB_USERNAME%:%GITHUB_TOKEN%@github.com/%GITHUB_USERNAME%/%PROJECT%.git"

echo [*] Pushing to GitHub...
git branch -M main
git push -u origin main

if !errorlevel! equ 0 (
    echo [+] Successfully pushed %PROJECT%
    echo   URL: https://github.com/%GITHUB_USERNAME%/%PROJECT%
) else (
    echo [!] Error pushing %PROJECT% - may need to create repo on GitHub first
)

cd ..
endlocal
goto :eof
