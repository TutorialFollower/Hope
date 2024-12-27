document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    const carouselContainer = document.querySelector('.carousel-container');
    const landingContainer = document.querySelector('.landing-container');
    
    // Set initial positions of carousel items
    const totalItems = items.length;
    const angleBetweenItems = 360 / totalItems;
    let currentAngle = 0;
    const rotationSpeed = 0.5;

    // Position items around a circle
    function positionItems() {
        items.forEach((item, index) => {
            const angle = (index * angleBetweenItems + currentAngle) * (Math.PI / 180);
            const radius = 250; // Distance from center

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            item.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    }

    // Animate rotation
    function animate() {
        currentAngle += rotationSpeed;
        if (currentAngle >= 360) {
            currentAngle = 0;
        }
        positionItems();
        requestAnimationFrame(animate);
    }

    // Fade out effect for carousel and text on button click
    function fadeOutAndRedirect() {
        // Fade out the carousel and text
        carouselContainer.style.transition = 'opacity 2s ease';
        landingContainer.style.transition = 'opacity 2s ease';

        carouselContainer.style.opacity = 0;
        landingContainer.style.opacity = 0;

        // Redirect after fade-out
        setTimeout(() => {
            window.location.href = 'main.html'; // Navigate after the fade-out animation
        }, 2000); // Duration of the fade-out
    }

    // Initialize carousel
    positionItems();
    animate();

    // Set up button click event to trigger the fade-out effect
    document.querySelector('.enter-button').addEventListener('click', fadeOutAndRedirect);
});

