class TechChipList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        let chips = [];
        try {
            const data = this.getAttribute('data-chips');
            if (data) chips = JSON.parse(data);
        } catch (e) {
            console.error('Invalid chip JSON', e);
        }

        // Build HTML for each chip
        const chipsHTML = chips.map(chip => `
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
    `).join('');

        // Build final HTML
        this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/Home.css">
      <ul class="cd-demo-chip-list">
        ${chipsHTML}
      </ul>
    `;
    }
}

customElements.define('tech-chip-list', TechChipList);
