document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-section-1'));
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!galleryItems.length || !lightbox || !lightboxImage) {
        return;
    }

    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent(currentIndex);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const updateLightboxContent = (index) => {
        const item = galleryItems[index];
        const src = item.dataset.src || item.querySelector('img')?.src || '';
        const caption = item.dataset.caption || item.querySelector('img')?.alt || '';

        lightboxImage.src = src;
        lightboxImage.alt = caption;
        if (lightboxCaption) {
            lightboxCaption.textContent = caption;
        }
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent(currentIndex);
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent(currentIndex);
    };

    galleryItems.forEach((item, index) => {
        const open = () => openLightbox(index);
        item.addEventListener('click', open);
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) {
            return;
        }

        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            default:
                break;
        }
    });
});

