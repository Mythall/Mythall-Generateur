import { toggleLoading } from "../../assets/components/loading-component";
import { getPersonnage } from "../../@mythall/personnages";
import { buildPersonnage } from "../../@mythall/@build";

class PersonnageComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    toggleLoading(true, "Téléchargement de la fiche de personnage...");
    await this.getPersonnage();
    toggleLoading(false);
  }

  getPersonnage = async () => {
    // Get URL paramas and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    const id = params.find(param => param["id"] != null)?.id;

    if (id) {
      try {
        // Build Personnage
        const base = await getPersonnage(id);
        const personnage = await buildPersonnage(base);

        // Informations
        this.querySelector("#nom").innerHTML = personnage.nom;
        this.querySelector("#displayName").innerHTML = personnage.user.displayName;
        this.querySelector("#vie").innerHTML = personnage.vie;
        this.querySelector("#niveauEffectif").innerHTML = personnage.niveauEffectif;
        this.querySelector("#alignement").innerHTML = personnage.alignement.nom;
        this.querySelector("#race").innerHTML = personnage.race.nom;
        this.querySelector("#vie").innerHTML = personnage.vie;
        this.querySelector("#divinite").innerHTML = personnage.dieu.nom;

        this.querySelector("#niveaux").innerHTML = personnage.classes
          .map(classe => {
            return `${classe.classe.nom} (${classe.niveau})`;
          })
          .join(", ");

        if (personnage?.niveauDivin > 1) {
          const elem = this.querySelector("#niveauDivin");
          elem.innerHTML = `(Divin ${personnage.niveauDivin})`;
          elem.classList.toggle("hidden", false);
        }
        if (personnage?.niveauProfane > 1) {
          const elem = this.querySelector("#niveauProfane");
          elem.innerHTML = `(Profane ${personnage.niveauProfane})`;
          elem.classList.toggle("hidden", false);
        }
        if (personnage?.niveauDisponible > 0) {
          const elem = this.querySelector("#niveauDisponible");
          elem.innerHTML = personnage.niveauDisponible;
          elem.classList.toggle("hidden", false);
        }

        if (personnage.domaines?.length > 0) {
          const elem = this.querySelector("#domaine");
          elem.innerHTML = personnage.domaines?.map(domaine => domaine.nom).join(", ");
          elem.parentElement.classList.toggle("hidden", false);
        }

        if (personnage.esprit) {
          const elem = this.querySelector("#esprit");
          elem.innerHTML = personnage.esprit.nom;
          elem.parentElement.classList.toggle("hidden", false);
        }

        if (personnage.ordres?.length > 0) {
          const elem = this.querySelector("#ordre");
          elem.innerHTML = personnage.ordres?.map(ordre => ordre.nom).join(", ");
          elem.parentElement.classList.toggle("hidden", false);
        }
      } catch (error) {
        toggleLoading(false);
        alert(`Une erreure est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    } else {
      alert("Personnage introuvable");
    }
  };
}

customElements.define("personnage-component", PersonnageComponent);
