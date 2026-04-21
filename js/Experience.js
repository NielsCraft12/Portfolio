// Experience section timeline slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.getElementById("experience");
  if (!experienceSection) return;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const slider = document.getElementById("slider");
  const sliderTrack = document.getElementById("slider-track");
  const sliderThumb = document.getElementById("slider-thumb");
  const sliderPoints = document.querySelector(".slider-points");

  let currentIndex = 0;
  let experienceCount = 0;
  let isDragging = false;

  // Wait for the experience component to be ready
  experienceSection.addEventListener("experience-ready", (e) => {
    experienceCount = e.detail.count;
    initializeSlider();
  });

  function initializeSlider() {
    if (experienceCount === 0) return;

    // Generate slider points
    sliderPoints.innerHTML = "";
    for (let i = 0; i < experienceCount; i++) {
      const point = document.createElement("div");
      point.className = "slider-point" + (i === 0 ? " active" : "");
      point.dataset.index = i;
      point.addEventListener("click", () => navigateToExperience(i));
      sliderPoints.appendChild(point);
    }

    updateSliderPosition();
  }

  function navigateToExperience(index) {
    if (index < 0 || index >= experienceCount) return;
    currentIndex = index;

    // Send navigation event to the web component
    experienceSection.dispatchEvent(
      new CustomEvent("navigate-to", {
        detail: { index },
      }),
    );

    updateSliderPosition();
  }

  function updateSliderPosition() {
    // Update slider thumb position
    const percentage = experienceCount > 1 ? (currentIndex / (experienceCount - 1)) * 100 : 0;
    if (sliderThumb) {
      sliderThumb.style.left = `${percentage}%`;
    }

    // Update slider track width to follow the thumb
    if (sliderTrack) {
      sliderTrack.style.width = `${percentage}%`;
    }

    // Update active point
    const points = sliderPoints.querySelectorAll(".slider-point");
    points.forEach((point, i) => {
      point.classList.toggle("active", i === currentIndex);
    });

    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === experienceCount - 1;
  }

  // Navigation button handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        navigateToExperience(currentIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < experienceCount - 1) {
        navigateToExperience(currentIndex + 1);
      }
    });
  }

  // Slider drag functionality
  if (slider && sliderThumb) {
    const startDrag = (e) => {
      isDragging = true;
      updateSliderFromPosition(e);
    };

    const drag = (e) => {
      if (!isDragging) return;
      updateSliderFromPosition(e);
    };

    const endDrag = () => {
      isDragging = false;
    };

    const updateSliderFromPosition = (e) => {
      const rect = sliderTrack.getBoundingClientRect();
      const x = (e.type.includes("touch") ? e.touches[0].clientX : e.clientX) - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newIndex = Math.round(percentage * (experienceCount - 1));

      if (newIndex !== currentIndex) {
        navigateToExperience(newIndex);
      }
    };

    // Mouse events
    sliderThumb.addEventListener("mousedown", startDrag);
    sliderTrack.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);

    // Touch events for mobile
    sliderThumb.addEventListener("touchstart", startDrag);
    sliderTrack.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", endDrag);
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle if the experience section is in view
    const rect = experienceSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isInView) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex > 0) navigateToExperience(currentIndex - 1);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (currentIndex < experienceCount - 1) navigateToExperience(currentIndex + 1);
    }
  });
});
