/**
 * TutorWorld - Authentication JavaScript
 * Handles login/signup functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                handleAuth(form.id);
                event.preventDefault();
            }
            
            form.classList.add('was-validated');
        }, false);
    });

    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.input-group').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Handle authentication
    function handleAuth(formType) {
        const form = document.getElementById(formType);
        
        // Collect all form data with thorough validation
        const data = {};
        let isValid = true;

        if (formType === 'signupForm') {
            data.firstName = form.querySelector('#firstName').value.trim();
            data.lastName = form.querySelector('#lastName').value.trim();
            const termsChecked = form.querySelector('#terms').checked;
            
            if (!data.firstName || !data.lastName || !termsChecked) {
                isValid = false;
            }
        }

        data.email = form.querySelector('#email').value.trim();
        data.password = form.querySelector('#password').value;
        
        if (!data.email || !data.password) {
            isValid = false;
        }

        console.log('Terms checkbox checked:', formType === 'signupForm' ? form.querySelector('#terms').checked : 'N/A');

        console.log('Form data collected:', data);
        console.log('Form valid:', isValid);

        if (!isValid) {
            showToast('Please fill in all required fields', 'danger');
            return;
        }
        
        // Additional validation for signup
        if (formType === 'signupForm') {
            const password = form.querySelector('#password').value;
            const confirmPassword = form.querySelector('#confirmPassword').value;
            
            if (password !== confirmPassword) {
                form.querySelector('#confirmPassword').setCustomValidity('Passwords must match');
                form.querySelector('#confirmPassword').classList.add('is-invalid');
                return;
            }
        }
        
        // In a real app, this would be an API call
        if (formType === 'loginForm') {
            // Simulate login request
            simulateLogin(data)
                .then(response => {
                    showToast('Login successful! Redirecting...', 'success');
                    // Redirect to dashboard after delay
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                })
                .catch(error => {
                    showToast(error.message, 'danger');
                });
        } else if (formType === 'signupForm') {
            // Simulate signup request
            simulateSignup(data)
                .then(response => {
                    showToast('Account created successfully!', 'success');
                    // Redirect to login after delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                })
                .catch(error => {
                    showToast(error.message, 'danger');
                });
        }
    }

    // Simulate signup (replace with real API call)
    function simulateSignup(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Basic validation
                if (!userData.email || !userData.password) {
                    reject(new Error('Please fill in all fields'));
                    return;
                }
                
                // Check if email already exists
                const users = JSON.parse(localStorage.getItem('tutorworld_users')) || [];
                const emailExists = users.some(u => u.email === userData.email);
                
                if (emailExists) {
                    reject(new Error('Email already registered'));
                    return;
                }
                
                // Create new user object
                const newUser = {
                    id: Date.now().toString(),
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password, // In real app, hash this
                    createdAt: new Date().toISOString()
                };
                
                // Save to localStorage
                users.push(newUser);
                localStorage.setItem('tutorworld_users', JSON.stringify(users));
                
                resolve({ success: true, user: newUser });
            }, 800); // Simulate network delay
        });
    }

    // Simulate login (replace with real API call)
    function simulateLogin(credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Basic validation
                if (!credentials.email || !credentials.password) {
                    reject(new Error('Please fill in all fields'));
                    return;
                }
                
                // Check if user exists in localStorage
                const users = JSON.parse(localStorage.getItem('tutorworld_users')) || [];
                const user = users.find(u => 
                    u.email === credentials.email && 
                    u.password === credentials.password
                );
                
                if (user) {
                    // Store current user session
                    localStorage.setItem('tutorworld_current_user', JSON.stringify(user));
                    resolve({ success: true, user });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800); // Simulate network delay
        });
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast show align-items-center text-white bg-${type} border-0`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Manual close
        toast.querySelector('button').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    }
});
