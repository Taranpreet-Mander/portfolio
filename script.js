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
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fillBar {
        from {
            width: 0 !important;
        }
        to {
            width: var(--final-width, 100%) !important;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Call on load
window.addEventListener('load', () => {
    animateSkillBars();
    
    // Add slide-in animation to cards
    const cards = document.querySelectorAll('.project-card, .skill-card, .feature-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// ==================== SCROLL REVEAL ====================
const revealElements = () => {
    const elements = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
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
