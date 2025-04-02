document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const slider = document.getElementById("slider");
  const sliderTrack = document.getElementById("slider-track");
  const sliderThumb = document.getElementById("slider-thumb");
  const sliderPointsContainer = document.querySelector(".slider-points");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const contentSections = document.querySelectorAll(".content-section");
  const skills = document.querySelectorAll(".skill");
  const tooltip = document.getElementById("tooltip");
  const certificateIcons = document.querySelectorAll(".certificate-icon");

  // Variables
  let currentPosition = 0;
  let isDragging = false;
  const sections = Array.from(contentSections);
  const positions = [];

  // Create slider points based on content sections
  sections.forEach((section, index) => {
    const position = index * (100 / (sections.length - 1));
    positions.push(position);

    const point = document.createElement("div");
    point.className = "slider-point";
    point.setAttribute("data-index", index);
    point.style.left = `${position}%`;

    point.addEventListener("click", () => {
      updateSlider(index);
    });

    point.addEventListener("mouseenter", (e) => {
      const sectionTitle = sections[index].querySelector(".title").textContent;
      showTooltip(e, sectionTitle);
    });

    point.addEventListener("mouseleave", () => {
      hideTooltip();
    });

    sliderPointsContainer.appendChild(point);
  });

  // Set last position to exactly 100% for better visual
  if (positions.length > 0) {
    positions[positions.length - 1] = 100;
  }

  const sliderPoints = document.querySelectorAll(".slider-point");

  // Initialize
  updateSlider(0);

  // Event listeners
  prevBtn.addEventListener("click", () => {
    navigateSlider("prev");
  });

  nextBtn.addEventListener("click", () => {
    navigateSlider("next");
  });

  slider.addEventListener("click", (e) => {
    if (e.target.classList.contains("slider-point")) return; // Already handled

    const rect = slider.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    const closestIndex = findClosestPosition(position);
    updateSlider(closestIndex);
  });

  sliderThumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleDrag);
      // Snap to closest position
      const closestIndex = findClosestPosition(currentPosition);
      updateSlider(closestIndex);
    });
  });

  skills.forEach((skill) => {
    skill.addEventListener("click", () => {
      const skillName = skill.getAttribute("data-skill");
      toggleSkillContent(skill, skillName);
    });
  });

  certificateIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      alert("Certificate earned! Click to download or view details.");
    });

    icon.addEventListener("mouseenter", (e) => {
      showTooltip(e, "View Certificate");
    });

    icon.addEventListener("mouseleave", () => {
      hideTooltip();
    });
  });

  // Functions
  function updateSlider(index) {
    currentPosition = positions[index];

    // Update slider visuals
    sliderTrack.style.width = `${currentPosition}%`;
    sliderThumb.style.left = `${currentPosition}%`;

    // Update active points
    sliderPoints.forEach((point, i) => {
      if (i <= index) {
        point.classList.add("active");
      } else {
        point.classList.remove("active");
      }
    });

    // Show corresponding content section
    contentSections.forEach((section, i) => {
      if (i === index) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Reset skill selections
    skills.forEach((skill) => skill.classList.remove("active"));
    document.querySelectorAll(".skill-content").forEach((content) => {
      content.classList.remove("active");
    });
  }

  function navigateSlider(direction) {
    const currentIndex = positions.indexOf(currentPosition);
    let newIndex;

    if (direction === "prev") {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(positions.length - 1, currentIndex + 1);
    }

    updateSlider(newIndex);
  }

  function handleDrag(e) {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    let position = ((e.clientX - rect.left) / rect.width) * 100;

    // Constrain to 0-100%
    position = Math.max(0, Math.min(100, position));
    currentPosition = position;

    sliderTrack.style.width = `${position}%`;
    sliderThumb.style.left = `${position}%`;

    // Update active points based on current position
    const closestIndex = findClosestPosition(position, false); // Don't snap yet
    sliderPoints.forEach((point, i) => {
      if (positions[i] <= position) {
        point.classList.add("active");
      } else {
        point.classList.remove("active");
      }
    });
  }

  function findClosestPosition(position, snap = true) {
    let closestIndex = 0;
    let minDistance = Math.abs(positions[0] - position);

    for (let i = 1; i < positions.length; i++) {
      const distance = Math.abs(positions[i] - position);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  function toggleSkillContent(skillElement, skillName) {
    // Clear all active states
    skills.forEach((s) => {
      if (s !== skillElement) s.classList.remove("active");
    });

    document.querySelectorAll(".skill-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Toggle clicked skill
    skillElement.classList.toggle("active");

    // Show corresponding content if skill is active
    if (skillElement.classList.contains("active")) {
      const contentElement = document.getElementById(`${skillName}-content`);
      if (contentElement) {
        contentElement.classList.add("active");
      }
    }
  }

  function showTooltip(event, text) {
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  }

  function hideTooltip() {
    tooltip.style.opacity = 0;
  }
});
