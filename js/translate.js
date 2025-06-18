// Translation module - simplified and modular
import { translations } from "./translations/index.js";

/**
 * Language configuration
 */
const LANGUAGE_CONFIG = {
  en: { name: "English", default: true },
  nl: { name: "Nederlands" },
  mi: { name: "Minionese" },
};

/**
 * Updates the content of elements with data-i18n attributes
 * @param {string} lang - Language code (en, nl, mi)
 */
function updateContent(lang) {
  if (!translations[lang]) {
    console.warn(`Translation for language '${lang}' not found`);
    return;
  }

  console.log(`Updating content to language: ${lang}`);
  let missingCount = 0;
  let successCount = 0;

  // Remove active class from all language elements
  document.querySelectorAll("[data-lang]").forEach((el) => el.classList.remove("active"));

  // Add active class to selected language element
  const selectedLangElement = document.querySelector(`[data-lang="${lang}"]`);
  if (selectedLangElement) {
    selectedLangElement.classList.add("active");
  } // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = getNestedTranslation(translations[lang], key);
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
    const value = getNestedTranslation(translations[lang], key);
    if (value) {
      element.title = value;
      successCount++;
    } else {
      // Fallback to English if available
      const fallbackValue = getNestedTranslation(translations.en, key);
      if (fallbackValue && lang !== "en") {
        element.title = fallbackValue;
      }
      missingCount++;
    }
  });
  console.log(`Translation update complete: ${successCount} successful, ${missingCount} missing`);

  // Update current language display
  updateLanguageDisplay(lang);
  // Update CSS custom properties for translated content
  updateCSSTranslations(lang);

  // Update CV link
  updateCVLink(lang);

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
function handleMissingTranslation(element, key, lang) {
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
    const fallbackValue = getNestedTranslation(translations.en, key);
    if (fallbackValue && lang !== "en") {
      element.innerHTML = fallbackValue;
      element.setAttribute("title", `Missing translation for "${lang}" - showing English fallback`);
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
function updateCVLink(lang) {
  const cvLink = document.querySelector("[data-cv-link]");
  if (!cvLink || !translations[lang] || !translations[lang].cv) return;

  // Update the href attribute
  cvLink.href = translations[lang].cv.filePath;

  // Update the title attribute
  cvLink.title = translations[lang].cv.title;
}

/**
 * Updates CSS custom properties for translated content
 * @param {string} lang - Language code
 */
function updateCSSTranslations(lang) {
  if (!translations[lang]) return;

  // Update spoiler tooltip text
  const spoilerTooltip = getNestedTranslation(translations[lang], "projectPages.portfolio.easterEggs.spoilerTooltip");
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
      const lang = this.getAttribute("data-lang");
      if (lang) {
        updateContent(lang);
      }
    });
  });
}

// Make functions globally available
window.initTranslation = initTranslation;
window.updateContent = updateContent;

// Debug utilities for missing translations
window.toggleMissingTranslationDisplay = function () {
  const currentState = localStorage.getItem("showMissingTranslations") === "true";
  localStorage.setItem("showMissingTranslations", !currentState);
  console.log(`Missing translation display ${!currentState ? "enabled" : "disabled"}`);
  // Re-run translation to apply the change
  const currentLang = localStorage.getItem("preferredLanguage") || "en";
  updateContent(currentLang);
};

window.findMissingTranslations = function (lang = "all") {
  const missing = [];
  const languages = lang === "all" ? Object.keys(translations) : [lang];

  languages.forEach((language) => {
    if (!translations[language]) {
      console.warn(`Language '${language}' not found`);
      return;
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = getNestedTranslation(translations[language], key);
      if (!value) {
        missing.push({ language, key, element: element.tagName });
      }
    });
  });

  console.table(missing);
  return missing;
};

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setupLanguageSwitcher();
  initTranslation();
});
