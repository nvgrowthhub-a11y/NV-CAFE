
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // MOBILE HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.dish-card, .offer-card, .review-card, .about-content, .about-image');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        revealObserver.observe(el);
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // ============================================
    // RESERVATION FORM
    // ============================================
    const reservationForm = document.getElementById('reservationForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        // Show success toast
        toastMessage.textContent = `Thank you ${name}! Your table for ${guests} is reserved for ${date} at ${time}.`;
        toast.classList.add('show');
        
        // Reset form
        reservationForm.reset();
        
        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    });

    // ============================================
    // ORDER BUTTONS
    // ============================================
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const dishName = this.parentElement.querySelector('h3').textContent;
            toastMessage.textContent = `${dishName} added to your order!`;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    });

    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================
    const newsletterBtn = document.querySelector('.newsletter button');
    const newsletterInput = document.querySelector('.newsletter input');
    
    newsletterBtn.addEventListener('click', function() {
        if (newsletterInput.value && newsletterInput.value.includes('@')) {
            toastMessage.textContent = 'Thank you for subscribing to our newsletter!';
            toast.classList.add('show');
            newsletterInput.value = '';
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } else {
            toastMessage.textContent = 'Please enter a valid email address.';
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    });

    // ============================================
    // COUNTER ANIMATION FOR OFFERS
    // ============================================
    const offerPrices = document.querySelectorAll('.offer-price');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceEl = entry.target;
                const originalText = priceEl.innerHTML;
                
                // Simple animation effect
                priceEl.style.transform = 'scale(1.2)';
                priceEl.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    priceEl.style.transform = 'scale(1)';
                }, 300);
                
                counterObserver.unobserve(priceEl);
            }
        });
    }, { threshold: 0.5 });
    
    offerPrices.forEach(price => counterObserver.observe(price));

    // ============================================
    // CURSOR GLOW EFFECT (Desktop Only)
    // ============================================
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ============================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--black);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.8s ease, visibility 0.8s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div style="font-family: 'Great Vibes', cursive; font-size: 4rem; color: #c9a84c; margin-bottom: 20px;">
                NVCAFE
            </div>
            <div style="width: 200px; height: 2px; background: rgba(201,168,76,0.2); margin: 0 auto; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: #c9a84c; animation: loadingBar 1.5s ease-in-out forwards;"></div>
            </div>
        </div>
    `;
    
    // Add loading animation style
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes loadingBar {
            0% { left: -100%; }
            50% { left: 0; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }, 1800);

    console.log('%c NVCAFE ', 'background: #c9a84c; color: #0a0a0a; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Premium Cafe Website Loaded Successfully! ', 'color: #c9a84c; font-size: 14px;');
});
