// Accessible names for icon-only links, keyed by the FontAwesome glyph name.
const ICON_LABELS = {
  "fa-envelope": "Email me",
  "fa-itch-io": "itch.io profile",
  "fa-linkedin": "LinkedIn profile",
  "fa-github": "GitHub profile",
  "fa-file-alt": "Download my CV",
  "fa-gamepad": "Games profile",
  "fa-desktop": "Desktop version",
  "fa-mobile-alt": "Mobile version",
};

class SocialButtons extends HTMLElement {
  static labelForIcon(icon) {
    if (!icon) return "";
    const token = icon.split(/\s+/).find((c) => ICON_LABELS[c]);
    return token ? ICON_LABELS[token] : "";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let buttons = [];
    try {
      const data = this.getAttribute("data-buttons");
      if (data) {
        buttons = JSON.parse(data);
      }
    } catch (e) {
      console.error("Invalid social button JSON", e);
    }

    // Build HTML
    const buttonsHTML = buttons
      .map((btn) => {
        const rel = btn.rel ? `rel="${btn.rel}"` : 'rel="noreferrer"';
        const target = btn.target ? `target="${btn.target}"` : 'target="_blank"';

        // The glyph is decorative (aria-hidden), so without this the anchor reaches
        // the accessibility tree as a nameless link. Callers may pass `label`; the
        // icon name is the fallback so pages that only supply an icon still get one.
        const label = btn.label || btn.title || SocialButtons.labelForIcon(btn.icon) || "Link";
        const title = btn.title ? `title="${btn.title}"` : "";

        // If the button is marked as the CV entry (isCv: true) add a data attribute so
        // the translation system or this component can update it when the language changes.
        const cvAttr = btn.isCv || btn.isCV || btn.dataCv ? "data-cv-link" : "";

        return `
       <a href="${btn.url}"
         ${target}
         ${rel}
         class="${btn.icon} icon"
         ${cvAttr}
         aria-label="${label.replace(/"/g, "&quot;")}"
         ${title}>
         <i class="${btn.icon}" aria-hidden="true"></i>
       </a>`;
      })
      .join("");

    // Determine the correct CSS path based on current location
    const cssPath = window.location.pathname.includes("/projects/") ? "../css/Contact.css" : "css/Contact.css";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      <style>
        /* Core social button styles (from Contact.css) */
        .social-media-buttons {
          font-size: 30px;
          gap: 20px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon {
          padding: 20px;
          width: 70px;
          height: 70px;
          text-align: center;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        
        .icon:hover {
          opacity: 0.7;
        }
        
        .fa-github {
          border-radius: 20px;
          background: #551a8b;
          color: white;
        }
        
        .fa-linkedin {
          border-radius: 20px;
          background: #007bb5;
          color: white;
        }
        
        .fa-itch-io {
          border-radius: 20px;
          background: #dd4a4a;
          color: white;
        }
        
        .fa-gamepad {
          border-radius: 20px;
          background: #dd4a4a;
          color: white;
        }
        
        .fa-file-text-o {
          border-radius: 20px;
          background: #55acee;
          color: white;
        }
        
        .fa-envelope {
          border-radius: 20px;
          background: #55acee;
          color: white;
        }
        
        .icon .svg-icon {
          width: 1em;
          height: 1em;
          display: block;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .social-media-buttons {
            margin-bottom: 20px;
            gap: 15px;
            font-size: 25px;
            flex-wrap: wrap;
          }
          
          .icon {
            width: 60px;
            height: 60px;
            padding: 15px;
          }
        }
      </style>
      <div class="social-media-buttons">
        ${buttonsHTML}
      </div>
    `;

    // Shadow DOM is invisible to the document-level icon observer.
    if (window.SiteIcons) window.SiteIcons.observe(this.shadowRoot);

    // Listen for translation updates so we can update the CV link inside the shadow DOM.
    // The translation system dispatches a `translationUpdated` event with detail.translations.
    this._translationHandler = (e) => {
      try {
        const translations = e && e.detail && e.detail.translations;
        if (!translations || !translations.cv) return;
        const cv = translations.cv;
        const cvAnchor = this.shadowRoot.querySelector("[data-cv-link]");
        if (cvAnchor) {
          if (cv.filePath) cvAnchor.href = cv.filePath;
          if (cv.title) {
            cvAnchor.title = cv.title;
            cvAnchor.setAttribute("aria-label", cv.title);
          }
        }
      } catch (err) {
        /* the CV link simply keeps its previous href */
      }
    };

    document.addEventListener("translationUpdated", this._translationHandler);
  }

  disconnectedCallback() {
    if (this._translationHandler) {
      document.removeEventListener("translationUpdated", this._translationHandler);
      this._translationHandler = null;
    }
  }
}

customElements.define("social-buttons", SocialButtons);
