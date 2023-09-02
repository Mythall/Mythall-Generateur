import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toggleModal } from "../assets/components/modal-component"
import { getUser } from "../@mythall/users";
import { getPersonnagesFromUserId, deletePersonnage} from "../@mythall/personnages";
import { getEvenement } from "../@mythall/evenements";
import { getSetting } from "../@mythall/settings";

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
      <a  class="button__primary" href="/organisateur/evenements">Liste des évenements</a>
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

  _clearPersonnages() {
    this.querySelector("#list").innerHTML = "";
  }

  async _deleteCallback(personnage) {
    await deletePersonnage(personnage.id);
    this._clearPersonnages();
    await this._getPersonnages();
  }

  _getPersonnages = async () => {
    if (this.currentUser) {
      const personnages = await getPersonnagesFromUserId(this.currentUser.uid);
      const activePreinscriptionId = (await getSetting('activePreinscription'))?.value
      const activePreinscriptionInscrit = activePreinscriptionId ? (await getEvenement(activePreinscriptionId)).inscriptions : []
      console.log(activePreinscriptionInscrit)
      // Make sure browser support template
      if ("content" in document.createElement("template")) {
        // Create a list of personnages
        personnages.forEach(personnage => {
          const clone = this.querySelector("template").content.cloneNode(true);
          clone.querySelector("#nom").innerHTML = personnage.nom;
          clone.querySelector("#view").setAttribute("href", `/personnage?id=${personnage.id}`);
          if (!activePreinscriptionInscrit.length || activePreinscriptionInscrit.some((inscrit) => inscrit.personnageRef != personnage.id)) {
            clone.querySelector("#delete").classList.remove('hidden')
            clone.querySelector("#delete")
              .addEventListener("click", () =>
                toggleModal(
                  true,
                  `Êtes-vous certain de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le personnage <strong>${personnage.nom}</strong> ?`,
                  async () => await this._deleteCallback(personnage)
                )
              );
          }
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
