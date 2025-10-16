/**
 * Project Ordering System
 * Allows custom ordering of project cards through URL parameters
 * Stores preferences in localStorage for persistence
 */

class ProjectOrdering {
  constructor() {
    this.storageKey = "portfolio-custom-order";
    this.urlParam = "order";
    this.projectMappings = this.initializeProjectMappings();
    this.init();
  }

  /**
   * Initialize project mappings for flexible identification
   * Projects can be identified by various methods (href, title, slug)
   */
  initializeProjectMappings() {
    return {
      wo: {
        href: "projects/wa-lch-origins.html",
        title: "WA-LCH Origins",
        year: 2025,
        category: "games",
      },
      pf: {
        href: "projects/portfolio.html",
        title: "Portfolio",
        year: 2025,
        category: "web",
      },
      mp: {
        href: "projects/merge-packing.html",
        title: "Merge Packing",
        year: 2025,
        category: "games",
      },
      walch: {
        href: "projects/wa-lch.html",
        title: "WA-LCH",
        year: 2024,
        category: "games",
      },
      yohob: {
        href: "projects/you-only-have-one-box.html",
        title: "You Only Have One Box",
        year: 2024,
        category: "games",
      },
      sp: {
        href: "projects/slimetastic-punchout.html",
        title: "Slimetastic Punchout",
        year: 2024,
        category: "games",
      },
      "3p": {
        href: "projects/3d-printing.html",
        title: "Test 3D Printing",
        year: 2025,
        category: "3dPrinting",
      },
    };
  }

  /**
   * Initialize the ordering system
   */
  init() {
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
      this.applyCustomOrder();
    }, 100);
  }

  /**
   * Parse URL parameters to get custom order
   * Example: ?order=portfolio,wa-lch,merge-packing
   */
  getOrderFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get(this.urlParam);

    if (orderParam) {
      return orderParam
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    }

    return null;
  }

  /**
   * Get stored order from localStorage
   */
  getStoredOrder() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Error reading stored project order:", error);
      return null;
    }
  }

  /**
   * Store order in localStorage
   */
  storeOrder(order) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(order));
    } catch (error) {
      console.warn("Error storing project order:", error);
    }
  }

  /**
   * Find project element by identifier
   */
  findProjectElement(identifier) {
    const container = document.querySelector(".blog-container");
    if (!container) return null;

    const projectItems = container.querySelectorAll(".project-item");

    for (const item of projectItems) {
      const href = item.getAttribute("href");
      const title = item.querySelector(".blog-title")?.textContent;

      // Check by mapping key
      if (this.projectMappings[identifier]) {
        const mapping = this.projectMappings[identifier];
        if (href === mapping.href || title === mapping.title) {
          return item;
        }
      }

      // Direct href match
      if (href && href.includes(identifier)) {
        return item;
      }

      // Direct title match (case insensitive)
      if (title && title.toLowerCase().includes(identifier.toLowerCase())) {
        return item;
      }
    }

    return null;
  }

  /**
   * Get all project elements
   */
  getAllProjectElements() {
    const container = document.querySelector(".blog-container");
    if (!container) return [];

    return Array.from(container.querySelectorAll(".project-item"));
  }

  /**
   * Apply custom ordering to project elements
   */
  applyCustomOrder() {
    // 1️⃣ Try to get order from URL
    let urlOrder = this.getOrderFromURL();
    let fromURL = !!urlOrder; // true if URL param exists at all

    // 2️⃣ Get stored order as potential fallback
    const storedOrder = this.getStoredOrder();

    // 3️⃣ Determine which order to use and filter valid entries
    let customOrder = null;
    let validOrder = [];
    let shouldInitializeDefaultFilter = false;

    if (fromURL) {
      // URL parameter exists, filter it for valid entries
      validOrder = Array.isArray(urlOrder) ? urlOrder.filter((id) => this.projectMappings[id]) : [];

      if (validOrder.length === 0) {
        // URL order is invalid, fall back to stored order
        console.warn("⚠️ URL order contains no valid projects. Trying stored order...");
        const validStored = Array.isArray(storedOrder) ? storedOrder.filter((id) => this.projectMappings[id]) : [];

        if (validStored.length > 0) {
          //   console.log("✅ Falling back to stored order.");
          validOrder = validStored;
          customOrder = storedOrder;
          fromURL = false; // Use stored order behavior
        } else {
          //   console.log("⚠️ No valid stored order found. Using default order and filter.");
          shouldInitializeDefaultFilter = true;
          return this.initializeDefaultState();
        }
      } else {
        customOrder = urlOrder;
      }
    } else {
      // No URL parameter, try stored order
      if (storedOrder && Array.isArray(storedOrder)) {
        validOrder = storedOrder.filter((id) => this.projectMappings[id]);
        if (validOrder.length > 0) {
          customOrder = storedOrder;
        } else {
          //   console.log("ℹ️ No valid stored order. Using default order and filter.");
          shouldInitializeDefaultFilter = true;
          return this.initializeDefaultState();
        }
      } else {
        // console.log("ℹ️ No custom or stored order. Using default order and filter.");
        shouldInitializeDefaultFilter = true;
        return this.initializeDefaultState();
      }
    }

    // 4️⃣ Apply the determined order
    this.reorderProjects(validOrder);

    // 5️⃣ Store order and switch category only if from URL and valid
    if (fromURL && urlOrder) {
      this.storeOrder(validOrder);
      this.switchToFirstProjectCategory(validOrder);
    }

    // console.log("✅ Applied custom order:", validOrder);
  }

  /**
   * Initialize default state when no valid orders are found
   */
  initializeDefaultState() {
    // Wait for filterProjects to be available and then initialize with games
    const checkForFilterProjects = () => {
      if (typeof window.filterProjects === "function") {
        window.filterProjects("games");
        // console.log("🎮 Initialized default filter: games");
      } else {
        // If filterProjects isn't ready yet, wait a bit more
        setTimeout(checkForFilterProjects, 50);
      }
    };

    setTimeout(checkForFilterProjects, 50);
  }

  /**
   * Switch to the category tab of the first project in the order
   */
  switchToFirstProjectCategory(order) {
    if (!order || order.length === 0) return;

    const firstProjectId = order[0];
    const projectMapping = this.projectMappings[firstProjectId];

    if (!projectMapping) return;

    const category = projectMapping.category;

    // Find and activate the appropriate tab button
    const tabButtons = document.querySelectorAll(".tab-button");
    const targetButton = Array.from(tabButtons).find((button) => button.getAttribute("data-tab") === category);

    if (targetButton) {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to target button
      targetButton.classList.add("active");

      // Trigger the filtering for this category
      // We need to dispatch the filtering after the DOM is ready
      setTimeout(() => {
        if (window.filterProjects) {
          window.filterProjects(category);
        }
      }, 50);

      //   console.log(`Auto-switched to category: ${category} for project: ${firstProjectId}`);
    }
  }

  /**
   * Apply custom ordering without changing the current tab
   * This is used when filtering projects manually
   */
  applyOrderingOnly() {
    const customOrder = this.getStoredOrder();
    if (customOrder && Array.isArray(customOrder)) {
      this.reorderProjects(customOrder);
    }
  }

  /**
   * Reorder project elements based on custom order
   */
  reorderProjects(order) {
    const container = document.querySelector(".blog-container");
    if (!container) return;

    const allProjects = this.getAllProjectElements();
    const orderedProjects = [];
    const remainingProjects = [...allProjects];

    // First, add projects in the specified order
    order.forEach((identifier) => {
      const project = this.findProjectElement(identifier);
      if (project) {
        orderedProjects.push(project);
        const index = remainingProjects.indexOf(project);
        if (index > -1) {
          remainingProjects.splice(index, 1);
        }
      }
    });

    // Then add any remaining projects that weren't in the custom order
    orderedProjects.push(...remainingProjects);

    // Reorder DOM elements
    orderedProjects.forEach((project) => {
      container.appendChild(project);
    });

    // console.log("Applied custom project order:", order);
  }

  /**
   * Reset to default order
   */
  resetOrder() {
    try {
      localStorage.removeItem(this.storageKey);

      // Remove URL parameter and reload
      const url = new URL(window.location);
      url.searchParams.delete(this.urlParam);
      window.history.replaceState({}, "", url);

      // Reload to apply default order
      window.location.reload();
    } catch (error) {
      console.warn("Error resetting project order:", error);
    }
  }

  /**
   * Get current order of projects
   */
  getCurrentOrder() {
    const projects = this.getAllProjectElements();
    const order = [];

    projects.forEach((project) => {
      const href = project.getAttribute("href");

      // Find the mapping key for this project
      for (const [key, mapping] of Object.entries(this.projectMappings)) {
        if (href === mapping.href) {
          order.push(key);
          break;
        }
      }
    });

    return order;
  }

  /**
   * Generate URL with custom order
   */
  generateOrderURL(order) {
    const url = new URL(window.location);
    if (order && order.length > 0) {
      url.searchParams.set(this.urlParam, order.join(","));
    } else {
      url.searchParams.delete(this.urlParam);
    }
    return url.toString();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.projectOrdering = new ProjectOrdering();
});

// Export for potential external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProjectOrdering;
}
