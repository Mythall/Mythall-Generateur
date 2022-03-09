import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getStatistique } from "./statistiques";

// export class FourberieItem {
//   constructor() {
//     this.fourberie = null;
//     this.fourberieRef = '';
//     this.niveauObtention = 1;
//     this.niveauEffectif = 1;
//   }

//   fourberie: IFourberie;
//   fourberieRef: string;
//   niveauObtention: number;
//   niveauEffectif: number;
// }

class Fourberie {
  constructor(
    id,
    { nom, description, afficherNiveau, modificateurRef, fourberiesRequisRef, fourberiesRequis, donsEquivalentRef, donsEquivalent, modificateur }
  ) {
    this.id = id;
    this.id = nom;
    this.description = description;
    this.afficherNiveau = afficherNiveau;
    this.modificateurRef = modificateurRef;
    this.fourberiesRequisRef = fourberiesRequisRef;
    this.fourberiesRequis = fourberiesRequis;
    this.donsEquivalentRef = donsEquivalentRef;
    this.donsEquivalent = donsEquivalent;
    this.modificateur = modificateur;
  }

  saveState() {
    if (!this.afficherNiveau) this.afficherNiveau = false;
    if (!this.fourberiesRequisRef) this.fourberiesRequisRef = [];
    if (!this.donsEquivalentRef) this.donsEquivalentRef = [];

    return {
      nom: this.nom,
      description: this.description,
      afficherNiveau: this.afficherNiveau,
      fourberiesRequisRef: this.fourberiesRequisRef,
      donsEquivalentRef: this.donsEquivalentRef,
      modificateurRef: this.modificateurRef
    };
  }

  async load() {
    await this._getFourberiesRequis();
    await this._getModificateur();
  }

  async _getFourberiesRequis() {
    if (this.fourberiesRequisRef) {
      this.fourberiesRequisRef.forEach(async fourberieRequisRef => {
        const fourberieRequis = await getFourberie(fourberieRequisRef);
        if (!this.fourberiesRequis) this.fourberiesRequis = [];
        this.fourberiesRequis.push(fourberieRequis);
      });
    }
  }

  async _getModificateur() {
    if (this.modificateurRef) {
      this.modificateur = await getStatistique(this.modificateurRef);
    }
  }
}

const getFourberies = async () => {
  return (await getDocs(query(collection(db, "fourberies")), orderBy("nom"))).docs.map(snap => {
    return new Fourberie(snap.id, snap.data());
  });
};

const getFourberie = async id => {
  const snap = await getDoc(doc(db, `fourberies/${id}`));
  const fourberie = new Fourberie(snap.id, snap.data());
  // await fourberie.load();
  return fourberie;
};

const addFourberie = async fourberie => {
  return await addDoc(collection(db, `fourberies`), fourberie.saveState());
};

const updateFourberie = async fourberie => {
  return await updateDoc(doc(db, `fourberies/${fourberie.id}`), fourberie.saveState());
};

const deleteFourberie = async id => {
  return await deleteDoc(doc(db, `fourberies/${id}`));
};

export { Fourberie, getFourberies, getFourberie, addFourberie, updateFourberie, deleteFourberie };
