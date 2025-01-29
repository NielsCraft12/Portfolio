const translations = {
    en: {
        welcome: "Hello, I'm Niels de Laat,",
        description: "This is a sample paragraph.",
        buttonText: "Click Me"
    },
    nl: {
        welcome: "Hallo, ik ben Niels de Laat!",
        description: "Este es un párrafo de ejemplo.",
        buttonText: "Haz clic"
    }
};

function updateContent(lang) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translations[lang][key];
    });
    localStorage.setItem("preferredLanguage", lang);
}

document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    updateContent(savedLang);

    // Update language switcher event listeners
    const languageLinks = document.querySelectorAll('.language-menu a');
    const currentLangSpan = document.querySelector('.current-lang');

    languageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            currentLangSpan.textContent = this.textContent;
            updateContent(lang);
        });
    });
});