// Profile Page JavaScript with comprehensive error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Dark Mode Toggle
        const initDarkMode = () => {
            const toggle = document.getElementById('darkModeToggle');
            if (!toggle) return;
            
            toggle.addEventListener('change', function() {
                document.body.classList.toggle('dark-mode', this.checked);
                localStorage.setItem('darkMode', this.checked);
            });

            if (localStorage.getItem('darkMode') === 'true') {
                toggle.checked = true;
                document.body.classList.add('dark-mode');
            }
        };

        // Profile Form Handling
        const initProfileForm = () => {
            const saveBtn = document.getElementById('saveProfileBtn');
            if (!saveBtn) return;

            saveBtn.addEventListener('click', function() {
                const nameEl = document.getElementById('nameInput');
                const bioEl = document.getElementById('bioInput');
                const nameDisplay = document.getElementById('profile-name');
                const bioDisplay = document.getElementById('profile-bio');
                
                if (nameEl && nameDisplay) nameDisplay.textContent = nameEl.value;
                if (bioEl && bioDisplay) bioDisplay.textContent = bioEl.value;
                
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById('editProfileModal')
                );
                if (modal) modal.hide();
            });
        };

        // Password Form Handling
        const initPasswordForm = () => {
            const changeBtn = document.getElementById('changePasswordBtn');
            if (!changeBtn) return;

            changeBtn.addEventListener('click', function() {
                alert('Password changed successfully!');
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById('changePasswordModal')
                );
                if (modal) modal.hide();
            });
        };

        // Avatar Upload Handling
        const initAvatarUpload = () => {
            const upload = document.getElementById('avatarUpload');
            if (!upload) return;

            upload.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('avatarPreview');
                    const profileImg = document.getElementById('profile-avatar');
                    if (preview) preview.src = event.target.result;
                    if (profileImg) profileImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
        };

        // Set Autocomplete Attributes
        const setAutocomplete = () => {
            const fields = {
                'currentPassword': 'current-password',
                'newPassword': 'new-password',
                'confirmPassword': 'new-password'
            };

            Object.entries(fields).forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el) el.setAttribute('autocomplete', value);
            });
        };

        // Initialize all components
        initDarkMode();
        initProfileForm();
        initPasswordForm();
        initAvatarUpload();
        setAutocomplete();

    } catch (error) {
        console.error('Profile page initialization error:', error);
    }
});
