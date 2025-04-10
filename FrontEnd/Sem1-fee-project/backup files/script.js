// Typing animation
function initializeTyped() {
    new Typed('#element', {
        strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
        typeSpeed: 120,
        backSpeed: 140,
        loop: true,
        smartBackspace: true,
        backDelay: 1500
    });
}

// Navbar animation
function initializeNavbarAnimations() {
    if (typeof jQuery !== 'undefined') {
        $('.expandHome').mouseover(function () {
            $('.sub-home').css({
                'display': 'block'
            });
        });
        
        $('#quadrilateral').mouseleave(function () {
            $('#quadrilateral').css({
                'margin-top': '-53px'
            });
            $('.sub-home').css({
                'display': 'none'
            });
        }).mouseenter(function () {
            $('#quadrilateral').css({
                'margin-top': '0px'
            });
        });
    } else {
        console.warn('jQuery not loaded');
    }
}

// Theme Toggle
function toggleTheme() {
    const root = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');

    if (root.getAttribute('data-theme') === 'light') {
        root.removeAttribute('data-theme');
        themeIcon.classList.remove('la-sun');
        themeIcon.classList.add('la-moon');
    } else {
        root.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('la-moon');
        themeIcon.classList.add('la-sun');
    }
}

// Initialize theme
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.theme-toggle i').classList.replace('la-moon', 'la-sun');
    }
}

// Open the modal when the "Contact" link is clicked
function initializeContactModal() {
    const contactLink = document.getElementById('contact-link');
    const contactModal = document.getElementById('contactModal');
    
    if (contactLink && contactModal) {
        contactLink.addEventListener('click', function (event) {
            event.preventDefault();
            contactModal.style.display = 'block';
        });

        window.addEventListener('click', function (event) {
            if (event.target == contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }
}

// Mobile Navigation
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) {
        console.warn('Filter buttons or project cards not found');
        return;
    }

    // Set initial state
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.display = 'block';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked:', this.getAttribute('data-filter')); // Debug log
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeTyped();
        initializeNavbarAnimations();
        initializeTheme();
        initializeContactModal();
        initializeMobileNavigation();
        initializeFilters();
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
});