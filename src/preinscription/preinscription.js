import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../@mythall/users";
import { getEvenement, updateEvenement, InscriptionItem } from "../@mythall/evenements";
import { getPersonnagesFromUserId } from "../@mythall/personnages";

let currentUser;

class PreinscriptionComponent extends HTMLElement {
  constructor() {
    super();

    this.evenement;
    this.currentUser;
    this.personnages;

    // Form submit
    this.addEventListener("submit", async event => await this.signUp(event));

    onAuthStateChanged(auth, async user => {
      if (user == null) {
        window.location.href = "/compte/connexion";
      }
      this.currentUser = await getUser(user.uid);
      this.querySelector("#joueur").innerHTML = this.currentUser.displayname;

      if (this?.evenement?.inscriptions.find(i => i.userRef == this.currentUser.uid)) {
        this.toggleSuccess();
        return;
      }

      // Fill Joueur dropdown
      const joueur = document.createElement("option");
      joueur.value = this.currentUser.uid;
      joueur.text = this.currentUser.displayname;
      this.querySelector("#joueur").appendChild(joueur);

      // List of Personnage
      this.personnages = await getPersonnagesFromUserId(this.currentUser.uid);
      this.personnages.forEach(personnage => {
        const option = document.createElement("option");
        option.value = personnage.id;
        option.text = personnage.nom;
        this.querySelector("#personnages").appendChild(option);
      });
    });
  }

  async connectedCallback() {
    // Get URL params and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    const id = params.find(param => param["id"] != null)?.id;

    if (id) {
      try {
        this.evenement = await getEvenement(id);

        this.querySelector("#date").innerHTML = this.evenement.date;
        this.querySelector("#saison").innerHTML = this.evenement.saison;
        this.querySelector("#quand").innerHTML = `${this.evenement.date} ${this.evenement.saison}`;
        this.querySelector("#inscrits").innerHTML = this.evenement.inscrits;
        // this.querySelector("#description").innerHTML = this.evenement.description;
      } catch (error) {
        alert(`Une erreur est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    } else {
      alert("Evenement introuvable");
      window.location.href = "/";
    }
  }

  signUp = async event => {
    event.preventDefault();

    try {
      let personnage = this.personnages.find(p => p.id == this.querySelector("#personnages").value);

      if (!personnage) {
        personnage = {
          id: null,
          nom: "À déterminé"
        };
      }

      const inscription = new InscriptionItem(
        this.currentUser.uid,
        this.currentUser.displayname,
        personnage.id,
        personnage.nom,
        this.querySelector("#taverne").value,
        this.querySelector("#groupe").value
      );

      this.evenement.inscriptions.push(inscription);
      this.evenement.inscrits++;

      await updateEvenement(this.evenement);
      this.toggleSuccess();
    } catch (error) {
      console.log(error);
      alert("Une erreure est survenue, veuillez contacter l'équipe.");
    }
    return;
  };

  toggleSuccess = () => {
    this.querySelector("#preinscription").classList.toggle("hidden", true);
    this.querySelector("#success").classList.toggle("hidden", false);
  };
}

customElements.define("preinscription-component", PreinscriptionComponent);
