class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        // Determine the correct path based on current location
        const isInSubfolder = window.location.pathname.includes('/projects/');
        const cssPath = isInSubfolder ? '../css/Home.css' : 'css/Home.css';
        const logoPath = isInSubfolder ? '../images/Favicon/favicon.svg' : 'images/Favicon/favicon.svg';

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${cssPath}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <nav aria-label="Main navigation">
    <div class="nav-brand">
      <a href="../#Home" class="nav-logo">
        <img src="${logoPath}" alt="Logo" />
      </a>
      <a href="../#Home" class="nav-title">Niels de Laat</a>
    </div>
    <input type="checkbox" id="sidebar-active" aria-label="Toggle navigation menu" />
    <label for="sidebar-active" class="open-sidebar-button" aria-label="Open navigation menu">
      <div class="hamburger-icon">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
      </div>
    </label>
    <label id="overlay" for="sidebar-active" aria-label="Close navigation overlay"></label>
    <div class="links-container">
      <label for="sidebar-active" class="close-sidebar-button" aria-label="Close navigation menu">
        <div class="hamburger-icon">
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar3"></span>
        </div>
      </label>
      <a data-i18n="nav.projects" href="../#Projects">Projects</a>
      <a data-i18n="nav.experience" href="../#Experience">Experience</a>
      <a data-i18n="nav.contact" href="../#Contact">Contact</a>
      <div class="language-switcher">
        <button type="button" class="language-btn">
          <span class="current-lang">English</span>
          <i class="fa fa-caret-down"></i>
        </button>
        <ul class="language-menu">
          <li><a href="#" data-lang="en" style="margin: auto; text-align: center;">English</a></li>
          <li><a href="#" data-lang="nl" style="margin: auto; text-align: center;">Nederlands</a></li>
        </ul>
      </div>
    </div>
  </nav>

    <!-- Preload the default language file to reduce waterfall -->
  <link rel="modulepreload" href="js/translations/en.js">

  <!-- Critical scripts loaded for immediate execution -->
  <script type="module" src="js/translate.js"></script>
    <script src="js/main.js"></script>
 `;

        // Initialize dropdown functionality after DOM is set
        this.initializeDropdown();

        // Initialize mobile navigation functionality
        this.initializeMobileNavigation();

        // Set initial active language based on saved preference
        const savedLang = localStorage.getItem("preferredLanguage") || "en";
        this.updateActiveLanguage(savedLang);
        this.updateCurrentLanguageDisplay(savedLang);
    }

    initializeMobileNavigation() {
        // Get all navigation links (excluding language menu links)
        const navigationLinks = this.shadowRoot.querySelectorAll('.links-container > a');
        const sidebarCheckbox = this.shadowRoot.querySelector('#sidebar-active');

        // Add click event listeners to close mobile menu when navigation links are clicked
        navigationLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close the mobile menu by unchecking the sidebar checkbox
                if (sidebarCheckbox) {
                    sidebarCheckbox.checked = false;
                }
            });
        });

        // Also close menu when clicking the overlay
        const overlay = this.shadowRoot.querySelector('#overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                if (sidebarCheckbox) {
                    sidebarCheckbox.checked = false;
                }
            });
        }
    }

    initializeDropdown() {
        const languageBtn = this.shadowRoot.querySelector(".language-btn");
        const languageSwitcher = this.shadowRoot.querySelector(".language-switcher");

        if (languageBtn && languageSwitcher) {
            let outsideClickHandler = null;

            // Toggle dropdown when clicking the button
            languageBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const isCurrentlyActive = languageSwitcher.classList.contains("active");

                // Toggle the active state
                if (isCurrentlyActive) {
                    languageSwitcher.classList.remove("active");

                    // Remove the outside click handler when closing
                    if (outsideClickHandler) {
                        document.removeEventListener("click", outsideClickHandler);
                        outsideClickHandler = null;
                    }
                } else {
                    languageSwitcher.classList.add("active");

                    // Remove any existing handler before adding a new one
                    if (outsideClickHandler) {
                        document.removeEventListener("click", outsideClickHandler);
                    }

                    // Use setTimeout to ensure this runs after the current click event completes
                    setTimeout(() => {
                        outsideClickHandler = (e) => {
                            // Only close if clicking outside the language switcher
                            if (!languageSwitcher.contains(e.target)) {
                                languageSwitcher.classList.remove("active");
                                document.removeEventListener("click", outsideClickHandler);
                                outsideClickHandler = null;
                            }
                        };

                        document.addEventListener("click", outsideClickHandler);
                    }, 10);
                }
            });

            // Handle language selection
            const languageLinks = this.shadowRoot.querySelectorAll(".language-menu a");
            languageLinks.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const selectedLang = e.target.getAttribute("data-lang");

                    // Close the dropdown immediately
                    languageSwitcher.classList.remove("active");

                    // Remove outside click handler
                    if (outsideClickHandler) {
                        document.removeEventListener("click", outsideClickHandler);
                        outsideClickHandler = null;
                    }

                    // Update current language display
                    this.updateCurrentLanguageDisplay(selectedLang);

                    // Update active language immediately
                    this.updateActiveLanguage(selectedLang);

                    // Trigger translation update via custom event
                    const translationEvent = new CustomEvent('languageChanged', {
                        detail: { language: selectedLang },
                        bubbles: true
                    });
                    this.dispatchEvent(translationEvent);
                });
            });
        }

        // Listen for translation updates from the main document
        document.addEventListener('translationUpdated', (e) => {
            this.updateTranslations(e.detail.language, e.detail.translations);
        });
    }

    updateCurrentLanguageDisplay(lang) {
        const currentLangSpan = this.shadowRoot.querySelector(".current-lang");
        if (currentLangSpan) {
            if (lang === "en") {
                currentLangSpan.textContent = "English";
            } else if (lang === "nl") {
                currentLangSpan.textContent = "Nederlands";
            } else if (lang === "mi") {
                currentLangSpan.textContent = "Minionese";
            }
        }
    }

    updateTranslations(language, translations) {
        // Update navigation links with translations
        const elements = this.shadowRoot.querySelectorAll("[data-i18n]");
        elements.forEach(element => {
            const key = element.getAttribute("data-i18n");
            const translation = this.getNestedValue(translations, key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update current language display
        this.updateCurrentLanguageDisplay(language);

        // Update active class for language menu items
        this.updateActiveLanguage(language);
    }

    updateActiveLanguage(language) {
        // Remove active class from all language menu items
        const languageLinks = this.shadowRoot.querySelectorAll(".language-menu a");
        languageLinks.forEach(link => {
            link.classList.remove("active");
        });

        // Add active class to the selected language
        const selectedLanguageLink = this.shadowRoot.querySelector(`.language-menu a[data-lang="${language}"]`);
        if (selectedLanguageLink) {
            selectedLanguageLink.classList.add("active");
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }
}

customElements.define('nav-bar', NavBar);