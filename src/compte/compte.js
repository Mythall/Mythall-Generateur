import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../@mythall/users";
import { getPersonnagesFromUserId } from "../@mythall/personnages";

class CompteComponent extends HTMLElement {
  constructor() {
    super();

    this.currentUser;

    onAuthStateChanged(auth, async user => {
      if (user == null) {
        return;
      }

      this.currentUser = await getUser(user.uid);
      this.querySelector("#name").innerHTML = `${this.currentUser.displayname}`;

      if (this.currentUser.roles?.animateur == true || this.currentUser.roles?.organisateur == true) {
        this.querySelector("#animateur").innerHTML = `
      <a  class="button__primary" href="/organisateur/personnages">Liste des personnages</a>
      `;
      }

      if (this.currentUser.roles?.organisateur == true) {
        this.querySelector("#organisateur").innerHTML = `
      <a  class="button__primary" href="/organisateur/sorts">Liste des sorts</a>
      `;
      }

      await this._getPersonnages();
    });
  }

  _getPersonnages = async () => {
    if (this.currentUser) {
      const personnages = await getPersonnagesFromUserId(this.currentUser.uid);

      // Make sure browser support template
      if ("content" in document.createElement("template")) {
        // Create a list of personnages
        personnages.forEach(personnage => {
          const clone = this.querySelector("template").content.cloneNode(true);
          clone.querySelector("#nom").innerHTML = personnage.nom;
          clone.querySelector("#view").setAttribute("href", `/personnage?id=${personnage.id}`);
          // clone.querySelector("#progress").setAttribute("href", `/personnage/progression?id=${personnage.id}`);
          this.querySelector("#list").appendChild(clone);
        });
      }

      if (personnages.length > 0) {
        this.querySelector("#headers").classList.toggle("hidden", false);
        this.querySelector("#list").classList.toggle("hidden", false);
      }
    }
  };
}

customElements.define("compte-component", CompteComponent);
