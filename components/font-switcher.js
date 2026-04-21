class FontSwitcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.initializeFontSwitcher();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .font-switcher {
          position: relative;
          display: inline-block;
        }

        .font-btn {
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
          font-family: "Baloo 2", cursive;
          font-weight: 400;
        }

        .font-btn:hover {
          background-color: var(--nav-hover, rgba(255, 255, 255, 0.1));
        }

        .font-btn i {
          transition: transform 0.3s ease;
          margin-left: 8px;
        }

        .font-switcher.active .font-btn i {
          transform: rotate(180deg);
        }

        .current-font {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;
          font-weight: bold;
        }

        .font-menu {
          display: none;
          position: absolute;
          background: var(--nav-bg, rgba(30, 30, 30, 0.95));
          backdrop-filter: blur(10px);
          min-width: 180px;
          max-height: 400px;
          overflow-y: auto;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
          z-index: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          right: 5px;
        }

        .font-switcher.active .font-menu {
          display: block;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .font-menu li {
          margin: 0;
          padding: 0;
        }

        .font-menu li a {
          color: var(--nav-text, white);
          padding: 12px 20px;
          text-decoration: none;
          display: block;
          width: 100%;
          transition: background-color 0.2s ease;
          font-family: "Baloo 2", cursive;
          box-sizing: border-box;
          cursor: pointer;
        }

        .font-menu li a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .font-menu li a.active {
          background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
          font-weight: 600;
        }

        .font-menu li:first-child a {
          border-radius: 10px 10px 0 0;
        }

        .font-menu li:last-child a {
          border-radius: 0 0 10px 10px;
        }

        /* Custom scrollbar for font menu */
        .font-menu::-webkit-scrollbar {
          width: 8px;
        }

        .font-menu::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .font-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .font-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Desktop hover behavior */
        @media (hover: hover) and (pointer: fine) and (min-width: 769px) {
          .font-switcher:hover .font-menu {
            display: block;
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .font-switcher:hover .font-btn i {
            transform: rotate(180deg);
          }
        }

        /* Mobile styles */
        @media (max-width: 450px), (max-width: 1024px) and (orientation: portrait) {
          .font-switcher {
            padding: 0 25px;
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: center;
            position: relative;
          }

          .font-btn {
            width: 100% !important;
            padding: 10px 0;
            justify-content: center !important;
            text-align: center;
            font-size: 1.2rem;
          }

          .font-menu {
            display: none;
            position: absolute;
            width: calc(100% - 50px);
            top: 100%;
            margin-top: 5px;
            left: 25px;
            right: 25px;
            transform: translateY(-10px);
          }

          .font-menu li a {
            text-align: center;
            padding: 12px 0px;
          }
        }
      </style>

      <div class="font-switcher">
        <button type="button" class="font-btn">
          <span class="current-font">Baloo 2</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <ul class="font-menu">
          <li><a href="#" data-font="baloo">Baloo 2</a></li>
          <li><a href="#" data-font="roboto">Roboto</a></li>
          <li><a href="#" data-font="openSans">Open Sans</a></li>
          <li><a href="#" data-font="montserrat">Montserrat</a></li>
          <li><a href="#" data-font="poppins">Poppins</a></li>
          <li><a href="#" data-font="lato">Lato</a></li>
          <li><a href="#" data-font="nunito">Nunito</a></li>
          <li><a href="#" data-font="raleway">Raleway</a></li>
          <li><a href="#" data-font="ubuntu">Ubuntu</a></li>
          <li><a href="#" data-font="sourceCodePro">Source Code Pro</a></li>
        </ul>
      </div>
    `;
  }

  initializeFontSwitcher() {
    const fontBtn = this.shadowRoot.querySelector(".font-btn");
    const fontSwitcher = this.shadowRoot.querySelector(".font-switcher");
    const fontLinks = this.shadowRoot.querySelectorAll(".font-menu a");

    let outsideClickHandler = null;

    // Toggle dropdown
    fontBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyActive = fontSwitcher.classList.contains("active");

      if (isCurrentlyActive) {
        fontSwitcher.classList.remove("active");
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }
      } else {
        fontSwitcher.classList.add("active");

        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
        }

        setTimeout(() => {
          outsideClickHandler = (e) => {
            if (!fontSwitcher.contains(e.target)) {
              fontSwitcher.classList.remove("active");
              document.removeEventListener("click", outsideClickHandler);
              outsideClickHandler = null;
            }
          };
          document.addEventListener("click", outsideClickHandler);
        }, 10);
      }
    });

    // Handle font selection
    fontLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        const selectedFont = e.target.getAttribute("data-font");

        // Close dropdown
        fontSwitcher.classList.remove("active");
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }

        // Apply font
        const { applyFont } = await import("../js/fonts.js");
        applyFont(selectedFont);

        // Update display
        this.updateCurrentFontDisplay(selectedFont);
        this.updateActiveFont(selectedFont);
      });
    });

    // Initialize with saved font
    this.loadSavedFont();

    // Listen for font changes from other sources
    window.addEventListener("fontChanged", (e) => {
      this.updateCurrentFontDisplay(e.detail.font);
      this.updateActiveFont(e.detail.font);
    });
  }

  async loadSavedFont() {
    const { getCurrentFont, fonts } = await import("../js/fonts.js");
    const currentFont = getCurrentFont();
    this.updateCurrentFontDisplay(currentFont);
    this.updateActiveFont(currentFont);
  }

  async updateCurrentFontDisplay(fontKey) {
    const { fonts } = await import("../js/fonts.js");
    const currentFontSpan = this.shadowRoot.querySelector(".current-font");
    if (currentFontSpan && fonts[fontKey]) {
      currentFontSpan.textContent = fonts[fontKey].name;
    }
  }

  updateActiveFont(fontKey) {
    const fontLinks = this.shadowRoot.querySelectorAll(".font-menu a");
    fontLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const selectedLink = this.shadowRoot.querySelector(`.font-menu a[data-font="${fontKey}"]`);
    if (selectedLink) {
      selectedLink.classList.add("active");
    }
  }
}

customElements.define("font-switcher", FontSwitcher);
