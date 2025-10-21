class SocialButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log('ConnectedCallback this context:', this); // Debugging: Log the `this` context

    let buttons = [];
    try {
      const data = this.getAttribute("data-buttons");
      if (data) {
        buttons = JSON.parse(data);
        console.log("Parsed buttons data:", buttons); // Debugging: Log parsed buttons
      }
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

    console.log("Generated buttons HTML:", buttonsHTML); // Debugging: Log generated HTML

    // Determine the correct CSS path based on current location
    const cssPath = window.location.pathname.includes('/projects/') ? '../css/Contact.css' : 'css/Contact.css';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
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
        
        /* Fallback styles */
        .icon-fallback {
          display: none;
        }
        .icon.fallback-mode .icon-fallback {
          display: inline;
        }
        .icon.fallback-mode:before {
          display: none;
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
