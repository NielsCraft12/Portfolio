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
  if (ageElement) ageElement.textContent = calculateAge(birthday);
}

// Project Tab Functionality
function initProjectTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const projectItems = document.querySelectorAll("project-item");
  const blogContainer = document.querySelector(".blog-container");

  // Immediately hide all projects to prevent flash
  projectItems.forEach((item) => {
    item.style.display = "none";
  });

  function filterProjects(category) {
    let visibleCount = 0;
    const maxProjects = 6;

    // Disable transitions temporarily to prevent flash
    projectItems.forEach((item) => {
      item.style.transition = "none";
    });

    projectItems.forEach((item) => {
      const itemCategory = item.getAttribute("category");
      const itemYear = parseInt(item.getAttribute("year"));
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

    // Apply custom ordering immediately (synchronously) before showing
    if (window.projectOrdering) {
      window.projectOrdering.applyOrderingOnly();
    }

    // Handle single item centering with a direct approach
    if (visibleCount === 1) {
      // Set fixed width on the container for one item
      blogContainer.style.maxWidth = "400px"; // Width of one card + some margin
      blogContainer.style.margin = "32px auto 0 auto"; // Keep consistent top margin

      // Find the visible items that are not hidden by filter
      const visibleItems = Array.from(projectItems).filter((item) => !item.classList.contains("hidden-filter"));
      if (visibleItems.length === 1) {
        const parentItem = visibleItems[0];
        if (parentItem) {
          parentItem.style.width = "100%";
          // Keep consistent alignment with multiple items
          parentItem.style.marginTop = "0"; // Remove negative margin
        }
      }
    } else {
      // Reset to normal layout for multiple items
      blogContainer.style.maxWidth = "1560px";
      blogContainer.style.margin = "32px auto 0 auto"; // Keep consistent top margin

      // Reset any item-specific styles
      document.querySelectorAll(".blog-container > project-item").forEach((item) => {
        item.style.width = "";
        item.style.marginTop = "";
        item.style.transform = ""; // Clear any inline transform
      });
    }

    // Re-enable transitions once the new layout has been painted
    requestAnimationFrame(() => {
      projectItems.forEach((item) => {
        item.style.transition = "";
      });
    });
  }

  // The tabs advertise aria-selected in the markup, so the state has to move with
  // the active class -- otherwise the tree keeps reporting the first tab as selected.
  function selectTab(button) {
    tabButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });
    const panel = document.getElementById("projects-panel");
    if (panel && button.id) panel.setAttribute("aria-labelledby", button.id);
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectTab(button);

      // Filter projects based on selected tab
      const category = button.getAttribute("data-tab");
      filterProjects(category);
    });

    // Arrow-key navigation is what the tab role promises once it is in the tree.
    button.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = tabButtons[(index + step + tabButtons.length) % tabButtons.length];
      next.focus();
      next.click();
    });
  });

  // Keep the ordering system's programmatic switches in sync too.
  window.selectProjectTab = selectTab;

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
// Close the mobile navbar after following an in-page link.
function initMobileNav() {
  const sidebarCheckbox = document.getElementById("sidebar-active");
  document.querySelectorAll('.links-container a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (sidebarCheckbox && sidebarCheckbox.checked) sidebarCheckbox.checked = false;
    });
  });
}

// Runs on DOMContentLoaded rather than window.onload: every project card starts
// hidden, so waiting for images and videos to finish left the grid blank for the
// whole load and then popped it in.
function init() {
  updateAgeDisplay();
  initMobileNav();
  initProjectTabs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
