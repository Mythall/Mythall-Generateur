import { toggleLoading } from "../../assets/components/loading-component";
import { getPersonnage } from "../../@mythall/personnages";
import { buildPersonnage } from "../../@mythall/@build";
import { statistiqueIds } from "../../@mythall/statistiques";

class PersonnageComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    toggleLoading(true, "Téléchargement de la fiche de personnage...");

    // Load Character
    await this.getPersonnage();

    console.log(this.personnage);

    // Fill Sections
    this._setInformations();
    this._setStatistiques();
    this._setResistancesImmunites();
    this._setDons();
    this._setAptitudes();
    this._setFourberies();
    this._setSorts();
    this._setCapacitesSpeciales();

    toggleLoading(false);
  }

  getPersonnage = async () => {
    // Get URL paramas and convert from a set to an array
    const params = [...new URLSearchParams(window.location.search).entries()].map(item => {
      return { [item[0]]: item[1] };
    });

    // Find id param
    const id = params.find(param => param["id"] != null)?.id;

    if (id) {
      try {
        // Build Personnage
        const base = await getPersonnage(id);
        this.personnage = await buildPersonnage(base);
      } catch (error) {
        alert(`Une erreure est survenue, veuillez contacter l'équipe pour corriger le problème, merci.`);
        console.log(error);
      }
    } else {
      alert("Personnage introuvable");
    }
  };

  _setInformations = () => {
    // Informations
    this.querySelector("#nom").innerHTML = this.personnage.nom;
    this.querySelector("#displayName").innerHTML = this.personnage.user.displayName;
    this.querySelector("#vie").innerHTML = this.personnage.vie;
    this.querySelector("#niveauEffectif").innerHTML = this.personnage.niveauEffectif;
    this.querySelector("#alignement").innerHTML = this.personnage.alignement.nom;
    this.querySelector("#race").innerHTML = this.personnage.race.nom;
    this.querySelector("#vie").innerHTML = this.personnage.vie;
    this.querySelector("#divinite").innerHTML = this.personnage.dieu.nom;

    this.querySelector("#niveaux").innerHTML = this.personnage.classes
      .map(classe => {
        return `${classe.classe.nom} (${classe.niveau})`;
      })
      .join(", ");

    if (this.personnage?.niveauDivin > 1) {
      const elem = this.querySelector("#niveauDivin");
      elem.innerHTML = `(Divin ${this.personnage.niveauDivin})`;
      elem.classList.toggle("hidden", false);
    }
    if (this.personnage?.niveauProfane > 1) {
      const elem = this.querySelector("#niveauProfane");
      elem.innerHTML = `(Profane ${this.personnage.niveauProfane})`;
      elem.classList.toggle("hidden", false);
    }
    if (this.personnage?.niveauDisponible > 0) {
      const elem = this.querySelector("#niveauDisponible");
      elem.innerHTML = this.personnage.niveauDisponible;
      elem.classList.toggle("hidden", false);
    }

    if (this.personnage.domaines?.length > 0) {
      const elem = this.querySelector("#domaine");
      elem.innerHTML = this.personnage.domaines?.map(domaine => domaine.nom).join(", ");
      elem.parentElement.classList.toggle("hidden", false);
    }

    if (this.personnage.esprit) {
      const elem = this.querySelector("#esprit");
      elem.innerHTML = this.personnage.esprit.nom;
      elem.parentElement.classList.toggle("hidden", false);
    }

    if (this.personnage.ordres?.length > 0) {
      const elem = this.querySelector("#ordre");
      elem.innerHTML = this.personnage.ordres?.map(ordre => ordre.nom).join(", ");
      elem.parentElement.classList.toggle("hidden", false);
    }
  };

  _setStatistiques = () => {
    const statistiquesBase = [
      statistiqueIds.Constitution,
      statistiqueIds.Dextérité,
      statistiqueIds.Force,
      statistiqueIds.Intelligence,
      statistiqueIds.Sagesse
    ];
    const statistiquesSpecialise = [
      statistiqueIds.PVTorse,
      statistiqueIds.PVBras,
      statistiqueIds.PVJambes,
      statistiqueIds.Mana,
      statistiqueIds.Lutte,
      statistiqueIds.Ki
    ];

    statistiquesBase.forEach(id => {
      const statistique = this.personnage.statistiques.find(statistiqueItem => statistiqueItem.statistique.id == id);
      this._cloneNameValue(this.querySelector("#statistiquesBase"), statistique?.statistique?.nom, statistique?.valeur);
    });

    statistiquesSpecialise.forEach(id => {
      const statistique = this.personnage.statistiques.find(statistiqueItem => statistiqueItem.statistique.id == id);
      this._cloneNameValue(this.querySelector("#statistiqueSpecialise"), statistique?.statistique?.nom, statistique?.valeur);
    });
  };

  _setResistancesImmunites = () => {
    this.personnage.resistances.forEach(resistanceValue => {
      this._cloneNameValue(this.querySelector("#resistances"), resistanceValue?.resistance?.nom, resistanceValue?.valeur);
    });
    this.personnage.immunites.forEach(immunite => {
      this._cloneNameValue(this.querySelector("#immunites"), immunite?.nom, "");
    });
  };

  _setCapacitesSpeciales = () => {
    const sIds = Object.values(statistiqueIds);
    this.personnage.statistiques
      .filter(sv => !sIds.find(id => sv.statistique.id == id))
      .forEach(statistiqueValue => {
        this._cloneNameValue(this.querySelector("#capacitesSpeciales"), statistiqueValue?.statistique?.nom, statistiqueValue?.valeur);
      });
  };

  _setDons = () => {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      this.personnage.dons.forEach(donItem => {
        const clone = this.querySelector("#templateDon").content.cloneNode(true);
        clone.querySelector("#donNom").innerHTML = donItem.don.nom;
        clone.querySelector("#donNiveau").innerHTML = donItem.niveauEffectif && donItem.niveauEffectif > 1 ? `(${donItem.niveauEffectif})` : "";
        clone.querySelector("#donDescription").innerHTML = donItem.don.description;
        this.querySelector("#dons").appendChild(clone);
      });
    }
  };

  _setAptitudes = () => {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      this.personnage.aptitudes.forEach(aptitudeItem => {
        const clone = this.querySelector("#templateAptitude").content.cloneNode(true);
        clone.querySelector("#aptitudeNom").innerHTML = aptitudeItem.aptitude.nom;
        clone.querySelector("#aptitudeDescription").innerHTML = aptitudeItem.aptitude.description;
        this.querySelector("#aptitudes").appendChild(clone);
      });
    }
  };

  _setFourberies = () => {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      this.personnage.fourberies.forEach(fourberieItem => {
        const clone = this.querySelector("#templateFourberie").content.cloneNode(true);
        clone.querySelector("#fourberieNom").innerHTML = fourberieItem.fourberie.nom;
        clone.querySelector("#fourberieDescription").innerHTML = fourberieItem.fourberie.description;
        this.querySelector("#fourberies").appendChild(clone);
      });
    }
  };

  _setSorts = () => {
    this.personnage.race.sortsRacial.forEach(sort => {
      this._cloneSort(this.querySelector("#sortsRacial"), { sort });
    });
    this.personnage.sorts.forEach(item => {
      this._cloneSort(this.querySelector("#sorts"), item);
    });
  };

  _cloneNameValue = (target, name, value) => {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateNameValue").content.cloneNode(true);
      clone.querySelector("#name").innerHTML = name;
      clone.querySelector("#value").innerHTML = value;
      target.appendChild(clone);
    }
  };

  _cloneSort = (target, item) => {
    // Make sure browser support template
    if ("content" in document.createElement("template")) {
      const clone = this.querySelector("#templateSort").content.cloneNode(true);
      clone.querySelector("#sortNom").innerHTML = item.sort.nom;
      clone.querySelector("#sortEcole").innerHTML = `(${item.sort.ecole.nom})`;
      clone.querySelector("#sortPorte").innerHTML = item.sort.porte.nom;
      clone.querySelector("#sortDuree").innerHTML = item.sort.duree.nom;
      clone.querySelector("#sortZone").innerHTML = item.sort.zone.nom;
      clone.querySelector("#sortIncantation").innerHTML = item.sort.incantation;
      clone.querySelector("#sortSommaire").innerHTML = item.sort.sommaire;
      target.appendChild(clone);
    }
  };
}

customElements.define("personnage-component", PersonnageComponent);
