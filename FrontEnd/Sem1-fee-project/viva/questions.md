# Portfolio Website Viva Questions

## Easy Questions (25)

1. Q: What is the purpose of the viewport meta tag in HTML?
   A: It controls the viewport's size and scaling on mobile devices
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   ```
   Ref: Meta tag in trial.html

2. Q: What is jQuery used for in this project?
   A: For DOM manipulation and handling animations
   ```javascript
   $('.expandHome').mouseover(function () {
       $('.sub-home').css({
           'display': 'block'
       });
   });
   ```
   Ref: jQuery usage in script.js

3. Q: What is the purpose of the hamburger menu?
   A: To provide navigation options on mobile devices
   ```html
   <div class="hamburger">
       <span></span>
       <span></span>
       <span></span>
   </div>
   ```
   Ref: Mobile menu in trial.html

4. Q: What are CSS variables used for in this project?
   A: To manage theme colors and make global style changes easier
   ```css
   :root {
       --primary-bg: #0a192f;
       --secondary-bg: #112240;
       --accent-color: #64ffda;
       --text-primary: #ccd6f6;
   }
   ```
   Ref: CSS variables in style.css

5. Q: How many theme options are available?
   A: Two themes - light and dark
   ```javascript
   function toggleTheme() {
       const root = document.documentElement;
       if (root.getAttribute('data-theme') === 'light') {
           root.removeAttribute('data-theme');
       } else {
           root.setAttribute('data-theme', 'light');
       }
   }
   ```
   Ref: Theme toggle implementation

6. Q: What is the purpose of the typing animation?
   A: To display different roles/skills dynamically in the profile section
   ```javascript
   var typed = new Typed('#element', {
       strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
       typeSpeed: 120,
       backSpeed: 140,
       loop: true
   });
   ```
   Ref: Typed.js implementation

7. Q: What icon library is used in the project?
   A: Line Awesome
   ```html
   <link rel="stylesheet" href="1.3.0\css\line-awesome.min.css">
   <i class="las la-moon"></i>
   ```
   Ref: CSS imports in trial.html

8. Q: What happens when clicking outside the contact modal?
   A: The modal closes
   ```javascript
   window.addEventListener('click', function (event) {
       if (event.target == document.getElementById('contactModal')) {
           document.getElementById('contactModal').style.display = 'none';
       }
   });
   ```
   Ref: Modal implementation in script.js

9. Q: What is the purpose of the profile image hover effect?
   A: To provide visual feedback by scaling the image slightly
   ```css
   .sec-right img {
       transition: transform 0.3s ease;
   }
   .sec-right img:hover {
       transform: scale(1.05);
   }
   ```
   Ref: Profile section CSS

10. Q: How is the navigation bar positioned?
    A: It's sticky-positioned at the top
    ```css
    .navbar {
        position: sticky;
        top: 0;
        display: flex;
        overflow: hidden;
        justify-content: space-evenly;
        height: 10%;
    }
    ```
    Ref: Navbar CSS

11. Q: What method is used to handle mobile menu clicks?
    A: Event listeners on mobile menu links
    ```javascript
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    ```
    Ref: Mobile menu JavaScript

12. Q: What is the default text color in dark mode?
    A: #ccd6f6
    ```css
    :root {
        --text-primary: #ccd6f6;
        --text-secondary: #8892b0;
    }
    ```
    Ref: CSS variables

13. Q: How are project categories filtered?
    A: Using data attributes and JavaScript event handlers
    ```javascript
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                }
            });
        });
    });
    ```
    Ref: Project filtering code

14. Q: What happens when hovering over navigation links?
    A: They change color and get a border radius
    ```css
    .navbar a:hover {
        background-color: var(--accent-color);
        color: var(--primary-bg);
        border-radius: 50px;
        opacity: 0.9;
    }
    ```
    Ref: Navigation CSS

15. Q: How is the download CV button styled?
    A: With a gradient button style
    ```html
    <a href="Prathik_Prajapati_CV.pdf" download="Prathik_Prajapati_CV.pdf" class="gradient-button">
        <i class="las la-download"></i> Download CV
    </a>
    ```
    Ref: Button CSS

16. Q: What method is used for smooth scrolling?
    A: CSS smooth scroll behavior
    ```css
    html {
        scroll-behavior: smooth;
    }
    ```
    Ref: CSS properties

17. Q: How are the timeline dates positioned?
    A: Using absolute positioning relative to timeline items
    ```css
    .timeline ul li span {
        position: absolute;
        left: -100px;
        top: 0;
    }
    ```
    Ref: Timeline CSS

18. Q: What triggers the theme toggle?
    A: Clicking the theme toggle button
    ```html
    <button class="theme-toggle" onclick="toggleTheme()">
        <i class="las la-moon"></i>
    </button>
    ```
    Ref: Theme toggle JavaScript

19. Q: How are skill levels represented?
    A: Using progress bars with fill widths
    ```css
    .skill-bar-fill {
        height: 100%;
        background: var(--accent-color);
        width: var(--fill-width);
        transition: width 0.5s ease;
    }
    ```
    Ref: Skills section CSS

20. Q: What method is used to close the mobile menu?
    A: Click event on mobile links
    ```javascript
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    ```
    Ref: Mobile menu JavaScript

21. Q: How is the profile section divided?
    A: Into left (55%) and right (45%) sections
    ```css
    .profile .sec-left {
        width: 55%;
    }
    .profile .sec-right {
        width: 45%;
    }
    ```
    Ref: Profile CSS

22. Q: What determines the initial theme?
    A: System color scheme preference
    ```javascript
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    ```
    Ref: Theme initialization

23. Q: How are project cards animated?
    A: Using opacity and transform transitions
    ```css
    .project-card {
        transition: opacity 0.3s, transform 0.3s;
    }
    .project-card.hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    ```
    Ref: Project card CSS

24. Q: What method is used for responsive images?
    A: CSS max-width and height properties
    ```css
    .sec-right img {
        width: 400px;
        height: 400px;
        max-width: 100%;
        height: auto;
    }
    ```
    Ref: Image CSS

25. Q: How is the contact form displayed?
    A: In a modal overlay
    ```html
    <div class="modal" id="contactModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <!-- Contact form content -->
        </div>
    </div>
    ```
    Ref: Contact form HTML/CSS

## Very Easy Questions (25)

1. Q: What is the title of the webpage?
   A: My Portfolio
   ```html
   <title>My Portfolio</title>
   ```

2. Q: Which external libraries are used for the typing animation?
   A: Typed.js (version 2.0.12)
   ```html
   <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
   ```

3. Q: What is the logo text in the mobile navigation?
   A: PP
   ```html
   <div class="mobile-nav">
       <div class="logo">PP</div>
   </div>
   ```

4. Q: How many sections are there in the navigation menu?
   A: 7 sections (Home, About, Education, Experience, Skills, Projects, Contact)
   ```html
   <div class="mobile-menu">
       <a href="#" class="mobile-link">Home</a>
       <a href="#profile" class="mobile-link">About</a>
       <a href="#education" class="mobile-link">Education</a>
       <a href="#right" class="mobile-link">Experience</a>
       <a href="#skills" class="mobile-link">Skills</a>
       <a href="#projects" class="mobile-link">Projects</a>
       <a href="#contact-me" class="mobile-link">Contact</a>
   </div>
   ```

5. Q: What is the main heading text in the profile section?
   A: Prathik Prajapati
   ```html
   <h1>&nbsp;Prathik Prajapati</h1>
   ```

6. Q: What color scheme variables are defined in the root?
   A: Eight color variables for theming
   ```css
   :root {
       --primary-accent-light: antiquewhite;
       --secondary-accent-light: #ffd700;
       --text-color-light: #2e2e2e;
       --primary-bg: #0a192f;
       --secondary-bg: #112240;
       --accent-color: #64ffda;
       --text-primary: #ccd6f6;
       --text-secondary: #8892b0;
   }
   ```

7. Q: What is the default background color in dark mode?
   A: #0a192f (dark blue)
   ```css
   :root {
       --primary-bg: #0a192f;
   }
   ```

8. Q: How many strings are used in the typing animation?
   A: 3 strings
   ```javascript
   var typed = new Typed('#element', {
       strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
       typeSpeed: 120,
       backSpeed: 140,
       loop: true
   });
   ```

9. Q: What icon is used for the theme toggle button?
   A: Moon icon (la-moon)
   ```html
   <button class="theme-toggle" onclick="toggleTheme()">
       <i class="las la-moon"></i>
   </button>
   ```

10. Q: What is the typing speed in the animation?
    A: 120
    ```javascript
    var typed = new Typed('#element', {
        typeSpeed: 120
    });
    ```

11. Q: What is the back typing speed in the animation?
    A: 140
    ```javascript
    var typed = new Typed('#element', {
        backSpeed: 140
    });
    ```

12. Q: What is the delay between typing animations?
    A: 1500ms
    ```javascript
    var typed = new Typed('#element', {
        backDelay: 1500
    });
    ```

13. Q: What happens when you click the Download CV button?
    A: It downloads the file named "Prathik_Prajapati_CV.pdf"
    ```html
    <a href="Prathik_Prajapati_CV.pdf" download="Prathik_Prajapati_CV.pdf" class="gradient-button">
        <i class="las la-download"></i> Download CV
    </a>
    ```

14. Q: What is the default font family used in the website?
    A: Arial, sans-serif
    ```css
    body {
        font-family: Arial, sans-serif;
    }
    ```

15. Q: What is the height of the profile section?
    A: 500px
    ```css
    .profile {
        height: 500px;
    }
    ```

16. Q: What jQuery version is used in the project?
    A: jQuery 3.6.0
    ```html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    ```

17. Q: How many spans are in the hamburger menu?
    A: 3 spans
    ```html
    <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
    ```

18. Q: What is the width of the left section in the profile?
    A: 55%
    ```css
    .profile .sec-left {
        width: 55%;
    }
    ```

19. Q: What is the width of the right section in the profile?
    A: 45%
    ```css
    .profile .sec-right {
        width: 45%;
    }
    ```

20. Q: What is the font size of the main heading in the profile section?
    A: 4rem
    ```css
    .profile .sec-left h1 {
        font-size: 4rem;
    }
    ```

21. Q: What is the border-radius of the profile container?
    A: 30px
    ```css
    .profile {
        border-radius: 30px;
    }
    ```

22. Q: What is the z-index of the profile container?
    A: -1
    ```css
    .profile-container {
        z-index: -1;
    }
    ```

23. Q: What is the transition duration for various animations?
    A: 0.3s
    ```css
    .navbar a, button, .timeline ul li {
        transition: all 0.3s ease;
    }
    ```

24. Q: What is the maximum width of the container class?
    A: 800px
    ```css
    .container {
        max-width: 800px;
    }
    ```

25. Q: What is the font size of section titles?
    A: 60px
    ```css
    h1#education, h1#experience {
        font-size: 60px;
    }
    ```

## Medium Questions (Revised for First Year)

1. Q: Explain how you implemented the typing animation in your portfolio. What library did you use and why?
   A: I used the Typed.js library because it's simple to implement and provides smooth typing animations. Here's how it works:
   ```javascript
   var typed = new Typed('#element', {
       strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
       typeSpeed: 120,
       backSpeed: 140,
       loop: true
   });
   ```
   The library creates a typing effect by:
   - Taking an array of strings to display
   - typeSpeed controls how fast it types
   - backSpeed controls how fast it erases
   - loop: true makes it repeat continuously

2. Q: How does your dark/light theme toggle work? Walk through the code.
   A: The theme toggle uses simple JavaScript and CSS. Here's the basic implementation:
   ```javascript
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
   ```
   This code:
   1. Gets the root HTML element
   2. Checks current theme
   3. Toggles between themes
   4. Changes the icon accordingly

3. Q: How did you make your website mobile-responsive? Show some CSS examples.
   A: I used CSS media queries and flexible units (rem, %, vh/vw). Here's an example:
   ```css
   /* Desktop design */
   .header {
       padding: 2rem;
       font-size: 1.5rem;
   }

   /* Mobile design */
   @media (max-width: 768px) {
       .header {
           padding: 1rem;
           font-size: 1.2rem;
       }
   }
   ```

4. Q: Explain how your mobile menu works. What JavaScript and CSS is involved?
   A: The mobile menu uses a combination of JavaScript for toggling and CSS for animation:
   ```javascript
   // JavaScript for toggle
   hamburger.addEventListener('click', () => {
       hamburger.classList.toggle('active');
       mobileMenu.classList.toggle('active');
   });
   ```
   ```css
   /* CSS for animation */
   .mobile-menu {
       display: none;
       transform: translateY(-100%);
       transition: transform 0.3s ease;
   }

   .mobile-menu.active {
       display: block;
       transform: translateY(0);
   }
   ```

5. Q: How do you handle the smooth scrolling in your portfolio?
   A: I use CSS scroll-behavior for smooth scrolling to sections:
   ```css
   html {
       scroll-behavior: smooth;
   }
   ```
   And JavaScript for the scroll links:
   ```javascript
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
           e.preventDefault();
           document.querySelector(this.getAttribute('href')).scrollIntoView({
               behavior: 'smooth'
           });
       });
   });
   ```

## Hard Questions (Appropriate for First Year)

1. Q: How would you improve the performance of your portfolio website?
   A: Several basic improvements could be made:
   - Compress images
   - Minify CSS and JavaScript
   - Use proper image sizes
   - Lazy load images
   Example of lazy loading:
   ```html
   <img src="placeholder.jpg" 
        data-src="actual-image.jpg" 
        loading="lazy" 
        alt="Project screenshot">
   ```

2. Q: How would you add form validation to your contact form?
   A: Using basic JavaScript validation:
   ```javascript
   function validateForm() {
       const email = document.getElementById('email').value;
       const message = document.getElementById('message').value;
       
       if (!email || !email.includes('@')) {
           alert('Please enter a valid email');
           return false;
       }
       
       if (!message || message.length < 10) {
           alert('Message must be at least 10 characters');
           return false;
       }
       
       return true;
   }
   ```

3. Q: How would you add a simple loading animation to your projects section?
   A: Using CSS animations:
   ```css
   .loading {
       width: 50px;
       height: 50px;
       border: 5px solid #f3f3f3;
       border-top: 5px solid #3498db;
       border-radius: 50%;
       animation: spin 1s linear infinite;
   }

   @keyframes spin {
       0% { transform: rotate(0deg); }
       100% { transform: rotate(360deg); }
   }
   ```

## Very Hard Questions (25)

1. Q: How would you implement a complete state management system for the portfolio?
   A: A custom state management solution tailored for the portfolio would include:
   ```javascript
   class PortfolioState {
       constructor() {
           this.state = {
               theme: 'dark',
               activeSection: null,
               filters: new Set(),
               projects: [],
               loading: false,
               errors: []
           };
           this.subscribers = new Map();
           this.middlewares = [];
       }

       subscribe(component, selector) {
           const id = Symbol('subscription');
           this.subscribers.set(id, {
               component,
               selector: selector || (state => state)
           });
           return () => this.subscribers.delete(id);
       }

       dispatch(action) {
           const prevState = { ...this.state };
           
           // Run through middleware chain
           const result = this.middlewares.reduce(
               (acc, middleware) => middleware(acc, action, prevState),
               this.state
           );

           this.state = result;
           this.notify();
       }

       addMiddleware(middleware) {
           this.middlewares.push(middleware);
       }

       notify() {
           for (const { component, selector } of this.subscribers.values()) {
               const selectedData = selector(this.state);
               component.update(selectedData);
           }
       }
   }

   // Example usage
   const store = new PortfolioState();
   
   // Add logging middleware
   store.addMiddleware((state, action, prevState) => {
       console.log('Action:', action);
       console.log('Previous State:', prevState);
       console.log('Next State:', state);
       return state;
   });

   // Component subscription
   class ProjectSection {
       constructor(store) {
           this.unsubscribe = store.subscribe(this, 
               state => state.projects.filter(p => state.filters.has(p.category))
           );
       }

       update(projects) {
           // Update UI with filtered projects
       }

       destroy() {
           this.unsubscribe();
       }
   }
   ```

2. Q: How would you add form validation to your contact form?
   A: Using basic JavaScript validation:
   ```javascript
   function validateForm() {
       const email = document.getElementById('email').value;
       const message = document.getElementById('message').value;
       
       if (!email || !email.includes('@')) {
           alert('Please enter a valid email');
           return false;
       }
       
       if (!message || message.length < 10) {
           alert('Message must be at least 10 characters');
           return false;
       }
       
       return true;
   }
   ```

3. Q: How would you add a simple loading animation to your projects section?
   A: Using CSS animations:
   ```css
   .loading {
       width: 50px;
       height: 50px;
       border: 5px solid #f3f3f3;
       border-top: 5px solid #3498db;
       border-radius: 50%;
       animation: spin 1s linear infinite;
   }

   @keyframes spin {
       0% { transform: rotate(0deg); }
       100% { transform: rotate(360deg); }
   }
   ```

4. Q: How would you implement a progressive enhancement strategy for your portfolio?
   A: A robust progressive enhancement approach would include:
   ```javascript
   class ProgressiveEnhancement {
       constructor() {
           this.features = {
               js: true,
               webgl: this.checkWebGL(),
               animations: this.checkAnimations(),
               localStorage: this.checkLocalStorage()
           };
           
           this.enhance();
       }

       checkWebGL() {
           const canvas = document.createElement('canvas');
           return !!(canvas.getContext('webgl') || 
                    canvas.getContext('experimental-webgl'));
       }

       checkAnimations() {
           return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
       }

       checkLocalStorage() {
           try {
               localStorage.setItem('test', 'test');
               localStorage.removeItem('test');
               return true;
           } catch (e) {
               return false;
           }
       }

       enhance() {
           document.documentElement.classList.remove('no-js');
           
           if (this.features.webgl) {
               // Enable 3D effects or canvas animations
           }
           
           if (!this.features.animations) {
               document.documentElement.classList.add('reduce-motion');
           }
           
           if (!this.features.localStorage) {
               // Fallback to session storage or cookies
           }
       }
   }
   ```

5. Q: How would you implement a performance monitoring system for your portfolio?
   A: A comprehensive performance monitoring system would include:
   ```javascript
   class PerformanceMonitor {
       constructor() {
           this.metrics = {
               FCP: 0,
               LCP: 0,
               CLS: 0,
               FID: 0
           };
           
           // Monitor Web Vitals
           new PerformanceObserver((entryList) => {
               for (const entry of entryList.getEntries()) {
                   if (entry.name === 'first-contentful-paint') {
                       this.metrics.FCP = entry.startTime;
                   }
               }
           }).observe({ entryTypes: ['paint'] });
           
           // Monitor user interactions
           this.trackInteractions();
           
           // Error tracking
           window.addEventListener('error', this.handleError.bind(this));
       }
       
       trackInteractions() {
           const interactions = ['click', 'scroll', 'keypress'];
           interactions.forEach(event => {
               document.addEventListener(event, () => {
                   // Track timing and smoothness
                   performance.mark(`${event}-start`);
               });
           });
       }
   }
   ```

## Code Manipulation Questions

### HTML Manipulation

1. Q: What happens if you remove this meta tag from HTML?
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   ```
   A: If you remove this meta tag:
   - The website won't be properly responsive on mobile devices
   - Users will be able to zoom in/out (user-scalable=no is removed)
   - Initial zoom level won't be set
   - Content might appear very small on mobile devices

2. Q: What happens if you remove these script imports?
   ```html
   <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   ```
   A: Removing these will:
   - Typed.js: The typing animation will stop working
   - jQuery: Mobile menu, smooth scrolling, and other jQuery-dependent features will break

3. Q: What happens if you delete this mobile menu structure?
   ```html
   <div class="mobile-menu">
       <a href="#" class="mobile-link">Home</a>
       <a href="#profile" class="mobile-link">About</a>
       <!-- ... other links ... -->
   </div>
   ```
   A: Consequences:
   - Mobile navigation menu will disappear
   - Users won't be able to navigate on mobile devices
   - Hamburger menu will still show but clicking it won't do anything

### CSS Manipulation

4. Q: What happens if you remove these CSS variables?
   ```css
   :root {
       --primary-bg: #0a192f;
       --text-primary: #ccd6f6;
   }
   ```
   A: Effects:
   - Background color will be missing (white by default)
   - Text color will revert to browser default (usually black)
   - Any elements using these variables will lose their styling
   - Theme switching won't work properly

5. Q: What happens if you delete this media query?
   ```css
   @media screen and (max-width: 768px) {
       .mobile-nav {
           display: block;
       }
       #quadrilateral {
           display: none;
       }
   }
   ```
   A: Results:
   - Mobile navigation won't appear on small screens
   - Desktop navigation will remain visible on mobile
   - Layout will be broken on mobile devices

6. Q: What happens if you remove these transition properties?
   ```css
   body {
       transition: all 0.3s ease;
   }
   ```
   A: Impact:
   - Theme switching will be instant (no smooth transition)
   - Color changes will be jarring
   - User experience will be less polished

### JavaScript Manipulation

7. Q: What happens if you modify the typing speed in this code?
   ```javascript
   var typed = new Typed('#element', {
       strings: ["Graphics Designer ", "Web Developer ", "Python Developer "],
       typeSpeed: 120,  // Change to 20
       backSpeed: 140   // Change to 40
   });
   ```
   A: Effects:
   - typeSpeed: 20 - Text will type much faster
   - backSpeed: 40 - Text will erase much faster
   - Overall animation will feel rushed

8. Q: What happens if you remove this event listener?
   ```javascript
   hamburger.addEventListener('click', () => {
       hamburger.classList.toggle('active');
       mobileMenu.classList.toggle('active');
   });
   ```
   A: Consequences:
   - Clicking hamburger menu won't do anything
   - Mobile menu won't open/close
   - Menu icon won't animate

9. Q: What happens if you modify the theme toggle code like this?
   ```javascript
   // Original
   function toggleTheme() {
       const root = document.documentElement;
       if (root.getAttribute('data-theme') === 'light') {
           root.removeAttribute('data-theme');
       } else {
           root.setAttribute('data-theme', 'light');
       }
   }

   // Modified (removed icon toggle)
   function toggleTheme() {
       const root = document.documentElement;
       root.setAttribute('data-theme', 'light');
   }
   ```
   A: Results:
   - Theme will only switch to light, can't switch back to dark
   - Theme icon won't update
   - Toggle becomes one-way switch

10. Q: What happens if you change these skill progress values?
    ```html
    <div class="skill-progress" data-progress="90"></div>
    ```
    to
    ```html
    <div class="skill-progress" data-progress="150"></div>
    ```
    A: Effects:
    - Progress bar might overflow its container
    - Visual representation will be incorrect
    - Might break the layout of the skills section

### Complex Manipulations

11. Q: What happens if you remove these theme-related CSS variables?
    ```css
    :root[data-theme="light"] {
        --primary-bg: blanchedalmond;
        --text-primary: #2e2e2e;
    }
    ```
    A: Impact:
    - Light theme will be broken
    - Switching to light theme will use dark theme colors
    - Theme toggle will still work but won't show visible changes

12. Q: What happens if you modify the mobile menu CSS like this?
    ```css
    /* Original */
    .mobile-menu {
        display: none;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }

    /* Modified */
    .mobile-menu {
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    ```
    A: Changes:
    - Menu will fade in/out instead of sliding
    - Animation style will be different
    - Menu might appear in place instead of sliding from top

13. Q: What happens if you remove the jQuery smooth scroll code?
    ```javascript
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
    ```
    A: Effects:
    - Navigation links will jump to sections instantly
    - No smooth scrolling animation
    - Default browser behavior will take over
    - Might be jarring for users

14. Q: What happens if you modify the hamburger menu spans?
    ```html
    <!-- Original -->
    <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <!-- Modified -->
    <div class="hamburger">
        <span></span>
        <span></span>
    </div>
    ```
    A: Results:
    - Hamburger icon will only have two lines instead of three
    - Animation might look broken
    - Visual appearance will be different

15. Q: What happens if you change the project filter code?
    ```javascript
    // Original
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.project-card').show('1000');
        } else {
            $('.project-card').not('.' + value).hide('1000');
            $('.project-card').filter('.' + value).show('1000');
        }
    });

    // Modified (removed animation duration)
    $('.filter-btn').click(function() {
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.project-card').show();
        } else {
            $('.project-card').not('.' + value).hide();
            $('.project-card').filter('.' + value).show();
        }
    });
    ```
    A: Changes:
    - Projects will appear/disappear instantly
    - No smooth transition between filters
    - Functionality remains but looks less polished
