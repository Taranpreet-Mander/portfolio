# 🔒 Cybersecurity Portfolio Website

A modern, high-quality animated portfolio website for Information Security students. Built with HTML5, CSS3, and vanilla JavaScript.

## 🎨 Features

### Design
- **Dark Theme with Neon Accents** - Cybersecurity-inspired aesthetic with cyan and lime-green neon glows
- **Glassmorphism & Soft Gradients** - Modern UI with frosted glass effects
- **Responsive Design** - Perfectly optimized for mobile, tablet, and desktop
- **Premium Animations** - Smooth scroll-triggered animations, hover effects, and parallax

### Sections
1. **Hero Section** - Animated background with particle effects
2. **About Me** - Personal statement with stats cards
3. **Skills** - Animated progress bars and tool icons
4. **Projects** - Portfolio of 4 student-level projects
5. **Learning & Experience** - Timeline and achievements
6. **Contact** - Contact info and email form
7. **Responsive Navigation** - Mobile hamburger menu

## 🚀 Quick Start

### Option 1: Local File
1. Open `index.html` in a web browser
2. No server or installation required!

### Option 2: Live Server
For better development experience with auto-reload:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using Live Server extension in VS Code
# Install extension and click "Go Live"
```

Then navigate to `http://localhost:8000`

## 📝 Customization Guide

### 1. **Basic Information**
Edit these files to add your information:

**In `index.html`:**
- Replace `[Your Name]` with your actual name
- Update all email addresses to your email
- Replace GitHub and LinkedIn links with your profiles
- Add your resume file path for download

**Search and replace:**
```
your.email@example.com     → Your email address
github.com/yourprofile     → Your GitHub profile URL
linkedin.com/in/yourprofile → Your LinkedIn profile URL
Your Name                   → Your actual name
```

### 2. **Hero Section**
```html
<!-- In index.html, find the hero section -->
<h1 class="hero-title">
    <span class="line"><span class="word">Building</span></span>
    <span class="line"><span class="word">Secure</span></span>
    <!-- Edit these words -->
</h1>

<p class="hero-tagline">
    Information Security Student | Ethical Hacking Enthusiast | Problem Solver
    <!-- Update tagline -->
</p>
```

### 3. **About Section**
Update the paragraphs in the About Me section with your personal statement. Keep it:
- Authentic and genuine
- Focused on your passion for security
- Realistic for a 3rd-year student
- Between 2-4 paragraphs

### 4. **Skills Section**
Modify skill names, percentages, and tools:

```html
<!-- Update skill percentages -->
<div class="skill-header">
    <span>Python</span>
    <span class="skill-level">90%</span>  <!-- Change this -->
</div>

<!-- Update tools -->
<div class="tool-icon" title="Your Tool">
    <i class="fas fa-icon"></i>  <!-- Change icon -->
    <span>Tool Name</span>
</div>
```

**Font Awesome Icons:**
- `fa-linux` - Linux
- `fa-network-wired` - Networking
- `fa-shield-alt` - Security
- `fa-database` - Database
- `fa-python` - Python
- Browse more: https://fontawesome.com/icons

### 5. **Projects Section**
Update your projects with real information:

```html
<div class="project-card">
    <div class="project-icon">
        <i class="fas fa-search"></i>  <!-- Change icon -->
    </div>
    <h3>Project Name</h3>
    <span class="project-status">Project Type</span>
    <p class="project-description">
        Detailed description of what your project does...
    </p>
    <div class="project-tech">
        <span class="tech-tag">Technology1</span>
        <span class="tech-tag">Technology2</span>
    </div>
    <div class="project-links">
        <a href="https://github.com/yourrepo" class="project-link">
            <i class="fab fa-github"></i> View Code
        </a>
        <a href="https://demo-link.com" class="project-link">
            <i class="fas fa-external-link-alt"></i> Try It
        </a>
    </div>
</div>
```

### 6. **Learning & Experience**
Update the timeline and achievements with your actual coursework and projects:

```html
<h4>Your Course Name</h4>
<p>Description of what you learned...</p>

<strong>Your Achievement Title</strong>
<p>Description of your achievement...</p>
```

### 7. **Contact Information**
Update all contact links:

```html
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://github.com/yourprofile" target="_blank">github.com/yourprofile</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a>
<a href="your-resume.pdf" download>Download Resume</a>
```

### 8. **Resume File**
Place your resume as `resume.pdf` or your desired filename in the same folder as `index.html`, then update the download link.

## 🎨 Color Customization

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-neon: #00ff88;      /* Main green neon */
    --secondary-neon: #00ffff;    /* Cyan neon */
    --accent-purple: #9d4edd;     /* Purple accent */
    --dark-bg: #0a0e27;           /* Main dark background */
    --darker-bg: #050812;         /* Darker background */
}
```

**Popular color schemes:**

**Blue & Cyan:**
```css
--primary-neon: #00b4ff;
--secondary-neon: #00ffff;
--accent-purple: #0066ff;
```

**Purple & Pink:**
```css
--primary-neon: #ff00ff;
--secondary-neon: #ff0080;
--accent-purple: #b000b0;
```

**Orange & Red:**
```css
--primary-neon: #ff6600;
--secondary-neon: #ff3300;
--accent-purple: #cc0000;
```

## 🔧 JavaScript Customization

### Add More Animations
Edit `script.js` to add custom animations:

```javascript
// Add hover effect to custom element
document.querySelectorAll('.your-element').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
```

### Form Submission
Currently, the contact form is simulated. To make it functional:

**Option 1: Using Formspree (Free)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Send Message</button>
</form>
```

**Option 2: Using EmailJS**
```javascript
emailjs.init("YOUR_PUBLIC_KEY");

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
        .then(() => showNotification('Message sent!', 'success'))
        .catch(() => showNotification('Failed to send', 'error'));
});
```

**Option 3: Backend API**
Point the form to your backend endpoint.

## 📱 Mobile Optimization

The website is fully responsive. To test:

```bash
# In browser DevTools (F12)
# Press Ctrl+Shift+M to toggle device toolbar
# Test on various screen sizes
```

Key responsive breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 600px

## ⚡ Performance Tips

1. **Optimize Images**
   - Use tools like TinyPNG or ImageOptim
   - Keep images under 100KB

2. **Compress CSS & JS**
   - Use minifiers before deploying
   - Tools: CSSNano, UglifyJS, Terser

3. **Enable Gzip Compression**
   - Contact your hosting provider
   - Reduces file size by ~70%

4. **Lazy Loading**
   - Images with `data-src` attribute are lazy-loaded
   - Already implemented in `script.js`

## 🚀 Deployment

### Deploy to GitHub Pages (Free)
```bash
1. Create a new repository named "portfolio"
2. Push your files to the main branch
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Your site goes live at: https://yourusername.github.io/portfolio
```

### Deploy to Netlify (Free & Easy)
```bash
1. Drag and drop your folder on netlify.com
2. Or connect your GitHub repository
3. Get a live URL instantly
```

### Deploy to Vercel (Free)
```bash
1. Sign up at vercel.com
2. Import your GitHub repository
3. Deploy with one click
```

## 🔗 Resources

- **Font Awesome Icons**: https://fontawesome.com/icons
- **Color Picker**: https://coolors.co
- **Gradient Generator**: https://cssgradient.io
- **Animation Library**: https://animate.style
- **Web Performance**: https://web.dev

## 📋 Pre-Deployment Checklist

- [ ] Personal information is updated
- [ ] All contact links work correctly
- [ ] Project links are valid (GitHub, demo, etc.)
- [ ] Resume file is added and link works
- [ ] Images are optimized
- [ ] Tested on mobile and desktop
- [ ] No broken links or 404 errors
- [ ] Form submission works (if using backend)
- [ ] Page loads fast (under 3 seconds)
- [ ] All animations work smoothly

## 🐛 Troubleshooting

**Issue: Animations not working**
- Check if JavaScript is enabled in browser
- Ensure `script.js` is in the same folder as `index.html`
- Check browser console for errors (F12)

**Issue: Styling looks broken**
- Verify `styles.css` is in the same folder
- Clear browser cache (Ctrl+Shift+Del)
- Check if CSS file path is correct

**Issue: Form not sending**
- For local testing, it's simulated (shows success message)
- For production, implement a backend form handler
- See "Form Submission" section above

**Issue: Links not working**
- Update placeholder links with your actual URLs
- Verify URLs are complete (including https://)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the customization guide
3. Test in different browsers (Chrome, Firefox, Safari)
4. Check your browser's developer console (F12)

## 📧 Contact Information

Update these placeholders with your actual information:
- Email: `your.email@example.com`
- GitHub: `github.com/yourprofile`
- LinkedIn: `linkedin.com/in/yourprofile`

## 📄 License

This portfolio template is free to use for personal and educational purposes.

---

**Good luck with your portfolio! 🚀**

Remember:
- Keep your information authentic
- Update it regularly with new projects
- Share it with internship/job opportunities
- Get feedback from mentors

Happy coding! 🔒
