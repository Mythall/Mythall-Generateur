import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getStatistique } from "./statistiques";
import { getResistance } from "./resistances";
import { getImmunite } from "./immunites";

class DonItem {
  constructor({ don, donRef, niveauObtention, niveauEffectif }) {
    this.don = don ? don : null;
    this.donRef = donRef ? donRef : "";
    this.niveauObtention = niveauObtention ? niveauObtention : 1;
    this.niveauEffectif = niveauEffectif ? niveauEffectif : 1;
  }
}

// const DonCategories = ['Normal', 'Connaissance', 'Statistique', 'Résistance', 'Immunité', 'Maniement', 'Épique', 'Metamagie', 'Création', 'Spécialisation Martiale'];

class Don {
  constructor(
    id,
    {
      nom,
      description,
      niveauRequis,
      nlsRequis,
      niveauMaxObtention,
      categorie,
      afficherNiveau,
      modificateursRef,
      classesAutorise,
      donsRequisRef,
      donsRequis,
      immunitesRef,
      immunites,
      racesAutoriseRef,
      racesAutorise,
      resistances,
      statistiques,
      modificateurs
    }
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.niveauRequis = niveauRequis;
    this.nlsRequis = nlsRequis;
    this.niveauMaxObtention = niveauMaxObtention;
    this.categorie = categorie;
    this.afficherNiveau = afficherNiveau;
    this.modificateursRef = modificateursRef;
    this.classesAutorise = classesAutorise;
    this.donsRequisRef = donsRequisRef;
    this.donsRequis = donsRequis;
    this.immunitesRef = immunitesRef;
    this.immunites = immunites;
    this.racesAutoriseRef = racesAutoriseRef;
    this.racesAutorise = racesAutorise;
    this.resistances = resistances;
    this.statistiques = statistiques;
    this.modificateurs = modificateurs;
  }

  saveState() {
    if (!this.afficherNiveau) this.afficherNiveau = false;
    if (!this.classesAutorise) this.classesAutorise = [];
    if (!this.donsRequisRef) this.donsRequisRef = [];
    if (!this.immunitesRef) this.immunitesRef = [];
    if (!this.racesAutoriseRef) this.racesAutoriseRef = [];
    if (!this.resistances) this.resistances = [];
    if (!this.statistiques) this.statistiques = [];
    if (!this.modificateursRef) this.modificateursRef = [];

    //Filter Out
    this.classesAutorise.forEach(classe => {
      classe.classe = null;
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
      niveauRequis: this.niveauRequis,
      nlsRequis: this.nlsRequis,
      niveauMaxObtention: this.niveauMaxObtention,
      categorie: this.categorie,
      afficherNiveau: this.afficherNiveau,
      classesAutorise: this.classesAutorise,
      donsRequisRef: this.donsRequisRef,
      immunitesRef: this.immunitesRef,
      racesAutoriseRef: this.racesAutoriseRef,
      resistances: this.resistances,
      statistiques: this.statistiques,
      modificateursRef: this.modificateursRef
    };
  }

  async load() {
    await this._getImmunites();
    await this._getResistances();
    await this._getStatistiques();
    await this._getModificateur();
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

  async _getModificateur() {
    if (this.modificateursRef && this.modificateursRef.length > 0) {
      this.modificateursRef.forEach(async modificateurRef => {
        if (!this.modificateurs) this.modificateurs = [];
        this.modificateurs.push(await getStatistique(modificateurRef));
      });
    }
  }
}

const getDons = async () => {
  return (await getDocs(query(collection(db, "dons")), orderBy("nom"))).docs.map(snap => {
    return new Don(snap.id, snap.data());
  });
};

const getDon = async id => {
  const snap = await getDoc(doc(db, `dons/${id}`));
  const don = new Don(snap.id, snap.data());
  // await don.load();
  return don;
};

const addDon = async don => {
  return await addDoc(collection(db, `dons`), don.saveState());
};

const updateDon = async don => {
  return await updateDoc(doc(db, `dons/${don.id}`), don.saveState());
};

const deleteDon = async id => {
  return await deleteDoc(doc(db, `dons/${id}`));
};

export { Don, DonItem, getDons, getDon, addDon, updateDon, deleteDon };

// ...
// Verifier ses methodes servaient à quoi

// private getClassesAuthorise(don: Don, observableBatch: any[]) {
//   if (don.classesAutorise && don.classesAutorise.length > 0) {
//     don.classesAutorise.forEach(classeAuthorise => {
//       observableBatch.push(this.db.doc$('classes/' + classeAuthorise.classeRef).pipe(
//         map((classe: Classe) => {
//           classeAuthorise.classe = classe;
//         }), first()
//       ))
//     });
//   }
// }

// private getDonsRequis(don: Don, observableBatch: any[]) {
//   if (don.donsRequisRef) {
//     don.donsRequisRef.forEach(donRequisRef => {
//       observableBatch.push(this.getDon(donRequisRef).pipe(
//         map((don: Don) => {
//           if (!don.donsRequis) don.donsRequis = [];
//           don.donsRequis.push(don);
//         }), first()
//       ))
//     });
//   }
// }

// private getRaces(don: Don, observableBatch: any[]) {
//   if (don.racesAutoriseRef) {
//     don.racesAutoriseRef.forEach(raceRef => {
//       observableBatch.push(this.db.doc$('races/' + raceRef).pipe(
//         map((race: Race) => {
//           if (!don.racesAutorise) don.racesAutorise = [];
//           don.racesAutorise.push(race);
//         }),
//         first()
//       ))
//     });
//   }
// }
