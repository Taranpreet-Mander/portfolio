# 🖥️ WINDOWS DEPLOYMENT STEP-BY-STEP

Complete guide to deploy your portfolio from Windows to GitHub Pages.

## 📋 PREREQUISITES

1. **Git installed?**
   - Download from: https://git-scm.com/download/win
   - Run installer with all default options
   - Restart your computer after installation

2. **GitHub account?**
   - Create at: https://github.com/join
   - Remember your username: `Taranpreetsingh077`

---

## ⚡ QUICK DEPLOYMENT (5 MINUTES)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `portfolio`
   - **Description:** `Cybersecurity Portfolio | Information Security Student`
   - **Visibility:** Public ✅
3. Click "Create repository"

### Step 2: Run Deployment Script

1. Open File Explorer
2. Navigate to: `c:\Users\Ankit Bishnoi\Downloads\port`
3. Right-click on `deploy.bat`
4. Select "Run as administrator"
5. Follow the prompts
6. ✅ Done!

**That's it!** See "Verify Deployment" below.

---

## 🎯 DETAILED STEP-BY-STEP (WITH SCREENSHOTS)

### Part 1: Install Git (if not already done)

1. Download Git for Windows: https://git-scm.com/download/win
2. Click installer, leave everything default
3. Click "Install"
4. Restart computer
5. ✅ Git is installed!

**Verify:** Open Command Prompt and type:
```
git --version
```
Should show: `git version 2.x.x...`

---

### Part 2: Configure Git

Open Command Prompt (Start → cmd) and run:

```cmd
git config --global user.name "Taran Preet Singh"
git config --global user.email "your.email@gmail.com"
git config --global user.password
```

Replace with your actual name and email!

---

### Part 3: Generate SSH Key (Optional but Recommended)

This avoids typing passwords every time.

```cmd
ssh-keygen -t rsa -b 4096 -C "your.email@gmail.com"
```

Press Enter 3 times (accept defaults). Then:

```cmd
type %USERPROFILE%\.ssh\id_rsa.pub
```

Copy the entire output starting with `ssh-rsa...`

Go to https://github.com/settings/keys → "New SSH key" → Paste

---

### Part 4: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `portfolio`
3. **Description:** `Cybersecurity Portfolio | Information Security Student`
4. ✅ **Public**
5. Click "Create repository"

**Important:** Copy the repository URL shown (looks like: `https://github.com/Taranpreetsingh077/portfolio.git`)

---

### Part 5: Push Your Portfolio

#### **Option A: Using Deploy Script (Easiest)**

1. Open File Explorer
2. Go to: `c:\Users\Ankit Bishnoi\Downloads\port`
3. Right-click `deploy.bat`
4. Click "Run as administrator"
5. Watch it upload your files
6. ✅ Done!

#### **Option B: Manual Git Commands**

Open Command Prompt and run:

```cmd
REM Navigate to your portfolio folder
cd c:\Users\Ankit Bishnoi\Downloads\port

REM Initialize git
git init

REM Add all files
git add .

REM Create first commit
git commit -m "Initial portfolio upload"

REM Add remote (replace USERNAME/REPO if different)
git remote add origin https://github.com/Taranpreetsingh077/portfolio.git

REM Set branch name
git branch -M main

REM Push to GitHub
git push -u origin main

REM Deploy to GitHub Pages
git push origin main:gh-pages

REM Check status
git status
```

---

### Part 6: Enable GitHub Pages

1. Go to your repo: https://github.com/Taranpreetsingh077/portfolio
2. Click **Settings** (top right)
3. Scroll left → Click **Pages**
4. Under "Build and deployment":
   - **Source:** "Deploy from a branch"
   - **Branch:** Select `gh-pages`
   - **Folder:** `/root`
5. Click **Save**
6. Wait 1-2 minutes...
7. Refresh the page
8. You'll see: "Your site is published at: https://Taranpreetsingh077.github.io/portfolio"

✅ **Your portfolio is now LIVE!**

---

## ✅ VERIFY DEPLOYMENT

### Check 1: Portfolio is Online

Open: **https://Taranpreetsingh077.github.io/portfolio**

You should see your portfolio website! 🎉

### Check 2: GitHub Repository

Visit: https://github.com/Taranpreetsingh077/portfolio

You should see all your files!

### Check 3: GitHub Pages Status

Go to repo Settings → Pages

You should see:
```
✅ Your site is published at: https://Taranpreetsingh077.github.io/portfolio
```

---

## 🔄 UPDATING YOUR PORTFOLIO

After you make changes locally:

### Using Script:
```cmd
REM Open Command Prompt in portfolio folder
cd c:\Users\Ankit Bishnoi\Downloads\port
deploy.bat
```

### Using Git Commands:
```cmd
cd c:\Users\Ankit Bishnoi\Downloads\port
git add .
git commit -m "Update portfolio - describe your changes"
git push origin main:gh-pages
```

Changes appear in ~1-2 minutes!

---

## 🐛 TROUBLESHOOTING WINDOWS

### Problem: "Git is not recognized"
**Solution:** Git wasn't installed or not in PATH
1. Download and install: https://git-scm.com/download/win
2. Restart computer
3. Try again

### Problem: "Permission denied"
**Solution:** Run Command Prompt as Administrator
1. Right-click Command Prompt
2. Select "Run as administrator"
3. Try command again

### Problem: "Failed to push"
**Solution:** Check credentials
```cmd
REM Check remote URL
git remote -v

REM Update if needed
git remote set-url origin https://github.com/Taranpreetsingh077/portfolio.git

REM Try push again
git push origin main:gh-pages
```

### Problem: Portfolio still shows old version
**Solution:** Clear cache
1. Press Ctrl+Shift+Delete
2. Clear browsing data
3. Also try in Private/Incognito window
4. Wait 5 minutes for GitHub to rebuild

### Problem: "Pages not enabled"
**Solution:** 
1. Go to repo Settings → Pages
2. Make sure gh-pages branch is selected
3. Make sure folder is `/root`
4. Click Save

---

## 📝 USEFUL GIT COMMANDS

```cmd
REM Check git version
git --version

REM Check git config
git config --list

REM View remote URLs
git remote -v

REM View recent commits
git log --oneline -5

REM Check repository status
git status

REM See what will be pushed
git show --stat origin/main:gh-pages

REM Undo last commit (before push)
git reset --soft HEAD~1

REM Fresh start (CAREFUL!)
git reset --hard HEAD
```

---

## 🎓 WHAT'S HAPPENING UNDER THE HOOD

**When you run `deploy.bat`:**

1. ✅ Initializes Git repository
2. ✅ Adds your local files to Git
3. ✅ Creates a commit with timestamp
4. ✅ Connects to your GitHub repository
5. ✅ Pushes files to `main` branch
6. ✅ Creates `gh-pages` branch (for hosting)
7. ✅ GitHub Pages automatically serves your site
8. ✅ Your portfolio goes live!

---

## 📊 AFTER DEPLOYMENT

### Monitor GitHub Actions

GitHub automatically builds your site. To check:

1. Go to your repo: https://github.com/Taranpreetsingh077/portfolio
2. Click **Actions** tab
3. You'll see build history

Should show ✅ next to your push with green checkmark.

### Check Deployment Status

1. Go to repo **Settings** → **Pages**
2. Scroll to "Your site is published at:"
3. Shows deployment status

---

## 🎯 NEXT: UPDATE YOUR PROJECTS

Now that portfolio is deployed:

1. Open `YOUR_PROJECTS_TEMPLATE.md`
2. Fill in your actual project information
3. Update `index.html` with your real projects
4. Run `deploy.bat` again to update live site

---

## 💡 TIPS FOR SUCCESS

**Before Deployment:**
- ✅ Test website locally (open index.html in browser)
- ✅ Check all links work
- ✅ Test on mobile (F12 → Device Toolbar)
- ✅ No console errors (F12 → Console)

**During Deployment:**
- ✅ Make sure you're in the right folder
- ✅ Run as Administrator if getting permission errors
- ✅ Wait for GitHub to process (1-2 minutes)

**After Deployment:**
- ✅ Test live URL in new window
- ✅ Check mobile view
- ✅ Share widely!

---

## 🚀 YOU'RE DONE!

Your portfolio is now:
- ✅ Live on the internet
- ✅ Accessible 24/7
- ✅ Easy to update
- ✅ Free to host
- ✅ Ready to impress!

**Share your portfolio URL:**
```
https://Taranpreetsingh077.github.io/portfolio
```

---

## 📞 STILL STUCK?

1. **Command Prompt issue:** Try Git Bash instead (installs with Git)
2. **GitHub connection issue:** Check internet connection
3. **Deploy script not working:** Use manual Git commands
4. **Site not updating:** Wait 5 minutes and refresh browser
5. **Can't access your repo:** Check spelling of username/repo

---

**Good luck! Your portfolio is about to go live! 🎉**

For more help, visit:
- GitHub Help: https://docs.github.com
- Git Guide: https://git-scm.com/doc
- Stack Overflow: https://stackoverflow.com/ (search your error)
