import { auth } from "../js/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logoWhite from "../img/logo-white.png";

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
      <a class="header__link" href="/compte/connexion">Connexion</a>
      <a class="header__link" href="/compte/inscription">Inscription</a>
    `;
  };

  renderAuthenticated = () => {
    this.innerHTML = `
      <a class="header__link" href="/compte">Mon compte</a>
      
      <button id="logout" class="link header__link" href="/logout">Déconnexion</button>
    `;
    // <a class="header__link" href="/preinscription?id=XQpD2WxV2jNytLHxn8AK">Préinscription</a>
    this.querySelector("#logout").addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "/";
    });
  };
}

class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    this.links = [];
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <a href="/">
          <img alt="Logo" class="header__logo" src="${logoWhite}" />
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

// https://firebasestorage.googleapis.com/v0/b/mythall-v7.appspot.com/o/logo-wht.png?alt=media&token=61ab1c66-542f-4d94-b722-32c4c2a073cc

customElements.define("header-authentication", HeaderAuthentication);
customElements.define("header-component", HeaderComponent);
