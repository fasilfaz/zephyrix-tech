// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialCarousel();
    initIntersectionObserver();
    initAnimations();
    initParallaxEffects();
    initButtonEffects();
    initParticles();
    initMouseTrail();
    initProductAnimations();
    initApproachAnimations();
});

// Testimonial Carousel Functionality
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    const authorThumbnails = document.querySelectorAll('.author-thumbnail');
    
    if (carousel) {
        // Initialize Bootstrap carousel
        const testimonialCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });

        // Handle author thumbnail clicks
        authorThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                testimonialCarousel.to(index);
                updateThumbnailsActiveState(authorThumbnails, index);
            });
        });

        // Update thumbnail active state on carousel slide
        carousel.addEventListener('slide.bs.carousel', (event) => {
            updateThumbnailsActiveState(authorThumbnails, event.to);
        });
    }
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in-section class to elements we want to animate
    const sections = document.querySelectorAll('.case-study-card, .service-card, .testimonial-content, .section-title');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}

// Initialize animations
function initAnimations() {
    // Animate rating stars sequentially
    const ratings = document.querySelectorAll('.rating');
    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('.fas');
        stars.forEach((star, index) => {
            star.style.animationDelay = `${index * 0.4}s`;
        });
    });

    // Add smooth hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = heroSection.querySelector('.hero-image');
            const heroText = heroSection.querySelector('.hero-text');
            
            if (heroImage && heroText) {
                heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }
}

// Initialize button effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
}

// Helper Functions
function updateThumbnailsActiveState(thumbnails, activeIndex) {
    thumbnails.forEach((thumbnail, index) => {
                if (index === activeIndex) {
                    thumbnail.classList.add('active');
                } else {
                    thumbnail.classList.remove('active');
                }
            });
}

function handleCardTilt(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg)`;
}

function resetCardTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

function createRippleEffect(e) {
    const button = this;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        width: 0;
        height: 0;
        left: ${x}px;
        top: ${y}px;
    `;

    button.appendChild(ripple);

    const animation = ripple.animate([
        {
            width: '0',
            height: '0',
            opacity: 0.5
        },
        {
            width: '500px',
            height: '500px',
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    animation.onfinish = () => ripple.remove();
}

// Menu toggle functionality
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Initialize particles
function initParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 3 and 8 pixels
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    container.appendChild(particle);
    
    // Animate the particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 10000 + 5000; // Between 5-15 seconds
    const keyframes = [
        {
            transform: `translate(0, 0)`,
            opacity: 0
        },
        {
            transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
            opacity: 1
        },
        {
            transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
            opacity: 0
        }
    ];
    
    const animation = particle.animate(keyframes, {
        duration: duration,
        easing: 'ease-in-out',
        iterations: Infinity
    });
    
    animation.onfinish = () => {
        particle.remove();
        createParticle(particle.parentElement);
    };
}

// Initialize mouse trail effect
function initMouseTrail() {
    let dots = [];
    let mouse = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        createTrailDot(mouse.x, mouse.y);
    });
    
    function createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        document.body.appendChild(dot);
        
        dots.push(dot);
        
        // Remove the dot after animation
        setTimeout(() => {
            dot.remove();
            dots = dots.filter(d => d !== dot);
        }, 1000);
    }
}

// Add scroll-triggered animations
function onScroll() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.floating-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrolled * speed;
        circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// Add scroll event listener
window.addEventListener('scroll', onScroll);

// Initialize product animations and interactions
function initProductAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const indicators = document.querySelectorAll('.indicator-dot');
    let currentPage = 0;
    
    // Product card animations
    productCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // View details button effect
        const previewBtn = card.querySelector('.preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showProductDetails(card);
            });
        }
        
        // Learn more button effect
        const learnMoreBtn = card.querySelector('.product-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                createRippleEffect.call(learnMoreBtn, e);
                showProductDetails(card);
            });
        }
    });

    // View More button animation
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            currentPage = (currentPage + 1) % 3;
            updateIndicators(currentPage);
            animateViewMore();
        });

        viewMoreBtn.addEventListener('mouseenter', () => {
            viewMoreBtn.querySelector('i').style.transform = 'translateX(5px)';
        });

        viewMoreBtn.addEventListener('mouseleave', () => {
            viewMoreBtn.querySelector('i').style.transform = 'translateX(0)';
        });
    }

    // Initialize indicators
    function updateIndicators(activePage) {
        indicators.forEach((dot, index) => {
            if (index === activePage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Animate view more section
    function animateViewMore() {
        const container = document.querySelector('.view-more-container');
        container.style.transform = 'translateY(10px)';
        setTimeout(() => {
            container.style.transform = 'translateY(0)';
        }, 300);
    }

    // Show product details
    function showProductDetails(card) {
        const productTitle = card.querySelector('h3').textContent;
        const productDesc = card.querySelector('p').textContent;
        const features = Array.from(card.querySelectorAll('.product-features span'))
            .map(span => span.textContent.trim())
            .join('\n- ');

        // You can replace this with a modal or custom display
        alert(`${productTitle}\n\n${productDesc}\n\nFeatures:\n- ${features}`);
    }

    // Animate features on scroll
    const features = document.querySelectorAll('.product-features span');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        feature.style.transition = `all 0.3s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
}

// Initialize approach section animations
function initApproachAnimations() {
    const approachCards = document.querySelectorAll('.approach-card');
    
    // Add staggered animation delay to cards
    approachCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    approachCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
} 