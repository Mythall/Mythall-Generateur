import { getPersonnages } from "../../@mythall/personnages";

class PersonnagesComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener("input", this._debounce(() => this._filterPersonnages()));
  }

  async connectedCallback() {
    this.personnages = await getPersonnages();
    this.personnages.forEach(personnage => {
      this._setPersonnage(personnage);
    });
  }

  _filterPersonnages() {
    this._clearPersonnages();
    let searchQuery = this._cleanForSearch(this.filtreNom.value);
    this.personnages
      .filter(personnage => this._cleanForSearch(personnage.nom).includes(searchQuery))
      .forEach(personnage => {
        this._setPersonnage(personnage);
      });
  }

  _clearPersonnages() {
    this.querySelector("#list").innerHTML = "";
  }

  _setPersonnage(personnage) {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("template").content.cloneNode(true);
      clone.querySelector("#nom").innerHTML = personnage.nom;
      clone.querySelector("#view").setAttribute("href", `/personnage?id=${personnage.id}`);
      this.querySelector("#list").appendChild(clone);
    }
  }

  _debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { 
        func(args); 
      }, timeout);
    }
  }

  _cleanForSearch(string) {
    // Allows for case insensitive, diacritics agnostic search
    return string.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
}

customElements.define("personnages-component", PersonnagesComponent);
