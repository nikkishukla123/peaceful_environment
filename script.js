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
// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== HEADER BACKGROUND ON SCROLL ====================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ==================== ANIMATE STATS COUNTER ====================
const statCards = document.querySelectorAll('.stat-card h3, .savesoil-stat h3');

const animateCounter = (element, target) => {
    let count = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.ceil(count).toLocaleString() + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                animateCounter(entry.target, number);
                counterObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => counterObserver.observe(card));

// ==================== EVENT CARD TILT EFFECT ====================
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});