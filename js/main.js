/**
 * Café Residenz am Weißen See - Main JavaScript
 * Handles navigation, smooth scrolling, animations, and interactivity
 */

// ============================================
// DOCUMENT READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(`
        .feature-item,
        .menu-category,
        .review-card,
        .info-card,
        .contact-method
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show success message
        showFormMessage('success', 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');

        // Reset form
        form.reset();

        // In a real application, you would send the data to a server
        console.log('Form data:', data);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contactForm');

    // Clear previous errors
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Bitte geben Sie Ihren Namen ein.');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        isValid = false;
    }

    // Subject validation
    if (!data.subject) {
        showFieldError('subject', 'Bitte wählen Sie einen Betreff aus.');
        isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    field.classList.remove('error');

    // Validate based on field type
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name ist zu kurz.');
                return false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Ungültige E-Mail-Adresse.');
                return false;
            }
            break;

        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Nachricht ist zu kurz.');
                return false;
            }
            break;
    }

    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;

    field.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    field.parentElement.appendChild(errorDiv);
}

function showFormMessage(type, message) {
    const form = document.getElementById('contactForm');

    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.padding = 'var(--spacing-sm)';
    messageDiv.style.marginTop = 'var(--spacing-sm)';
    messageDiv.style.borderRadius = 'var(--radius-md)';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';

    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
        messageDiv.style.color = '#4CAF50';
        messageDiv.style.border = '2px solid #4CAF50';
    } else {
        messageDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
        messageDiv.style.color = '#F44336';
        messageDiv.style.border = '2px solid #F44336';
    }

    messageDiv.textContent = message;
    form.appendChild(messageDiv);

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// ============================================
// PERFORMANCE: LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY: SKIP TO CONTENT
// ============================================
document.addEventListener('keydown', function(e) {
    // If Tab key is pressed, show focus indicators
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c🎨 Café Residenz am Weißen See', 'font-size: 20px; font-weight: bold; color: #8B4513;');
console.log('%cWillkommen! Diese Website wurde mit Liebe zum Detail erstellt.', 'font-size: 14px; color: #666;');
console.log('%c📍 Berliner Allee 166-168, 13088 Berlin', 'font-size: 12px; color: #999;');
