import { auth } from "../js/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getSetting } from "../../@mythall/settings";
import logoWhite from "../img/logo-white.png";

class HeaderAuthentication extends HTMLElement {
  constructor() {
    super();

    this.bible = `<a class="header__link" href="https://www.dropbox.com/s/xiq6apwh94ctojh/6-Bible%20de%20Mythall%20V3.5.pdf?dl=0" target="_blank">Bible</a>`;
    this.login = `<a class="header__link" href="/compte/connexion">Connexion</a>`;
    this.register = `<a class="header__link" href="/compte/inscription">Inscription</a>`;
    this.logout = `<button id="logout" class="link header__link" href="/logout">Déconnexion</button>`;
    this.account = `<a class="header__link" href="/compte">Mon compte</a>`;
    this.preinscription;
  }

  async connectedCallback() {
    const activePreinscription = await getSetting("activePreinscription");
    if (activePreinscription && activePreinscription.value !== "") {
      this.preinscription = `<a class="header__link" href="/preinscription?id=${activePreinscription.value}">Préinscription</a>`;
    }

    onAuthStateChanged(auth, user => {
      if (user == null) {
        this.renderAnnonymous();
        return;
      }

      this.renderAuthenticated();
      console.log(`User connected - ${user.email}`);
    });
  }

  renderAnnonymous = async () => {
    this.innerHTML = `
      ${this.bible}
      ${this.login}
      ${this.register}
    `;
  };

  renderAuthenticated = async () => {
    this.innerHTML = `
      ${this.bible}
      ${this.account}
      ${this.preinscription ? this.preinscription : ""}
      ${this.logout}      
    `;
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
        <a class="header__logo" href="/">
          <img alt="Logo" class="header__img" src="${logoWhite}" />
          ${import.meta.env.MODE == "development" ? '<span class="header__dev">Dev</span>' : ""}
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
