// Theme configuration
export const themes = {
  default: {
    name: "Default",
    font: {
      name: "Baloo 2",
      family: '"Baloo 2", cursive',
      googleFont: "Baloo+2:wght@800",
    },
    fontScale: 1, // 1 = normal size, 2 = double size (for small fonts like Micro 5)
    colors: {
      // Primary Colors
      "--primary-bg": "#1e1e1e",
      "--primary-text": "#ffffff",
      "--secondary-text": "#fff",

      // Gradient Colors
      "--gradient-start": "#ff7e5f",
      "--gradient-end": "#feb47b",

      // Container Background
      "--container-gradient-start": "#bb7a45",
      "--container-gradient-end": "#ae445a",

      // Icon Colors
      "--icon-default": "#1b1b1b",
      "--icon-active": "#ffffff",

      // Modal Colors
      "--modal-bg": "rgba(0, 0, 0, 0.85)",
      "--modal-disabled-opacity": "0.5",

      // Scrollbar Colors
      "--scrollbar-track": "#1e1e1e",
      "--scrollbar-thumb-start": "#ff7e5f",
      "--scrollbar-thumb-end": "#feb47b",

      // Error/Missing Translation Colors
      "--error-bg": "rgba(255, 0, 0, 0.2)",
      "--error-border": "#ff4444",
      "--error-text": "#ff6666",
      "--error-icon": "#ff4444",

      // Tooltip Colors
      "--tooltip-bg": "#333",
      "--tooltip-text": "white",

      // Nav Colors
      "--nav-bg": "rgba(30, 30, 30, 0.5)",
      "--nav-text": "white",
      "--nav-hover": "rgba(255, 255, 255, 0.1)",

      // Chip Colors
      "--chip-bg": "hsla(230, 13%, 9%, 0.517)",
      "--chip-text": "white",
    },
  },

  ocean: {
    name: "Ocean Blue",
    font: {
      name: "Micro 5",
      family: '"Micro 5"',
      googleFont: "Micro+5",
    },
    fontScale: 2, // Double size for Micro 5 font
    colors: {
      "--primary-bg": "#0a192f",
      "--primary-text": "#ccd6f6",
      "--secondary-text": "#8892b0",

      "--gradient-start": "#00d4ff",
      "--gradient-end": "#0099ff",

      "--container-gradient-start": "#1a4d6d",
      "--container-gradient-end": "#0d2d4d",

      "--icon-default": "#0a192f",
      "--icon-active": "#64ffda",

      "--modal-bg": "rgba(10, 25, 47, 0.85)",
      "--modal-disabled-opacity": "0.5",

      "--scrollbar-track": "#0a192f",
      "--scrollbar-thumb-start": "#00d4ff",
      "--scrollbar-thumb-end": "#0099ff",

      "--error-bg": "rgba(255, 85, 85, 0.2)",
      "--error-border": "#ff5555",
      "--error-text": "#ff8888",
      "--error-icon": "#ff5555",

      "--tooltip-bg": "#172a45",
      "--tooltip-text": "#ccd6f6",

      "--nav-bg": "rgba(10, 25, 47, 0.5)",
      "--nav-text": "#ccd6f6",
      "--nav-hover": "rgba(100, 255, 218, 0.1)",

      "--chip-bg": "rgba(23, 42, 69, 0.6)",
      "--chip-text": "#ccd6f6",
    },
  },

  forest: {
    name: "Forest Green",
    font: {
      name: "Nunito",
      family: '"Nunito", sans-serif',
      googleFont: "Nunito:wght@800",
    },
    fontScale: 1, // Normal size
    colors: {
      "--primary-bg": "#1a2f1a",
      "--primary-text": "#e8f5e8",
      "--secondary-text": "#b8d4b8",

      "--gradient-start": "#52c234",
      "--gradient-end": "#8bc34a",

      "--container-gradient-start": "#2d5a2d",
      "--container-gradient-end": "#1a3d1a",

      "--icon-default": "#1a2f1a",
      "--icon-active": "#8bc34a",

      "--modal-bg": "rgba(26, 47, 26, 0.85)",
      "--modal-disabled-opacity": "0.5",

      "--scrollbar-track": "#1a2f1a",
      "--scrollbar-thumb-start": "#52c234",
      "--scrollbar-thumb-end": "#8bc34a",

      "--error-bg": "rgba(255, 87, 87, 0.2)",
      "--error-border": "#ff5757",
      "--error-text": "#ff8989",
      "--error-icon": "#ff5757",

      "--tooltip-bg": "#2d472d",
      "--tooltip-text": "#e8f5e8",

      "--nav-bg": "rgba(26, 47, 26, 0.5)",
      "--nav-text": "#e8f5e8",
      "--nav-hover": "rgba(139, 195, 74, 0.1)",

      "--chip-bg": "rgba(45, 71, 45, 0.6)",
      "--chip-text": "#e8f5e8",
    },
  },

  sunset: {
    name: "Sunset Purple",
    font: {
      name: "Poppins",
      family: '"Poppins", sans-serif',
      googleFont: "Poppins:wght@800",
    },
    fontScale: 1, // Normal size
    colors: {
      "--primary-bg": "#2b1b3d",
      "--primary-text": "#f5e6ff",
      "--secondary-text": "#d4b3ff",

      "--gradient-start": "#c471ed",
      "--gradient-end": "#f64f59",

      "--container-gradient-start": "#6441a5",
      "--container-gradient-end": "#2a0845",

      "--icon-default": "#2b1b3d",
      "--icon-active": "#c471ed",

      "--modal-bg": "rgba(43, 27, 61, 0.85)",
      "--modal-disabled-opacity": "0.5",

      "--scrollbar-track": "#2b1b3d",
      "--scrollbar-thumb-start": "#c471ed",
      "--scrollbar-thumb-end": "#f64f59",

      "--error-bg": "rgba(255, 79, 89, 0.2)",
      "--error-border": "#f64f59",
      "--error-text": "#ff8a93",
      "--error-icon": "#f64f59",

      "--tooltip-bg": "#3d2a52",
      "--tooltip-text": "#f5e6ff",

      "--nav-bg": "rgba(43, 27, 61, 0.5)",
      "--nav-text": "#f5e6ff",
      "--nav-hover": "rgba(196, 113, 237, 0.1)",

      "--chip-bg": "rgba(61, 42, 82, 0.6)",
      "--chip-text": "#f5e6ff",
    },
  },

  midnight: {
    name: "Midnight",
    font: {
      name: "Montserrat",
      family: '"Montserrat", sans-serif',
      googleFont: "Montserrat:wght@800",
    },
    fontScale: 1, // Normal size
    colors: {
      "--primary-bg": "#0d0d0d",
      "--primary-text": "#e0e0e0",
      "--secondary-text": "#b0b0b0",

      "--gradient-start": "#667eea",
      "--gradient-end": "#764ba2",

      "--container-gradient-start": "#434343",
      "--container-gradient-end": "#000000",

      "--icon-default": "#0d0d0d",
      "--icon-active": "#667eea",

      "--modal-bg": "rgba(13, 13, 13, 0.85)",
      "--modal-disabled-opacity": "0.5",

      "--scrollbar-track": "#0d0d0d",
      "--scrollbar-thumb-start": "#667eea",
      "--scrollbar-thumb-end": "#764ba2",

      "--error-bg": "rgba(255, 68, 68, 0.2)",
      "--error-border": "#ff4444",
      "--error-text": "#ff7777",
      "--error-icon": "#ff4444",

      "--tooltip-bg": "#1a1a1a",
      "--tooltip-text": "#e0e0e0",

      "--nav-bg": "rgba(13, 13, 13, 0.5)",
      "--nav-text": "#e0e0e0",
      "--nav-hover": "rgba(102, 126, 234, 0.1)",

      "--chip-bg": "rgba(26, 26, 26, 0.6)",
      "--chip-text": "#e0e0e0",
    },
  },

  coral: {
    name: "Coral Reef",
    font: {
      name: "Raleway",
      family: '"Raleway", sans-serif',
      googleFont: "Raleway:wght@800",
    },
    fontScale: 1, // Normal size
    colors: {
      "--primary-bg": "#2d1f1f",
      "--primary-text": "#fff5f5",
      "--secondary-text": "#ffd4d4",

      "--gradient-start": "#ff6b9d",
      "--gradient-end": "#ffa07a",

      "--container-gradient-start": "#c94b4b",
      "--container-gradient-end": "#8b3a3a",

      "--icon-default": "#2d1f1f",
      "--icon-active": "#ff6b9d",

      "--modal-bg": "rgba(45, 31, 31, 0.85)",
      "--modal-disabled-opacity": "0.5",

      "--scrollbar-track": "#2d1f1f",
      "--scrollbar-thumb-start": "#ff6b9d",
      "--scrollbar-thumb-end": "#ffa07a",

      "--error-bg": "rgba(255, 107, 157, 0.2)",
      "--error-border": "#ff6b9d",
      "--error-text": "#ff9dbf",
      "--error-icon": "#ff6b9d",

      "--tooltip-bg": "#3d2f2f",
      "--tooltip-text": "#fff5f5",

      "--nav-bg": "rgba(45, 31, 31, 0.5)",
      "--nav-text": "#fff5f5",
      "--nav-hover": "rgba(255, 107, 157, 0.1)",

      "--chip-bg": "rgba(61, 47, 47, 0.6)",
      "--chip-text": "#fff5f5",
    },
  },
};

// Load Google Font dynamically and wait for it to be ready
async function loadGoogleFont(font) {
  if (!font || !font.googleFont) return;

  // Check if font link already exists
  let existingLink = document.querySelector(`link[data-font="${font.name}"]`);

  if (!existingLink) {
    // Create and append font link
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`;
    link.setAttribute("data-font", font.name);
    document.head.appendChild(link);

    // Wait for the stylesheet to load
    await new Promise((resolve) => {
      link.onload = resolve;
      // Fallback timeout in case onload doesn't fire
      setTimeout(resolve, 1000);
    });
  }

  // Use the Font Loading API to ensure the font is truly ready
  if (document.fonts && document.fonts.load) {
    try {
      // Load the font with a test string
      await document.fonts.load(`1em "${font.name}"`);
      // Wait for all fonts to be ready
      await document.fonts.ready;
    } catch (e) {
      console.warn("Font loading API failed, proceeding anyway:", e);
    }
  } else {
    // Fallback: just wait a bit
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

// Theme management functions
export async function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme '${themeName}' not found`);
    return;
  }

  const root = document.documentElement;

  // Apply colors first (instant)
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Apply font scale CSS variable
  const fontScale = theme.fontScale || 1;
  root.style.setProperty("--font-scale", fontScale);

  // Apply font (wait for it to load)
  if (theme.font) {
    // Load the font and wait for it to be ready
    await loadGoogleFont(theme.font);

    // Force browser to recognize font change by temporarily switching to a different font
    document.body.style.fontFamily = "Arial, sans-serif";
    void document.body.offsetHeight; // Force reflow

    // Now apply the new font
    document.body.style.fontFamily = theme.font.family;
    root.style.setProperty("--font-family", theme.font.family);

    // If it's Micro 5 font, also set the CSS variable for font scaling
    if (theme.font.name === "Micro 5") {
      root.style.setProperty("--micro5-scale", "2");
      document.body.classList.add("micro5-font");
    } else {
      root.style.setProperty("--micro5-scale", "1");
      document.body.classList.remove("micro5-font");
    }

    // Also update all text elements directly
    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      // Skip elements inside shadow DOM (like theme-switcher)
      if (el.shadowRoot) return;
      el.style.fontFamily = theme.font.family;
    });

    // Force another reflow
    void document.body.offsetHeight;
  }

  // Save preference
  localStorage.setItem("preferredTheme", themeName);

  // Dispatch event for other components
  window.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: { theme: themeName },
    })
  );
}

export function getCurrentTheme() {
  return localStorage.getItem("preferredTheme") || "default";
}

export function initializeTheme() {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
}
