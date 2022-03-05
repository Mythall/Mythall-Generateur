class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.copyright = `Mythall ${new Date().getFullYear()} © Tous droits réservées`;
  }

  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer__copyright">${this.copyright}</div>
      </footer>
    `;
  }
}

customElements.define("footer-component", FooterComponent);
