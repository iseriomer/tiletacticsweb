// ===== MOBILE MENU FUNCTIONALITY =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = mobileMenuDrawer.classList.contains('active');

    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenuBtn.classList.add('active');
    mobileMenuBackdrop.classList.add('active');
    mobileMenuDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    mobileMenuDrawer.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for mobile menu
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

// Close menu when clicking navigation links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuDrawer.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ===== HEADER HIDE/SHOW ON SCROLL =====
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

// ===== THEME SELECTION =====
const themeBadges = document.querySelectorAll('.theme-badge');
const themePreview = document.getElementById('themePreview');
const themeImage = document.getElementById('themeImage');

themeBadges.forEach(badge => {
    badge.addEventListener('click', function () {
        // Remove active class from all badges
        themeBadges.forEach(b => b.classList.remove('active'));

        // Add active class to clicked badge
        this.classList.add('active');

        // Get theme name and update image
        const themeName = this.getAttribute('data-theme');
        themeImage.src = `${themeName}.png`;
        themeImage.alt = `${themeName} Theme`;

        // Show preview with animation
        themePreview.classList.remove('active');
        setTimeout(() => {
            themePreview.classList.add('active');
        }, 50);
    });
});

// ===== FEATURES SCROLLING =====
let featuresScrollPosition = 0;
const featuresGrid = document.getElementById('featuresGrid');
const featureCards = document.querySelectorAll('.feature-card');
const cardWidth = 280 + 35; // card width + gap

function scrollFeatures(direction) {
    const maxScroll = -(cardWidth * (featureCards.length - Math.floor(window.innerWidth / cardWidth)));

    if (direction === 'left') {
        featuresScrollPosition = Math.min(featuresScrollPosition + cardWidth, 0);
    } else {
        featuresScrollPosition = Math.max(featuresScrollPosition - cardWidth, maxScroll);
    }

    featuresGrid.style.transform = `translateX(${featuresScrollPosition}px)`;
}

// ===== SCREENSHOTS SCROLLING =====
let screenshotsScrollPosition = 0;
const screenshotsGrid = document.getElementById('screenshotsGrid');
const screenshotCards = document.querySelectorAll('.screenshot-card');
const screenshotWidth = 350 + 35; // card width + gap

function scrollScreenshots(direction) {
    const maxScroll = -(screenshotWidth * (screenshotCards.length - Math.floor(window.innerWidth / screenshotWidth)));

    if (direction === 'left') {
        screenshotsScrollPosition = Math.min(screenshotsScrollPosition + screenshotWidth, 0);
    } else {
        screenshotsScrollPosition = Math.max(screenshotsScrollPosition - screenshotWidth, maxScroll);
    }

    screenshotsGrid.style.transform = `translateX(${screenshotsScrollPosition}px)`;
}

// ===== MODAL FUNCTIONS =====
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== GENERATE CHEERFUL FLOATING BACKGROUND ELEMENTS =====
const bgContainer = document.getElementById('bgContainer');

// Create confetti
const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1'];
for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.animationDelay = Math.random() * 10 + 's';
    confetti.style.animationDuration = (8 + Math.random() * 7) + 's';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    bgContainer.appendChild(confetti);
}

// Create floating game elements
const elements = [
    { type: 'tile', count: 20, numbers: ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048'] }
];

elements.forEach(element => {
    for (let i = 0; i < element.count; i++) {
        const el = document.createElement('div');
        el.className = `floating-element ${element.type}`;

        if (element.type === 'tile') {
            el.textContent = element.numbers[i % element.numbers.length];
        }

        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDelay = Math.random() * 12 + 's';
        el.style.animationDuration = (12 + Math.random() * 8) + 's';

        bgContainer.appendChild(el);
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// ===== INTERACTIVE PARALLAX EFFECT =====
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animate() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((el, index) => {
        const speed = (index % 4 + 1) * 15;
        const x = currentX * speed;
        const y = currentY * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();

// ===== ADD BOUNCE TO FEATURE ICONS ON HOVER =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.feature-icon');
        icon.style.animation = 'bounce 0.6s ease';
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.feature-icon');
        setTimeout(() => {
            icon.style.animation = 'bounce 2s infinite';
        }, 600);
    });
});

// ===== STAT COUNTER ANIMATION =====
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Trigger stat animation when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const strong = entry.target.querySelector('strong');
            const targetValue = parseInt(strong.textContent);
            animateValue(strong, 0, targetValue, 1500);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-badge').forEach(badge => {
    statObserver.observe(badge);
});
