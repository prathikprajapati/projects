// Global variables for tracking form entries
let educationCount = 0;
let skillCount = 0;
let projectCount = 0;
let experienceCount = 0;
let selectedTechnologies = new Set();

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initProfileImage();
    initTechnologyButtons();
    addEducation(); // Add first education entry
    addSkill(); // Add first skill entry
    addProject(); // Add first project entry
    addExperienceField(); // Add first experience entry
    
    // Initialize form submission
    const form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showConfirmModal();
        });
        
        // Initialize confirmation modal buttons
        const confirmBtn = document.querySelector('#confirmModal .btn-primary');
        const cancelBtn = document.querySelector('#confirmModal .btn-secondary');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', confirmAndSubmit);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideConfirmModal);
        }
    } else {
        console.error('Form not found');
    }
    
    // Test notification
    setTimeout(() => {
        showNotification('Welcome to Resume Builder!', 'success');
    }, 1000);
});

// Theme switching functionality
function initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', function(e) {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Profile image handling
function initProfileImage() {
    const container = document.querySelector('.profile-image-container');
    const fileInput = document.getElementById('profileImage');
    const preview = document.getElementById('profileImagePreview');
    let clickTimeout = null;
    let preventSingleClick = false;

    container.addEventListener('click', (e) => {
        if (preventSingleClick) {
            preventSingleClick = false;
            return;
        }

        if (clickTimeout === null) {
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
                if (!preview.classList.contains('placeholder-gif')) {
                    showImagePreview(preview.src);
                }
            }, 200);
        }
    });

    container.addEventListener('dblclick', (e) => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
        }
        preventSingleClick = true;
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.classList.remove('placeholder-gif');
                showImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Image preview modal
function showImagePreview(imageSrc) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content image-preview-content';
    
    const title = document.createElement('h3');
    title.className = 'preview-title';
    title.innerHTML = '<i class="las la-user-circle"></i> Profile Picture Preview';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '<i class="las la-times"></i>';
    
    const actions = document.createElement('div');
    actions.className = 'image-preview-actions';
    
    const changeBtn = document.createElement('button');
    changeBtn.className = 'preview-btn primary';
    changeBtn.innerHTML = '<i class="las la-camera"></i> Change Photo';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'preview-btn secondary';
    cancelBtn.innerHTML = '<i class="las la-times"></i> Close';
    
    // Assemble modal
    actions.appendChild(changeBtn);
    actions.appendChild(cancelBtn);
    
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(img);
    content.appendChild(actions);
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // Handle close actions
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;
    changeBtn.onclick = () => {
        closeModal();
        document.getElementById('profileImage').click();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
}

// Show notification modal
function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification-modal ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="las ${type === 'success' ? 'la-check-circle' : 'la-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);

    // Add show class after a small delay for animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 4000);
}

// Show error modal
function showErrorModal(message) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'error-modal-overlay';
    document.body.appendChild(overlay);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.innerHTML = `
        <div class="error-modal-content">
            <i class="las la-exclamation-circle error-modal-icon"></i>
            <p class="error-modal-message">${message}</p>
            <button class="error-modal-button">Got it</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Show modal and overlay with animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
        modal.classList.add('show');
    });

    // Handle close button
    const closeButton = modal.querySelector('.error-modal-button');
    const closeModal = () => {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
        }, 300);
    };

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

// Show confirmation modal
function showConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
    } else {
        console.error('Confirmation modal not found');
    }
}

// Hide confirmation modal
function hideConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Handle form submission with confirmation
async function confirmAndSubmit() {
    try {
        hideConfirmModal();
        const success = await handleFormSubmit();
        if (success) {
            // Show success notification
            showNotification('Resume saved successfully!', 'success');
            
            // Wait a moment for the notification to be visible
            setTimeout(() => {
                // Open trial.html in the same window
                window.location.href = 'trial.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Error during form submission:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}

// Education section handling
function addEducation() {
    const container = document.getElementById('educationContainer');
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = `
        <hr>
        <div class="form-group">
            <label><i class="las la-university"></i> Institution Name</label>
            <input type="text" name="education[${educationCount}][institution]" class="form-control" placeholder="Enter institution name" required>
        </div>
        <div class="form-group">
            <label><i class="las la-graduation-cap"></i> Degree</label>
            <input type="text" name="education[${educationCount}][degree]" class="form-control" placeholder="Enter degree/certification" required>
        </div>
        <div class="form-group date-range">
            <div class="date-field">
                <label><i class="las la-calendar"></i> Start Date</label>
                <input type="date" name="education[${educationCount}][startDate]" class="form-control" required>
            </div>
            <div class="date-field">
                <label><i class="las la-calendar-check"></i> End Date</label>
                <input type="date" name="education[${educationCount}][endDate]" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label><i class="las la-info-circle"></i> Description</label>
            <textarea name="education[${educationCount}][description]" class="form-control" rows="3" placeholder="Describe your studies, achievements, etc."></textarea>
        </div>
    `;
    container.appendChild(educationEntry);
    educationCount++;
}

// Skills section handling
function addSkill() {
    const container = document.getElementById('skillsContainer');
    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    skillEntry.innerHTML = `
        <input type="text" name="skills[${skillCount}][name]" placeholder="Skill name" required>
        <div class="proficiency-buttons">
            <button type="button" class="proficiency-btn" data-skill="${skillCount}" data-level="Beginner">Beginner</button>
            <button type="button" class="proficiency-btn" data-skill="${skillCount}" data-level="Intermediate">Intermediate</button>
            <button type="button" class="proficiency-btn" data-skill="${skillCount}" data-level="Advanced">Advanced</button>
            <button type="button" class="proficiency-btn" data-skill="${skillCount}" data-level="Expert">Expert</button>
        </div>
        <input type="hidden" name="skills[${skillCount}][level]" id="skillLevel${skillCount}">
    `;
    container.appendChild(skillEntry);

    // Initialize proficiency buttons
    initProficiencyButtons(skillCount);
    skillCount++;
}

function initProficiencyButtons(skillIndex) {
    const buttons = document.querySelectorAll(`.proficiency-btn[data-skill="${skillIndex}"]`);
    const hiddenInput = document.querySelector(`#skillLevel${skillIndex}`);
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons in this group
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update hidden input
            hiddenInput.value = button.getAttribute('data-level');
        });
    });
}

// Technology section handling
function initTechnologyButtons() {
    const techBtns = document.querySelectorAll('.tech-btn');
    techBtns.forEach(btn => {
        btn.addEventListener('click', () => addTechnology(btn.dataset.tech));
    });
}

function addTechnology(tech) {
    const selectedTechsDiv = document.getElementById('selectedTechs');
    const techInput = document.getElementById('technologiesInput');

    // Check if technology already exists
    if (selectedTechnologies.has(tech)) {
        showNotification(`'${tech}' is already added to your technologies!`);
        return;
    }

    // Add new technology
    selectedTechnologies.add(tech);
    const techTag = document.createElement('span');
    techTag.className = 'tech-tag';
    techTag.dataset.tech = tech;
    techTag.innerHTML = `${tech} <i class="las la-times" onclick="removeTechnology('${tech}')"></i>`;
    selectedTechsDiv.appendChild(techTag);
    techInput.value = Array.from(selectedTechnologies).join(',');
}

function removeTechnology(tech) {
    const techTag = document.querySelector(`.tech-tag[data-tech="${tech}"]`);
    if (techTag) {
        selectedTechnologies.delete(tech);
        techTag.remove();
        const techInput = document.getElementById('technologiesInput');
        techInput.value = Array.from(selectedTechnologies).join(',');
    }
}

function addCustomTech() {
    const customTechInput = document.getElementById('customTech');
    const tech = customTechInput.value.trim();
    
    if (!tech) return;
    
    addTechnology(tech);
    customTechInput.value = '';
}

// Project section handling
function addProject() {
    const container = document.getElementById('projectsContainer');
    const projectEntry = document.createElement('div');
    projectEntry.className = 'project-entry';
    projectEntry.id = `project${projectCount}`;
    projectEntry.innerHTML = `
        <hr>
        <div class="project-image-container">
            <img src="https://via.placeholder.com/400x200?text=Project+Image" 
                 alt="Project Preview" 
                 class="project-image-preview placeholder-image"
                 onclick="showProjectImagePreview(this.src, document.querySelector('#project${projectCount} input[name=\\'projects[${projectCount}][name]\\']')?.value || 'Project')">
            <div class="upload-overlay">
                <i class="las la-camera"></i>
                <span>Click to upload project image</span>
            </div>
            <input type="file" class="project-image-input" accept="image/*" style="display: none;" onchange="handleProjectImageUpload(event, ${projectCount})">
        </div>
        <div class="form-group">
            <label><i class="las la-project-diagram"></i> Project Name</label>
            <input type="text" name="projects[${projectCount}][name]" class="form-control" placeholder="Enter project name" required>
        </div>
        <div class="form-group">
            <label><i class="las la-link"></i> Project URL</label>
            <input type="url" name="projects[${projectCount}][url]" class="form-control" placeholder="Enter project URL">
        </div>
        <div class="form-group">
            <label><i class="las la-info-circle"></i> Description</label>
            <textarea name="projects[${projectCount}][description]" class="form-control" rows="3" placeholder="Describe your project, its features, and your role"></textarea>
        </div>
        <div class="form-group">
            <label><i class="las la-code"></i> Technologies Used</label>
            <div class="project-tech-container">
                <div class="predefined-techs" id="techButtons_${projectCount}">
                    <!-- Technology buttons will be added here -->
                </div>
                <div class="custom-tech-input">
                    <input type="text" class="form-control" placeholder="Add custom technology">
                    <button type="button" class="add-btn" onclick="addCustomTechToProject(${projectCount})">
                        <i class="las la-plus"></i> Add
                    </button>
                </div>
                <div class="selected-tech-container" id="selectedTech_${projectCount}">
                    <!-- Selected technologies will appear here -->
                </div>
                <input type="hidden" name="projects[${projectCount}][technologies]" id="projectTech_${projectCount}">
            </div>
        </div>
    `;
    
    container.appendChild(projectEntry);
    
    // Add click handler for image upload
    const imageContainer = projectEntry.querySelector('.project-image-container');
    const fileInput = projectEntry.querySelector('.project-image-input');
    
    imageContainer.addEventListener('click', (e) => {
        // If clicking the image itself, don't trigger file input
        if (e.target.tagName === 'IMG') return;
        fileInput.click();
    });
    
    initProjectTechButtons(projectCount);
    projectCount++;
}

// Add custom technology to project
function addCustomTechToProject(projectIndex) {
    const container = document.getElementById(`project${projectIndex}`);
    const input = container.querySelector('.custom-tech-input input');
    const tech = input.value.trim();
    
    if (tech) {
        addTechnologyToProject(projectIndex, tech);
        input.value = ''; // Clear input after adding
    }
}

// Add technology to project
function addTechnologyToProject(projectIndex, tech) {
    const selectedContainer = document.getElementById(`selectedTech_${projectIndex}`);
    const hiddenInput = document.getElementById(`projectTech_${projectIndex}`);
    const currentTechs = hiddenInput.value ? JSON.parse(hiddenInput.value) : [];
    
    if (!currentTechs.includes(tech)) {
        currentTechs.push(tech);
        hiddenInput.value = JSON.stringify(currentTechs);
        
        const techSpan = document.createElement('span');
        techSpan.className = 'selected-tech';
        techSpan.innerHTML = `
            ${tech}
            <i class="las la-times" onclick="removeTechnologyFromProject(${projectIndex}, '${tech}')"></i>
        `;
        selectedContainer.appendChild(techSpan);
    }
}

// Remove technology from project
function removeTechnologyFromProject(projectIndex, tech) {
    const selectedContainer = document.getElementById(`selectedTech_${projectIndex}`);
    const hiddenInput = document.getElementById(`projectTech_${projectIndex}`);
    const currentTechs = JSON.parse(hiddenInput.value);
    
    const updatedTechs = currentTechs.filter(t => t !== tech);
    hiddenInput.value = JSON.stringify(updatedTechs);
    
    // Remove the tech element from display
    const techElements = selectedContainer.getElementsByClassName('selected-tech');
    for (let el of techElements) {
        if (el.textContent.trim() === tech) {
            el.remove();
            break;
        }
    }
}

function initProjectTechButtons(projectIndex) {
    const techContainer = document.querySelector(`#project${projectIndex} .project-tech-container`);
    const selectedTechContainer = document.querySelector(`#project${projectIndex} .selected-tech-container`);
    const customTechInput = document.querySelector(`#project${projectIndex} .custom-tech-input input`);
    const techInput = document.getElementById(`projectTech_${projectIndex}`);
    const addCustomButton = document.querySelector(`#project${projectIndex} .custom-tech-input button`);
    
    if (!techContainer || !selectedTechContainer || !customTechInput || !techInput || !addCustomButton) {
        console.error('Required elements not found for project tech buttons');
        return;
    }

    let selectedTechs = new Set();

    function updateTechInput() {
        techInput.value = JSON.stringify(Array.from(selectedTechs));
    }

    // Initialize predefined tech buttons
    const technologies = [
        'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular',
        'Node.js', 'Python', 'Java', 'C++', 'PHP', 'Ruby',
        'SQL', 'MongoDB', 'Git', 'Docker'
    ];

    const predefinedTechsContainer = techContainer.querySelector('.predefined-techs');
    predefinedTechsContainer.innerHTML = ''; // Clear existing buttons

    technologies.forEach(tech => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tech-btn';
        btn.textContent = tech;
        btn.setAttribute('data-tech', tech);
        
        btn.addEventListener('click', (e) => {
            if (!e.target.classList.contains('disabled')) {
                addTechnologyToProject(projectIndex, tech);
            }
        });
        
        predefinedTechsContainer.appendChild(btn);
    });

    // Handle custom technology input
    customTechInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tech = customTechInput.value.trim();
            if (tech) {
                addTechnologyToProject(projectIndex, tech);
                customTechInput.value = '';
            }
        }
    });
}

// Project image handling
function handleProjectImageUpload(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Use the specific project's container to find its image
            const projectContainer = document.getElementById(`project${index}`);
            const preview = projectContainer.querySelector('.project-image-preview');
            
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                preview.classList.remove('placeholder-image');
            }
        };
        reader.readAsDataURL(file);
    }
}

// Generate unique filename with timestamp
function generateFileName(name) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `resume_${sanitizedName}_${timestamp}.json`;
}

// Function to add new experience field
function addExperienceField() {
    const container = document.getElementById('experienceFields');
    const experienceEntry = document.createElement('div');
    experienceEntry.className = 'experience-entry';
    experienceEntry.innerHTML = `
        <hr>
        <div class="form-group">
            <label><i class="las la-building"></i> Company Name</label>
            <input type="text" name="experience[${experienceCount}][company]" class="form-control" placeholder="Enter company name" required>
        </div>
        <div class="form-group">
            <label><i class="las la-user-tie"></i> Job Title</label>
            <input type="text" name="experience[${experienceCount}][title]" class="form-control" placeholder="Enter your position" required>
        </div>
        <div class="form-group date-range">
            <div class="date-field">
                <label><i class="las la-calendar"></i> Start Date</label>
                <input type="date" name="experience[${experienceCount}][startDate]" class="form-control" required>
            </div>
            <div class="date-field">
                <label><i class="las la-calendar-check"></i> End Date</label>
                <input type="date" name="experience[${experienceCount}][endDate]" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <div class="checkbox-wrapper">
                <input type="checkbox" name="experience[${experienceCount}][current]" id="currentJob_${experienceCount}" class="current-job-checkbox">
                <label for="currentJob_${experienceCount}">I am currently working here</label>
            </div>
        </div>
        <div class="form-group">
            <label><i class="las la-tasks"></i> Job Description</label>
            <textarea name="experience[${experienceCount}][description]" class="form-control" rows="4" placeholder="Describe your key responsibilities and achievements"></textarea>
        </div>
    `;
    container.appendChild(experienceEntry);

    // Add event listener for current job checkbox
    const currentJobCheckbox = experienceEntry.querySelector('.current-job-checkbox');
    const endDateInput = experienceEntry.querySelector('input[name$="[endDate]"]');
    
    currentJobCheckbox.addEventListener('change', function() {
        if (this.checked) {
            endDateInput.value = '';
            endDateInput.disabled = true;
        } else {
            endDateInput.disabled = false;
        }
    });

    experienceCount++;
}

// Form submission handling
async function handleFormSubmit() {
    try {
        const formData = new FormData(document.getElementById('resumeForm'));
        
        // Validate required fields
        if (!formData.get('fullName')) {
            showNotification('Please enter your full name', 'error');
            return;
        }
        if (!formData.get('email')) {
            showNotification('Please enter your email', 'error');
            return;
        }

        const data = {
            metadata: {
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                version: "1.0"
            },
            personalInfo: {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                profileImage: document.getElementById('profileImagePreview').src
            },
            education: [],
            skills: [],
            projects: [],
            experience: []
        };

        // Collect education data
        for (let i = 0; i < educationCount; i++) {
            const institution = formData.get(`education[${i}][institution]`);
            if (institution) {
                data.education.push({
                    institution: institution,
                    degree: formData.get(`education[${i}][degree]`),
                    startDate: formData.get(`education[${i}][startDate]`),
                    endDate: formData.get(`education[${i}][endDate]`),
                    description: formData.get(`education[${i}][description]`)
                });
            }
        }

        // Validate at least one education entry
        if (data.education.length === 0) {
            showNotification('Please add at least one education entry', 'error');
            return;
        }

        // Collect skills data
        for (let i = 0; i < skillCount; i++) {
            const skillName = formData.get(`skills[${i}][name]`);
            const level = formData.get(`skills[${i}][level]`);
            if (skillName && level) {
                data.skills.push({
                    name: skillName,
                    level: level
                });
            }
        }

        // Validate at least one skill
        if (data.skills.length === 0) {
            showNotification('Please add at least one skill', 'error');
            return;
        }

        // Collect project data
        for (let i = 0; i < projectCount; i++) {
            const projectName = formData.get(`projects[${i}][name]`);
            if (projectName) {
                // Get project image from the correct container
                const projectContainer = document.getElementById(`project${i}`);
                const projectImage = projectContainer?.querySelector('.project-image-preview')?.src || '';
                const technologies = document.getElementById(`projectTech_${i}`)?.value;
                
                data.projects.push({
                    name: projectName,
                    url: formData.get(`projects[${i}][url]`),
                    description: formData.get(`projects[${i}][description]`),
                    image: projectImage,
                    technologies: technologies ? JSON.parse(technologies) : []
                });
            }
        }

        // Validate at least one project
        if (data.projects.length === 0) {
            showNotification('Please add at least one project', 'error');
            return;
        }

        // Collect experience data
        for (let i = 0; i < experienceCount; i++) {
            const companyName = formData.get(`experience[${i}][company]`);
            if (companyName) {
                data.experience.push({
                    company: companyName,
                    title: formData.get(`experience[${i}][title]`),
                    startDate: formData.get(`experience[${i}][startDate]`),
                    endDate: formData.get(`experience[${i}][endDate]`),
                    current: formData.get(`experience[${i}][current]`) === 'on',
                    description: formData.get(`experience[${i}][description]`)
                });
            }
        }

        // Validate at least one experience entry
        if (data.experience.length === 0) {
            showNotification('Please add at least one experience entry', 'error');
            return;
        }

        // Convert to JSON and save
        const fileName = generateFileName('resume_' + data.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-'));
        const jsonContent = JSON.stringify(data, null, 2);
        
        // Create a Blob and save it
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);

        // Also save to data directory for the portfolio to use
        const portfolioData = new Blob([jsonContent], { type: 'application/json' });
        const formData2 = new FormData();
        formData2.append('resume', portfolioData, 'resume.json');
        
        // Save the file to the data directory
        try {
            await fetch('data/resume.json', {
                method: 'PUT',
                body: jsonContent,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error saving to data directory:', error);
            // Continue anyway as we've already saved the downloadable version
        }

        return true; // Indicate successful submission
    } catch (error) {
        console.error('Error in form submission:', error);
        showNotification('An error occurred while saving the resume.', 'error');
        return false;
    }
}
