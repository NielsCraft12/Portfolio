class CodeBlock extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href") || "#";
    const language = this.getAttribute("language") || "csharp";
    const code = this.getAttribute("code") || "";
    const buttonText = this.getAttribute("button-text") || "View on GitHub";
    const buttonI18n = this.getAttribute("button-i18n") || "projectPages.viewOnGitHub";
    const buttonTitle = this.getAttribute("button-title") || "View on GitHub";

    this.innerHTML = `
      <div class="code-block" style="position: relative !important;">
        <a data-i18n="${buttonI18n}"
          href="${href}"
          class="github-inline" target="_blank" title="${buttonTitle}"
          style="position: absolute !important;
                 top: 8px !important;
                 right: 8px !important;
                 left: auto !important;
                 bottom: auto !important;
                 z-index: 9999 !important;
                 background: #000 !important;
                 color: #fff !important;
                 padding: 0.3em 0.7em !important;
                 border-radius: 4px !important;
                 text-decoration: none !important;
                 display: inline-flex !important;
                 align-items: center !important;
                 gap: 0.4em !important;
                 font-size: 0.75em !important;
                 font-family: monospace !important;">
          <i class="fab fa-github"></i>
          ${buttonText}
        </a>
        <pre><code class="language-${language}">
${code}
        </code></pre>
      </div>
    `;
  }
}

customElements.define("code-block", CodeBlock);
