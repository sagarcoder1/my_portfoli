// Include navbar and footer on all pages
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    setupSmoothScrolling();
    setupContactForm();
});

// Load navbar with error handling
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Navbar not found');
            }
            return response.text();
        })
        .then(data => {
            const navbarElement = document.getElementById('navbar');
            if (navbarElement) {
                navbarElement.innerHTML = data;
                
                // Set active nav item after navbar is loaded
                setActiveNavItem();
                
                // Setup mobile menu
                setupMobileMenu();
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Load footer with error handling
function loadFooter() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer not found');
            }
            return response.text();
        })
        .then(data => {
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        }
    });
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    }
}

// Validate form fields
function validateForm(form) {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    
    let isValid = true;
    
    // Reset previous error states
    form.querySelectorAll('.error').forEach(error => error.remove());
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        showError(subject, 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = 'red';
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit form
function submitForm(form) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    
    // Here you would typically send the form data to a server
    // For this example, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
    
    // Reset form
    form.reset();
}

// Highlight active nav item based on current page
function setActiveNavItem() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')))) {
            link.classList.add('active');
        }
    });
}