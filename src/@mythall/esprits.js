import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getAptitude } from "./aptitudes";
import { getDon } from "./dons";
import { getSort } from "./sorts";

class Esprit {
  constructor(id, { nom, description, aptitudes, dons, sorts }) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.aptitudes = aptitudes;
    this.dons = dons;
    this.sorts = sorts;
  }

  saveState() {
    if (!this.aptitudes) this.aptitudes = [];
    if (!this.dons) this.dons = [];
    if (!this.sorts) this.sorts = [];

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
      description: this.description,
      aptitudes: this.aptitudes,
      dons: this.dons,
      sorts: this.sorts
    };
  }

  async load() {
    await this._getAptitudees();
    await this._getDons();
    await this._getSorts();
    return;
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
}

const getEsprits = async () => {
  return (await getDocs(query(collection(db, "esprits"), orderBy("nom")))).docs.map(snap => {
    return new Esprit(snap.id, snap.data());
  });
};

const getEsprit = async id => {
  const snap = await getDoc(doc(db, `esprits/${id}`));
  const esprit = new Esprit(snap.id, snap.data());
  // await esprit.load();
  return esprit;
};

const addEsprit = async esprit => {
  return await addDoc(collection(db, `esprits`), esprit.saveState());
};

const updateEsprit = async esprit => {
  return await updateDoc(doc(db, `esprits/${esprit.id}`), esprit.saveState());
};

const deleteEsprit = async id => {
  return await deleteDoc(doc(db, `esprits/${id}`));
};

export { Esprit, getEsprits, getEsprit, addEsprit, updateEsprit, deleteEsprit };
