import { db } from "../assets/js/firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { getAptitude } from "./aptitudes";
import { getDon } from "./dons";
import { getSort } from "./sorts";
import { getResistance } from "./resistances";
import { getImmunite } from "./immunites";
import { getStatistique } from "./statistiques";

// const ClasseTypes = ['Combatant', 'Lanceur de Sort'];
// const ClasseSort = ['Divin', 'Profane'];

class ClasseItem {
  constructor(id) {
    this.classe = null;
    this.classeRef = id ? id : "";
    this.niveau = 1;
  }
}

// class ClasseAuthorise {
//   constructor() {
//     this.classe = null;
//     this.classeRef = '';
//     this.niveau = 1;
//   }
//   classe;
//   classeRef;
//   niveau;
// }

class Classe {
  constructor(
    id,
    {
      nom,
      description,
      obligations,
      avantages,
      desavantages,
      alignementPermisRef,
      alignementPermis,
      multiclassementRef,
      multiclassement,
      aptitudes,
      dons,
      sorts,
      sortsDisponible,
      choix,
      statistiques,
      resistances,
      immunitesRef,
      immunites,
      type,
      sort,
      prestige
    }
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.obligations = obligations;
    this.avantages = avantages;
    this.desavantages = desavantages;
    this.alignementPermisRef = alignementPermisRef;
    this.alignementPermis = alignementPermis;
    this.multiclassementRef = multiclassementRef;
    this.multiclassement = multiclassement;
    this.aptitudes = aptitudes;
    this.dons = dons;
    this.sorts = sorts;
    this.sortsDisponible = sortsDisponible;
    this.choix = choix;
    this.statistiques = statistiques;
    this.resistances = resistances;
    this.immunitesRef = immunitesRef;
    this.immunites = immunites;
    this.type = type;
    this.sort = sort;
    this.prestige = prestige;
  }

  saveState() {
    if (!this.aptitudes) this.aptitudes = [];
    if (!this.dons) this.dons = [];
    if (!this.sorts) this.sorts = [];
    if (!this.sortsDisponible) this.sortsDisponible = [];
    if (!this.choix) this.choix = [];
    if (!this.resistances) this.resistances = [];
    if (!this.statistiques) this.statistiques = [];
    if (!this.immunitesRef) this.immunitesRef = [];
    if (!this.prestige) this.prestige = false;

    //Filter Out
    this.aptitudes.forEach(aptitude => {
      aptitude.aptitude = null;
    });

    this.dons.forEach(don => {
      don.don = null;
    });

    this.sorts.forEach(sort => {
      sort.sort = null;
    });

    this.sortsDisponible.forEach(sort => {
      sort.sort = null;
    });

    this.resistances.forEach(resistance => {
      resistance.resistance = null;
    });
    this.statistiques.forEach(statistique => {
      statistique.statistique = null;
    });

    return {
      nom: this.nom,
      description: this.description,
      obligations: this.obligations,
      avantages: this.avantages,
      desavantages: this.desavantages,
      alignementPermisRef: this.alignementPermisRef,
      multiclassementRef: this.multiclassementRef,
      aptitudes: this.aptitudes,
      dons: this.dons,
      sorts: this.sorts,
      sortsDisponible: this.sortsDisponible,
      choix: this.choix,
      statistiques: this.statistiques,
      resistances: this.resistances,
      immunitesRef: this.immunitesRef,
      type: this.type,
      sort: this.sort,
      prestige: this.prestige
    };
  }

  async load() {
    await this._getMulticlassement();
    await this._getAptitudees();
    await this._getSorts();
    await this._getDons();
    await this._getResistances();
    await this._getStatistiques();
    await this._getImmunites();
    return;
  }

  async _getMulticlassement() {
    if (this.multiclassementRef) {
      this.multiclassementRef.forEach(async classeRef => {
        const classe = await getClasse(classeRef);
        if (!this.multiclassement) this.multiclassement = [];
        this.multiclassement.push(classe);
      });
    }
  }

  async _getAptitudees() {
    if (this.aptitudes && this.aptitudes.length > 0) {
      this.aptitudes.forEach(async aptitudeItem => {
        aptitudeItem.aptitude = await getAptitude(aptitudeItem.aptitudeRef);
      });
    }
  }

  async _getDons() {
    if (this.dons && this.dons.length > 0) {
      this.dons.forEach(async donItem => {
        donItem.don = await getDon(donItem.donRef);
      });
    }
  }

  async _getSorts() {
    if (this.sorts && this.sorts.length > 0) {
      this.sorts.forEach(async sortItem => {
        sortItem.sort = await getSort(sortItem.sortRef);
      });
    }
  }

  async _getResistances() {
    if (this.resistances && this.resistances.length > 0) {
      this.resistances.forEach(async resistanceItem => {
        resistanceItem.resistance = await getResistance(resistanceItem.resistanceRef);
      });
    }
  }

  async _getStatistiques() {
    if (this.statistiques && this.statistiques.length > 0) {
      this.statistiques.forEach(async statistiqueItem => {
        statistiqueItem.statistique = await getStatistique(statistiqueItem.statistiqueRef);
      });
    }
  }

  async _getImmunites() {
    if (this.immunitesRef) {
      this.immunitesRef.forEach(async immuniteRef => {
        if (!this.immunites) this.immunites = [];
        this.immunites.push(await getImmunite(immuniteRef));
      });
    }
  }
}

const getClasses = async () => {
  // ...
  // Add prestige, basic and maybe npc filters eventually

  return (await getDocs(query(collection(db, "classes"), orderBy("nom")))).docs.map(snap => {
    return new Classe(snap.id, snap.data());
  });
};

const getClasse = async id => {
  const snap = await getDoc(doc(db, `classes/${id}`));
  const classe = new Classe(snap.id, snap.data());
  // await classe.load();
  return classe;
};

const addClasse = async classe => {
  return await addDoc(collection(db, `classes`), classe.saveState());
};

const updateClasse = async classe => {
  return await updateDoc(doc(db, `classes/${classe.id}`), classe.saveState());
};

const deleteClasse = async id => {
  return await deleteDoc(doc(db, `classes/${id}`));
};

export { Classe, ClasseItem, getClasses, getClasse, addClasse, updateClasse, deleteClasse };
