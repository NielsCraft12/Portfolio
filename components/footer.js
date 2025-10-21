class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const year = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
        <style>
        .footer {
  color: white;
  padding: 10px;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; /* Ensures horizontal centering */
  position: relative; /* Allows absolute positioning of the icon */
  font-family: "Baloo 2", cursive;
  font-weight: bold;
}

.mi-icon-link {
  position: absolute; /* Positions the icon absolutely within the footer */
  left: 10px; /* Adjusts the icon to the left side */
  cursor: pointer;
}

.footer p {
  font-size: 20px;
  margin: auto;
  padding: 0;
}

.mi-icon {
  color: var(--icon-default);
  transition: color 0.3s ease, fill 0.3s ease;
}

.mi-icon g {
  fill: currentColor;
  transition: fill 0.3s ease, color 0.3s ease;
}

.mi-icon path {
  transition: fill 0.3s ease;
}

.mi-icon-link.active .mi-icon {
  color: white;
}

.mi-icon-link.active .mi-icon g {
  fill: white;
}

.mi-icon-link.active .mi-icon path {
  fill: white;
}

        </style>
      <footer>
        <div class="footer">
          <a data-lang="mi" class="mi-icon-link" title="MI Logo">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
              viewBox="0 0 736.000000 736.000000" preserveAspectRatio="xMidYMid meet"
              class="mi-icon">
              <g transform="translate(0.000000,736.000000) scale(0.100000,-0.100000)"
                fill="currentColor" stroke="none">
                <path d="M3400 7350 c-913 -80 -1721 -460 -2350 -1106 -179 -184 -291 -323
          -425 -524 -166 -251 -266 -441 -369 -708 -111 -284 -177 -543 -222 -867 -25
          -182 -30 -638 -10 -832 80 -754 362 -1423 842 -1997 121 -145 371 -391 507
          -500 550 -439 1176 -703 1882 -793 198 -25 663 -25 860 0 587 76 1104 264
          1579 574 866 566 1453 1462 1620 2473 14 85 28 188 32 228 l7 72 -489 0 -489
          0 -1322 -1322 -1323 -1323 -1500 1500 -1500 1500 1503 1503 1502 1502 1365
          -1365 1365 -1365 -786 0 -786 0 -13 48 c-25 89 -90 225 -155 323 -395 594
          -1208 736 -1782 313 -321 -237 -503 -600 -503 -1002 0 -347 122 -643 365 -887
          316 -318 774 -437 1218 -319 112 30 270 104 374 176 89 61 232 198 290 278 89
          123 185 320 208 428 l7 32 -541 0 -541 0 0 190 0 190 1766 0 1767 0 -6 183
          c-12 429 -149 934 -377 1386 -310 617 -823 1164 -1420 1513 -445 261 -909 417
          -1440 483 -149 19 -562 27 -710 15z"/>
              </g>
            </svg>
          </a>

          <p class="copyright">© ${year} Niels de Laat</p>
        </div>
      </footer>
    `;

    const link = this.shadowRoot.querySelector('.mi-icon-link');

    // Check localStorage on page load
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'mi') {
      link.classList.add('active');
    }

    // Listen for translationUpdated event that's already dispatched by translations.js
    document.addEventListener('translationUpdated', (e) => {
      if (e.detail && e.detail.language) {
        const lang = e.detail.language;

        // Update active state based on language
        if (lang === 'mi') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });

    // Add click event listener
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Activate MI language
      link.classList.add('active');

      // Call updateContent if it exists globally
      if (typeof updateContent === 'function') {
        updateContent('mi');
      }
    });
  }
}

customElements.define('site-footer', SiteFooter);