class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.initializeThemeSwitcher();

    // Listen for theme changes to check for Micro 5 font
    document.addEventListener("themeChanged", () => {
      setTimeout(() => {
        this.checkMicro5Font();
      }, 50);
    });

    // Check for Micro 5 font on initial load
    setTimeout(() => {
      this.checkMicro5Font();
    }, 100);
  }

  checkMicro5Font() {
    const isMicro5 = document.body.style.fontFamily && document.body.style.fontFamily.includes("Micro 5");

    // Remove existing style if it exists
    const existingStyle = this.shadowRoot.getElementById("micro5-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    if (isMicro5) {
      const style = document.createElement("style");
      style.id = "micro5-style";
      style.textContent = `
        .theme-btn {
          font-size: 0.8em !important;
        }
        .current-theme {
          font-size: 1em !important;
        }
        .theme-menu li a {
          font-size: 0.8em !important;
        }
      `;
      this.shadowRoot.appendChild(style);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        .theme-switcher {
          position: relative;
          display: inline-block;
        }

        .theme-btn {
          background-color: transparent;
          color: white;
          margin-bottom: 0;
          padding: 0 20px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 130px;
          white-space: nowrap;
          height: 100%;
          transition: background-color 0.2s ease;
          font-size: 1rem;
          position: relative;
        }

        .theme-btn:hover {
          background-color: var(--nav-hover);
        }

        .theme-btn i {
          transition: transform 0.3s ease;
          margin-left: -5px;
        }

        .theme-btn .current-theme {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;
          padding: 0 20px;
          font-weight: bold;
        }

        .current-theme {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 1rem;
        }

        .theme-menu {
          display: none;
          position: absolute;
          background: var(--nav-bg);
          backdrop-filter: blur(10px);
          min-width: 120px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
          z-index: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          right: 5px;
        }

        .theme-menu li a {
          color: white;
          padding: 12px 0;
          text-decoration: none;
          display: block;
          width: 100%;
          transition: background-color 0.2s ease;
          text-align: center;
        }

        .theme-menu li:first-child a {
          padding-top: 12px;
          border-radius: 10px 10px 0 0;
        }

        .theme-menu li:last-child a {
          border-radius: 0 0 10px 10px;
        }

        .theme-menu li a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .theme-menu li a.active {
          background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
          font-weight: 600;
        }

        /* Desktop: use hover */
        @media (hover: hover) and (pointer: fine) and (min-width: 769px) {
          .theme-switcher:hover .theme-menu {
            display: block;
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .theme-switcher:hover .theme-btn i {
            transform: rotate(180deg);
          }
        }

        /* Mobile: use click */
        .theme-switcher.active .theme-menu {
          display: block;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .theme-switcher.active .theme-btn i {
          transform: rotate(180deg);
        }

        /* Mobile styles */
        @media (max-width: 450px), (max-width: 1024px) and (orientation: portrait) {
          .theme-switcher {
            padding: 0 25px;
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: center;
            position: relative;
          }

          .theme-btn {
            width: 100% !important;
            padding: 10px 0;
            justify-content: center !important;
            text-align: center;
            font-size: 1.2rem;
          }

          .theme-menu {
            display: none;
            position: absolute;
            width: calc(100% - 50px);
            top: 100%;
            margin-top: 5px;
            left: 25px;
            right: 25px;
            transform: translateY(-10px);
          }

          .theme-menu li a {
            text-align: center;
            padding: 12px 0px;
          }
        }
      </style>

      <div class="theme-switcher">
        <button type="button" class="theme-btn">
          <span class="current-theme">Default</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <ul class="theme-menu">
          <li><a href="#" data-theme="default">Default</a></li>
          <li><a href="#" data-theme="ocean">Ocean Blue</a></li>
          <li><a href="#" data-theme="forest">Forest Green</a></li>
          <li><a href="#" data-theme="sunset">Sunset Purple</a></li>
          <li><a href="#" data-theme="midnight">Midnight</a></li>
          <li><a href="#" data-theme="coral">Coral Reef</a></li>
        </ul>
      </div>
    `;
  }

  initializeThemeSwitcher() {
    const themeBtn = this.shadowRoot.querySelector(".theme-btn");
    const themeSwitcher = this.shadowRoot.querySelector(".theme-switcher");
    const themeLinks = this.shadowRoot.querySelectorAll(".theme-menu a");

    let outsideClickHandler = null;

    // Toggle dropdown
    themeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyActive = themeSwitcher.classList.contains("active");

      if (isCurrentlyActive) {
        themeSwitcher.classList.remove("active");
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }
      } else {
        themeSwitcher.classList.add("active");

        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
        }

        setTimeout(() => {
          outsideClickHandler = (e) => {
            if (!themeSwitcher.contains(e.target)) {
              themeSwitcher.classList.remove("active");
              document.removeEventListener("click", outsideClickHandler);
              outsideClickHandler = null;
            }
          };
          document.addEventListener("click", outsideClickHandler);
        }, 10);
      }
    });

    // Handle theme selection
    themeLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        const selectedTheme = e.target.getAttribute("data-theme");

        // Close dropdown
        themeSwitcher.classList.remove("active");
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }

        // Apply theme (now async to wait for font loading)
        const { applyTheme } = await import("../js/themes.js");
        await applyTheme(selectedTheme);

        // Update display
        this.updateCurrentThemeDisplay(selectedTheme);
        this.updateActiveTheme(selectedTheme);
      });
    });

    // Initialize with saved theme
    this.loadSavedTheme();

    // Listen for theme changes from other sources
    window.addEventListener("themeChanged", (e) => {
      this.updateCurrentThemeDisplay(e.detail.theme);
      this.updateActiveTheme(e.detail.theme);
    });
  }

  async loadSavedTheme() {
    const { getCurrentTheme, themes } = await import("../js/themes.js");
    const currentTheme = getCurrentTheme();
    this.updateCurrentThemeDisplay(currentTheme);
    this.updateActiveTheme(currentTheme);
  }

  async updateCurrentThemeDisplay(themeName) {
    const { themes } = await import("../js/themes.js");
    const currentThemeSpan = this.shadowRoot.querySelector(".current-theme");
    if (currentThemeSpan && themes[themeName]) {
      currentThemeSpan.textContent = themes[themeName].name;
    }
  }

  updateActiveTheme(themeName) {
    const themeLinks = this.shadowRoot.querySelectorAll(".theme-menu a");
    themeLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const selectedLink = this.shadowRoot.querySelector(`.theme-menu a[data-theme="${themeName}"]`);
    if (selectedLink) {
      selectedLink.classList.add("active");
    }
  }
}

customElements.define("theme-switcher", ThemeSwitcher);
