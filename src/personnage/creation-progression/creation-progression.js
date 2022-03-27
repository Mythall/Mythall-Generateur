import { Personnage } from "../../@mythall/personnages";
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
} from "../../@mythall/@progression";
import { getRace } from "../../@mythall/races";
import { ClasseItem, getClasse } from "../../@mythall/classes";
import { getDomaine } from "../../@mythall/domaines";
import { DonItem } from "../../@mythall/dons";
import { FourberieItem } from "../../@mythall/fourberies";
import { SortItem } from "../../@mythall/sorts";

class CreationPersonnage extends HTMLElement {
  constructor() {
    super();

    // Create new personnage
    this.initialPersonnage = new Personnage(null, {});
    this.personnage = this._clonePersonnage(this.initialPersonnage);

    // Inputs
    this.form = this.querySelector("#personnageForm");
    this.nom = this.querySelector("#nom");

    // Events
    this.nom.addEventListener("blur", () => this._updateNom());
  }

  async connectedCallback() {
    this._initiateSteps();
    await this._getNextStep();
  }

  // Steps
  _initiateSteps = () => {
    this.stepIndex = 0;
    this.currentStep = "races";
    this.steps = [
      {
        id: "races",
        text: "Race",
        completed: false,
        copy: null,
        getOptions: this._getRacesOptions,
        updateEvent: this._udpdateRace
      },
      {
        id: "classes",
        text: "Classe",
        completed: false,
        copy: null,
        getOptions: this._getClassesOptions,
        updateEvent: this._updateClasse
      },
      {
        id: "alignements",
        text: "Alignement",
        completed: false,
        copy: null,
        getOptions: this._getAlignementsOptions,
        updateEvent: this._updateAlignement
      }
    ];
  };

  _setCurrentStep = async id => {
    // Set current step
    this.currentStep = id;
    this.stepIndex = this.steps.findIndex(step => step.id == id);

    // Get current step
    const step = this.steps[this.stepIndex];

    // Create a backup of the personnage state for this step
    step.copy = this._clonePersonnage(this.personnage);

    // Clear following steps
    this.steps
      .filter((step, index) => index > this.stepIndex)
      .forEach((step, i, arr) => {
        // Set step to not completed
        step.completed = false;

        // Remove html elements
        document.getElementById(`#${step.id}Wrapper`)?.remove();
      });

    // Set step completed state
    step.completed = true;
  };

  _getNextStep = async () => {
    // Get next step properties
    const step = this.steps[this.stepIndex];

    // Get next step options
    const options = await step.getOptions();

    // Create html elements for next step
    this._createStep(step.id, step.text, options, this._updateStep);
  };

  _updateStep = async id => {
    // Get current step
    const index = this.steps.findIndex(step => step.id == id);
    const step = this.steps[index];
    this.currentStep = step.id;
    this.stepIndex = index;

    console.log(`Update step - ${this.currentStep}`);

    // Get html element
    const select = this.querySelector(`#${this.currentStep}`);

    // Add touched state for form validation
    select.classList.toggle("touched", true);

    // Validate result
    if (select.checkValidity()) {
      // step update event
      await step.updateEvent(select.value);

      // Check for dynamic steps
      await this._getDynamicSteps();

      // Set generic step information
      await this._setCurrentStep(this.currentStep);

      // Increment index if needed
      if (this.stepIndex < this.steps.length) this.stepIndex++;

      // Get next step
      await this._getNextStep();
    }
  };

  _getDynamicSteps = async () => {
    if (this.progressingClasse) {
      (await getAvailableChoix(this.personnage, this.progressingClasse)).forEach(choix => {
        console.log(choix);

        if (choix.type == "domaine" && choix.quantite > 0) {
          for (let i = 1; i <= choix.quantite; i++) {
            if (!this.steps.find(step => step.id == `domaines-${i}`)) {
              this.steps.push({
                id: `domaines-${i}`,
                text: `Domaine (${i}/${choix.quantite})`,
                completed: false,
                dynamic: true,
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
                copy: null,
                getOptions: this._getSortsOptions,
                updateEvent: this._updateSort
              });
            }
          }
        }

        if (!this.personnage.dieuRef && !this.steps.find(step => step.id == `divinite`)) {
          this.steps.push({
            id: `divinite`,
            text: `Divinité`,
            completed: false,
            dynamic: true,
            copy: null,
            getOptions: this._getDivinitesOptions,
            updateEvent: this._updateDivinite
          });
        }

        // Make sure divinite stays last
        this.steps.push(this.steps.splice(this.steps.indexOf(this.steps.find(step => step.id == "divinite")), 1)[0]);
      });
    }
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
    this.form.appendChild(wrapper);
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

  // Get Available Options
  _getRacesOptions = async () => {
    return (await getAvailableRaces()).map(r => {
      return { text: r.nom, value: r.id };
    });
  };

  _getClassesOptions = async () => {
    console.log("get classes options...");
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
    console.log("Get Connaissances...");
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

  _udpdateRace = async value => {
    if (value != this.personnage.raceRef) {
      // Update current personnage
      this.initialPersonnage.raceRef = value;
      this.personnage = this._clonePersonnage(this.initialPersonnage);

      // Fill Requirements for next step
      this.personnage.race = await getRace(this.personnage.raceRef);
    }
  };

  _updateClasse = async value => {
    // Update personnage
    this.personnage.classes.push(new ClasseItem(value));

    // Fill Requirements for available classes
    const classes = await Promise.all(this.personnage.classes.map(classe => getClasse(classe.classeRef)));
    this.personnage.classes.forEach((classeItem, i) => (classeItem.classe = classes[i]));

    // Set a progressing classe element used in aquiring choices later
    this.progressingClasse = this.personnage.classes.find(ci => ci.classeRef == value);
  };

  _updateAlignement = async value => {
    this.personnage.alignementRef = value;
  };

  _updateDomaine = async value => {
    // Update personnage
    this.personnage.domainesRef.push(value);

    // Fill Requirements for available domaines
    const domaines = await Promise.all(this.personnage.domainesRef.map(ref => getDomaine(ref)));
    domaines.forEach((domaine, i) => (this.personnage.domaines[i] = domaine));
  };

  _updateEcole = async value => {
    this.personnage.ecoleRef = value;
  };

  _updateEsprit = async value => {
    this.personnage.espritRef = value;
  };

  _updateOrdre = async value => {
    this.personnage.ordreRef = value;
  };

  _updateConnaissance = async value => {
    // Update personnage
    this.personnage.dons.push(
      new DonItem({
        donRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );
    // Fill requirements ???
  };

  _updateDon = async value => {
    // Update personnage
    this.personnage.dons.push(
      new DonItem({
        donRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );

    // Fill requirements ???
    // ...
  };

  _updateFourberie = async value => {
    // Update personnage
    this.personnage.fourberies.push(
      new FourberieItem({
        fourberieRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );

    // Fill requirements ???
    // ...
  };

  _updateSort = async value => {
    this.personnage.sorts.push(
      new SortItem({
        sortRef: value,
        niveauObtention: this.personnage.niveauReel
      })
    );

    // Fill requirements ???
    // ...
  };

  _updateDivinite = async value => {
    this.personnage.dieuRef = value;
  };
}

customElements.define("creation-personnage", CreationPersonnage);

// _getPersonnage = async () => {
//   // Get URL paramas and convert from a set to an array
//   const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
//     return { [item[0]]: item[1] };
//   });

//   // Find id param
//   const id = params.find(param => param["id"] != null)?.id;

//   if (id) {
//     try {
//       // Build Personnage
//       const base = await getPersonnage(id);
//       this.progression = true;
//     } catch (error) {
//       alert(`Une erreure est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
//       console.log(error);
//     }
//   }
// };
