// ==================== SIDEBAR NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Handle navigation click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const href = item.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                // Smooth scroll
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Update active state
                updateActiveNav();
            }
        });
    });

    // Update active nav based on scroll
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);

    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    }

    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!motionReduced) {
        const revealTargets = document.querySelectorAll(
            'section, .project-card, .skill-card, .feature-item, .stat-item, .contact-item, .education-item, .learning-box'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        revealTargets.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
            revealObserver.observe(element);
        });

        const heroSection = document.querySelector('.hero-section');
        const heroText = document.querySelector('.hero-text');
        const heroStats = document.querySelector('.hero-stats');

        if (heroSection && heroText && heroStats) {
            let ticking = false;

            const updateHeroMotion = () => {
                const scrollY = window.scrollY || window.pageYOffset;
                const offset = Math.min(scrollY * 0.06, 28);
                const reverseOffset = Math.min(scrollY * 0.03, 16);

                heroText.style.transform = `translateY(${reverseOffset}px)`;
                heroStats.style.transform = `translateY(${-offset}px)`;
                heroSection.style.setProperty('--hero-shift', `${offset}px`);
                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateHeroMotion);
                    ticking = true;
                }
            }, { passive: true });
        }
    } else {
        document.querySelectorAll('section').forEach(section => section.classList.add('is-visible'));
    }
});

// ==================== CONTACT FORM ====================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    
    // Simple validation
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff3b30';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== SKILL BAR ANIMATION ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        const finalWidth = bar.style.width || getComputedStyle(bar).width;
        bar.style.setProperty('--final-width', finalWidth);
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// Call on load
window.addEventListener('load', () => {
    animateSkillBars();
});

// ==================== SCROLL REVEAL ====================
const revealElements = () => {
    const elements = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
};

window.addEventListener('load', revealElements);

// ==================== INPUT FOCUS EFFECTS ====================
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});
