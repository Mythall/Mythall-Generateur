import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getAptitude } from "./aptitudes";
import { getClasse } from "./classes";
import { getDon } from "./dons";
import { getSort } from "./sorts";

class Domaine {
  constructor(id, { nom, bonus, choix, aptitudes, dons, sorts, domaineContraireRef, domaineContraire, alignementPermisRef, alignementPermis, multiclassementRef, multiclassement }) {
    this.id = id;
    this.nom = nom;
    this.bonus = bonus;
    this.choix = choix;
    this.aptitudes = aptitudes;
    this.dons = dons;
    this.sorts = sorts;
    this.domaineContraireRef = domaineContraireRef;
    this.domaineContraire = domaineContraire;
    this.alignementPermisRef = alignementPermisRef;
    this.alignementPermis = alignementPermis;
    this.multiclassementRef = multiclassementRef;
    this.multiclassement = multiclassement;
  }

  saveState() {
    if (!this.aptitudes) this.aptitudes = [];
    if (!this.dons) this.dons = [];
    if (!this.sorts) this.sorts = [];
    if (!this.choix) this.choix = [];

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

    return {
      nom: this.nom,
      bonus: this.bonus,
      domaineContraireRef: this.domaineContraireRef,
      alignementPermisRef: this.alignementPermisRef,
      multiclassementRef: this.multiclassementRef,
      aptitudes: this.aptitudes,
      dons: this.dons,
      sorts: this.sorts,
      choix: this.choix
    };
  }

  async load () {
    await this._getClasses();
    await this._getDomaineContraire();
    await this._getAptitudees();
    await this._getDons();
    await this._getSorts();
  }

  async _getDomaineContraire() {
    this.domaineContraire = await getDomaine(this.domaineContraireRef);
  }

  async _getClasses() {
    if (this.multiclassementRef) {
      this.multiclassementRef.forEach(async (classeRef) => {
        const classe = await getClasse(classeRef);
        if (!this.multiclassement) this.multiclassement = [];
        this.multiclassement.push(classe);
      });
    }
  }

  async _getAptitudees(this) {
    if (this.aptitudes && this.aptitudes.length > 0) {
      this.aptitudes.forEach(async (aptitudeItem) => {
        aptitudeItem.aptitude = await getAptitude(aptitudeItem.aptitudeRef);
      });
    }
  }

  async _getDons(this) {
    if (this.dons && this.dons.length > 0) {
      this.dons.forEach(async (donItem) => {
        donItem.don = await getDon(donItem.donRef);
      });
    }
  }

  async _getSorts(this) {
    if (this.sorts && this.sorts.length > 0) {
      this.sorts.forEach(async (sortItem) => {
        sortItem.sort = await getSort(sortItem.sortRef);
      });
    }
  }

}

const getDomaines = async () => {
  return (await getDocs(query(collection(db, "domaines")), orderBy("nom"))).docs.map(snap => {
    return new Domaine(snap.id, snap.data());
  });
};

const getDomaine = async id => {
  const snap = await getDoc(doc(db, `domaines/${id}`));
  const domaine = new Domaine(snap.id, snap.data());
  // await domaine.load();
  return domaine;
};

const addDomaine = async domaine => {
  return await addDoc(collection(db, `domaines`), domaine.saveState());
};

const updateDomaine = async domaine => {
  return await updateDoc(doc(db, `domaines/${domaine.id}`), domaine.saveState());
};

const deleteDomaine = async id => {
  return await deleteDoc(doc(db, `domaines/${id}`));
};

export { Domaine, getDomaines, getDomaine, addDomaine, updateDomaine, deleteDomaine };