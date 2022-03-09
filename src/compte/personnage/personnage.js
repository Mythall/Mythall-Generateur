import { getPersonnage } from "../../@mythall/personnages";
import { toggleLoading } from "../../assets/components/loading-component";

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
    let searchParams = new URLSearchParams(window.location.search);

    //Iterate the search parameters
    for (const [key, value] of searchParams.entries()) {
      if (key == "id" && value) {
        // Fetch personnage
        const personnage = await getPersonnage(value);

        this.setInformations(personnage);
      }
    }
  };

  setInformations = personnage => {
    this.querySelector("#nom").innerHTML = personnage.nom;
  };
}

customElements.define("personnage-component", PersonnageComponent);
