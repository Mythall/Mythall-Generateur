import { auth } from "../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../@mythall/users";
import { getEvenement, InscriptionItem, preinscription } from "../@mythall/evenements";
import { getPersonnagesFromUserId } from "../@mythall/personnages";

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
        this.querySelector("#inscrits").innerHTML = this.evenement.inscriptions.length;
        this.querySelector("#titre").innerHTML = this.evenement.titre;
        this.querySelector("#description").innerHTML = this.evenement.description;
        //adding later
        // this.querySelector("#featured").setAttribute("src", this.evenement.featured.src);
        // this.querySelector("#featured").setAttribute("width", this.evenement.featured.width);
        // this.querySelector("#featured").setAttribute("height", this.evenement.featured.height);
        console.log(this.evenement)
        this.querySelector("#heure-arrive").innerHTML = this.evenement.journee === 'true' ? "Samedi entre 9h00 et 11h30" : "Vendredi de 16h00 à 22h00";
        this.querySelector("#heure-debut").innerHTML = this.evenement.journee === 'true' ? "Samedi 12h00" : "Vendredi vers 23h30";
        this.querySelector("#heure-jeu").innerHTML = this.evenement.journee === 'true' ? "Samedi de 12h00 à 8h00" : "Vendredi & samedi jusqu'à épuisement";
        this.querySelector("#heure-fin").innerHTML = this.evenement.journee === 'true' ? "Samedi 8h00 PM" : "Dimanche 10h00";
        // Enable Taverne description
        if (this.evenement.taverne === 'true') {
          this.querySelector("#taverneDescription").innerHTML = "La taverne est ouverte pour cet événement.";

          this.querySelector("#taverne-description-small").innerHTML = this.evenement.journee
            ? "La tavenre est incluse dans le prix - comprends le souper du samedi"
            : "Le déjeuner, dîner et souper du samedi sont offerts pour le prix de 15$.";
        }

        // Enable Taverne Dropdown
        const taverneCount = this.evenement.inscriptions.filter(i => i.taverne).length;
        this.querySelector("#tavernePlace").innerHTML = `(${taverneCount}/${this.evenement.taverneLimit})`;
        if (this.evenement.taverne && this.evenement.taverneLimit > taverneCount) {
          this.querySelector("#taverne").removeAttribute("disabled");
        }

        // Enable Mobeu Dropdown
        if (this.evenement.mobeux) {
          this.querySelector("#mobeu").removeAttribute("disabled");
        }
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
        this.querySelector("#groupe").value,
        this.querySelector("#taverne").value,
        this.querySelector("#mobeu").value,
        false
      );

      await preinscription(this.evenement, inscription);
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
