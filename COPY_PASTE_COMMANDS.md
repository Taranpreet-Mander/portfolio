# 🚀 Copy-Paste Deployment Commands

## 📋 Before You Start

### 1. Get GitHub Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"  
3. Add scopes:
   - ✅ repo
   - ✅ public_repo
4. Copy token and save somewhere safe

### 2. Know Your Info
- **GitHub Username:** Taranpreetsingh077
- **Token:** [From Step 1]

---

## ⚡ Option 1: Automated (Easiest)

### Windows
Open PowerShell or Command Prompt and copy-paste:

```bash
cd Downloads\port
DEPLOY_ALL_PROJECTS.bat
```

When prompted:
```
Enter your GitHub username: Taranpreetsingh077
Enter your GitHub Personal Access Token: [Paste your token]
```

Script will automatically deploy all 6 projects! ✅

### Mac/Linux
Open Terminal and copy-paste:

```bash
cd ~/Downloads/port
chmod +x deploy_all_projects.sh
./deploy_all_projects.sh
```

When prompted:
```
Enter your GitHub username: Taranpreetsingh077
Enter your GitHub Personal Access Token: [Paste your token]
```

---

## 📝 Option 2: Manual Step-by-Step

If automated script doesn't work, use these commands.

### Deploy Project 1: Secure Authentication System

```bash
cd Downloads\port\secure-auth-system
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: Secure Authentication System with JWT & OAuth"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/secure-auth-system.git
git branch -M main
git push -u origin main
cd ..
```

### Deploy Project 2: Network Traffic Analyzer

```bash
cd Downloads\port\network-traffic-analyzer
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: Network Traffic Analyzer & IDS with Real-time Detection"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/network-traffic-analyzer.git
git branch -M main
git push -u origin main
cd ..
```

### Deploy Project 3: Web Vulnerability Scanner

```bash
cd Downloads\port\web-vuln-scanner
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: Web Vulnerability Scanner - OWASP Top 10 Detection"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/web-vuln-scanner.git
git branch -M main
git push -u origin main
cd ..
```

### Deploy Project 4: Encryption Toolkit

```bash
cd Downloads\port\encryption-toolkit
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: Modern Encryption Toolkit - AES-256-GCM & RSA-2048"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/encryption-toolkit.git
git branch -M main
git push -u origin main
cd ..
```

### Deploy Project 5: API Security Tester

```bash
cd Downloads\port\api-security-tester
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: API Security Tester - OWASP API Testing Platform"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/api-security-tester.git
git branch -M main
git push -u origin main
cd ..
```

### Deploy Project 6: Encrypted File Share

```bash
cd Downloads\port\encrypted-file-share
git init
git config user.email "mickymander2@gmail.com"
git config user.name "Taranpreet Singh Mander"
git add .
git commit -m "Initial commit: End-to-End Encrypted File Share - Zero Knowledge Architecture"
git remote add origin https://Taranpreetsingh077:YOUR_TOKEN@github.com/Taranpreetsingh077/encrypted-file-share.git
git branch -M main
git push -u origin main
cd ..
```

---

## 🔐 Replace YOUR_TOKEN with Actual Token

All commands above have `YOUR_TOKEN` - you MUST replace this with your actual GitHub Personal Access Token.

**Example:**
Instead of:
```
https://Taranpreetsingh077:YOUR_TOKEN@github.com/...
```

Use:
```
https://Taranpreetsingh077:ghp_1234567890abcdefghijk@github.com/...
```

---

## ✅ Verify Deployment

After all 6 projects deploy, verify:

```bash
# Check portfolio repo
git clone https://github.com/Taranpreetsingh077/portfolio.git
cd portfolio
ls  # Should show index.html, styles.css, script.js

# Check secure-auth-system repo
git clone https://github.com/Taranpreetsingh077/secure-auth-system.git
cd secure-auth-system
ls  # Should show README.md, app.js, package.json
```

---

## 🌐 Check Live Portfolio

Once deployed, visit:
```
https://Taranpreetsingh077.github.io/portfolio
```

Should show:
- Your name: Taranpreet Singh Mander
- Dark theme with neon accents
- 6 project cards with links
- All animations working

---

## 🔗 Share These Links

After deployment, share:

**Main Portfolio:**
```
https://Taranpreetsingh077.github.io/portfolio
```

**GitHub Profile:**
```
https://github.com/Taranpreetsingh077
```

**Individual Projects:**
```
https://github.com/Taranpreetsingh077/secure-auth-system
https://github.com/Taranpreetsingh077/network-traffic-analyzer
https://github.com/Taranpreetsingh077/web-vuln-scanner
https://github.com/Taranpreetsingh077/encryption-toolkit
https://github.com/Taranpreetsingh077/api-security-tester
https://github.com/Taranpreetsingh077/encrypted-file-share
```

---

## 🆘 Quick Fixes

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
# Then run the git remote add command again
```

### Error: "Please make sure you have the correct access rights"
**Your token is wrong or expired**
- Go to https://github.com/settings/tokens
- Generate a new token
- Replace YOUR_TOKEN in commands

### Error: "repository not found"
**Repository doesn't exist on GitHub yet**
1. Go to https://github.com/new
2. Create repository with exact name shown in error
3. Try git push again

### Nothing uploads / Hangs indefinitely
```bash
# Cancel with Ctrl+C
# Check token validity
# Try smaller test first:
echo "test" > test.txt
git add test.txt
git commit -m "test"
git push
```

---

## 📞 Success Indicators

✅ You'll see:
```
[main (root-commit) abc1234] Initial commit: ...
 XX files changed, YYYY insertions(+)
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/Taranpreetsingh077/project-name.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ Then check: https://github.com/Taranpreetsingh077

Should show 6 new repositories!

---

**That's it! Your portfolio is deployed! 🎉**
