import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getClasse } from "./classes";
import { getResistance } from "./resistances";
import { getStatistique } from "./statistiques";
import { getImmunite } from "./immunites";
import { getSort } from "./sorts";
import { getDon } from "./dons";

class Race {
  constructor(
    id,
    {
      nom,
      description,
      obligations,
      avantages,
      desavantages,
      alignementPermisRef,
      classesDisponibleRef,
      ajustement,
      statistiques,
      resistances,
      immunitesRef,
      sortsRacialRef,
      donsRacialRef,
      aptitudesRacialRef,
      alignementPermis,
      classesDisponible,
      immunites,
      sortsRacial,
      donsRacial,
      aptitudesRacial
    }
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.obligations = obligations;
    this.avantages = avantages;
    this.desavantages = desavantages;
    this.alignementPermisRef = alignementPermisRef;
    this.classesDisponibleRef = classesDisponibleRef;
    this.ajustement = ajustement;
    this.statistiques = statistiques ? statistiques : [];
    this.resistances = resistances ? resistances : [];
    this.immunitesRef = immunitesRef ? immunitesRef : [];
    this.sortsRacialRef = sortsRacialRef ? sortsRacialRef : [];
    this.donsRacialRef = donsRacialRef ? donsRacialRef : [];
    this.aptitudesRacialRef = aptitudesRacialRef ? aptitudesRacialRef : [];
    this.alignementPermis = alignementPermis;
    this.classesDisponible = classesDisponible ? classesDisponible : [];
    this.immunites = immunites ? immunites : [];
    this.sortsRacial = sortsRacial ? sortsRacial : [];
    this.donsRacial = donsRacial ? donsRacial : [];
    this.aptitudesRacial = aptitudesRacial ? aptitudesRacial : [];
  }

  saveState() {
    if (!this.resistances) this.resistances = [];
    if (!this.statistiques) this.statistiques = [];
    if (!this.immunitesRef) this.immunitesRef = [];
    if (!this.sortsRacialRef) this.sortsRacialRef = [];
    if (!this.donsRacialRef) this.donsRacialRef = [];
    if (!this.aptitudesRacialRef) this.aptitudesRacialRef = [];

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
      obligations: this.obligations,
      avantages: this.avantages,
      desavantages: this.desavantages,
      alignementPermisRef: this.alignementPermisRef,
      classesDisponibleRef: this.classesDisponibleRef,
      ajustement: this.ajustement,
      statistiques: this.statistiques,
      resistances: this.resistances,
      immunitesRef: this.immunitesRef,
      sortsRacialRef: this.sortsRacialRef,
      donsRacialRef: this.donsRacialRef,
      aptitudesRacialRef: this.aptitudesRacialRef
    };
  }

  async load() {
    await this._getClasses();
    await this._getResistances();
    await this._getStatistiques();
    await this._getImmunites();
    await this._getSortsRaciaux();
    await this._getDonsRaciaux();
    return;
  }

  async _getClasses() {
    if (this.classesDisponibleRef) {
      this.classesDisponibleRef.forEach(async classeRef => {
        const classe = await getClasse(classeRef);
        if (!this.classesDisponible) this.classesDisponible = [];
        this.classesDisponible.push(classe);
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

  async _getSortsRaciaux() {
    if (this.sortsRacialRef) {
      this.sortsRacialRef.forEach(async sortRaciauxRef => {
        if (!this.sortsRacial) this.sortsRacial = [];
        this.sortsRacial.push(await getSort(sortRaciauxRef));
      });
    }
  }

  async _getDonsRaciaux() {
    if (this.donsRacialRef) {
      this.donsRacialRef.forEach(async donRaciauxRef => {
        const don = await getDon(donRaciauxRef);
        if (!this.donsRacial) this.donsRacial = [];
        this.donsRacial.push(don);
      });
    }
  }
}

const getRaces = async () => {
  return (await getDocs(query(collection(db, "races")), orderBy("nom"))).docs.map(snap => {
    console.log(snap.data());
    return new Race(snap.id, snap.data());
  });
};

const getRace = async id => {
  const snap = await getDoc(doc(db, `races/${id}`));
  const race = new Race(snap.id, snap.data());
  // await race.load();
  return race;
};

const addRace = async race => {
  return await addDoc(collection(db, `races`), race.saveState());
};

const updateRace = async race => {
  return await updateDoc(doc(db, `races/${race.id}`), race.saveState());
};

const deleteRace = async id => {
  return await deleteDoc(doc(db, `races/${id}`));
};

export { Race, getRaces, getRace, addRace, updateRace, deleteRace };
