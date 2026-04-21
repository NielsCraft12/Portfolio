class ProjectItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.translations = {};
  }

  connectedCallback() {
    const link = this.getAttribute("link");
    const title = this.getAttribute("title");
    const year = this.getAttribute("year");
    const category = this.getAttribute("category");
    const imageWebp = this.getAttribute("image-webp");
    const imagePng = this.getAttribute("image-png");
    const description = this.getAttribute("description");
    const i18nDescription = this.getAttribute("i18n-description");
    const i18nTechnologies = this.getAttribute("i18n-technologies");
    const i18nSeeMore = this.getAttribute("i18n-see-more");

    // Parse the technologies JSON
    let technologies = [];
    try {
      const techAttr = this.getAttribute("technologies");
      if (techAttr) technologies = JSON.parse(techAttr);
    } catch (e) {
      console.error("Invalid technologies JSON:", e);
    }

    const techListHTML = technologies
      .map(
        (tech) => `
      <li>
        <span class="chip">
          <picture>
            <source srcset="${tech.webp}" type="image/webp" />
            <img class="chip__img" src="${tech.png}" alt="${tech.name} Logo" />
          </picture>
          <i class="chip__label">${tech.name}</i>
        </span>
      </li>
    `
      )
      .join("");

    this.shadowRoot.innerHTML = `
        <style>
      .cd-demo-chip-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* make sure it's left-aligned */
  gap: 0.4rem;
  list-style: none;
  margin: 0; /* remove top/bottom spacing */
  padding: 0; /* remove left indent */
}
      </style>
      <link rel="stylesheet" href="css/Projects.css">
      <link rel="stylesheet" href="css/Home.css">
      <link rel="stylesheet" href="css/style.css">
      
      <a href="${link}" class="blog-box project-item" data-category="${category}" data-year="${year}"
        aria-label="${title} project details">
        <div class="blog-img">
          <picture>
            <source srcset="${imageWebp}" type="image/webp" />
            <img alt="${title} game screenshot" src="${imagePng}" loading="lazy" width="800" height="450" />
          </picture>
        </div>
        <div class="blog-text">
          <span class="blog-year">${year}</span>
          <span class="blog-title">${title}</span>
          <p data-i18n="${i18nDescription}">${description}</p>
          <p data-i18n="${i18nTechnologies}" class="technologies">Technologies:</p>
          <ul class="cd-demo-chip-list" style="justify-content: left">
            ${techListHTML}
          </ul>
          <span data-i18n="${i18nSeeMore}" class="blog-readmore">See More</span>
        </div>
      </a>
    `;

    // Listen for translation updates
    document.addEventListener("translationUpdated", (event) => {
      this.updateTranslations(event.detail.translations);
    });

    // Listen for theme changes to adjust font size for Micro 5
    window.addEventListener("themeChanged", (event) => {
      this.checkMicro5Font();
    });

    // Initialize with current language if available
    const currentLang = localStorage.getItem("preferredLanguage") || "en";
    this.loadInitialTranslations(currentLang);

    // Check if Micro 5 font is currently active
    this.checkMicro5Font();
  }

  checkMicro5Font() {
    const bodyFontFamily = document.body.style.fontFamily;
    const isMicro5 = bodyFontFamily && bodyFontFamily.includes("Micro 5");

    // Adjust this value to change the size:
    // "1em" = normal, "1.5em" = 50% larger, "2em" = double size, etc.
    if (isMicro5) {
      // Apply to both the host element and add a style tag inside shadow DOM
      this.style.setProperty("font-size", "1em", "important");

      // Also add inline styles to shadow DOM elements
      const styleElement = this.shadowRoot.querySelector("#micro5-style");
      if (!styleElement) {
        const newStyle = document.createElement("style");
        newStyle.id = "micro5-style";
        newStyle.textContent = `
          .blog-text * {
            font-size: .7em !important;
          }
          .blog-title {
            font-size: 1em !important;
          }
          .chip__label {
            font-size: 2.3em !important;
          }
          .chip__img {
            width: 23px !important;
            height: 23px !important;
          }
        `;
        this.shadowRoot.appendChild(newStyle);
      }
    } else {
      this.style.fontSize = "";
      const styleElement = this.shadowRoot.querySelector("#micro5-style");
      if (styleElement) {
        styleElement.remove();
      }
    }
  }

  async loadInitialTranslations(lang) {
    try {
      const module = await import(`../js/translations/${lang}.js`);
      const translations = module[lang];
      if (translations) {
        this.updateTranslations(translations);
      }
    } catch (error) {
      console.error("Failed to load initial translations:", error);
    }
  }

  updateTranslations(translations) {
    this.translations = translations;

    // Update all elements with data-i18n attributes within shadow DOM
    const translatableElements = this.shadowRoot.querySelectorAll("[data-i18n]");
    translatableElements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = this.getNestedTranslation(translations, key);
      if (value) {
        element.innerHTML = value;
      }
    });
  }

  getNestedTranslation(translations, key) {
    return key.split(".").reduce((obj, k) => obj && obj[k], translations);
  }
}

customElements.define("project-item", ProjectItem);
