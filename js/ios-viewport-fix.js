// iOS Safari viewport fix
(function () {
  "use strict";

  // Check if we're on iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Fix iOS viewport issues
  function fixIOSViewport() {
    if (!isIOS()) return;

    // Set CSS custom property for viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set on load and resize
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", () => {
      setTimeout(setViewportHeight, 100);
    });

    // Prevent iOS Safari from showing white space at the top
    const preventWhiteSpace = () => {
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";

      // After a brief delay, restore normal positioning
      setTimeout(() => {
        document.body.style.position = "relative";
        document.body.style.top = "auto";
        document.body.style.left = "auto";
        document.body.style.width = "auto";
        document.body.style.height = "auto";
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";
      }, 100);
    };

    // Apply fix on page load
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", preventWhiteSpace);
    } else {
      preventWhiteSpace();
    }
  }

  fixIOSViewport();
})();
