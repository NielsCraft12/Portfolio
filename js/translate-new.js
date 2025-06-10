// Translation module - simplified and modular
import { translations } from './translations/index.js';

/**
 * Language configuration
 */
const LANGUAGE_CONFIG = {
    en: { name: "English", default: true },
    nl: { name: "Nederlands" },
    mi: { name: "Minionese" }
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

    // Remove active class from all language elements
    document.querySelectorAll("[data-lang]").forEach((el) =>
        el.classList.remove("active")
    );

    // Add active class to selected language element
    const selectedLangElement = document.querySelector(`[data-lang="${lang}"]`);
    if (selectedLangElement) {
        selectedLangElement.classList.add("active");
    }

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update current language display
    updateLanguageDisplay(lang);

    // Save preference and update age display
    localStorage.setItem("preferredLanguage", lang);

    // Call updateAgeDisplay if it exists (defined in main.js)
    if (typeof updateAgeDisplay === 'function') {
        updateAgeDisplay();
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

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    setupLanguageSwitcher();
    initTranslation();
});
