import { getEvenements, getEvenement, addEvenement, updateEvenement, updateInscription, Evenement } from "../../@mythall/evenements";
import { getSetting, updateSetting } from "../../@mythall/settings";
import { toggleModal } from "../../assets/components/modal-component";

class ListEvenementsComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener(
      "input",
      this._debounce(() => this._filterEvenements())
    );
    this.querySelector("#activePreinscription").addEventListener("change", async () => this._updateActivePreinscription());
  }

  async connectedCallback() {
    await this._getEvenements();
    await this._getActivePreinscription();
  }

  async _getEvenements() {
    this.evenements = await getEvenements();
    this.evenements.forEach(evenement => {
      this._setEvenement(evenement);
      this._fillActivePreinscription(evenement);
    });
  }

  async _getActivePreinscription() {
    const activePreinscription = await getSetting("activePreinscription");
    if (activePreinscription) {
      this.querySelector("#activePreinscription").value = activePreinscription.value;
    }
  }

  async _updateActivePreinscription() {
    const activePreinscription = this.querySelector("#activePreinscription").value;
    await updateSetting({ id: "activePreinscription", value: activePreinscription });
    alert("Updated! Rafraichir la page pour voir si le lien de préinscription est actif.");
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
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("template").content.cloneNode(true);
      clone.querySelector("#date").innerHTML = evenement.date;
      clone.querySelector("#saison").innerHTML = evenement.saison;
      clone.querySelector("#preinscription").setAttribute("href", `/preinscription?id=${evenement.id}`);
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

  _fillActivePreinscription(evenement) {
    const option = document.createElement("option");
    option.value = evenement.id;
    option.innerHTML = `${evenement.date} - ${evenement.saison}`;
    this.querySelector("#activePreinscription").appendChild(option);
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
        this.querySelector("#total").innerHTML = this.evenement.inscriptions.length;
        this.querySelector("#totalMobs").innerHTML = this.evenement.inscriptions.filter(i => i.mobeu).length;
        this.querySelector("#totalTaverne").innerHTML = this.evenement.inscriptions.filter(i => i.taverne).length;
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

        const mobeu = clone.querySelector("#mobeu");
        mobeu.checked = inscription.mobeu;
        mobeu.addEventListener("click", () => this._updateMobeu(inscription), false);

        const taverne = clone.querySelector("#taverne");
        taverne.checked = inscription.taverne;
        taverne.addEventListener("click", () => this._updateTaverne(inscription), false);

        const tavernePaye = clone.querySelector("#tavernePaye");
        tavernePaye.checked = inscription.tavernePaye;
        tavernePaye.addEventListener("click", () => this._updateTavernePaye(inscription), false);

        const present = clone.querySelector("#present");
        present.checked = inscription.present;
        present.addEventListener("click", () => this._updatePresence(inscription), false);

        this.querySelector("#list").appendChild(clone);
      });
    }
  }

  _updateMobeu = async inscription => {
    inscription.mobeu = !inscription.mobeu;
    await updateInscription(this.evenement, inscription);
  };

  _updateTaverne = async inscription => {
    inscription.taverne = !inscription.taverne;
    await updateInscription(this.evenement, inscription);
  };

  _updateTavernePaye = async inscription => {
    inscription.tavernePaye = !inscription.tavernePaye;
    await updateInscription(this.evenement, inscription);
  };

  _updatePresence = async inscription => {
    inscription.present = !inscription.present;
    await updateInscription(this.evenement, inscription);
  };
}

class FormEvenementComponent extends HTMLElement {
  constructor() {
    super();
    this.params = {};
    this.titre = this.querySelector("#titre");
    this.date = this.querySelector("#date");
    this.saison = this.querySelector("#saison");
    this.description = this.querySelector("#description");
    this.featuredSrc = this.querySelector("#featuredSrc");
    this.taverne = this.querySelector("#taverne");
    this.taverneLimit = this.querySelector("#taverneLimit");
    this.mobeux = this.querySelector("#mobeux");

    // Form submit
    this.addEventListener("submit", async event => await this._saveEvenement(event));
  }

  async connectedCallback() {
    await this._getEvenement();
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
        // Set Form Title
        this.querySelector("#formTitle").innerHTML = "Modification d'événement";

        // Get Evenement
        const evenement = await getEvenement(this.params.id);

        // Set Inputs
        this.titre.value = evenement.titre;
        this.date.value = evenement.date;
        this.saison.value = evenement.saison;
        this.description.value = evenement.description;
        this.taverne.value = evenement.taverne;
        this.taverneLimit.value = evenement.taverneLimit;
        this.mobeux.value = evenement.mobeux;
      } catch (error) {
        alert(`Une erreur est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    }
  }

  async _saveEvenement(event) {
    event.preventDefault();

    try {
      const data = new Evenement(this.params.id ? this.params.id : null, {
        titre: this.titre.value,
        date: this.date.value,
        saison: this.saison.value,
        description: this.description.value,
        taverne: this.taverne.value,
        taverneLimit: this.taverneLimit.value,
        mobeux: this.mobeux.value
      });

      if (this.params.id) {
        await updateEvenement(data);
      } else {
        await addEvenement(data);
      }

      // Redirect to list
      window.location.href = "/organisateur/evenements";
    } catch (error) {
      alert(error);
    }
    return;
  }
}

customElements.define("list-evenements-component", ListEvenementsComponent);
customElements.define("list-preinscriptions-component", ListPreinscriptionsComponent);
customElements.define("form-evenement-component", FormEvenementComponent);
