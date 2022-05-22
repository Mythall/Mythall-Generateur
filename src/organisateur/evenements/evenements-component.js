import { getEvenements, getEvenement, updateEvenement } from "../../@mythall/evenements";
import { toggleModal } from "../../assets/components/modal-component";

class ListEvenementsComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener(
      "input",
      this._debounce(() => this._filterEvenements())
    );
  }

  async connectedCallback() {
    await this._getEvenements();
  }

  async _getEvenements() {
    this.evenements = await getEvenements();
    this.evenements.forEach(evenement => {
      this._setEvenement(evenement);
    });
  }

  _filterEvenements() {
    this._clearEvenements();
    let searchQuery = this._cleanForSearch(this.filtreNom.value);
    this.evenements
      .filter(evenement => this._cleanForSearch(evenement.date).includes(searchQuery))
      .forEach(evenement => {
        this._setEvenement(evenement);
      });
  }

  _clearEvenements() {
    this.querySelector("#list").innerHTML = "";
  }

  _setEvenement(evenement) {
    console.log(evenement);

    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("template").content.cloneNode(true);
      clone.querySelector("#date").innerHTML = evenement.date;
      clone.querySelector("#saison").innerHTML = evenement.saison;
      clone.querySelector("#view").setAttribute("href", `/organisateur/evenements/preinscription?id=${evenement.id}`);
      clone.querySelector("#edit").setAttribute("href", `/organisateur/evenements/form?id=${evenement.id}`);
      clone
        .querySelector("#delete")
        .addEventListener("click", () =>
          toggleModal(
            true,
            `Êtes-vous certain de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le evenement <strong>${evenement.nom}</strong> ?`,
            async () => await this._deleteCallback(evenement)
          )
        );
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
    };
  }

  _cleanForSearch(string) {
    // Allows for case insensitive, diacritics agnostic search
    return string
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  async _deleteCallback(evenement) {
    await deleteEvenement(evenement.id);
    this._clearEvenements();
    await this._getEvenements();
  }
}

class ListPreinscriptionsComponent extends HTMLElement {
  constructor() {
    super();

    this.params = {};
    this.evenement;
  }

  async connectedCallback() {
    await this._getEvenement();
    this._setPreinscriptions();
  }

  async _getEvenement() {
    // Get URL params and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    this.params.id = params.find(param => param["id"] != null)?.id;

    if (this.params.id) {
      try {
        // Get Evenement
        this.evenement = await getEvenement(this.params.id);
        this.querySelector("#total").innerHTML = this.evenement.inscrits;
      } catch (error) {
        alert(`Une erreur est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    }
  }

  _setPreinscriptions() {
    console.log("preinscription...");

    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      this.evenement.inscriptions.forEach(inscription => {
        const clone = this.querySelector("template").content.cloneNode(true);
        clone.querySelector("#joueur").innerHTML = inscription.joueur;
        clone.querySelector("#personnage").innerHTML = inscription.personnageRef
          ? `<a href="/personnage?id=${inscription.personnageRef}">${inscription.personnage}</a>`
          : inscription.personnage;
        clone.querySelector("#groupe").innerHTML = inscription.groupe;

        const present = clone.querySelector("#present");
        present.checked = inscription.present;
        present.addEventListener("click", () => this._updatePresence(inscription), false);

        const taverne = clone.querySelector("#taverne");
        taverne.checked = inscription.taverne;
        taverne.addEventListener("click", () => this._updateTaverne(inscription), false);

        this.querySelector("#list").appendChild(clone);
      });
    }
  }

  _updatePresence = async inscription => {
    inscription.present = !inscription.present;
    await updateEvenement(this.evenement);
  };

  _updateTaverne = async inscription => {
    inscription.taverne = !inscription.taverne;
    await updateEvenement(this.evenement);
  };
}

customElements.define("list-evenements-component", ListEvenementsComponent);
customElements.define("list-preinscriptions-component", ListPreinscriptionsComponent);
