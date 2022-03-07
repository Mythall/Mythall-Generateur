import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";

class ProfilComponent extends HTMLElement {
  constructor() {
    super();

    onAuthStateChanged(auth, user => {
      if (user == null) {
        return;
      }

      console.log(`hello ${user.displayName}`);
      this.querySelector("#name").innerHTML = `${user.email}`;
    });
  }
}

customElements.define("profil-component", ProfilComponent);
