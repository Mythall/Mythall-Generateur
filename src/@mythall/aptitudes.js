import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getImmunite } from "./immunites";
import { getResistance } from "./resistances";
import { getStatistique } from "./statistiques";

// export class AptitudeItem {
//   constructor() {
//       this.aptitude = null;
//       this.aptitudeRef = '';
//       this.niveauObtention = 1;
//   }

//   aptitude;
//   aptitudeRef;
//   niveauObtention;
// }

class Aptitude {
  constructor(id, { nom, description, donsEquivalentRef, sortsEquivalentRef, immunitesRef, resistances, statistiques, choix }) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.donsEquivalentRef = donsEquivalentRef;
    this.sortsEquivalentRef = sortsEquivalentRef;
    this.immunitesRef = immunitesRef;
    this.resistances = resistances;
    this.statistiques = statistiques;
    this.choix = choix;
  }

  saveState() {
    if (!this.donsEquivalentRef) this.donsEquivalentRef = [];
    if (!this.sortsEquivalentRef) this.sortsEquivalentRef = [];
    if (!this.immunitesRef) this.immunitesRef = [];
    if (!this.resistances) this.resistances = [];
    if (!this.statistiques) this.statistiques = [];
    if (!this.choix) this.choix = [];

    //Filter Out
    this.resistances.forEach(resistance => {
      resistance.resistance = null;
    });
    this.statistiques.forEach(statistique => {
      statistique.statistique = null;
    });

    return {
      nom: this.nom,
      description: this.description,
      donsEquivalentRef: this.donsEquivalentRef,
      sortsEquivalentRef: this.sortsEquivalentRef,
      immunitesRef: this.immunitesRef,
      resistances: this.resistances,
      statistiques: this.statistiques,
      choix: this.choix
    };
  }

  async load() {
    await this._getImmunites();
    await this._getResistances();
    await this._getStatistiques();
    return;
  }

  async _getImmunites() {
    if (this.immunitesRef) {
      this.immunitesRef.forEach(async immuniteRef => {
        if (!this.immunites) this.immunites = [];
        this.immunites.push(await getImmunite(immuniteRef));
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
}

const getAptitudes = async () => {
  return (await getDocs(query(collection(db, "aptitudes")), orderBy("nom"))).docs.map(snap => {
    return new Aptitude(snap.id, snap.data());
  });
};

const getAptitude = async id => {
  const snap = await getDoc(doc(db, `aptitudes/${id}`));
  const aptitude = new Aptitude(snap.id, snap.data());
  await aptitude.load();
  return aptitude;
};

const addAptitude = async aptitude => {
  return await addDoc(collection(db, `aptitudes`), aptitude.saveState());
};

const updateAptitude = async aptitude => {
  return await updateDoc(doc(db, `aptitudes/${aptitude.id}`), aptitude.saveState());
};

const deleteAptitude = async id => {
  return await deleteDoc(doc(db, `aptitudes/${id}`));
};

export { Aptitude, getAptitudes, getAptitude, addAptitude, updateAptitude, deleteAptitude };
