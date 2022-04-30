import { getSorts, getSort, addSort, updateSort, deleteSort, Sort } from "../../@mythall/sorts";
import { getEcoles } from "../../@mythall/ecoles";
import { toggleModal } from "../../assets/components/modal-component";

class ListSortsComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener(
      "input",
      this._debounce(() => this._filterSorts())
    );
  }

  async connectedCallback() {
    await this._getSorts();
  }

  async _getSorts() {
    this.sorts = await getSorts();
    this.sorts.forEach(sort => {
      this._setSort(sort);
    });
  }

  _filterSorts() {
    this._clearSorts();
    let searchQuery = this._cleanForSearch(this.filtreNom.value);
    this.sorts
      .filter(sort => this._cleanForSearch(sort.nom).includes(searchQuery))
      .forEach(sort => {
        this._setSort(sort);
      });
  }

  _clearSorts() {
    this.querySelector("#list").innerHTML = "";
  }

  _setSort(sort) {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("template").content.cloneNode(true);
      clone.querySelector("#nom").innerHTML = sort.nom;
      // clone.querySelector("#view").setAttribute("href", `...`);
      clone.querySelector("#edit").setAttribute("href", `/organisateur/sorts/form?id=${sort.id}`);
      clone
        .querySelector("#delete")
        .addEventListener("click", () =>
          toggleModal(
            true,
            `Êtes-vous certain de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le sort <strong>${sort.nom}</strong> ?`,
            async () => await this._deleteCallback(sort)
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

  async _deleteCallback(sort) {
    await deleteSort(sort.id);
    this._clearSorts();
    await this._getSorts();
  }
}

class FormSortComponent extends HTMLElement {
  constructor() {
    super();
    this.params = {};
    this.nom = this.querySelector("#nom");
    this.niveau = this.querySelector("#niveau");
    this.incantation = this.querySelector("#incantation");
    this.sommaire = this.querySelector("#sommaire");
    this.description = this.querySelector("#description");
    this.ecoles = this.querySelector("#ecoles");
    this.porte = this.querySelector("#porte");
    this.duree = this.querySelector("#duree");
    this.zone = this.querySelector("#zone");

    // Form submit
    this.addEventListener("submit", async event => await this._saveSort(event));
  }

  async connectedCallback() {
    // Set Ecoles Dropdown
    (await getEcoles()).map(e => this.querySelector("#ecoles").appendChild(new Option(e.nom, e.id)));

    await this._getSort();
  }

  async _getSort() {
    // Get URL params and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    this.params.id = params.find(param => param["id"] != null)?.id;

    if (this.params.id) {
      try {
        // Set Form Title
        this.querySelector("#formTitle").innerHTML = "Modification de sort";

        // Get Sort
        const sort = await getSort(this.params.id);

        // Set Inputs
        this.nom.value = sort.nom;
        this.niveau.value = sort.niveau;
        this.incantation.value = sort.incantation;
        this.sommaire.value = sort.sommaire;
        this.description.value = sort.description;
        this.ecoles.value = sort.ecoleRef;
        this.porte.value = sort.porte;
        this.duree.value = sort.duree;
        this.zone.value = sort.zone;
      } catch (error) {
        alert(`Une erreur est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    }
  }

  async _saveSort(event) {
    event.preventDefault();

    try {
      const data = new Sort(this.params.id ? this.params.id : null, {
        nom: this.nom.value,
        niveau: this.niveau.value,
        incantation: this.incantation.value,
        sommaire: this.sommaire.value,
        description: this.description.value,
        ecoleRef: this.ecoles.value,
        porte: this.porte.value,
        duree: this.duree.value,
        zone: this.zone.value
      });

      if (this.params.id) {
        await updateSort(data);
      } else {
        await addSort(data);
      }

      // Redirect to list
      window.location.href = "/organisateur/sorts";
    } catch (error) {
      alert(error);
    }
    return;
  }
}

customElements.define("list-sorts-component", ListSortsComponent);
customElements.define("form-sort-component", FormSortComponent);
