import { getPersonnages } from "../../@mythall/personnages";

class PersonnagesComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener("change", () => this._filtrePersonnages());
  }

  async connectedCallback() {
    this.personnages = await getPersonnages();
    this.personnages.forEach(personnage => {
      this._setPersonnage(personnage);
    });
  }

  _filtrePersonnages() {
    this._clearPersonanges();
    this.personnages
      .filter(personnage => personnage.nom.includes(this.filtreNom.value))
      .forEach(personnage => {
        this._setPersonnage(personnage);
      });
  }

  _clearPersonanges() {
    this.querySelector("#list").innerHTML = "";
  }

  _setPersonnage(personnage) {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("template").content.cloneNode(true);
      clone.querySelector("#nom").innerHTML = personnage.nom;
      clone.querySelector("#view").setAttribute("href", `/compte/personnage?id=${personnage.id}`);
      this.querySelector("#list").appendChild(clone);
    }
  }
}

customElements.define("personnages-component", PersonnagesComponent);
