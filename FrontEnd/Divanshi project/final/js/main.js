/**
 * TutorWorld - Main JavaScript File
 * Contains core functionality for the learning platform
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Function to initialize modal buttons
    function initModalButtons() {
        document.querySelectorAll('[data-auth-modal]').forEach(btn => {
            btn.addEventListener('click', function() {
                const modalType = this.getAttribute('data-auth-modal');
                fetch(`${modalType}.html`)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to load form');
                        return response.text();
                    })
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const content = doc.querySelector('.auth-card');
                        if (!content) throw new Error('Form content not found');
                        
                        const modalContent = document.querySelector(`#${modalType}Modal .modal-content`);
                        modalContent.innerHTML = '';
                        modalContent.appendChild(content.cloneNode(true));
                        
                        const modal = new bootstrap.Modal(document.getElementById(`${modalType}Modal`));
                        modal.show();
                        
                        initAuthForms();
                    })
                    .catch(error => {
                        console.error('Modal loading error:', error);
                        alert('Failed to load form. Please try again.');
                    });
            });
        });
    }

    // Load navbar first
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('navbar-container');
            container.innerHTML = html;
            
            // Initialize modals after short delay to ensure DOM is ready
            setTimeout(() => {
                initModalButtons();
                // Initialize auth forms in case they were loaded with the page
                initAuthForms();
            }, 50);
        })
        .catch(error => {
            console.error('Navbar loading error:', error);
        });

    // Initialize any existing elements immediately
    initModalButtons();
    initAuthForms();

    function initAuthForms() {
        // Form validation
        const forms = document.querySelectorAll('.needs-validation');
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });

        // Password toggle
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.querySelector('i').classList.toggle('fa-eye-slash');
            });
        });
    }

    // Animated counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Initialize animations when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Course search functionality
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                card.style.display = title.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
});

// Utility Functions
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
