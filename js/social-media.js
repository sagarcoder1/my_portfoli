// Social Media Configuration
const socialMediaLinks = {
    github: 'https://github.com/sagarcoder1',
    linkedin: 'https://www.linkedin.com/in/sagar-gupta-28ab4735a/',
    facebook: 'https://www.facebook.com/sagar.gupta.951504',
    instagram: 'https://www.instagram.com/its_me_sagar134',
    whatsapp: 'https://wa.me/9779703960835'
};

// Function to safely open links with rel="noopener noreferrer"
function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Add proper link attributes and click handlers
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (!icon) return;
        
        // Get platform from icon class
        const platform = icon.classList.contains('fa') 
            ? icon.classList[1].split('-')[1]
            : null;
            
        if (platform && socialMediaLinks[platform]) {
            // Set proper attributes
            link.setAttribute('href', socialMediaLinks[platform]);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add click handler
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openInNewTab(socialMediaLinks[platform]);
            });
        }
    });
});