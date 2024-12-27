document.addEventListener('scroll', function () {
    const image = document.querySelector('.about-image');
    const scrollY = window.scrollY;
    const zoomFactor = 1 + scrollY / 1000; // Adjust the factor for the zoom speed
    
    // Apply the zoom effect with scroll position
    image.style.transform = `scale(${zoomFactor})`;
  });
  