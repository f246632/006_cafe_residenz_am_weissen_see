/**
 * Gallery & Lightbox Functionality
 * Café Residenz am Weißen See
 */

// ============================================
// GALLERY INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
});

// Gallery images data
const galleryImages = [
    { src: 'images/source/cafe-image-1.jpg', caption: 'Eingang' },
    { src: 'images/source/cafe-image-2.jpg', caption: 'Gemütliches Interieur' },
    { src: 'images/source/cafe-image-3.jpg', caption: 'Innenbereich' },
    { src: 'images/source/cafe-image-4.jpg', caption: 'Details' },
    { src: 'images/source/cafe-image-5.jpg', caption: 'Frühstück' },
    { src: 'images/source/cafe-image-6.jpg', caption: 'Kaffee & Kuchen' },
    { src: 'images/source/cafe-image-7.jpg', caption: 'Atmosphäre' },
    { src: 'images/source/cafe-image-8.jpg', caption: 'Tischgedeck' },
    { src: 'images/source/cafe-image-9.jpg', caption: 'Leckeres Essen' },
    { src: 'images/source/cafe-image-10.jpg', caption: 'Gemütliche Ecke' }
];

let currentImageIndex = 0;

// ============================================
// GALLERY SETUP
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });

        // Keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });

        // Add hover effect data
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);

    // Navigate images
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }
}

// ============================================
// LIGHTBOX CONTROLS
// ============================================
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    currentImageIndex = index;

    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    setTimeout(() => {
        document.querySelector('.lightbox-close').focus();
    }, 100);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const currentImage = galleryImages[currentImageIndex];

    // Fade out
    img.style.opacity = '0';

    setTimeout(() => {
        img.src = currentImage.src;
        img.alt = currentImage.caption;
        caption.textContent = currentImage.caption;

        // Fade in
        img.style.opacity = '1';
    }, 200);

    // Update image counter
    updateImageCounter();
}

function updateImageCounter() {
    let counter = document.querySelector('.image-counter');

    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'image-counter';
        counter.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1rem;
            font-weight: 600;
            background: rgba(0, 0, 0, 0.5);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            z-index: 2002;
        `;
        document.getElementById('lightbox').appendChild(counter);
    }

    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// ============================================
// PRELOAD IMAGES
// ============================================
function preloadImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);

// ============================================
// GALLERY GRID ANIMATIONS
// ============================================
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Initialize gallery animations
document.addEventListener('DOMContentLoaded', animateGalleryItems);

// ============================================
// MASONRY LAYOUT (Optional Enhancement)
// ============================================
function initMasonryLayout() {
    const gallery = document.querySelector('.gallery-grid');

    if (!gallery) return;

    // Simple masonry effect using CSS Grid
    const items = gallery.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
        // Add variety to grid items for visual interest
        if (index % 5 === 0) {
            item.style.gridRow = 'span 2';
        }
    });
}

// Optional: Initialize masonry on larger screens
if (window.innerWidth > 768) {
    // initMasonryLayout(); // Uncomment if you want masonry effect
}

// ============================================
// IMAGE LOADING OPTIMIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');

    images.forEach(img => {
        // Add loading placeholder
        img.style.backgroundColor = '#f0f0f0';

        // When image loads, remove placeholder
        img.addEventListener('load', function() {
            this.style.backgroundColor = 'transparent';
            this.classList.add('loaded');
        });

        // Error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
        });
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c📸 Gallery System Loaded', 'font-size: 14px; font-weight: bold; color: #8B4513;');
console.log(`%cTotal Images: ${galleryImages.length}`, 'font-size: 12px; color: #666;');
