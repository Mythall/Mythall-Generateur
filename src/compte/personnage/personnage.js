import { auth } from "../../assets/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../../assets/js/system/users";
import { getPersonnage } from "../../assets/js/system/personnages";

class PersonnageComponent extends HTMLElement {
  constructor() {
    super();
    (async () => {
      await this.getPersonnage();
    })();
  }

  getPersonnage = async () => {
    let searchParams = new URLSearchParams(window.location.search);

    //Iterate the search parameters
    for (const [key, value] of searchParams.entries()) {
      if (key == "id" && value) {
        // Fetch personnage
        const personnage = await getPersonnage(value);

        // Set attributes
        this.querySelector("#nom").innerHTML = personnage.nom;
      }
    }
  };
}

customElements.define("personnage-component", PersonnageComponent);
