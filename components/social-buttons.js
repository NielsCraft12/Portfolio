class SocialButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        let buttons = [];
        try {
            const data = this.getAttribute("data-buttons");
            if (data) buttons = JSON.parse(data);
        } catch (e) {
            console.error("Invalid social button JSON", e);
        }

        // Build HTML
        const buttonsHTML = buttons
            .map((btn) => {
                const title = btn.title ? `title="${btn.title}"` : "";
                const rel = btn.rel ? `rel="${btn.rel}"` : 'rel="noreferrer"';
                const target = btn.target ? `target="${btn.target}"` : 'target="_blank"';

                // Add fallback text for when FontAwesome doesn't load
                let fallbackText = '';
                if (btn.icon.includes('fa-envelope')) fallbackText = '✉';
                else if (btn.icon.includes('fa-itch-io')) fallbackText = '🎮';
                else if (btn.icon.includes('fa-linkedin')) fallbackText = '💼';
                else if (btn.icon.includes('fa-github')) fallbackText = '⚡';
                else if (btn.icon.includes('fa-file')) fallbackText = '📄';

                return `
          <a href="${btn.url}"
             ${target}
             ${rel}
             class="${btn.icon} icon"
             ${title}>
             <span class="icon-fallback">${fallbackText}</span>
          </a>`;
            })
            .join("");

        this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/Contact.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
      <style>
        .icon-fallback {
          display: none;
        }
        .icon.fallback-mode .icon-fallback {
          display: inline;
        }
        .icon.fallback-mode:before {
          display: none;
        }
      </style>
      <div class="social-media-buttons">
        ${buttonsHTML}
      </div>
    `;

        // Check if FontAwesome loaded and add fallback if needed
        setTimeout(() => {
            const icons = this.shadowRoot.querySelectorAll('.icon');
            icons.forEach(icon => {
                const computedStyle = window.getComputedStyle(icon, ':before');
                const fontFamily = computedStyle.getPropertyValue('font-family');

                // If FontAwesome isn't detected, enable fallback mode
                if (!fontFamily.includes('Font Awesome')) {
                    icon.classList.add('fallback-mode');
                }
            });
        }, 100);
    }
}

customElements.define("social-buttons", SocialButtons);
