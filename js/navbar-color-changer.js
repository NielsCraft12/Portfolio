(function () {
  "use strict";

  let colorCache = new Map();

  function getLuminance(r, g, b) {
    const toLinear = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const rLin = toLinear(r);
    const gLin = toLinear(g);
    const bLin = toLinear(b);
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  }

  function isLightColor(rgbString) {
    // Check cache first
    if (colorCache.has(rgbString)) {
      return colorCache.get(rgbString);
    }

    let result = true; // Default to light

    // Handle transparent backgrounds
    if (rgbString === "transparent" || rgbString === "rgba(0, 0, 0, 0)" || rgbString.includes("rgba(0, 0, 0, 0)")) {
      result = true;
    } else {
      const match = rgbString.match(/\d+/g);
      if (match && match.length >= 3) {
        const [r, g, b] = match.map(Number);
        const luminance = getLuminance(r, g, b);
        result = luminance > 0.5;
      }
    }

    // Cache the result
    colorCache.set(rgbString, result);
    return result;
  }

  function updateNavColor() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    // Get all navbar text elements (links, spans, buttons)
    const navElements = nav.querySelectorAll("a, .language-btn, .language-menu a");

    navElements.forEach((navEl) => {
      const rect = navEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const midX = Math.floor(rect.left + rect.width / 2);
      const midY = Math.floor(rect.top + rect.height / 2);

      // Temporarily hide nav to get element behind it
      nav.style.pointerEvents = "none";
      const el = document.elementFromPoint(midX, midY);
      nav.style.pointerEvents = "";

      if (!el) return;

      const bg = getComputedStyle(el).backgroundColor;
      const isLight = isLightColor(bg);
      const textColor = isLight ? "#000000" : "#ffffff";

      // Apply color to the entire element
      navEl.style.color = textColor;
      if (navEl.classList.contains("language-btn")) {
        navEl.style.borderColor = textColor;
      }
    });

    // Handle icons separately
    const icons = nav.querySelectorAll("i");
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const midX = Math.floor(rect.left + rect.width / 2);
      const midY = Math.floor(rect.top + rect.height / 2);

      nav.style.pointerEvents = "none";
      const el = document.elementFromPoint(midX, midY);
      nav.style.pointerEvents = "";

      if (!el) return;

      const bg = getComputedStyle(el).backgroundColor;
      const isLight = isLightColor(bg);
      const textColor = isLight ? "#000000" : "#ffffff";

      icon.style.color = textColor;
    });
  }

  // Add throttling for smooth performance
  let lastUpdate = 0;
  const THROTTLE_MS = 16; // ~60fps

  function throttledUpdate() {
    const now = Date.now();
    if (now - lastUpdate < THROTTLE_MS) return;
    lastUpdate = now;
    updateNavColor();
  }

  // Run with throttling
  window.addEventListener("scroll", throttledUpdate, { passive: true });
  window.addEventListener("resize", updateNavColor, { passive: true });
  document.addEventListener("DOMContentLoaded", updateNavColor);
})();
