// Outfit data for the collection
const outfits = [
    {
        name: "Royal Blcak Old Money",
        price: "₹349/day ",
        images: [
            "./images/outfit 1.jpg",
            "./images/casio watch.jpg",
            "./images/braclate and rings.jpg"
        ]
    },
    {
        name: "pink plane + white lenin",
        price: "₹349/day",
        images: [
            "./images/outfit 2.jpg",
            "./images/2 rings.jpg",
            "./images/black box chain.jpg"
        ]
    },
    {
        name: "blue stripes + white lenin",
        price: "₹349/day",
        images: [
            "./images/outfit 3.jpg",
            "./images/2 rings.jpg",
            "./images/steel chain.jpg"
        ]
    },
    {
        name: "Black Threaded + white lenin",
        price: "₹349/day",
        images: [
            "./images/outfit4.jpg",
            "./images/2 rings.jpg",
            "./images/steel chain.jpg"
        ]
    },
    {
        name: "Elegant event pink look",
        price: "₹349/day",
        images: [
            "./images/outfit 5.jpg",
            "./images/black length box chain.jpg",
            "./images/braclate and rings.jpg"
        ]
    },
    {
        name: "Casul Fit",
        price: "₹299/day",
        images: [
            "./images/outfit 6.jpg",
            "./images/2 rings.jpg",
            "./images/black length box chain.jpg"
        ]
    },
    {
        name: "Asthetic old money look",
        price: "₹349/day",
        images: [
            "./images/outfit 7.jpeg",
            "./images/braclate and rings.jpg",
            "./images/steel chain.jpg"
        ]
    },
    {
        name: "Acid wash + Denim genes",
        price: "₹349/day",
        images: [
            "./images/outfit 8.jpg",
            "./images/gold chain.jpg",
            "./images/2 rings.jpg"
        ]
    },
    {
        name: "Pink striped + white lenin",
        price: "₹349/day",
        images: [
            "./images/outfit 09.jpeg",
             "./images/2 rings.jpg",
            "./images/steel chain.jpg"
        ]
    },
    
];

// Image Modal Functionality
let currentModalIndex = 0;
let currentOutfitImages = [];

// Create image modal HTML
function createImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.id = 'imageModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-image-container">
                <button class="modal-close" id="modalClose" aria-label="Close modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <button class="slider-nav prev" id="prevBtn" aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <img src="" alt="" class="modal-image" id="modalImage">
                <button class="slider-nav next" id="nextBtn" aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div class="modal-overlay" id="modalOverlay"></div>
            </div>
            <div class="image-indicators" id="imageIndicators">
                <!-- Indicators will be generated here -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch swipe support
    let touchStartX = 0;
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
        if (!touchStartX) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
        touchStartX = 0;
    }, { passive: true });
}

// Open modal with specific outfit
function openModal(outfitIndex, imageIndex = 0) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const indicatorsContainer = document.getElementById('imageIndicators');
    
    currentOutfitImages = outfits[outfitIndex].images;
    currentModalIndex = imageIndex;
    
    // Update image
    modalImage.src = currentOutfitImages[currentModalIndex];
    modalImage.alt = outfits[outfitIndex].name;
    
    // Generate indicators
    indicatorsContainer.innerHTML = '';
    currentOutfitImages.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentModalIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => showImage(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable background scrolling
    currentOutfitImages = [];
}

// Show specific image
function showImage(index) {
    if (index < 0 || index >= currentOutfitImages.length) return;
    
    currentModalIndex = index;
    const modalImage = document.getElementById('modalImage');
    const indicators = document.querySelectorAll('.indicator');
    
    modalImage.src = currentOutfitImages[currentModalIndex];
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentModalIndex);
    });
}

// Navigation functions
function showPrevImage() {
    const newIndex = currentModalIndex - 1;
    if (newIndex < 0) {
        showImage(currentOutfitImages.length - 1); // Loop to last image
    } else {
        showImage(newIndex);
    }
}

function showNextImage() {
    const newIndex = currentModalIndex + 1;
    if (newIndex >= currentOutfitImages.length) {
        showImage(0); // Loop to first image
    } else {
        showImage(newIndex);
    }
}

// Handle keyboard navigation
function handleKeyPress(e) {
    const modal = document.getElementById('imageModal');
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Function to create outfit cards
function createOutfitCards() {
    const grid = document.querySelector('.collection-grid');
    
    outfits.forEach(outfit => {
        const card = document.createElement('div');
        card.className = 'outfit-card';
        
        // Create images container
        const imagesContainer = document.createElement('div');
        imagesContainer.className = 'card-images';
        
        outfit.images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = outfit.name;
            img.className = 'card-image';
            img.loading = 'lazy'; // For better performance
            imagesContainer.appendChild(img);
        });
        
        // Create content container
        const content = document.createElement('div');
        content.className = 'card-content';
        
        const name = document.createElement('h3');
        name.className = 'outfit-name';
        name.textContent = outfit.name;
        
        const price = document.createElement('span');
        price.className = 'outfit-price';
        price.textContent = outfit.price;
        
        const rentButton = document.createElement('button');
        rentButton.className = 'btn btn-primary';
        rentButton.textContent = 'Rent Now';
        rentButton.onclick = () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSd54yTUCovKcn5B1379X-FrgifsABEO-zj3G_G9ma-9a7_i9w/viewform?usp=dialog', '_blank');
        };
        
        // Assemble the card
        content.appendChild(name);
        content.appendChild(price);
        content.appendChild(rentButton);
        
        card.appendChild(imagesContainer);
        card.appendChild(content);
        
        grid.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createOutfitCards();
    createImageModal();
    
    // Add click event listeners to all card images
    document.querySelectorAll('.card-image').forEach((image, index) => {
        image.addEventListener('click', (e) => {
            e.preventDefault();
            // Calculate which outfit this image belongs to
            const outfitIndex = Math.floor(index / 3);
            const imageIndex = index % 3;
            openModal(outfitIndex, imageIndex);
        });
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all outfit cards
    document.querySelectorAll('.outfit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});

// Smooth scroll for navigation links if needed in the future
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

});


