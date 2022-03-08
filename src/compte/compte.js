import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../assets/js/system/users";
import { getPersonnagesFromUserId } from "../assets/js/system/personnages";

let currentUser;

class UserComponent extends HTMLElement {
  constructor() {
    super();

    onAuthStateChanged(auth, async user => {
      if (user == null) {
        return;
      }

      this.querySelector("#name").innerHTML = `${user.displayName}`;

      currentUser = await getUser(user.uid);
      const personnagesComponent = document.querySelector("personnages-component");
      await personnagesComponent.getPersonnages();
    });
  }
}

class PersonnagesComponent extends HTMLElement {
  constructor() {
    super();
  }

  getPersonnages = async () => {
    if (currentUser) {
      const personnages = await getPersonnagesFromUserId(currentUser.uid);

      // Make sure browser support template
      if ("content" in document.createElement("template")) {
        // Create a list of personnages
        personnages.forEach(personnage => {
          const clone = this.querySelector("template").content.cloneNode(true);
          clone.querySelector("#nom").textContent = personnage.nom;
          clone.querySelector("#personnage").href = `/compte/personnage?id=${personnage.id}`;
          this.appendChild(clone);
        });
      }
    }
  };
}

customElements.define("user-component", UserComponent);
customElements.define("personnages-component", PersonnagesComponent);
