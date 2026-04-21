class TechChipList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let chips = [];
    try {
      const data = this.getAttribute("data-chips");
      if (data) chips = JSON.parse(data);
    } catch (e) {
      console.error("Invalid chip JSON", e);
    }

    // Build HTML for each chip
    const chipsHTML = chips
      .map(
        (chip) => `
      <li>
        <span class="chip">
          <picture>
            <source srcset="${chip.webp}" type="image/webp" />
            <img class="chip__img"
                 src="${chip.png}"
                 alt="${chip.name} Logo"
                 loading="lazy"
                 width="100"
                 height="100" />
          </picture>
          <i class="chip__label">${chip.name}</i>
        </span>
      </li>
    `
      )
      .join("");

    // Build final HTML
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/Home.css">
      <ul class="cd-demo-chip-list">
        ${chipsHTML}
      </ul>
    `;

    // Listen for theme changes to adjust font size for Micro 5
    window.addEventListener("themeChanged", (event) => {
      this.checkMicro5Font();
    });

    // Check if Micro 5 font is currently active
    this.checkMicro5Font();
  }

  checkMicro5Font() {
    const bodyFontFamily = document.body.style.fontFamily;
    const isMicro5 = bodyFontFamily && bodyFontFamily.includes("Micro 5");

    if (isMicro5) {
      this.style.setProperty("font-size", "1em", "important");

      const styleElement = this.shadowRoot.querySelector("#micro5-style");
      if (!styleElement) {
        const newStyle = document.createElement("style");
        newStyle.id = "micro5-style";
        newStyle.textContent = `
                    .cd-demo-chip-list * {
                        font-size: 0.8em !important;
                    }
                    .chip__img {
                        width: 75% !important;
                        height: 75% !important;
                    }
                    .chip__label {
                        font-size: 1em !important;
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
}

customElements.define("tech-chip-list", TechChipList);
