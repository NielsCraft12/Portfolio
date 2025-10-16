function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Adjust age if today's date is before the birthday this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

function updateAgeDisplay() {
  const birthday = "2005-03-20"; // Set your birth date here (YYYY-MM-DD)
  const ageElement = document.getElementById("age");
  ageElement.textContent = calculateAge(birthday);
}

// Project Tab Functionality
function initProjectTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const projectItems = document.querySelectorAll(".project-item");
  const blogContainer = document.querySelector(".blog-container");

  // Immediately hide all projects to prevent flash
  projectItems.forEach((item) => {
    item.style.display = "none";
  });

  function filterProjects(category) {
    let visibleCount = 0;
    const maxProjects = 6;

    projectItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const itemYear = parseInt(item.getAttribute("data-year"));
      const currentYear = new Date().getFullYear();

      let shouldShow = false;

      if (category === "all") {
        shouldShow = true;
      } else if (category === "recent") {
        shouldShow = itemYear >= currentYear - 1; // Show projects from current year and last year
      } else {
        shouldShow = itemCategory === category;
      }

      // Limit to maximum 6 projects
      if (shouldShow && visibleCount < maxProjects) {
        item.classList.remove("hidden-filter", "hidden");
        item.classList.add("show");
        item.style.display = "block";
        item.style.transform = ""; // Clear any inline transform styles
        visibleCount++;
      } else {
        item.classList.add("hidden-filter");
        item.classList.remove("show");
        item.style.display = "none";
      }
    });

    // Apply custom ordering after filtering, but don't change tabs
    if (window.projectOrdering) {
      setTimeout(() => {
        window.projectOrdering.applyOrderingOnly();
      }, 10);
    }

    // Handle single item centering with a direct approach
    if (visibleCount === 1) {
      // Set fixed width on the container for one item
      blogContainer.style.maxWidth = "400px"; // Width of one card + some margin
      blogContainer.style.margin = "32px auto 0 auto"; // Keep consistent top margin

      // Find the visible anchor that contains the project
      const visibleItems = Array.from(projectItems).filter((item) => !item.classList.contains("hidden-filter"));
      if (visibleItems.length === 1) {
        const parentLink = visibleItems[0].closest("a");
        const projectItem = visibleItems[0];
        if (parentLink) {
          parentLink.style.width = "100%";
          // Keep consistent alignment with multiple items
          parentLink.style.marginTop = "0"; // Remove negative margin
        }
        if (projectItem) {
          projectItem.style.marginTop = "0"; // Keep consistent margins
        }
      }
    } else {
      // Reset to normal layout for multiple items
      blogContainer.style.maxWidth = "1560px";
      blogContainer.style.margin = "32px auto 0 auto"; // Keep consistent top margin

      // Reset any item-specific styles
      document.querySelectorAll(".blog-container > a").forEach((link) => {
        link.style.width = "";
        link.style.marginTop = "";

        // Also reset the project item styles
        const projectItem = link.querySelector(".project-item");
        if (projectItem) {
          projectItem.style.marginTop = "";
          projectItem.style.transform = ""; // Clear any inline transform
        }

        // Reset any transform styles on the blog-box
        const blogBox = link.querySelector(".blog-box");
        if (blogBox) {
          blogBox.style.transform = ""; // Clear any inline transform to allow hover effects
        }
      });
    }
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Filter projects based on selected tab
      const category = button.getAttribute("data-tab");
      filterProjects(category);
    });
  });

  // Initialize with 'games' projects shown immediately, unless URL ordering overrides it
  const urlParams = new URLSearchParams(window.location.search);
  const hasOrderParam = urlParams.get("order");

  if (!hasOrderParam) {
    // Only initialize with games if there's no URL ordering at all
    filterProjects("games");
  }
  // If there IS an order param, let the project ordering system handle initialization
  // It will call filterProjects if the order is invalid and no stored order exists

  // Make filterProjects globally available for the ordering system
  window.filterProjects = filterProjects;
}
//
//
//
// navbar chang color on scroll
//
//
//
//

// Function to walk up and find the first non-transparent background color

// Update age display when the page loads
window.onload = function () {
  updateAgeDisplay();
  // Use requestAnimationFrame to ensure DOM is ready and make filtering instant
  requestAnimationFrame(() => {
    initProjectTabs();
  });

  //
  //
  //
  //
};
