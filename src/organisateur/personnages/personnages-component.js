import { toggleLoading } from "../../assets/components/loading-component";
import { toggleModal } from "../../assets/components/modal-component";
import { getPersonnages, getPersonnage, addPersonnage, updatePersonnage, deletePersonnage, Personnage } from "../../@mythall/personnages";
import { getAlignements } from "../../@mythall/alignements";
import { AptitudeItem, getAptitudes } from "../../@mythall/aptitudes";
import { ClasseItem, getClasses } from "../../@mythall/classes";
import { DonItem, getDons } from "../../@mythall/dons";
import { getEcoles } from "../../@mythall/ecoles";
import { getEsprits } from "../../@mythall/esprits";
import { FourberieItem, getFourberies } from "../../@mythall/fourberies";
import { getRaces } from "../../@mythall/races";
import { getDieux } from "../../@mythall/dieux";
import { getDomaines } from "../../@mythall/domaines";
import { getOrdres } from "../../@mythall/ordres";
import { SortItem, getSorts } from "../../@mythall/sorts";
import { getUsers } from "../../@mythall/users";

class ListPersonnagesComponent extends HTMLElement {
  constructor() {
    super();
    this.filtreNom = this.querySelector("#filtreNom");
    this.filtreNom.addEventListener(
      "input",
      this._debounce(() => this._filterPersonnages())
    );
  }

  async connectedCallback() {
    await this._getPersonanges();
  }

  async _getPersonanges() {
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
      clone.querySelector("#progress").setAttribute("href", `/personnage/progression?id=${personnage.id}`);
      clone.querySelector("#edit").setAttribute("href", `/organisateur/personnages/form?id=${personnage.id}`);
      clone
        .querySelector("#delete")
        .addEventListener("click", () =>
          toggleModal(
            true,
            `Êtes-vous certain de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le personnage <strong>${personnage.nom}</strong> ?`,
            async () => await this._deleteCallback(personnage)
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

  async _deleteCallback(personnage) {
    await deletePersonnage(personnage.id);
    this._clearPersonnages();
    await this._getPersonanges();
  }
}

class FormPersonnageComponent extends HTMLElement {
  constructor() {
    super();

    // Params
    this.params = {};
    this.classesIndex = 0;
    this.donsIndex = 0;
    this.sortsIndex = 0;
    this.aptituddesIndex = 0;
    this.fourberiesIndex = 0;

    // Personnage
    this.nom = this.querySelector("#nom");
    this.race = this.querySelector("#race");
    this.alignement = this.querySelector("#alignement");
    this.divinite = this.querySelector("#divinite");
    this.domaines = this.querySelector("#domaines");
    this.ecole = this.querySelector("#ecole");
    this.esprit = this.querySelector("#esprit");
    this.ordre = this.querySelector("#ordre");
    this.user = this.querySelector("#user");
    this.vie = this.querySelector("#vie");

    // Form events
    this.addEventListener("submit", async event => await this._save(event));
    this.querySelector("#addClasse").addEventListener("click", async event => this._addClasseItem(event));
    this.querySelector("#addDon").addEventListener("click", async event => this._addDonItem(event));
    this.querySelector("#addSort").addEventListener("click", async event => this._addSortItem(event));
    this.querySelector("#addAptitude").addEventListener("click", async event => this._addAptitudeItem(event));
    this.querySelector("#addFourberie").addEventListener("click", async event => this._addFourberieItem(event));

    // Tab Clicks
    this.tabs = this.querySelectorAll(".form__tab");
    this.tabLinks = this.querySelectorAll(".tablinks__link");
    this.tabLinks.forEach(tabLink => tabLink.addEventListener("click", event => this._openTab(event)));
  }

  async connectedCallback() {
    toggleLoading(true, "Téléchargement des listes...");

    // Set Dropdowns
    (await getUsers()).map(o => this.user.appendChild(new Option(o.displayname, o.uid)));
    (await getRaces()).map(o => this.race.appendChild(new Option(o.nom, o.id)));
    (await getAlignements()).map(o => this.alignement.appendChild(new Option(o.nom, o.id)));
    (await getDieux()).map(o => this.divinite.appendChild(new Option(o.nom, o.id)));
    (await getDomaines()).map(o => this.domaines.appendChild(new Option(o.nom, o.id)));
    (await getEcoles()).map(o => this.ecole.appendChild(new Option(o.nom, o.id)));
    (await getEsprits()).map(o => this.esprit.appendChild(new Option(o.nom, o.id)));
    (await getOrdres()).map(o => this.ordre.appendChild(new Option(o.nom, o.id)));

    // Reusable resources
    this.classes = await getClasses();
    this.dons = await getDons();
    this.sorts = await getSorts();
    this.aptitudes = await getAptitudes();
    this.fourberies = await getFourberies();

    toggleLoading(true, "Téléchargement du personnage...");
    await this._getPersonnage();

    toggleLoading(false);
  }

  async _getPersonnage() {
    // Get URL paramas and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    this.params.id = params.find(param => param["id"] != null)?.id;

    if (this.params.id) {
      try {
        // Set Form Title
        this.querySelector("#formTitle").innerHTML = "Modification de personnage (DM)";

        // Get Personnage
        const personnage = await getPersonnage(this.params.id);

        console.log(personnage);

        // Set Inputs
        this.nom.value = personnage.nom;
        if (personnage.userRef) this.user.value = personnage.userRef;
        if (personnage.raceRef) this.race.value = personnage.raceRef;
        if (personnage.alignementRef) this.alignement.value = personnage.alignementRef;
        if (personnage.dieuRef) this.divinite.value = personnage.dieuRef;
        if (personnage.ecoleRef) this.ecole.value = personnage.ecoleRef;
        if (personnage.espritRef) this.esprit.value = personnage.espritRef;
        if (personnage.ordreRef) this.ordre.value = personnage.ordreRef;
        if (!personnage.ordreRef && personnage.ordresRef) this.ordre.value = personnage.ordresRef;
        if (personnage.vie) this.vie.value = personnage.vie;

        if (personnage.domainesRef) {
          const options = Array.from(document.querySelectorAll("#domaines option"));
          personnage.domainesRef.forEach(d => {
            options.find(o => o.value == d).selected = true;
          });
        }

        personnage.classes.forEach(classeItem => {
          this._addClasseItem(null, classeItem);
        });

        personnage.dons.forEach(donItem => {
          this._addDonItem(null, donItem);
        });

        personnage.sorts.forEach(sortItem => {
          this._addSortItem(null, sortItem);
        });

        personnage.aptitudes.forEach(aptitudeItem => {
          this._addAptitudeItem(null, aptitudeItem);
        });

        personnage.fourberies.forEach(fourberieItem => {
          this._addFourberieItem(null, fourberieItem);
        });
      } catch (error) {
        alert(`Une erreure est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    }
  }

  _addClasseItem(event, classeItem) {
    event?.preventDefault();
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateClasses").content.cloneNode(true);

      const i = this.classesIndex;

      // Set proper ids
      clone.querySelector("#classe").id = `classe-${i}`;
      clone.querySelector("#classeRef").id = `classeRef-${i}`;
      clone.querySelector("#classeLabel").id = `classeLabel-${i}`;
      clone.querySelector("#niveau").id = `niveau-${i}`;
      clone.querySelector("#niveauLabel").id = `niveauLabel-${i}`;
      clone.querySelector("#delete").id = `delete-${i}`;

      // Assign elements
      const wrapper = clone.querySelector(`#classe-${i}`);
      const classeRef = clone.querySelector(`#classeRef-${i}`);
      const classeLabel = clone.querySelector(`#classeLabel-${i}`);
      const niveau = clone.querySelector(`#niveau-${i}`);
      const niveauLabel = clone.querySelector(`#niveauLabel-${i}`);
      const actionDelete = clone.querySelector(`#delete-${i}`);

      // Set proper labels
      classeLabel.setAttribute("for", `classeRef-${i}`);
      niveauLabel.setAttribute("for", `niveau-${i}`);

      // Increment classes index
      this.classesIndex++;

      // Set dropdown options
      this.classes.forEach(c => classeRef.appendChild(new Option(c.nom, c.id)));

      // Set values
      if (classeItem) {
        classeRef.value = classeItem.classeRef;
        niveau.value = classeItem.niveau;
      }

      // Set actions
      actionDelete.addEventListener("click", e => {
        e.preventDefault();
        wrapper.remove();
      });

      // Append to list
      this.querySelector("#classesWrapper").appendChild(clone);
    }
  }

  _addDonItem(event, donItem) {
    event?.preventDefault();

    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateDons").content.cloneNode(true);

      const i = this.donsIndex;

      // Set proper ids
      clone.querySelector("#don").id = `don-${i}`;
      clone.querySelector("#donRef").id = `donRef-${i}`;
      clone.querySelector("#donLabel").id = `donLabel-${i}`;
      clone.querySelector("#niveauObtention").id = `niveauObtention-${i}`;
      clone.querySelector("#niveauLabel").id = `niveauLabel-${i}`;
      clone.querySelector("#delete").id = `delete-${i}`;

      // Assign elements
      const wrapper = clone.querySelector(`#don-${i}`);
      const donRef = clone.querySelector(`#donRef-${i}`);
      const donLabel = clone.querySelector(`#donLabel-${i}`);
      const niveauObtention = clone.querySelector(`#niveauObtention-${i}`);
      const niveauLabel = clone.querySelector(`#niveauLabel-${i}`);
      const actionDelete = clone.querySelector(`#delete-${i}`);

      // Set proper labels
      donLabel.setAttribute("for", `donRef-${i}`);
      niveauLabel.setAttribute("for", `niveauObtention-${i}`);

      // Increment dons index
      this.donsIndex++;

      // Set dropdown options
      this.dons.forEach(c => donRef.appendChild(new Option(c.nom, c.id)));

      // Set values
      if (donItem) {
        donRef.value = donItem.donRef;
        niveauObtention.value = donItem.niveauObtention;
      }

      // Set actions
      actionDelete.addEventListener("click", e => {
        e.preventDefault();
        wrapper.remove();
      });

      // Append to list
      this.querySelector("#donsWrapper").appendChild(clone);
    }
  }

  _addSortItem(event, sortItem) {
    event?.preventDefault();

    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateSorts").content.cloneNode(true);

      const i = this.sortsIndex;

      // Set proper ids
      clone.querySelector("#sort").id = `sort-${i}`;
      clone.querySelector("#sortRef").id = `sortRef-${i}`;
      clone.querySelector("#sortLabel").id = `sortLabel-${i}`;
      clone.querySelector("#niveauObtention").id = `niveauObtention-${i}`;
      clone.querySelector("#niveauLabel").id = `niveauLabel-${i}`;
      clone.querySelector("#delete").id = `delete-${i}`;

      // Assign elements
      const wrapper = clone.querySelector(`#sort-${i}`);
      const sortRef = clone.querySelector(`#sortRef-${i}`);
      const sortLabel = clone.querySelector(`#sortLabel-${i}`);
      const niveauObtention = clone.querySelector(`#niveauObtention-${i}`);
      const niveauLabel = clone.querySelector(`#niveauLabel-${i}`);
      const actionDelete = clone.querySelector(`#delete-${i}`);

      // Set proper labels
      sortLabel.setAttribute("for", `sortRef-${i}`);
      niveauLabel.setAttribute("for", `niveauObtention-${i}`);

      // Increment sorts index
      this.sortsIndex++;

      // Set dropdown options
      this.sorts.forEach(c => sortRef.appendChild(new Option(c.nom, c.id)));

      // Set values
      if (sortItem) {
        sortRef.value = sortItem.sortRef;
        niveauObtention.value = sortItem.niveauObtention;
      }

      // Set actions
      actionDelete.addEventListener("click", e => {
        e.preventDefault();
        wrapper.remove();
      });

      // Append to list
      this.querySelector("#sortsWrapper").appendChild(clone);
    }
  }

  _addAptitudeItem(event, aptitudeItem) {
    event?.preventDefault();

    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateAptitudes").content.cloneNode(true);

      const i = this.aptitudesIndex;

      // Set proper ids
      clone.querySelector("#aptitude").id = `aptitude-${i}`;
      clone.querySelector("#aptitudeRef").id = `aptitudeRef-${i}`;
      clone.querySelector("#aptitudeLabel").id = `aptitudeLabel-${i}`;
      clone.querySelector("#niveauObtention").id = `niveauObtention-${i}`;
      clone.querySelector("#niveauLabel").id = `niveauLabel-${i}`;
      clone.querySelector("#delete").id = `delete-${i}`;

      // Assign elements
      const wrapper = clone.querySelector(`#aptitude-${i}`);
      const aptitudeRef = clone.querySelector(`#aptitudeRef-${i}`);
      const aptitudeLabel = clone.querySelector(`#aptitudeLabel-${i}`);
      const niveauObtention = clone.querySelector(`#niveauObtention-${i}`);
      const niveauLabel = clone.querySelector(`#niveauLabel-${i}`);
      const actionDelete = clone.querySelector(`#delete-${i}`);

      // Set proper labels
      aptitudeLabel.setAttribute("for", `aptitudeRef-${i}`);
      niveauLabel.setAttribute("for", `niveauObtention-${i}`);

      // Increment aptitudes index
      this.aptitudesIndex++;

      // Set dropdown options
      this.aptitudes.forEach(c => aptitudeRef.appendChild(new Option(c.nom, c.id)));

      // Set values
      if (aptitudeItem) {
        aptitudeRef.value = aptitudeItem.aptitudeRef;
        niveauObtention.value = aptitudeItem.niveauObtention;
      }

      // Set actions
      actionDelete.addEventListener("click", e => {
        e.preventDefault();
        wrapper.remove();
      });

      // Append to list
      this.querySelector("#aptitudesWrapper").appendChild(clone);
    }
  }

  _addFourberieItem(event, fourberieItem) {
    event?.preventDefault();

    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateFourberies").content.cloneNode(true);

      const i = this.fourberiesIndex;

      // Set proper ids
      clone.querySelector("#fourberie").id = `fourberie-${i}`;
      clone.querySelector("#fourberieRef").id = `fourberieRef-${i}`;
      clone.querySelector("#fourberieLabel").id = `fourberieLabel-${i}`;
      clone.querySelector("#niveauObtention").id = `niveauObtention-${i}`;
      clone.querySelector("#niveauLabel").id = `niveauLabel-${i}`;
      clone.querySelector("#delete").id = `delete-${i}`;

      // Assign elements
      const wrapper = clone.querySelector(`#fourberie-${i}`);
      const fourberieRef = clone.querySelector(`#fourberieRef-${i}`);
      const fourberieLabel = clone.querySelector(`#fourberieLabel-${i}`);
      const niveauObtention = clone.querySelector(`#niveauObtention-${i}`);
      const niveauLabel = clone.querySelector(`#niveauLabel-${i}`);
      const actionDelete = clone.querySelector(`#delete-${i}`);

      // Set proper labels
      fourberieLabel.setAttribute("for", `fourberieRef-${i}`);
      niveauLabel.setAttribute("for", `niveauObtention-${i}`);

      // Increment fourberies index
      this.fourberiesIndex++;

      // Set dropdown options
      this.fourberies.forEach(c => fourberieRef.appendChild(new Option(c.nom, c.id)));

      // Set values
      if (fourberieItem) {
        fourberieRef.value = fourberieItem.fourberieRef;
        niveauObtention.value = fourberieItem.niveauObtention;
      }

      // Set actions
      actionDelete.addEventListener("click", e => {
        e.preventDefault();
        wrapper.remove();
      });

      // Append to list
      this.querySelector("#fourberiesWrapper").appendChild(clone);
    }
  }

  async _save(event) {
    event.preventDefault();

    try {
      // Get Classes
      const classesEl = this.querySelector("#classesWrapper").children;
      const classes = Array.from(classesEl).map(el => {
        const i = el.id.replace("classe-", "");
        const classeRef = el.querySelector(`#classeRef-${i}`).value;
        const niveau = el.querySelector(`#niveau-${i}`).value;
        return new ClasseItem({ classeRef, niveau });
      });

      // Get Dons
      const donsEl = this.querySelector("#donsWrapper").children;
      const dons = Array.from(donsEl).map(el => {
        const i = el.id.replace("don-", "");
        const donRef = el.querySelector(`#donRef-${i}`).value;
        const niveauObtention = el.querySelector(`#niveauObtention-${i}`).value;
        return new DonItem({ donRef, niveauObtention });
      });

      // Get Sorts
      const sortsEl = this.querySelector("#sortsWrapper").children;
      const sorts = Array.from(sortsEl).map(el => {
        const i = el.id.replace("sort-", "");
        const sortRef = el.querySelector(`#sortRef-${i}`).value;
        const niveauObtention = el.querySelector(`#niveauObtention-${i}`).value;
        return new SortItem({ sortRef, niveauObtention });
      });

      // Get Aptitudes
      const aptitudesEl = this.querySelector("#aptitudesWrapper").children;
      const aptitudes = Array.from(aptitudesEl).map(el => {
        const i = el.id.replace("aptitude-", "");
        const aptitudeRef = el.querySelector(`#aptitudeRef-${i}`).value;
        const niveauObtention = el.querySelector(`#niveauObtention-${i}`).value;
        return new AptitudeItem({ aptitudeRef, niveauObtention });
      });

      // Get Fourberies
      const fourberiesEl = this.querySelector("#fourberiesWrapper").children;
      const fourberies = Array.from(fourberiesEl).map(el => {
        const i = el.id.replace("fourberie-", "");
        const fourberieRef = el.querySelector(`#fourberieRef-${i}`).value;
        const niveauObtention = el.querySelector(`#niveauObtention-${i}`).value;
        return new FourberieItem({ fourberieRef, niveauObtention });
      });

      // Domaines
      const selectedDomainesOptions = document.querySelectorAll("#domaines option:checked");
      const domainesRef = Array.from(selectedDomainesOptions).map(el => el.value);

      const personnage = new Personnage(this.params.id ? this.params.id : null, {
        nom: this.nom.value,
        userRef: this.user.value,
        raceRef: this.race.value,
        alignementRef: this.alignement.value,
        dieuRef: this.divinite.value,
        ecoleRef: this.ecole.value,
        espritRef: this.esprit.value,
        ordreRef: this.ordre.value,
        vue: this.vie.value,
        domainesRef,
        classes,
        dons,
        sorts,
        aptitudes,
        fourberies
      });

      if (this.params.id) {
        personnage.id = this.params.id;
        await updatePersonnage(personnage);
      } else {
        await addPersonnage(personnage);
      }

      // Redirect to list
      window.location.href = "/organisateur/personnages";
    } catch (error) {
      alert(error);
    }
    return;
  }

  _openTab(event) {
    event.preventDefault();

    const target = event.target.dataset.target;

    // Hide all tabs
    this.tabs.forEach(tab => tab.classList.toggle("hidden", true));

    // Remove all active tablinks
    this.tabLinks.forEach(tablink => tablink.classList.toggle("tablinks__link--active", false));

    // Set active tablink
    event.target.classList.toggle("tablinks__link--active", true);

    // Display target tab
    this.querySelector(`#${target}`).classList.toggle("hidden", false);
  }
}

customElements.define("list-personnages-component", ListPersonnagesComponent);
customElements.define("form-personnage-component", FormPersonnageComponent);
