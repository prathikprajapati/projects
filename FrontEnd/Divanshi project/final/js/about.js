/**
 * TutorWorld - About Page JavaScript
 * Handles team display and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample team data
    const teamMembers = [
        {
            name: "Dr. Emily Parker",
            role: "Founder & CEO",
            bio: "Education technology expert with 15+ years experience",
            image: "assets/team-emily.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                github: "#"
            }
        },
        {
            name: "Mark Williams",
            role: "CTO",
            bio: "Full-stack developer specializing in edtech platforms",
            image: "assets/team-mark.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                github: "#"
            }
        },
        {
            name: "Sarah Johnson",
            role: "Head of Instruction",
            bio: "Curriculum designer and former university professor",
            image: "assets/team-sarah.jpg",
            social: {
                twitter: "#",
                linkedin: "#",
                github: "#"
            }
        }
    ];

    // DOM Elements
    const teamContainer = document.getElementById('team-container');

    // Display team members
    function displayTeam() {
        teamContainer.innerHTML = teamMembers.map(member => `
            <div class="col-md-4 mb-4">
                <div class="card team-card h-100">
                    <img src="${member.image}" class="card-img-top" alt="${member.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${member.name}</h5>
                        <p class="text-primary">${member.role}</p>
                        <p class="card-text">${member.bio}</p>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <a href="${member.social.twitter}" class="text-dark mx-2"><i class="fab fa-twitter"></i></a>
                        <a href="${member.social.linkedin}" class="text-dark mx-2"><i class="fab fa-linkedin"></i></a>
                        <a href="${member.social.github}" class="text-dark mx-2"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize animations
        animateTeamCards();
    }

    // Animate team cards on scroll
    function animateTeamCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.team-card').forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }

    // Add CSS animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initial display
    displayTeam();
});
