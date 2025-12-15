document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Toggle Logic ---
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    if (darkModeEnabled) {
        body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    }

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
        }
    });


    // --- 2. Custom Cursor Logic ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const links = document.querySelectorAll('a, button, .card'); 

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" }); 
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursorOutline.style.opacity = '0.5';
        });
        link.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.opacity = '1';
        });
    });

    // --- 3. Lightbox/Modal Logic (NEW) ---

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Get all relevant images: journal scans, schedule photos, and gallery images
    const images = document.querySelectorAll('.schedule-photo img, .gallery-grid img'); 

    images.forEach(img => {
        // Make sure the images are visibly clickable
        img.style.cursor = 'pointer'; 

        img.addEventListener('click', () => {
            // Display modal and set content
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;

            // Determine caption: check for the sibling <p> tag first, then fallback to alt text
            let captionElement = img.nextElementSibling;
            if (captionElement && captionElement.tagName === 'P') {
                // Use the text from the <p> tag
                lightboxCaption.innerHTML = captionElement.textContent.replace(/^\*/, ''); 
            } else {
                // Use the image's alt text
                lightboxCaption.innerHTML = img.alt;
            }
        });
    });

    // Close the lightbox when the close button is clicked
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close the lightbox when the user clicks anywhere on the black overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Close the lightbox when the ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
        }
    });
    
});