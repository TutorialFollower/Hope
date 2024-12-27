document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.querySelector(".slider-container");
    const sliderImages = document.querySelectorAll(".slider-img");
    let activeIndex = 0; // Track the active image index
    let isDragging = false; // Flag to check if dragging is happening
    let startX, scrollLeft; // Variables to track mouse/touch position and scrolling
    
    // Function to update the active image with animation
    function updateActiveImage(newIndex, direction) {
      sliderImages.forEach((img, index) => {
        img.classList.remove("active", "slide-left", "slide-right");
        img.style.zIndex = "1"; // Reset z-index for all images
        img.style.transform = "translateX(0) scale(1)"; // Reset transform
  
        if (index === newIndex) {
          img.classList.add("active");
          img.style.zIndex = "10"; // Bring the active image to the front
          img.style.transform = "scale(1.3)";
  
          // Apply sliding animation based on direction
          if (direction === "left") {
            img.classList.add("slide-left");
          } else if (direction === "right") {
            img.classList.add("slide-right");
          }
        } else if (index === newIndex - 1 || index === newIndex + 1) {
          img.style.transform = "scale(1.1)"; // Slightly enlarge adjacent images
          img.style.zIndex = "5"; // Ensure adjacent images are above others
        }
      });
  
      // Scroll to center the new active image
      sliderImages[newIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  
      // Update active index
      activeIndex = newIndex;
    }
  
    // Mouse and Touch down to start dragging
    const startDrag = (event) => {
      isDragging = true;
      startX = event.pageX || event.touches[0].pageX; // Mouse or touch
      scrollLeft = sliderContainer.scrollLeft;
      sliderContainer.style.cursor = "grabbing"; // Change cursor to grabbing
    };
  
    // Mouse and Touch move to drag the images
    const moveDrag = (event) => {
      if (!isDragging) return;
      const moveX = (event.pageX || event.touches[0].pageX) - startX; // Mouse or touch
      sliderContainer.scrollLeft = scrollLeft - moveX; // Move images based on mouse/touch movement
    };
  
    // Mouse and Touch up to stop dragging
    const stopDrag = () => {
      isDragging = false;
      sliderContainer.style.cursor = "grab"; // Change cursor back to grab
    };
  
    // Add event listeners for mouse and touch events
    sliderContainer.addEventListener("mousedown", startDrag); // For desktop
    sliderContainer.addEventListener("mousemove", moveDrag); // For desktop
    sliderContainer.addEventListener("mouseup", stopDrag); // For desktop
    sliderContainer.addEventListener("mouseleave", stopDrag); // For desktop
  
    sliderContainer.addEventListener("touchstart", startDrag); // For mobile
    sliderContainer.addEventListener("touchmove", moveDrag); // For mobile
    sliderContainer.addEventListener("touchend", stopDrag); // For mobile
    sliderContainer.addEventListener("touchcancel", stopDrag); // For mobile
  
    // Add event listener for arrow key navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault(); // Prevent page scrolling
        const nextIndex = (activeIndex + 1) % sliderImages.length;
        updateActiveImage(nextIndex, "right");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault(); // Prevent page scrolling
        const prevIndex =
          (activeIndex - 1 + sliderImages.length) % sliderImages.length;
        updateActiveImage(prevIndex, "left");
      }
    });
  
    // Prevent the slider container from scrolling the page
    sliderContainer.addEventListener("wheel", (event) => {
      event.preventDefault(); // Disable scroll behavior
    });
  
    // Initialize the first active image
    updateActiveImage(activeIndex);
  });
  