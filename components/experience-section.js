class ExperienceSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.experiences = [];
    this.currentIndex = 0;
  }

  connectedCallback() {
    // Get JSON from attribute
    try {
      const data = this.getAttribute("data-experiences");
      if (data) this.experiences = JSON.parse(data);
    } catch (e) {
      console.error("Invalid experiences JSON", e);
    }

    this.render();
    this.setupEventListeners();

    // Listen for language changes
    document.addEventListener("translationUpdated", (e) => {
      this.updateTranslations(e.detail.translations);
    });

    // Notify parent that component is ready
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("experience-ready", {
          detail: { count: this.experiences.length },
        })
      );
      // Initial translation update - simplified approach
      setTimeout(() => {
        // Try to load current language translations
        const currentLang = localStorage.getItem("preferredLanguage") || "en";
        this.loadAndUpdateTranslations(currentLang);
      }, 500);
    }, 100);
  }
  render() {
    // Build HTML for each experience
    const contentHTML = this.experiences
      .map((exp, index) => {
        const skillsHTML = exp.skills
          .map(
            (skill) => `
                <div class="badge">
                    <picture>
                        <source srcset="${skill.webp}" type="image/webp" />
                        <img src="${skill.png}" alt="${skill.name} Logo" loading="lazy" width="40" height="40" />
                    </picture>
                    ${skill.name}
                </div>
            `
          )
          .join("");

        return `
        <div class="content-section ${index === 0 ? "active" : ""}" data-index="${index}">
          <div class="header">
            <div class="title-container">
              <div class="title">${exp.title}</div>
                            <div class="badges">
                                ${exp.badges
                                  .map(
                                    (b) => `
                                    <div class="skill" data-i18n="experience.${b}">${b}</div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                        <div class="date">${exp.startDate} - <span ${/* if endDate is a present marker, allow translation key to replace it */ ""}${exp.endDate && typeof exp.endDate === "string" && exp.endDate.toLowerCase() === "present" ? 'data-i18n="experience.present"' : ""}>${exp.endDate || ""}</span></div>
          </div>

          <div class="content">
            <p data-i18n="${exp.i18nDescription || ""}">${exp.description}</p>
            <h2 style="text-align: left;font-size: 40px;margin: 0;" data-i18n="experience.skillsLearned">Skills Learned:</h2>
            <div class="skills">
              ${skillsHTML}
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    // Include the Experience.css styles in the shadow DOM
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/Experience.css">
      <div class="experience-content">
        ${contentHTML}
      </div>
    `;
  }

  setupEventListeners() {
    // Listen for navigation events from parent
    this.addEventListener("navigate-to", (e) => {
      this.navigateTo(e.detail.index);
    });
  }

  navigateTo(index) {
    if (index < 0 || index >= this.experiences.length) return;

    const sections = this.shadowRoot.querySelectorAll(".content-section");
    const previousIndex = this.currentIndex;
    this.currentIndex = index;

    sections.forEach((section, i) => {
      if (i === index) {
        // Remove any existing slide classes
        section.classList.remove("slide-left", "slide-right");
        // Add the appropriate slide class based on navigation direction
        section.classList.add(previousIndex > index ? "slide-right" : "slide-left");

        // Force a reflow to ensure the animation plays
        void section.offsetWidth;

        // Add active class and remove slide class
        section.classList.add("active");
        section.classList.remove("slide-left", "slide-right");
      } else {
        // Slide out in the opposite direction
        if (section.classList.contains("active")) {
          section.classList.add(previousIndex > index ? "slide-left" : "slide-right");
        }
        section.classList.remove("active");
      }
    });

    // Notify parent about the change
    this.dispatchEvent(
      new CustomEvent("experience-changed", {
        detail: {
          index: index,
          title: this.experiences[index]?.title || "",
        },
      })
    );
  }

  getCurrentTitle() {
    return this.experiences[this.currentIndex]?.title || "";
  }

  getExperienceCount() {
    return this.experiences.length;
  }

  updateTranslations(translations) {
    // Helper function to get nested translation
    function getNestedTranslation(obj, key) {
      return key.split(".").reduce((o, k) => o && o[k], obj);
    }

    // Update translations in shadow DOM
    if (translations) {
      const elements = this.shadowRoot.querySelectorAll("[data-i18n]");
      elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key) {
          const translation = getNestedTranslation(translations, key);
          if (translation && translation !== key) {
            element.innerHTML = translation;
          }
        }
      });
    }
  }

  async loadAndUpdateTranslations(lang) {
    try {
      // Dynamic import of translation file
      const module = await import(`../js/translations/${lang}.js`);
      const translations = module[lang];
      if (translations) {
        this.updateTranslations(translations);
      }
    } catch (error) {
      console.log("Translation loading failed, using defaults:", error);
    }
  }
}

customElements.define("experience-section", ExperienceSection);
