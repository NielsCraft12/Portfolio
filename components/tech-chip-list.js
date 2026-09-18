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

    // A shadow-root <link> resolves asynchronously, so the chips used to paint
    // once at their intrinsic 100x100 and then collapse to ~22px when Home.css
    // landed -- a ~250px jump in the Home column, and most of the page's CLS.
    // These four rules are duplicated inline so the first paint is already
    // correct; Home.css still loads after and stays authoritative.
    const cssPath = window.location.pathname.includes("/projects/") ? "../css/Home.css" : "css/Home.css";
    this.shadowRoot.innerHTML = `
      <style>
        .cd-demo-chip-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .chip {
          border: 0;
          color: inherit;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          border-radius: 50em;
          padding: 0.25rem;
          background-color: var(--chip-bg);
          font-size: 0.9375rem;
        }
        .chip__label {
          padding: 0 0.5rem;
          color: var(--chip-text);
        }
        .chip__img {
          display: block;
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          object-fit: cover;
        }
      </style>
      <link rel="stylesheet" href="${cssPath}">
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
