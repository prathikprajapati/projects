// Typing animation
var typed = new Typed('#element', {
    strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
    typeSpeed: 120,
    backSpeed: 140,
    loop: true,
    smartBackspace: true,
    backDelay: 1500
});

//Navbar animation
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
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelector('.theme-toggle i').classList.replace('la-moon', 'la-sun');
}

// Open the modal when the "Contact" link is clicked
document.getElementById('contact-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('contactModal').style.display = 'block';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('contactModal')) {
        document.getElementById('contactModal').style.display = 'none';
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Function to load JSON data without disturbing existing content
async function loadResumeData() {
    try {
        const response = await fetch('data/resume.json');
        const data = await response.json();
        updatePortfolio(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

function updatePortfolio(data) {
    // Update personal info without changing structure
    const nameElement = document.querySelector('.profile h1');
    if (nameElement) {
        nameElement.textContent = data.personalInfo.fullName;
    }
    
    // Update profile image if it exists in data
    if (data.personalInfo.profileImage) {
        const profileImage = document.querySelector('.sec-right img');
        if (profileImage) {
            profileImage.src = data.personalInfo.profileImage;
        }
    }
    
    // Update education section while preserving structure
    const educationList = document.querySelector('#education .timeline ul');
    if (educationList) {
        educationList.innerHTML = ''; // Clear existing items
        data.education.forEach(edu => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${new Date(edu.startDate).toLocaleDateString()}</span>
                <div class="content">
                    <h3>${edu.institution}</h3>
                    <p>${edu.degree}${edu.description ? `<br>${edu.description}` : ''}</p>
                </div>
            `;
            educationList.appendChild(li);
        });
    }

    // Update skills section while preserving structure
    const skillsContainer = document.querySelector('#skills');
    if (skillsContainer) {
        const existingTitle = skillsContainer.querySelector('h1');
        const skillsContent = document.createElement('div');
        skillsContent.className = 'skills-grid';
        
        data.skills.forEach(skill => {
            // Convert skill level to percentage for visual filling
            let skillPercentage;
            let skillColor;
            switch(skill.level.toLowerCase()) {
                case 'beginner':
                    skillPercentage = 25;
                    skillColor = '#ff6b6b';
                    break;
                case 'intermediate':
                    skillPercentage = 50;
                    skillColor = '#ffd93d';
                    break;
                case 'advanced':
                    skillPercentage = 75;
                    skillColor = '#6bcb77';
                    break;
                case 'expert':
                    skillPercentage = 90;
                    skillColor = '#4d96ff';
                    break;
                default:
                    skillPercentage = 50;
                    skillColor = '#ffd93d';
            }

            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-container';
            skillDiv.innerHTML = `
                <div class="skill-header">
                    <h3>${skill.name}</h3>
                </div>
                <div class="skill-bar">
                    <div class="skill-fill" style="max-width:${skillPercentage}%; background: ${skillColor}">
                        <span class="skill-level-tag" style="opacity: 1;">${skill.level}</span>
                    </div>
                </div>
            `;
            skillsContent.appendChild(skillDiv);
        });
        
        // Preserve existing title and append new content
        skillsContainer.innerHTML = '';
        if (existingTitle) {
            skillsContainer.appendChild(existingTitle);
        }
        skillsContainer.appendChild(skillsContent);

        // Animate skill bars with filling effect
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach(skillFill => {
            skillFill.style.width = '0%';
            setTimeout(() => {
                skillFill.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                skillFill.style.width = skillFill.style.maxWidth;
            }, 200);
        });
    }

    // Update projects section while preserving structure and filters
    const projectsSection = document.querySelector('#projects');
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        // Get unique technologies from all projects
        const allTechnologies = new Set();
        data.projects.forEach(project => {
            project.technologies.forEach(tech => allTechnologies.add(tech.toLowerCase()));
        });

        // Update filter buttons
        const filterButtonsContainer = projectsSection.querySelector('.project-filters');
        filterButtonsContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All</button>
            ${[...allTechnologies].map(tech => 
                `<button class="filter-btn" data-filter="${tech}">${tech}</button>`
            ).join('')}
        `;

        // Clear and add project cards
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-card';
            // Add all technologies as data categories for better filtering
            projectDiv.setAttribute('data-categories', project.technologies.map(t => t.toLowerCase()).join(' '));
            
            projectDiv.innerHTML = `
                <div class="project-image">
                    <img src="${project.image || 'https://via.placeholder.com/300x200'}" alt="${project.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200'">
                </div>
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.description || 'No description available'}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.url ? `<a href="${project.url}" target="_blank"><i class="las la-external-link-alt"></i> View Project</a>` : ''}
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectDiv);
        });

        // Initialize filters after adding projects
        initializeFilters();
    }

    // Update experience section while preserving structure
    const experienceTimeline = document.querySelector('#right .timeline');
    if (experienceTimeline) {
        // Add heading and create the ul element
        experienceTimeline.innerHTML = `
            <center>
                <h1 style="font-size: 60px;">Experience</h1>
            </center>
            <br><br>
            <ul></ul>
        `;
        const timelineUl = experienceTimeline.querySelector('ul');
        
        data.experience.forEach(exp => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${new Date(exp.startDate).toLocaleDateString()}</span>
                <div class="content">
                    <h3>${exp.title} at ${exp.company}</h3>
                    <p>${exp.description || 'No description available'}</p>
                </div>
            `;
            timelineUl.appendChild(li);
        });
    }
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Set initial state
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.display = 'block';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-categories');
                const shouldShow = filterValue === 'all' || categories.includes(filterValue);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
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
    loadResumeData(); // Load JSON data first
});