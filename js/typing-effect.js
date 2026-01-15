
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const words = ['Web Developer', 'Designer', 'UI/UX Specialist', 'Computer Engineer', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingElement.textContent = currentChar;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                setTimeout(type, 50);
            } else {
                // Change word
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1000);
            }
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }
});