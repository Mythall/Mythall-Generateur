import { auth } from "../assets/js/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

class HeaderAuthentication extends HTMLElement {
  constructor() {
    super();
    onAuthStateChanged(auth, user => {
      if (user == null) {
        this.renderAnnonymous();
        return;
      }

      this.renderAuthenticated();
      console.log(`User connected - ${user.email}`);
    });
  }

  renderAnnonymous = () => {
    this.innerHTML = `
      <a class="header__link" href="/login">Connexion</a>
      <a class="header__link" href="/register">S'enregistrer</a>
    `;
  };

  renderAuthenticated = () => {
    this.innerHTML = `
      <button id="logout" class="link header__link" href="/logout">Se déconnecter</button>
    `;
    this.querySelector("#logout").addEventListener("click", async () => await signOut(auth));
  };
}

class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    this.links = [
      {
        name: "Accueil",
        href: "/"
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
            <header-authentication />
        </nav>        
      </header>
    `;
  }
}

customElements.define("header-authentication", HeaderAuthentication);
customElements.define("header-component", HeaderComponent);
