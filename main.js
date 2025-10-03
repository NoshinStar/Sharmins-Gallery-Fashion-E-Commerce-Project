// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// Filter tabs functionality
const filterTabs = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 1. Manage active state
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // 2. Get the filter value from the data-filter attribute
        const filterValue = tab.getAttribute('data-filter');

        // 3. Loop through all products and show/hide based on the filter
        productCards.forEach(card => {
            const productCategory = card.getAttribute('data-category');
            
            // Check if the card's category contains the filter value or if the filter is 'all'
            if (filterValue === 'all' || productCategory.includes(filterValue)) {
                // 'block' is used here, but 'flex' or 'grid' might be better 
                // depending on your default product-card display
                card.style.display = 'block'; 
                
                // Also ensure the animation is visible when shown
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                // Hide the product
                card.style.display = 'none'; 
            }
        });
    });
});

// Wishlist functionality
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('bx-heart');
            icon.classList.add('bxs-heart');
        } else {
            icon.classList.remove('bxs-heart');
            icon.classList.add('bx-heart');
        }
    });
});

// Add to cart functionality
const cartBtns = document.querySelectorAll('.cart-add');
const cartBadge = document.querySelector('.badge');
let cartCount = 0;

cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartBadge.textContent = cartCount;
        
        // Add animation feedback
        btn.textContent = 'Added!';
        btn.style.background = 'var(--success)';
        btn.style.color = 'var(--white)';
        
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        if (email) {
            alert('Thank you for subscribing! You will receive exclusive offers and updates.');
            newsletterForm.querySelector('input').value = '';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Search functionality (basic implementation)
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchQuery = prompt('Search for products:');
        if (searchQuery) {
            alert(`Searching for: ${searchQuery}`);
            // Here you would implement actual search functionality
        }
    });
}

// Intersection Observer for fade-in animations
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

// Observe elements for animation
document.querySelectorAll('.product-card, .collection-card, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Cart button click
const cartBtn = document.querySelector('.cart-btn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        alert('Shopping cart feature coming soon!');
        // Here you would open a cart modal or navigate to cart page
    });
}