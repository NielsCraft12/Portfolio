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
  let touchStartX = 0;
  let touchStartY = 0;
  let touchTracking = false;

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
      // A bare <div> with a click handler has no role and no name in the
      // accessibility tree, and cannot be reached by keyboard.
      const point = document.createElement("button");
      point.type = "button";
      point.className = "slider-point" + (i === 0 ? " active" : "");
      point.dataset.index = i;
      point.setAttribute("aria-label", `Go to experience ${i + 1} of ${experienceCount}`);
      point.setAttribute("aria-current", i === 0 ? "true" : "false");
      const pointPercentage = experienceCount > 1 ? (i / (experienceCount - 1)) * 100 : 0;
      point.style.left = `${pointPercentage}%`;
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

  function hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    const normalizedHex =
      cleanHex.length === 3
        ? cleanHex
            .split("")
            .map((c) => c + c)
            .join("")
        : cleanHex;

    return {
      r: parseInt(normalizedHex.slice(0, 2), 16),
      g: parseInt(normalizedHex.slice(2, 4), 16),
      b: parseInt(normalizedHex.slice(4, 6), 16),
    };
  }

  function getGradientColorAt(percentage) {
    const start = hexToRgb("#ff7e5f");
    const end = hexToRgb("#feb47b");
    const t = Math.max(0, Math.min(1, percentage / 100));

    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
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
      point.classList.toggle("filled", i <= currentIndex);
      point.setAttribute("aria-current", i === currentIndex ? "true" : "false");

      if (i <= currentIndex) {
        const pointPercentage = experienceCount > 1 ? (i / (experienceCount - 1)) * 100 : 0;
        point.style.setProperty("--filled-color", getGradientColorAt(pointPercentage));
      } else {
        point.style.removeProperty("--filled-color");
      }
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

  // Mobile swipe navigation
  experienceSection.addEventListener(
    "touchstart",
    (e) => {
      if (!e.touches || e.touches.length !== 1) return;

      touchTracking = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  experienceSection.addEventListener(
    "touchend",
    (e) => {
      if (!touchTracking || !e.changedTouches || e.changedTouches.length !== 1) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const swipeThreshold = 50;

      touchTracking = false;

      if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0 && currentIndex < experienceCount - 1) {
        navigateToExperience(currentIndex + 1);
      } else if (deltaX > 0 && currentIndex > 0) {
        navigateToExperience(currentIndex - 1);
      }
    },
    { passive: true },
  );

  experienceSection.addEventListener(
    "touchcancel",
    () => {
      touchTracking = false;
    },
    { passive: true },
  );
});
