// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Particle Animation =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsla(${Math.random() * 60 + 120}, 100%, 50%, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        // Animate particles
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Call particle creation on load
window.addEventListener('DOMContentLoaded', createParticles);

// ===== Scroll Animations =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill progress bars
    document.querySelectorAll('.skill-progress').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Observe learning sections
    document.querySelectorAll('.learning-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Observe contact items
    document.querySelectorAll('.contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

window.addEventListener('DOMContentLoaded', observeElements);

// ===== Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Validate
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate form submission
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 800);
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 100, 100, 0.9)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Smooth Scroll Enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGlow = document.querySelector('.hero-glow');
    
    if (heroGlow) {
        heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px))`;
    }

    // Update navbar style based on scroll
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.style.background = 'rgba(5, 8, 18, 0.95)';
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 8, 18, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Skill Bars Animation Enhancement =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width || '0%';
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(skillsSection);
            }
        });
    });
    skillsObserver.observe(skillsSection);
}

// ===== Interactive Hover Effects =====
document.querySelectorAll('.tool-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Project Card Counters =====
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
    });
}

window.addEventListener('DOMContentLoaded', initializeProjectCards);

// ===== Resume Download Simulation =====
const resumeLink = document.querySelector('a[href="#"]');
if (resumeLink && resumeLink.querySelector('.fa-file-pdf')) {
    resumeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Resume download would start here. Please add your resume file.', 'info');
    });
}

// ===== GitHub Links =====
document.querySelectorAll('a[href*="github.com"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href === 'https://github.com/yourprofile') {
            e.preventDefault();
            showNotification('Update the GitHub links in the HTML to your profile', 'info');
        }
    });
});

// ===== Dynamic Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        
        // Handle non-numeric values
        if (text === '∞') return;
        
        const target = parseInt(text.replace(/\D/g, ''));
        let current = 0;
        
        const increment = target / 30; // 30 frames animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger counter animation when stat cards are visible
const statsSection = document.querySelector('.about');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// ===== Prevent Context Menu on Sensitive Links =====
document.querySelectorAll('a[href*="yourprofile"]').forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
    
    // Quick jump to sections (Alt + Number)
    if (e.altKey) {
        const sections = {
            '1': '#hero',
            '2': '#about',
            '3': '#skills',
            '4': '#projects',
            '5': '#learning',
            '6': '#contact'
        };
        
        if (sections[e.key]) {
            document.querySelector(sections[e.key]).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== Performance: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-neon)';
            link.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
        } else {
            link.style.color = 'var(--text-secondary)';
            link.style.textShadow = 'none';
        }
    });
});

// ===== Error Tracking (Optional) =====
window.addEventListener('error', (e) => {
    console.error('Error:', e);
});

// ===== Preload Fonts for Performance =====
if (document.fonts) {
    document.fonts.ready.then(() => {
        document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    });
}

console.log('🔒 Portfolio Loaded - Secure Digital Systems');
