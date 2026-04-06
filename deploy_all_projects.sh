#!/bin/bash
# Automated GitHub Deployment for All 6 Projects
# Works on macOS and Linux

echo ""
echo "====================================================="
echo "  Encrypted Portfolio Deployment Script"
echo "  All 6 Security Projects to GitHub"
echo "====================================================="
echo ""

read -p "Enter your GitHub username: " GITHUB_USERNAME
read -sp "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_USERNAME" ]; then
    echo "[!] Error: GitHub username required"
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "[!] Error: GitHub token required"
    exit 1
fi

# Array of projects
projects=(
    "secure-auth-system"
    "network-traffic-analyzer"
    "web-vuln-scanner"
    "encryption-toolkit"
    "api-security-tester"
    "encrypted-file-share"
)

echo "[*] Starting deployment of all 6 projects..."
echo "[*] Using GitHub user: $GITHUB_USERNAME"
echo ""

# Deploy each project
for project in "${projects[@]}"; do
    echo ""
    echo "[*] Deploying $project..."
    
    # Navigate to project directory
    cd "$project" || { echo "[!] Error: Cannot find $project directory"; continue; }
    
    # Initialize git if not already done
    if [ ! -d ".git" ]; then
        echo "[*] Initializing git repository..."
        git init
        git config user.email "mickymander2@gmail.com"
        git config user.name "Taranpreet Singh Mander"
    else
        echo "[*] Git repository already initialized"
    fi
    
    echo "[*] Adding files..."
    git add .
    
    echo "[*] Creating commit..."
    git commit -m "Initial commit: $project security tool" --allow-empty
    
    echo "[*] Setting remote origin..."
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${project}.git"
    
    echo "[*] Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "[+] Successfully pushed $project"
        echo "   URL: https://github.com/$GITHUB_USERNAME/$project"
    else
        echo "[!] Error pushing $project"
    fi
    
    cd ..
done

echo ""
echo "====================================================="
echo "  Deployment Complete!"
echo "====================================================="
echo "[+] All projects deployed successfully"
echo "[+] Check your GitHub profile: https://github.com/$GITHUB_USERNAME"
echo ""
