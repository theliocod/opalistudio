// OpalStudio Landing Page JavaScript
// Enhanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initNavigation();
    
    // Scroll animations
    initScrollAnimations();
    
    // Performance dashboard animations
    initDashboardAnimations();
    
    // Form handling
    initFormHandling();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Counter animations
    initCounterAnimations();
    
    // Parallax effects
    initParallaxEffects();
});

// Navigation scroll effect
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                } else if (entry.target.classList.contains('result-card')) {
                    animateResultCard(entry.target);
                } else if (entry.target.classList.contains('testimonial-card')) {
                    animateTestimonialCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.service-card, .result-card, .testimonial-card, .metric-card, .section-header'
    );
    
    animatableElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Service card animations
function animateServiceCard(card) {
    const icon = card.querySelector('.service-icon');
    const features = card.querySelectorAll('.service-features li');
    
    // Icon animation
    setTimeout(() => {
        icon.style.animation = 'pulse 0.6s ease-out';
    }, 200);
    
    // Feature list animation
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, 100);
        }, 300 + (index * 100));
    });
}

// Result card animations
function animateResultCard(card) {
    const beforeValue = card.querySelector('.before .value');
    const afterValue = card.querySelector('.after .value');
    const arrow = card.querySelector('.arrow');
    
    // Animate values with counter effect
    setTimeout(() => {
        animateValue(beforeValue, beforeValue.textContent);
    }, 200);
    
    setTimeout(() => {
        arrow.style.animation = 'bounceX 0.8s ease-out';
    }, 600);
    
    setTimeout(() => {
        animateValue(afterValue, afterValue.textContent);
    }, 800);
}

// Testimonial card animations
function animateTestimonialCard(card) {
    const stars = card.querySelectorAll('.stars i');
    const content = card.querySelector('.testimonial-content p');
    
    // Stars animation
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.animation = 'pulse 0.3s ease-out';
            star.style.color = '#fbbf24';
        }, index * 100);
    });
    
    // Content typewriter effect
    setTimeout(() => {
        typewriterEffect(content);
    }, 500);
}

// Dashboard animations
function initDashboardAnimations() {
    const dashboard = document.querySelector('.performance-dashboard');
    if (!dashboard) return;
    
    const metricCards = dashboard.querySelectorAll('.metric-card');
    const tableRows = dashboard.querySelectorAll('.table-row');
    
    // Animate metric cards on load
    setTimeout(() => {
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out both';
            }, index * 200);
        });
    }, 1000);
    
    // Animate table rows
    setTimeout(() => {
        tableRows.forEach((row, index) => {
            setTimeout(() => {
                row.style.animation = 'fadeInUp 0.4s ease-out both';
            }, index * 150);
        });
    }, 1500);
    
    // Real-time data simulation
    simulateRealTimeData();
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('#contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const button = form.querySelector('.btn-primary');
        const originalText = button.innerHTML;
        const formData = new FormData(form);
        
        // Loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        button.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                button.innerHTML = '<i class="fas fa-check"></i> Demande envoyée !';
                button.style.background = 'linear-gradient(135deg, #dc2626, #f97316)';
                
                // Show success message
                showSuccessMessage();
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            // Error handling
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur - Réessayer';
            button.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
            
            console.error('Erreur:', error);
        }
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Counter animations
function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Trigger when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.textContent.replace(/[^\d]/g, '');
                // Only animate if it's a pure number (no other characters)
                if (target && entry.target.textContent === target) {
                    entry.target.textContent = '0';
                    setTimeout(() => {
                        animateCounter(entry.target, parseInt(target));
                    }, 500);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// Parallax effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Utility functions
function animateValue(element, targetText) {
    if (!element || !targetText) return;
    
    const numericValue = targetText.replace(/[^\d,]/g, '');
    if (numericValue) {
        const target = parseInt(numericValue.replace(',', ''));
        const suffix = targetText.replace(numericValue, '');
        
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = targetText;
                clearInterval(timer);
            } else {
                const formattedValue = Math.floor(current).toLocaleString('fr-FR');
                element.textContent = formattedValue + suffix;
            }
        }, 40);
    }
}

function typewriterEffect(element) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 30);
}

function simulateRealTimeData() {
    const revenueValue = document.querySelector('.metric-value');
    const statusDot = document.querySelector('.status-indicator .dot');
    
    if (revenueValue && statusDot) {
        setInterval(() => {
            // Simulate revenue updates
            const currentValue = parseInt(revenueValue.textContent.replace(/[^\d]/g, ''));
            const randomIncrease = Math.floor(Math.random() * 50) + 10;
            const newValue = currentValue + randomIncrease;
            
            revenueValue.textContent = newValue.toLocaleString('fr-FR') + '€';
            
            // Pulse effect on status dot
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'pulse 2s infinite';
            }, 100);
            
        }, 30000); // Update every 30 seconds
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation
    clearValidation({ target: field });
    
    let isValid = true;
    let message = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Ce champ est obligatoire';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Email invalide';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = 'Numéro de téléphone invalide';
        }
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

function clearValidation(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc2626';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        font-weight: 500;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #dc2626, #f97316);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Demande envoyée avec succès !</span>
            </div>
            <div style="font-size: 0.875rem; opacity: 0.9; margin-top: 0.25rem;">
                Nous vous contacterons sous 24h
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 4000);
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu .nav-link {
            margin: 1rem 0;
            font-size: 1.125rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Performance optimizations
// Debounce scroll events
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

// Use debounced scroll for performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent animations here
}, 16));

// Preload critical resources
function preloadResources() {
    const links = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
