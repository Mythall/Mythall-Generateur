class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.links = [
      {
        name: "Accueil",
        href: "/"
      },
      {
        name: "Contact",
        href: "/contact"
      }
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <nav class="header__links">
          ${this.links
            .map(link => {
              return `<a class="header__link" href="${link.href}">${link.name}</a>`;
            })
            .join("")}
        </nav>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
