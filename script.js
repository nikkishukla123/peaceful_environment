// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});
// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});
// ==================== ACTIVE NAV LINK ON SCROLL ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
// ==================== HERO BACKGROUND ROTATION ====================
let heroImages = document.querySelectorAll('.hero-bg-image');
let heroCurrentIndex = 0;

function rotateHeroImages() {
    heroImages[heroCurrentIndex].classList.remove('active');
    heroCurrentIndex = (heroCurrentIndex + 1) % heroImages.length;
    heroImages[heroCurrentIndex].classList.add('active');
}

// Change hero background every 5 seconds
setInterval(rotateHeroImages, 5000);

// ==================== QUOTES SLIDER ====================
let quotes = document.querySelectorAll('.quote');
let quoteIndex = 0;

function rotateQuotes() {
    quotes[quoteIndex].classList.remove('active');
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quotes[quoteIndex].classList.add('active');
}
// Change quote every 6 seconds
setInterval(rotateQuotes, 6000);

// ==================== SCROLL ANIMATIONS ====================
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
// Observe all cards and sections for scroll animation
const animatedElements = document.querySelectorAll(
    '.event-card, .spiritual-card, .stat-card, .about-text, .about-image, .savesoil-text, .savesoil-image'
);

animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = `all 0.8s ease ${index * 0.1}s`;
    observer.observe(element);
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});