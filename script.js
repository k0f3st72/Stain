// ═══════════════════════════════════════════════════════
// STAIN — Visual Production Studio
// Interactive JavaScript / Liquid Trace System
// ═══════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────
// LOADING SCREEN
// ───────────────────────────────────────────────────────

const loadingScreen = document.getElementById('loadingScreen');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        document.body.classList.add('loaded');
    }, 1200);
});

// ───────────────────────────────────────────────────────
// VIDEO BACKGROUND AUTOPLAY
// ───────────────────────────────────────────────────────

const videoBackground = document.getElementById('videoBackground');

if (videoBackground) {
    // Ensure video plays even if autoplay is blocked
    const playVideo = () => {
        videoBackground.play().catch(error => {
            console.log('Video autoplay prevented:', error);
            // Graceful fallback - video won't play but site still works
        });
    };

    // Try to play on load
    videoBackground.addEventListener('loadeddata', playVideo);

    // Also try on user interaction if autoplay was blocked
    document.addEventListener('click', () => {
        if (videoBackground.paused) {
            playVideo();
        }
    }, { once: true });
}

// ───────────────────────────────────────────────────────
// NAVBAR
// ───────────────────────────────────────────────────────

const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// Scrolled state
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Burger menu toggle
burger.addEventListener('click', () => {
    const isActive = burger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    burger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
});

// ───────────────────────────────────────────────────────
// SCROLL SPY (Active Navigation Link)
// ───────────────────────────────────────────────────────

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ───────────────────────────────────────────────────────
// HERO SCROLL EFFECTS
// ───────────────────────────────────────────────────────

const heroLogoContainer = document.querySelector('.hero-logo-container');
const heroContent = document.querySelector('.hero-content');
const scrollIndicator = document.querySelector('.scroll-indicator');

function updateHeroScroll() {
    const scrolled = window.scrollY;
    const heroHeight = window.innerHeight;
    const scrollProgress = Math.min(scrolled / heroHeight, 1);

    if (heroLogoContainer && scrolled < heroHeight) {
        // Logo transforms and fades
        const scale = 1 - (scrollProgress * 0.3);
        const opacity = 1 - (scrollProgress * 0.8);
        const translateY = scrollProgress * 100;

        heroLogoContainer.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        heroLogoContainer.style.opacity = opacity;

        // Content follows
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollProgress * 50}px)`;
            heroContent.style.opacity = 1 - (scrollProgress * 0.5);
        }
    }

    // Hide scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
    }
}

// ───────────────────────────────────────────────────────
// INTERSECTION OBSERVER (Reveal Sections)
// ───────────────────────────────────────────────────────

const revealSections = document.querySelectorAll('.section-reveal');
const sectionDividers = document.querySelectorAll('.section-divider');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    }
);

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Animate section dividers
const dividerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.5
    }
);

sectionDividers.forEach(divider => {
    dividerObserver.observe(divider);
});

// ───────────────────────────────────────────────────────
// PORTFOLIO FILTERS
// ───────────────────────────────────────────────────────

const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter work cards
        workCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 500);
            }
        });
    });
});

// ───────────────────────────────────────────────────────
// CONTACT FORM
// ───────────────────────────────────────────────────────

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 4 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 4000);
    });
}

// ───────────────────────────────────────────────────────
// SERVICE CARDS INTERACTION
// ───────────────────────────────────────────────────────

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ───────────────────────────────────────────────────────
// PERFORMANCE: Debounce & Throttle
// ───────────────────────────────────────────────────────

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll-heavy functions
const throttledHeroScroll = throttle(updateHeroScroll, 10);
const throttledActiveLink = throttle(updateActiveLink, 100);

window.addEventListener('scroll', () => {
    throttledHeroScroll();
    throttledActiveLink();
});

// ───────────────────────────────────────────────────────
// ACCESSIBILITY: Focus Management
// ───────────────────────────────────────────────────────

// Trap focus in mobile menu when open
const focusableElements = 'a[href], button:not([disabled])';

document.addEventListener('keydown', (e) => {
    if (!navLinksContainer.classList.contains('active')) return;

    if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
    }

    if (e.key === 'Tab') {
        const focusables = navLinksContainer.querySelectorAll(focusableElements);
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// ───────────────────────────────────────────────────────
// PREFERS REDUCED MOTION
// ───────────────────────────────────────────────────────

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Skip loading screen
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    document.body.classList.add('loaded');
}

// ───────────────────────────────────────────────────────
// INITIALIZE
// ───────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    updateActiveLink();

    // Initial hero scroll state
    updateHeroScroll();

    // Add loaded class
    setTimeout(() => {
        document.body.classList.add('ready');
    }, 100);
});

// ───────────────────────────────────────────────────────
// LIQUID TRACE SYSTEM
// ───────────────────────────────────────────────────────

// Create liquid trace effect on specific interactions
function createLiquidTrace(x, y) {
    const trace = document.createElement('div');
    trace.className = 'liquid-trace';
    trace.style.left = `${x}px`;
    trace.style.top = `${y}px`;
    document.body.appendChild(trace);

    setTimeout(() => {
        trace.style.opacity = '0';
        trace.style.transform = 'scale(2)';
    }, 10);

    setTimeout(() => {
        trace.remove();
    }, 1000);
}

// Add trace on button clicks
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            createLiquidTrace(x, y);
        }
    });
});

// ───────────────────────────────────────────────────────
// PERFORMANCE: Lazy Load
// ───────────────────────────────────────────────────────

// Future: Add lazy loading for images/videos when real content is added
const lazyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Load video if present
                if (element.tagName === 'VIDEO' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.load();
                }

                // Load image if present
                if (element.tagName === 'IMG' && element.dataset.src) {
                    element.src = element.dataset.src;
                }

                lazyObserver.unobserve(element);
            }
        });
    },
    {
        rootMargin: '200px'
    }
);

// Observe all elements with data-src
document.querySelectorAll('[data-src]').forEach(element => {
    lazyObserver.observe(element);
});

// ───────────────────────────────────────────────────────
// RESIZE HANDLER
// ───────────────────────────────────────────────────────

const resizeHandler = debounce(() => {
    updateHeroScroll();
    updateActiveLink();
}, 250);

window.addEventListener('resize', resizeHandler);

// ───────────────────────────────────────────────────────
// CONSOLE BRANDING
// ───────────────────────────────────────────────────────

console.log('%cSTAIN', 'font-size: 48px; font-weight: bold; color: #fff; text-shadow: 0 0 20px rgba(255,255,255,0.3);');
console.log('%cVisual Production Studio', 'font-size: 14px; color: #999; letter-spacing: 0.1em;');
console.log('%chello@stain.studio', 'font-size: 12px; color: #666; margin-top: 10px;');
