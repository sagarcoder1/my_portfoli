// Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.settings-toggle');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference if no saved theme
        const initialTheme = systemPrefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', initialTheme);
    }
    
    // Theme switch handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});