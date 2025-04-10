// Theme Switching Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? null : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Page Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Course Search Functionality
function searchCourses() {
    const searchTerm = document.getElementById('course-search').value.toLowerCase();
    const courses = document.querySelectorAll('.course-card');
    
    courses.forEach(course => {
        const title = course.querySelector('h3').textContent.toLowerCase();
        const matches = title.includes(searchTerm);
        course.style.display = matches ? 'block' : 'none';
    });
}

// User Authentication Functions
function loginUser(email, password) {
    // Will be implemented with JSON storage
    console.log('Login functionality to be implemented');
}

function registerUser(userData) {
    // Will be implemented with JSON storage
    console.log('Registration functionality to be implemented');
}

// Initialize counter animations
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
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

// Navigation Functions
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
}

// Profile Icon Functionality
function handleProfileClick() {
    window.location.href = 'profile.html';
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
    }
    return isValid;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    updateActiveNavLink();
    
    // Add event listeners
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('course-search')?.addEventListener('input', searchCourses);
    document.querySelector('.profile-icon')?.addEventListener('click', handleProfileClick);
    
    // Handle navigation clicks
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
});
