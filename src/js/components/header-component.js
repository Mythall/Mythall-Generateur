class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    this.links = [
      {
        name: "Accueil",
        href: "/"
      },
      {
        name: "Connexion",
        href: "/login"
      },
      {
        name: "S'enregistrer",
        href: "/register"
      }
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <a href="/">
          <img alt="Logo" class="header__logo" src="https://firebasestorage.googleapis.com/v0/b/mythall-v7.appspot.com/o/logo-wht.png?alt=media&token=61ab1c66-542f-4d94-b722-32c4c2a073cc" />
        </a>
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
