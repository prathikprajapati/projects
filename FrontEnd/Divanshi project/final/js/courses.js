/**
 * TutorWorld - Courses Page JavaScript
 * Handles course display, search, and filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample course data (will be replaced with API call)
    const courses = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            instructor: "Sarah Johnson",
            level: "Beginner",
            duration: "6 weeks",
            rating: 4.8,
            students: 1250,
            thumbnail: "assets/course-js.jpg",
            description: "Learn core JavaScript concepts from scratch",
            price: "$49.99"
        },
        {
            id: 2,
            title: "Advanced React Patterns",
            instructor: "Michael Chen",
            level: "Advanced",
            duration: "8 weeks",
            rating: 4.9,
            students: 890,
            thumbnail: "assets/course-react.jpg",
            description: "Master advanced React concepts and patterns",
            price: "$79.99"
        },
        // Additional courses would be added here
    ];

    // DOM Elements
    const courseContainer = document.getElementById('course-container');
    const searchInput = document.getElementById('course-search');
    const filterTags = document.querySelectorAll('.filter-tags .badge');

    // Display courses
    function displayCourses(filteredCourses = courses) {
        courseContainer.innerHTML = filteredCourses.map(course => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="course-card card h-100">
                    <img src="${course.thumbnail}" class="card-img-top" alt="${course.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="badge bg-${getLevelBadgeColor(course.level)}">${course.level}</span>
                            <span class="text-muted">${course.duration}</span>
                        </div>
                        <h5 class="card-title course-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                <span class="text-warning">
                                    ${renderRatingStars(course.rating)}
                                </span>
                                <small class="text-muted">(${course.students})</small>
                            </div>
                            <h5 class="text-primary mb-0">${course.price}</h5>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-primary w-100">Enroll Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Helper functions
    function getLevelBadgeColor(level) {
        const colors = {
            'Beginner': 'success',
            'Intermediate': 'primary',
            'Advanced': 'danger'
        };
        return colors[level] || 'secondary';
    }

    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        return '★'.repeat(fullStars) + 
               (halfStar ? '½' : '') + 
               '☆'.repeat(emptyStars);
    }

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) || 
            course.description.toLowerCase().includes(searchTerm)
        );
        displayCourses(filtered);
    });

    // Filter by level
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const level = this.textContent;
            if (level === 'All') {
                displayCourses();
                return;
            }
            const filtered = courses.filter(course => course.level === level);
            displayCourses(filtered);
        });
    });

    // Initial display
    displayCourses();
});
