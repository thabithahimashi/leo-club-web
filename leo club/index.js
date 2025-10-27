document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load gallery images dynamically
    const galleryImages = [
        { id: 1, src: "images/img/3.jpeg", alt: "Community Service" },
        { id: 2, src: "images/img/1.jpeg", alt: "Team Meeting" },
        { id: 3, src: "images/img/5.jpeg", alt: "Fundraising Event" },
        { id: 4, src: "images/img/2.jpeg", alt: "Award Ceremony" },
        { id: 5, src: "images/img/4.jpeg", alt: "Volunteers at Work" },
        { id: 6, src: "images/img/6.jpeg", alt: "Educational Program" },
    ];
    
    const galleryContainer = document.getElementById('gallery-container');
    
    // Clear any existing content (just in case)
    galleryContainer.innerHTML = '';
    
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item overflow-hidden rounded-lg shadow-md hover:shadow-xl transition';
        galleryItem.innerHTML = `
            <img 
                src="${image.src}" 
                alt="${image.alt}" 
                class="w-full h-48 object-cover hover:scale-105 transition duration-500"
                loading="lazy"
            />
        `;
        galleryContainer.appendChild(galleryItem);
    });
});