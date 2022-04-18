import { auth } from "../assets/js/firebase";
import { buildPersonnageForProgression } from "../@mythall/@build";
import { Personnage, addPersonnage, getPersonnage, updatePersonnage } from "../@mythall/personnages";
import {
  getAvailableRaces,
  getAvailableClasses,
  getAvailableAlignements,
  getAvailableChoix,
  getAvailableDomaines,
  getAvailableEcoles,
  getAvailableEsprits,
  getAvailableOrdres,
  getAvailableConnaissances,
  getAvailableDons,
  getAvailableFourberies,
  getAvailableSorts,
  getAvailableDivinites
} from "../@mythall/@progression";
import { getRace } from "../@mythall/races";
import { ClasseItem, getClasse } from "../@mythall/classes";
import { getDomaine } from "../@mythall/domaines";
import { DonItem } from "../@mythall/dons";
import { FourberieItem } from "../@mythall/fourberies";
import { SortItem } from "../@mythall/sorts";

class CreationPersonnage extends HTMLElement {
  constructor() {
    super();

    // Inputs
    this.form = this.querySelector("#personnageForm");
    this.nom = this.querySelector("#nom");
    this.submit = this.querySelector("#submit");

    // Events
    this.nom.addEventListener("blur", () => this._updateNom());

    // Form submit
    this.addEventListener("submit", async event => await this._savePersonnage(event));
  }

  async connectedCallback() {
    // Get URL paramas and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    const id = params.find(param => param["id"] != null)?.id;

    if (id) {
      try {
        // Set progression mode
        this.progression = true;

        // Build Existing Personnage
        this.initialPersonnage = await getPersonnage(id);
        this.initialPersonnage = await buildPersonnageForProgression(this.initialPersonnage);
        this.initialPersonnage.id = id;
        console.log(this.initialPersonnage);

        // Set nom for visual cue
        this.nom.value = this.initialPersonnage.nom;
      } catch (error) {
        alert(`Une erreure est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    } else {
      // Create new personnage
      this.initialPersonnage = new Personnage(null, {});
    }

    // Assign personnage
    this.personnage = this._clonePersonnage(this.initialPersonnage);

    // Initiate process
    this._initiateSteps();
    await this._getNextStep();
  }

  // Steps
  _initiateSteps = () => {
    this.steps = [
      {
        id: "races",
        text: "Race",
        completed: false,
        dynamic: false,
        copy: null,
        getOptions: this._getRacesOptions,
        updateEvent: this._udpdateRace
      },
      {
        id: "classes",
        text: "Classe",
        progression: true,
        completed: false,
        dynamic: false,
        copy: null,
        getOptions: this._getClassesOptions,
        updateEvent: this._updateClasse
      },
      {
        id: "alignements",
        text: "Alignement",
        completed: false,
        dynamic: false,
        copy: null,
        getOptions: this._getAlignementsOptions,
        updateEvent: this._updateAlignement
      }
    ];
    if (this.progression) {
      // Ajustement de niveau
      if (this.personnage.gnEffectif <= this.personnage.race.ajustement) {
        this.steps = [
          {
            id: "ajustement",
            text: "Ajustement de niveau",
            completed: false,
            dynamic: false,
            progression: true,
            copy: null,
            getOptions: this._getAjustementptions,
            updateEvent: this._udpdateAjustement
          }
        ];
      }

      // Remove creation steps
      this.steps = this.steps.filter(s => s.progression);
    }
    this.stepIndex = 0;
    this.currentStep = this.steps[0];
  };

  _updateStep = async id => {
    // Set current step
    this.currentStep = this.steps.find(step => step.id == id);
    this.stepIndex = this.steps.findIndex(step => step.id == id);

    // Get html element
    const select = this.querySelector(`#${this.currentStep.id}`);

    // Add touched state for form validation
    select.classList.toggle("touched", true);

    // Disable form submission
    this.submit.disabled = true;

    // Validate result
    if (select.checkValidity()) {
      // Load previous step character to reset further choices (Necessary when a user change a previous selection)
      if (this.stepIndex > 0) {
        this.personnage = this._clonePersonnage(this.steps[this.stepIndex - 1].copy);
      }

      // step update event
      await this.currentStep.updateEvent(select.value);

      // Create a backup of the personnage state for this step & complete the current step
      this.currentStep.copy = this._clonePersonnage(this.personnage);
      this.currentStep.completed = true;

      // Clear following steps (Necessary when a user change a previous selection)
      this._clearFollowingSteps();

      // Check for dynamic steps
      await this._getDynamicSteps();

      // Get next uncompleted step else enable form submission
      if (this.steps.find(step => !step.completed)) {
        await this._getNextStep();
      } else {
        this.submit.disabled = false;
      }
    }
  };

  _clearFollowingSteps = () => {
    this.steps
      .filter((s, i) => i > this.stepIndex) // Get only further steps
      .forEach((step, i, arr) => {
        document.getElementById(`#${step.id}Wrapper`)?.remove(); // Remove HTML Element
        step.completed = false;
      });

    // Clear all uncompleted dynamic step
    this.steps = this.steps.filter((s, i) => !s.dynamic || (s.dynamic && s.completed));
  };

  _getDynamicSteps = async () => {
    if (this.progressingClasse) {
      const availableChoix = await getAvailableChoix(this.personnage, this.progressingClasse);
      console.log(availableChoix);
      availableChoix.forEach(choix => {
        if (choix.type == "domaine" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `domaines-${i}`)) {
              this.steps.push({
                id: `domaines-${i}`,
                text: `Domaine (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 1,
                copy: null,
                getOptions: this._getDomainesOptions,
                updateEvent: this._updateDomaine
              });
            }
          }
        }

        if (choix.type == "ecole" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `ecole-${i}`)) {
              this.steps.push({
                id: `ecole-${i}`,
                text: `Ecole`,
                completed: false,
                dynamic: true,
                order: 2,
                copy: null,
                getOptions: this._getEcolesOptions,
                updateEvent: this._updateEcole
              });
            }
          }
        }

        if (choix.type == "esprit" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `esprit-${i}`)) {
              this.steps.push({
                id: `esprit-${i}`,
                text: `Esprit patron`,
                completed: false,
                dynamic: true,
                order: 3,
                copy: null,
                getOptions: this._getEspritsOptions,
                updateEvent: this._updateEsprit
              });
            }
          }
        }

        if (choix.type == "ordre" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `ordre-${i}`)) {
              this.steps.push({
                id: `ordre-${i}`,
                text: `Ordre`,
                completed: false,
                dynamic: true,
                order: 4,
                copy: null,
                getOptions: this._getOrdresOptions,
                updateEvent: this._updateOrdre
              });
            }
          }
        }

        if (choix.type == "don" && choix.categorie == "Connaissance" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `connaissance-${i}`)) {
              this.steps.push({
                id: `connaissance-${i}`,
                text: `Connaissance (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 5,
                copy: null,
                getOptions: this._getConnaissancesOptions,
                updateEvent: this._updateConnaissance
              });
            }
          }
        }

        if (choix.type == "don" && choix.categorie == "Normal" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `don-${i}`)) {
              this.steps.push({
                id: `don-${i}`,
                text: `Don (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 6,
                copy: null,
                getOptions: this._getDonsOptions,
                updateEvent: this._updateDon
              });
            }
          }
        }

        if (choix.type == "fourberie" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `fourberie-${i}`)) {
              this.steps.push({
                id: `fourberie-${i}`,
                text: `Fourberie (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 7,
                copy: null,
                getOptions: this._getFourberiesOptions,
                updateEvent: this._updateFourberie
              });
            }
          }
        }

        if (choix.type == "sort" && choix.quantite > 0 && !choix.domaine) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `sort-${i}`)) {
              this.steps.push({
                id: `sort-${i}`,
                text: `Sort (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 8,
                copy: null,
                getOptions: this._getSortsOptions,
                updateEvent: this._updateSort
              });
            }
          }
        }

        if (choix.type == "sort" && choix.quantite > 0 && choix.domaine) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `sort-domaine-${i}`)) {
              this.steps.push({
                id: `sort-domaine-${i}`,
                text: `Sort de domaine (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
                order: 9,
                copy: null,
                getOptions: this._getSortsOptions,
                updateEvent: this._updateSort
              });
            }
          }
        }
      });

      // Add Divinite step
      if (!this.personnage.dieuRef && !this.steps.find(step => step.id == `divinite`)) {
        this.steps.push({
          id: `divinite`,
          text: `Divinité`,
          completed: false,
          dynamic: true,
          order: 10,
          copy: null,
          getOptions: this._getDivinitesOptions,
          updateEvent: this._updateDivinite
        });
      }

      // Reorder to make sure steps are in the proper order
      this.steps.sort((a, b) => {
        if (a.dynamic && b.dynamic) {
          return a.order - b.order;
        }
      });
    }
  };

  _getNextStep = async () => {
    // Get next step properties
    const nextStep = this.steps.find(step => !step.completed);

    // Get next step options
    const options = await nextStep.getOptions();

    // Create html elements for next step
    this._createStep(nextStep.id, nextStep.text, options, this._updateStep);
  };

  _createStep = (id, text, options, updateEvent) => {
    // Create Wrapper Element
    const wrapper = this._createWrapper(id);

    // Create HTML Elements
    const label = this._createLabel(id, text);
    const select = this._createDropdown(id, options);

    // Set Update Event
    select.addEventListener("change", async () => await updateEvent(id));

    // Appends Elements to section
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    this.form.insertBefore(wrapper, this.submit);
  };

  _createWrapper = id => {
    const wrapper = document.createElement("div");
    wrapper.id = `#${id}Wrapper`;
    wrapper.classList.add("personnage__group");
    return wrapper;
  };

  _createLabel = (id, text) => {
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerHTML = text;
    return label;
  };

  _createDropdown = (id, options) => {
    // Create select element
    const select = document.createElement("select");
    select.id = id;
    select.required = true;

    // Create blank option
    const blank = new Option();
    blank.disabled = true;
    blank.selected = true;
    select.appendChild(blank);

    // Add options
    options.map(o => select.appendChild(new Option(o.text, o.value)));

    return select;
  };

  _clonePersonnage = personnage => {
    return new Personnage(personnage.id ? personnage.id : null, JSON.parse(JSON.stringify(personnage)));
  };

  _setPersonnageFromPreviousStep = () => {
    if (this.stepIndex > 0) {
      this.personnage = this._clonePersonnage(this.steps[this.stepIndex - 1].copy);
    } else {
      this.personnage = this._clonePersonnage(this.initialPersonnage);
    }
  };

  // Get Available Options

  _getAjustementptions = async () => {
    return [{ text: `Ajustement de niveau (${this.personnage.gnEffectif}/${this.personnage.race.ajustement})`, value: true }];
  };

  _getRacesOptions = async () => {
    return (await getAvailableRaces()).map(r => {
      return { text: r.nom, value: r.id };
    });
  };

  _getClassesOptions = async () => {
    return (await getAvailableClasses(this.personnage)).map(c => {
      return { text: c.nom, value: c.id };
    });
  };

  _getAlignementsOptions = async () => {
    return (await getAvailableAlignements(this.personnage)).map(a => {
      return { text: a.nom, value: a.id };
    });
  };

  _getDomainesOptions = async () => {
    return (await getAvailableDomaines(this.personnage)).map(d => {
      return { text: d.nom, value: d.id };
    });
  };

  _getEcolesOptions = async () => {
    return (await getAvailableEcoles(this.personnage)).map(e => {
      return { text: e.nom, value: e.id };
    });
  };

  _getEspritsOptions = async () => {
    return (await getAvailableEsprits(this.personnage)).map(e => {
      return { text: e.nom, value: e.id };
    });
  };

  _getOrdresOptions = async () => {
    return (await getAvailableOrdres(this.personnage)).map(o => {
      return { text: o.nom, value: o.id };
    });
  };

  _getConnaissancesOptions = async () => {
    return (await getAvailableConnaissances(this.personnage)).map(d => {
      return { text: d.nom, value: d.id };
    });
  };

  _getDonsOptions = async () => {
    return (await getAvailableDons(this.personnage)).map(d => {
      return { text: d.nom, value: d.id };
    });
  };

  _getFourberiesOptions = async () => {
    return (await getAvailableFourberies(this.personnage)).map(f => {
      return { text: f.nom, value: f.id };
    });
  };

  _getSortsOptions = async () => {
    return (await getAvailableSorts(this.personnage, this.progressingClasse)).map(s => {
      return { text: s.nom, value: s.id };
    });
  };

  _getDivinitesOptions = async () => {
    return (await getAvailableDivinites(this.personnage)).map(d => {
      return { text: d.nom, value: d.id };
    });
  };

  // Update Events
  _updateNom = async () => {
    this.nom.classList.toggle("touched", true);
  };

  _udpdateAjustement = async () => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();
  };

  _udpdateRace = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    if (value != this.personnage.raceRef) {
      // Update current personnage
      this.initialPersonnage.raceRef = value;
      this.personnage = this._clonePersonnage(this.initialPersonnage);

      // Fill Requirements for next step
      this.personnage.race = await getRace(this.personnage.raceRef);
    }
  };

  _updateClasse = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    // Update personnage
    const existingClasse = this.personnage.classes.find(ci => ci.classeRef == value);
    if (existingClasse) {
      existingClasse.niveau++;
      this.personnage.niveauReel++;
      this.personnage.niveauEffectif++;
    } else {
      this.personnage.classes.push(new ClasseItem({ classeRef: value }));
    }

    // Fill Requirements for available classes
    const classes = await Promise.all(this.personnage.classes.map(classe => getClasse(classe.classeRef)));
    this.personnage.classes.forEach((classeItem, i) => (classeItem.classe = classes[i]));

    // Set a progressing classe element used in aquiring choices later
    this.progressingClasse = this.personnage.classes.find(ci => ci.classeRef == value);
  };

  _updateAlignement = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.alignementRef = value;
  };

  _updateDomaine = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    // Update personnage
    this.personnage.domainesRef.push(value);

    // Fill Requirements for available domaines
    const domaines = await Promise.all(this.personnage.domainesRef.map(ref => getDomaine(ref)));
    domaines.forEach((domaine, i) => (this.personnage.domaines[i] = domaine));
  };

  _updateEcole = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.ecoleRef = value;
  };

  _updateEsprit = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.espritRef = value;
  };

  _updateOrdre = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.ordreRef = value;
  };

  _updateConnaissance = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.dons.push(
      new DonItem({
        donRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );
  };

  _updateDon = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.dons.push(
      new DonItem({
        donRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );
  };

  _updateFourberie = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.fourberies.push(
      new FourberieItem({
        fourberieRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );
  };

  _updateSort = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.sorts.push(
      new SortItem({
        sortRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );
  };

  _updateDivinite = async value => {
    // Make sure we always have the right step loaded even if players plays around with dropdowns
    this._setPersonnageFromPreviousStep();

    this.personnage.dieuRef = value;
  };

  _savePersonnage = async event => {
    event.preventDefault();

    try {
      this.personnage.gnEffectif++;

      if (!this.personnage.nom) {
        this.personnage.nom = this.querySelector("#nom").value;
      }

      if (!this.personnage.userRef && auth.currentUser) {
        this.personnage.userRef = auth.currentUser.uid;
      }

      if (this.personnage.id) {
        await updatePersonnage(this.personnage);
        window.location.href = `/personnage?id=${this.personnage.id}`;
      } else {
        const result = await addPersonnage(this.personnage);

        if (result && result.id) {
          window.location.href = `/personnage?id=${result.id}`;
        }
      }
    } catch (error) {
      alert(error);
    }
    return;
  };
}

customElements.define("creation-personnage", CreationPersonnage);
