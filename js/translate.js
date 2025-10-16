// Translation module - optimized with lazy loading
// Remove global import to avoid loading all translations upfront

/**
 * Language configuration
 */
const LANGUAGE_CONFIG = {
  en: { name: "English", default: true },
  nl: { name: "Nederlands" },
  mi: { name: "Minionese" },
};

/**
 * Cache for loaded translations to avoid re-fetching
 */
const translationCache = new Map();

/**
 * Dynamically loads translation file for a specific language
 * @param {string} lang - Language code (en, nl, mi)
 * @returns {Promise<Object>} The translation object for the language
 */
async function loadTranslation(lang) {
  // Check if already cached
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }

  try {
    //  console.log(`Loading translation for language: ${lang}`);
    // Always use the regular (non-minified) version
    const filename = `${lang}.js`;
    const module = await import(`./translations/${filename}`);
    const translations = module[lang]; // Extract the named export

    // Cache the loaded translation
    translationCache.set(lang, translations);
    return translations;
  } catch (error) {
    console.error(`Failed to load translation for language '${lang}':`, error);
    // Fallback to English if available and not already trying English
    if (lang !== "en" && !translationCache.has("en")) {
      try {
        // Always use the regular (non-minified) version for fallback
        const fallbackFilename = "en.js";
        const fallbackModule = await import(`./translations/${fallbackFilename}`);
        const fallbackTranslations = fallbackModule.en;
        translationCache.set("en", fallbackTranslations);
        return fallbackTranslations;
      } catch (fallbackError) {
        console.error("Failed to load fallback English translation:", fallbackError);
        return {};
      }
    }
    return translationCache.get("en") || {};
  }
}

/**
 * Updates the content of elements with data-i18n attributes
 * @param {string} lang - Language code (en, nl, mi)
 */
async function updateContent(lang) {
  const translations = await loadTranslation(lang);

  if (!translations) {
    console.warn(`Translation for language '${lang}' not found or failed to load`);
    return;
  }

  //console.log(`Updating content to language: ${lang}`);
  let missingCount = 0;
  let successCount = 0;

  // Remove active class from all language elements
  document.querySelectorAll("[data-lang]").forEach((el) => el.classList.remove("active"));

  // Add active class to selected language element
  const selectedLangElement = document.querySelector(`[data-lang="${lang}"]`);
  if (selectedLangElement) {
    selectedLangElement.classList.add("active");
  }

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = getNestedTranslation(translations, key);
    if (value) {
      element.innerHTML = value;
      // Remove any previous missing translation styling
      element.classList.remove("missing-translation");
      element.removeAttribute("data-missing-key");
      successCount++;
    } else {
      // Handle missing translation
      handleMissingTranslation(element, key, lang);
      missingCount++;
    }
  });

  // Update all elements with translatable titles
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    const value = getNestedTranslation(translations, key);
    if (value) {
      element.title = value;
      successCount++;
    } else {
      // Fallback to English if available and not already using English
      if (lang !== "en") {
        const fallbackTranslations = translationCache.get("en");
        if (fallbackTranslations) {
          const fallbackValue = getNestedTranslation(fallbackTranslations, key);
          if (fallbackValue) {
            element.title = fallbackValue;
          }
        }
      }
      missingCount++;
    }
  });

  //console.log(`Translation update complete: ${successCount} successful, ${missingCount} missing`);

  // Update current language display
  updateLanguageDisplay(lang);
  // Update CSS custom properties for translated content
  await updateCSSTranslations(lang);

  // Update CV link
  await updateCVLink(lang);

  // Save preference and update age display
  localStorage.setItem("preferredLanguage", lang);

  // Call updateAgeDisplay if it exists (defined in main.js)
  if (typeof updateAgeDisplay === "function") {
    updateAgeDisplay();
  }
}

function getNestedTranslation(obj, key) {
  return key.split(".").reduce((o, k) => o && o[k], obj);
}

/**
 * Handles missing translations by providing visual feedback
 * @param {HTMLElement} element - The element with missing translation
 * @param {string} key - The translation key that's missing
 * @param {string} lang - The current language
 */
async function handleMissingTranslation(element, key, lang) {
  console.warn(`Missing translation: "${key}" for language "${lang}"`);

  // Add visual styling to indicate missing translation
  element.classList.add("missing-translation");
  element.setAttribute("data-missing-key", key);

  // Show the missing key in development mode (you can toggle this)
  const showMissingKeys = localStorage.getItem("showMissingTranslations") === "true";

  if (showMissingKeys) {
    element.innerHTML = `[MISSING: ${key}]`;
  } else {
    // Fallback to English if available, otherwise show a generic message
    if (lang !== "en") {
      const fallbackTranslations = await loadTranslation("en");
      const fallbackValue = getNestedTranslation(fallbackTranslations, key);
      if (fallbackValue) {
        element.innerHTML = fallbackValue;
        element.setAttribute("title", `Missing translation for "${lang}" - showing English fallback`);
      } else {
        element.innerHTML = `[Translation missing]`;
        element.setAttribute("title", `Missing translation key: ${key}`);
      }
    } else {
      element.innerHTML = `[Translation missing]`;
      element.setAttribute("title", `Missing translation key: ${key}`);
    }
  }
}

/**
 * Updates the CV link and title based on the current language
 * @param {string} lang - Language code
 */
async function updateCVLink(lang) {
  const cvLink = document.querySelector("[data-cv-link]");
  if (!cvLink) return;

  const translations = await loadTranslation(lang);
  if (!translations || !translations.cv) return;

  // Update the href attribute
  cvLink.href = translations.cv.filePath;

  // Update the title attribute
  cvLink.title = translations.cv.title;
}

/**
 * Updates CSS custom properties for translated content
 * @param {string} lang - Language code
 */
async function updateCSSTranslations(lang) {
  const translations = await loadTranslation(lang);
  if (!translations) return;

  // Update spoiler tooltip text
  const spoilerTooltip = getNestedTranslation(translations, "projectPages.portfolio.easterEggs.spoilerTooltip");
  if (spoilerTooltip) {
    document.documentElement.style.setProperty("--spoiler-tooltip-text", `"${spoilerTooltip}"`);
  }
}

/**
 * Updates the current language display in the UI
 * @param {string} lang - Language code
 */
function updateLanguageDisplay(lang) {
  const currentLangSpan = document.querySelector(".current-lang");
  if (currentLangSpan && LANGUAGE_CONFIG[lang]) {
    currentLangSpan.textContent = LANGUAGE_CONFIG[lang].name;
  }
}

/**
 * Initializes the translation system
 */
function initTranslation() {
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  updateContent(savedLang);
}

/**
 * Sets up event listeners for language switching
 */
function setupLanguageSwitcher() {
  const languageLinks = document.querySelectorAll(".language-menu a, footer a[data-lang]");

  languageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent the click from bubbling up

      const lang = this.getAttribute("data-lang");
      if (lang) {
        // Close the dropdown immediately
        const languageSwitcher = this.closest(".language-switcher");
        if (languageSwitcher) {
          languageSwitcher.classList.remove("active");
          // console.log("Language selected, dropdown closed");
        }

        // Update content after a brief delay to ensure dropdown is closed
        setTimeout(() => {
          updateContent(lang);
        }, 10);
      }
    });
  });

  // Add click handler for the language button to toggle dropdown on mobile
  const languageBtn = document.querySelector(".language-btn");
  const languageSwitcher = document.querySelector(".language-switcher");

  // console.log("Language button found:", languageBtn);

  if (languageBtn && languageSwitcher) {
    let outsideClickHandler = null;

    // Toggle dropdown when clicking the button
    languageBtn.addEventListener("click", function (e) {
      // console.log("Language button clicked!");
      e.preventDefault();
      e.stopPropagation();

      const isCurrentlyActive = languageSwitcher.classList.contains("active");
      // console.log("Currently active:", isCurrentlyActive);

      // Toggle the active state
      if (isCurrentlyActive) {
        languageSwitcher.classList.remove("active");
        // console.log("Dropdown closed by button click");

        // Remove the outside click handler when closing
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
          outsideClickHandler = null;
        }
      } else {
        languageSwitcher.classList.add("active");
        // console.log("Dropdown opened by button click");

        // Remove any existing handler before adding a new one
        if (outsideClickHandler) {
          document.removeEventListener("click", outsideClickHandler);
        }

        // Use setTimeout to ensure this runs after the current click event completes
        setTimeout(() => {
          outsideClickHandler = function (e) {
            // Only close if clicking outside the language switcher
            if (!languageSwitcher.contains(e.target)) {
              // console.log("Clicked outside, closing dropdown");
              languageSwitcher.classList.remove("active");
              document.removeEventListener("click", outsideClickHandler);
              outsideClickHandler = null;
            }
          };

          document.addEventListener("click", outsideClickHandler);
        }, 10);
      }

      // console.log("After toggle, active:", languageSwitcher.classList.contains("active"));
    });
  } else {
    console.warn("Language button or switcher not found!");
  }
}

// Make functions globally available
window.initTranslation = initTranslation;
window.updateContent = updateContent;

// Debug utilities for missing translations
window.toggleMissingTranslationDisplay = function () {
  const currentState = localStorage.getItem("showMissingTranslations") === "true";
  localStorage.setItem("showMissingTranslations", !currentState);
  //console.log(`Missing translation display ${!currentState ? "enabled" : "disabled"}`);
  // Re-run translation to apply the change
  const currentLang = localStorage.getItem("preferredLanguage") || "en";
  updateContent(currentLang);
};

window.findMissingTranslations = async function (lang = "all") {
  const missing = [];
  const languages = lang === "all" ? Object.keys(LANGUAGE_CONFIG) : [lang];

  for (const language of languages) {
    const translations = await loadTranslation(language);
    if (!translations) {
      console.warn(`Language '${language}' not found`);
      continue;
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = getNestedTranslation(translations, key);
      if (!value) {
        missing.push({ language, key, element: element.tagName });
      }
    });
  }

  console.table(missing);
  return missing;
};

// Auto-initialize when DOM is ready OR when module is imported
let isInitialized = false;

function initializeTranslationSystem() {
  if (isInitialized) {
    console.log("Translation system already initialized, skipping...");
    return;
  }

  // console.log("Initializing translation system...");
  isInitialized = true;
  setupLanguageSwitcher();
  initTranslation();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  // DOM still loading, wait for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", initializeTranslationSystem);
} else {
  // DOM already loaded, initialize immediately
  initializeTranslationSystem();
}
