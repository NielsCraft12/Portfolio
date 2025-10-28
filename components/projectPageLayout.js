// Debugging: Confirm script execution
console.log("[Embed Debug] projectPageLayout.js loaded");

// Ensure PROJECT_DATA is accessible
if (typeof PROJECT_DATA === "undefined") {
  console.error("[Embed Debug] PROJECT_DATA is undefined at script start.");
} else {
  console.log("[Embed Debug] PROJECT_DATA is accessible at script start:", PROJECT_DATA);
}

// ============================================
// COMPLETE RENDERING CODE - WITH COMPONENT WAITING
// ============================================

// Wrap everything in an async init function
async function initProjectPage() {
  document.title = PROJECT_DATA.title + " | Niels de Laat";
  // Wait for all required components to be registered
  await Promise.all([customElements.whenDefined("code-block"), customElements.whenDefined("social-buttons"), customElements.whenDefined("nav-bar")]);

  // Render Title with translation support
  const titleElement = document.getElementById("projectTitle");

  if (PROJECT_DATA.title_no_i18n || PROJECT_DATA.title_i18n === false || PROJECT_DATA.title_i18n === null || PROJECT_DATA.title_i18n === "__NO_TRANSLATE__") {
    const headTitle = document.querySelector("title");
    if (headTitle && headTitle.hasAttribute && headTitle.hasAttribute("data-i18n")) {
      headTitle.removeAttribute("data-i18n");
    }
  } else {
    const titleKey = typeof PROJECT_DATA.title_i18n === "string" && PROJECT_DATA.title_i18n ? PROJECT_DATA.title_i18n : "projects.wa_lch.title";
    titleElement.setAttribute("data-i18n", titleKey);
    const headTitle = document.querySelector("title");
    if (headTitle && headTitle.setAttribute) headTitle.setAttribute("data-i18n", titleKey);
  }

  titleElement.textContent = PROJECT_DATA.title;

  // Render Main Content Sections (with inline media and code block support)
  const mainContent = document.getElementById("mainContent");

  PROJECT_DATA.sections.forEach((section, index) => {
    // Handle inline media
    if (section.type === "media") {
      if (section.mediaType === "image") {
        const mediaDiv = document.createElement("div");
        mediaDiv.className = "media-container responsive-images";
        mediaDiv.style.display = "flex"; // Use flexbox for side-by-side layout
        mediaDiv.style.flexWrap = "wrap"; // Allow wrapping for smaller screens
        mediaDiv.style.gap = "10px"; // Add spacing between images
        mediaDiv.style.justifyContent = "center"; // Center the images horizontally

        if (Array.isArray(section.src)) {
          // Handle multiple images
          section.src.forEach((imageSrc, idx) => {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = section.alt ? section.alt[idx] : `Project Image ${idx + 1}`;
            img.style.flex = section.flex ? section.flex[idx] : "1"; // Allow custom size per image
            img.style.maxWidth = section.maxWidth ? section.maxWidth[idx] : "300px"; // Adjust max width for individual images
            img.style.margin = "10px";
            img.style.borderRadius = "8px";
            img.style.objectFit = "cover"; // Ensure images maintain aspect ratio
            mediaDiv.appendChild(img);
          });
        } else {
          // Handle single image
          const img = document.createElement("img");
          img.src = section.src;
          img.alt = section.alt || "Project Image";
          img.style.width = section.width || "100%";
          img.style.maxWidth = section.maxWidth || "800px";
          img.style.margin = "20px auto";
          img.style.display = "block";
          img.style.borderRadius = "8px";
          mediaDiv.appendChild(img);
        }

        mainContent.appendChild(mediaDiv);
      } else if (section.mediaType === "video") {
        // Check if it's a YouTube video
        if (section.src.includes("youtube.com/embed") || section.src.includes("youtu.be")) {
          // YouTube embed - use responsive container directly
          const videoContainer = document.createElement("div");
          videoContainer.className = "video-container";
          videoContainer.style.margin = "2rem 0";
          // Make the container responsive and constrain maximum width
          videoContainer.style.maxWidth = section.maxWidth || "800px";
          videoContainer.style.marginLeft = "auto";
          videoContainer.style.marginRight = "auto";

          // Use a 16:9 responsive wrapper using padding-top trick
          videoContainer.style.position = "relative";
          videoContainer.style.paddingTop = "56.25%"; // 16:9 aspect ratio

          const iframe = document.createElement("iframe");
          iframe.src = section.src;
          iframe.title = section.alt || "YouTube Video";
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.loading = section.loading || "lazy";

          // Position iframe absolutely to fill the 16:9 wrapper
          iframe.style.position = "absolute";
          iframe.style.top = "0";
          iframe.style.left = "0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "0";

          videoContainer.appendChild(iframe);
          mainContent.appendChild(videoContainer);
        } else {
          // Local video file
          const mediaDiv = document.createElement("div");
          mediaDiv.className = "media-container inline-media";

          const video = document.createElement("video");
          video.autoplay = section.autoplay !== false;
          video.muted = section.muted !== false;
          video.loop = section.loop !== false;
          video.playsInline = true;
          video.controls = section.controls || false;
          video.loading = section.loading || "lazy";
          video.style.width = section.width || "100%";
          video.style.maxWidth = section.maxWidth || "800px";
          video.style.margin = "20px auto";
          video.style.display = "block";
          video.style.borderRadius = "8px";

          const source = document.createElement("source");
          source.src = section.src;
          source.type = section.videoType || "video/webm";
          video.appendChild(source);
          mediaDiv.appendChild(video);

          mainContent.appendChild(mediaDiv);
        }
      }
      return;
    }

    // Handle inline code blocks
    if (section.type === "codeblock") {
      const codeBlockElement = document.createElement("code-block");
      codeBlockElement.setAttribute("href", section.githubUrl || "");
      codeBlockElement.setAttribute("language", section.language || "csharp");
      codeBlockElement.setAttribute("code", section.code || "");

      if (section.buttonI18n) {
        codeBlockElement.setAttribute("button-i18n", section.buttonI18n);
      }
      if (section.buttonText) {
        codeBlockElement.setAttribute("button-text", section.buttonText);
      }
      if (section.buttonTitle) {
        codeBlockElement.setAttribute("button-title", section.buttonTitle);
      }

      mainContent.appendChild(codeBlockElement);
      return;
    }

    // Regular text sections
    const h3 = document.createElement("h3");
    h3.className = "gradient-title subtitle";

    if (section.title_i18n) {
      h3.setAttribute("data-i18n", section.title_i18n);
    } else {
      h3.setAttribute("data-i18n", `projects.wa_lch.sections.${index}.title`);
    }

    h3.textContent = section.title;
    mainContent.appendChild(h3);

    if (section.type === "list") {
      const ul = document.createElement("ul");
      ul.className = "project-list";

      // Add content above the list if available
      if (section.content) {
        const p = document.createElement("p");
        p.className = "project-description";
        p.textContent = section.content;
        mainContent.appendChild(p);
      }

      section.items.forEach((item, itemIndex) => {
        const li = document.createElement("li");

        let skipI18n = false;
        let itemKey = null;

        if (section.items_no_i18n) {
          skipI18n = true;
        }

        if (Array.isArray(section.items_i18n)) {
          const v = section.items_i18n[itemIndex];
          if (v === false || v === null || v === "") {
            skipI18n = true;
          } else if (v) {
            itemKey = v;
          }
        }

        if (typeof item === "object" && item !== null) {
          if (item.no_i18n || item.i18n === false || item.i18n === null) {
            skipI18n = true;
          } else if (item.i18n) {
            itemKey = item.i18n;
          }
        }

        if (!skipI18n && !itemKey) {
          itemKey = `projects.wa_lch.sections.${index}.items.${itemIndex}`;
        }

        if (!skipI18n) {
          li.setAttribute("data-i18n", itemKey);
        }

        if (typeof item === "object" && item !== null && item.text) {
          li.textContent = item.text;
        } else {
          li.textContent = item;
        }

        ul.appendChild(li);
      });
      mainContent.appendChild(ul);
    } else {
      const p = document.createElement("p");
      p.className = "project-description";

      let skipContentI18n = false;
      let contentI18nKey = null;

      if (section.content_no_i18n) {
        skipContentI18n = true;
      }

      if (section.content_i18n === false || section.content_i18n === null) {
        skipContentI18n = true;
      } else if (typeof section.content_i18n === "string") {
        contentI18nKey = section.content_i18n;
      }

      if (!skipContentI18n && !contentI18nKey) {
        contentI18nKey = `projects.wa_lch.sections.${index}.content`;
      }

      if (!skipContentI18n && contentI18nKey) {
        p.setAttribute("data-i18n", contentI18nKey);
      }

      p.textContent = section.content;
      mainContent.appendChild(p);
    }
  });

  // Render legacy Code Blocks (if any exist in the old codeBlocks array)
  const codeBlocksContainer = document.getElementById("codeBlocks");
  if (PROJECT_DATA.codeBlocks && PROJECT_DATA.codeBlocks.length > 0) {
    PROJECT_DATA.codeBlocks.forEach((block) => {
      const codeBlockElement = document.createElement("code-block");
      codeBlockElement.setAttribute("href", block.githubUrl);
      codeBlockElement.setAttribute("language", block.language || "csharp");
      codeBlockElement.setAttribute("code", block.code);

      if (block.buttonI18n) {
        codeBlockElement.setAttribute("button-i18n", block.buttonI18n);
      }
      if (block.buttonText) {
        codeBlockElement.setAttribute("button-text", block.buttonText);
      }
      if (block.buttonTitle) {
        codeBlockElement.setAttribute("button-title", block.buttonTitle);
      }

      codeBlocksContainer.appendChild(codeBlockElement);
    });
  }

  // Render Sidebar
  const trailerContainer = document.getElementById("trailerContainer");
  const trailerIframe = document.createElement("iframe");
  trailerIframe.src = PROJECT_DATA.sidebar.trailerUrl;
  trailerIframe.allowFullscreen = true;
  trailerContainer.appendChild(trailerIframe);

  const screenshotsContainer = document.getElementById("screenshotsContainer");
  PROJECT_DATA.sidebar.screenshots.forEach((screenshot) => {
    const img = document.createElement("img");
    img.src = screenshot.src;
    img.alt = screenshot.alt;
    img.className = "screenshot";
    screenshotsContainer.appendChild(img);
  });

  const exploreCodeButtons = document.getElementById("exploreCodeButtons");
  exploreCodeButtons.setAttribute("data-buttons", JSON.stringify(PROJECT_DATA.sidebar.socialButtons));

  // Image Modal
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal-close");

  // Ensure the modal has the highest z-index
  if (modal) {
    modal.style.zIndex = "9999"; // Set a very high z-index to ensure it appears above other elements
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("screenshot")) {
      modal.style.display = "block";
      modalImg.src = e.target.src;
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Copyright Year
  const copyrightYearEl = document.getElementById("copyright-year");
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  } else {
    console.warn('[Embed Debug] Element with ID "copyright-year" not found.');
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Ensure translations are applied
  try {
    const currentLang = localStorage.getItem("preferredLanguage") || "en";
    if (typeof window.updateContent === "function") {
      setTimeout(() => window.updateContent(currentLang), 10);
    }
  } catch (e) {
    console.warn("Failed to re-run translations after dynamic rendering", e);
  }

  // Mobile / Tablet playability message logic
  (function () {
    function ready(fn) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
      } else {
        console.log("[Embed Debug] DOM already loaded, executing logic.");
        fn();
      }
    }

    ready(function () {
      const embedSection = document.getElementById("embedSection");
      if (!embedSection) return;

      const cfg = typeof window !== "undefined" && window.PROJECT_DATA ? window.PROJECT_DATA : typeof PROJECT_DATA !== "undefined" ? PROJECT_DATA : null;

      const embedEnabled = !!(cfg && cfg.embed && cfg.embed.enabled);
      const playableOnMobile = !!(cfg && cfg.embed && cfg.embed.playableOnMobile);

      // Function to detect touch-capable (tap) devices only.
      // We intentionally detect touch capability (tap) rather than a generic "mobile" flag
      // so desktop non-touch machines will continue to show the embed.
      // Detect whether this visitor should be treated as a "tap" device for
      // the purpose of hiding the embed and showing the mobile message.
      // We require touch capability AND evidence the device is a mobile/tablet
      // (mobile OS or small viewport). This avoids treating large-screen
      // desktop touchscreens as mobile.
      function detectTouchDevice() {
        const hasMaxTouchPoints = typeof navigator !== "undefined" && (navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 0;
        const hasTouchEvent = typeof window !== "undefined" && "ontouchstart" in window;
        const touchFirst = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
        const smallViewport = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 1024px)").matches;
        const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
        const isMobileOS = /Android|iPhone|iPad|iPod|Mobile|Silk/i.test(ua);

        // Treat as tap-device only when touch-capable AND (mobile OS OR small viewport OR touch-first)
        return !!((hasMaxTouchPoints || (hasTouchEvent && touchFirst)) && (isMobileOS || smallViewport || touchFirst));
      }

      const isTouchDevice = detectTouchDevice();
      const urlParams = typeof URLSearchParams !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const forceEmbed = urlParams ? urlParams.get("forceEmbed") === "true" : false;

      console.log("[Embed Debug] embedEnabled:", embedEnabled, "playableOnMobile:", playableOnMobile, "isTouchDevice:", isTouchDevice, "forceEmbed:", forceEmbed);

      if (!embedEnabled) {
        console.error("[Embed Debug] Embed is disabled.");
      } else if (isTouchDevice && !playableOnMobile) {
        console.warn("[Embed Debug] Touch device detected, embed not playable.");
      } else {
        console.log("[Embed Debug] Embed logic executed.");
      }

      let messageEl = document.querySelector(".mobile-message");
      if (!messageEl) {
        console.warn('[Embed Debug] Element with class "mobile-message" not found. Creating a new one.');
        messageEl = document.createElement("div");
        messageEl.className = "mobile-message";
        messageEl.innerHTML = `
                    <i class="fas fa-desktop mobile-message-icon" aria-hidden="true"></i>
                    <p data-i18n="projectPages.mobileMessage">To play ${PROJECT_DATA.title}, please visit this page on a computer.</p>
                `;
        const main = document.querySelector(".main-content") || document.body;
        main.appendChild(messageEl);
      }

      if (!embedEnabled) {
        messageEl.style.display = "none";
        embedSection.style.display = "none";
        console.log("[Embed Debug] Embed is disabled.");
      } else if (isTouchDevice && !playableOnMobile) {
        messageEl.style.display = "flex";
        messageEl.innerHTML = `
                    <i class="fas fa-mobile-alt mobile-message-icon" aria-hidden="true"></i>
                    <p data-i18n="projectPages.mobileMessage">This game is not playable on touch devices. Please use a desktop or laptop.</p>
                `;
        embedSection.style.display = "none";
        embedSection.innerHTML = "";
        console.log("[Embed Debug] Mobile detected, embed not playable. Showing updated message.");
      } else {
        messageEl.style.display = "none";
        embedSection.style.display = "block";

        const h3 = document.createElement("h3");
        h3.className = "gradient-title subtitle";
        h3.setAttribute("data-i18n", "projectPages.tryItOut");
        h3.textContent = "Try It Out";

        const div = document.createElement("div");
        div.className = "embed-container";
        const iframe = document.createElement("iframe");
        iframe.src = cfg.embed.url;
        iframe.allowFullscreen = true;

        // Default: responsive 16:9 wrapper for desktop/content
        div.style.position = "relative";
        div.style.paddingTop = "56.25%"; // 16:9
        div.style.maxWidth = (cfg && cfg.embed && cfg.embed.maxWidth) || "800px";
        div.style.margin = "0 auto";

        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";

        // Apply vertical aspect ratio for touch devices when playableOnMobile is true (override)
        if (isTouchDevice && playableOnMobile) {
          // Override the CSS positioning for vertical layout
          div.style.position = "static";
          div.style.paddingTop = "0";
          div.style.display = "flex";
          div.style.justifyContent = "center";
          div.style.alignItems = "center";

          iframe.style.position = "static";
          iframe.style.width = "100%";
          iframe.style.maxWidth = "400px"; // Portrait-friendly max width
          iframe.style.height = "711px"; // fallback fixed height for portrait layout
          iframe.style.aspectRatio = "9 / 16";
          iframe.style.margin = "0 auto";
          iframe.style.display = "block";
        }

        div.appendChild(iframe);

        embedSection.innerHTML = "";
        embedSection.appendChild(h3);
        embedSection.appendChild(div);
        console.log("[Embed Debug] Embed displayed successfully.");
      }

      function handleResize() {
        const isNowTouch = detectTouchDevice();

        if (embedEnabled && isNowTouch && !playableOnMobile) {
          messageEl.style.display = "flex";
          embedSection.style.display = "none";
        } else if (embedEnabled) {
          messageEl.style.display = "none";
          embedSection.style.display = "block";

          // Update iframe styles on resize for mobile
          const iframe = embedSection.querySelector("iframe");
          const container = iframe ? iframe.parentElement : null;

          if (iframe && container && isNowTouch && playableOnMobile) {
            // Mobile vertical layout
            container.style.position = "static";
            container.style.paddingTop = "0";
            container.style.display = "flex";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";

            iframe.style.position = "static";
            iframe.style.width = "100%";
            iframe.style.maxWidth = "400px"; // Reduced from 480px
            iframe.style.height = "711px"; // 400 * 16/9 = 711px
            iframe.style.aspectRatio = "9 / 16";
            iframe.style.margin = "0 auto";
            iframe.style.display = "block";
          } else if (iframe && container && !isNowTouch) {
            // Restore responsive 16:9 desktop styles
            container.style.position = "relative";
            container.style.paddingTop = "56.25%";
            container.style.display = "";
            container.style.justifyContent = "";
            container.style.alignItems = "";
            container.style.maxWidth = (cfg && cfg.embed && cfg.embed.maxWidth) || "800px";
            container.style.margin = "0 auto";

            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.aspectRatio = "";
            iframe.style.margin = "";
            iframe.style.display = "block";
          }
        }
      }

      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);
    });
  })();
}

// Start initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectPage);
} else {
  initProjectPage();
}

document.addEventListener("DOMContentLoaded", () => {
  const socialButtonsData = PROJECT_DATA.sidebar.socialButtons;
  const socialButtonsElement = document.getElementById("exploreCodeButtons");

  let socialButtonsElementClone = document.getElementById("exploreCodeButtons");
  if (socialButtonsElementClone) {
    const parent = socialButtonsElementClone.parentNode;
    const clone = socialButtonsElementClone.cloneNode(true);
    parent.replaceChild(clone, socialButtonsElementClone);
  } else {
    console.error("Social-buttons element not found in the DOM.");
  }
});

document.title = PROJECT_DATA.title + " | Niels de Laat";
