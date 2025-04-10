// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', function() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? null : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Page navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.querySelector(`#${this.dataset.page}`).classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');

        // Initialize stats animation if on home page
        if (this.dataset.page === 'home') {
            animateStats();
        }
    });
});

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Sample course data
const courses = [
    {
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming",
        level: "beginner",
        duration: "4 weeks",
        students: "1200",
        image: "js-course.jpg"
    },
    {
        title: "React Masterclass",
        description: "Build modern web apps with React",
        level: "intermediate",
        duration: "6 weeks",
        students: "850",
        image: "react-course.jpg"
    },
    {
        title: "Advanced Algorithms",
        description: "Master complex algorithms and data structures",
        level: "advanced",
        duration: "8 weeks",
        students: "450",
        image: "algo-course.jpg"
    }
];

// Render courses
function renderCourses(filter = 'all') {
    const courseGrid = document.querySelector('.course-grid');
    courseGrid.innerHTML = '';
    
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.level === filter);
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>${course.duration}</span>
                    <span class="course-level" data-level="${course.level}">${course.level}</span>
                </div>
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });
}

// Initialize filter tags
function initFilterTags() {
    const tags = document.querySelectorAll('.filter-tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelector('.filter-tag.active').classList.remove('active');
            this.classList.add('active');
            renderCourses(this.dataset.tag);
        });
    });
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('course-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize when home page is active
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#home.page.active')) {
        animateStats();
    }
    
    // Initialize courses page if active
    if (document.querySelector('#courses.page.active')) {
        renderCourses();
        initFilterTags();
        initSearch();
    }
    
    // Reinitialize when navigating to courses
    document.querySelectorAll('.nav-link[data-page="courses"]').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                renderCourses();
                initFilterTags();
                initSearch();
            }, 100);
        });
    });
});
// User database (simulated with localStorage)
const USER_DB_KEY = 'divanshi_users';

// Initialize user database if not exists
if (!localStorage.getItem(USER_DB_KEY)) {
    localStorage.setItem(USER_DB_KEY, JSON.stringify([]));
}

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const modal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close-modal');

// Toggle between login and signup forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Modal controls
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Show modal with message
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem(USER_DB_KEY));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        showModal('Login Successful', `Welcome back, ${user.name}!`);
        // Redirect to main page after 2 seconds
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 2000);
    } else {
        showModal('Login Failed', 'Invalid email or password');
    }
});

// Signup form handler
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    
    const users = JSON.parse(localStorage.getItem(USER_DB_KEY));
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        showModal('Signup Failed', 'Email already registered');
        return;
    }
    
    // Add new user
    users.push({ name, email, password });
    localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
    
    showModal('Account Created', `Welcome ${name}! Your account has been created.`);
    
    // Switch to login form after 2 seconds
    setTimeout(() => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        signupForm.reset();
    }, 2000);
});

// Add login-page class to body if on login page
if (window.location.pathname.includes('login.html')) {
    document.body.classList.add('login-page');
}
