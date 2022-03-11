import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getClasse } from "./classes";

class Ordre {
  constructor(id, { nom, description, classeRef, multiclassementRef, multiclassement, alignementPermisRef, alignementPermis }) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.classeRef = classeRef;
    this.multiclassementRef = multiclassementRef;
    this.multiclassement = multiclassement;
    this.alignementPermisRef = alignementPermisRef;
    this.alignementPermis = alignementPermis;
  }

  saveState() {
    return {
      nom: this.nom,
      description: this.description,
      classeRef: this.classeRef,
      multiclassementRef: this.multiclassementRef,
      alignementPermisRef: this.alignementPermisRef
    };
  }

  async load() {
    await this._getClasses();
    return;
  }

  async _getClasses() {
    if (this.multiclassementRef) {
      this.multiclassementRef.forEach(async classeRef => {
        if (!this.multiclassement) this.multiclassement = [];
        this.multiclassement.push(await getClasse(classeRef));
      });
    }
  }
}

const getOrdres = async () => {
  return (await getDocs(query(collection(db, "ordres")), orderBy("nom"))).docs.map(snap => {
    return new Ordre(snap.id, snap.data());
  });
};

const getOrdre = async id => {
  const snap = await getDoc(doc(db, `ordres/${id}`));
  const ordre = new Ordre(snap.id, snap.data());
  // await ordre.load();
  return ordre;
};

const addOrdre = async ordre => {
  return await addDoc(collection(db, `ordres`), ordre.saveState());
};

const updateOrdre = async ordre => {
  return await updateDoc(doc(db, `ordres/${ordre.id}`), ordre.saveState());
};

const deleteOrdre = async id => {
  return await deleteDoc(doc(db, `ordres/${id}`));
};

export { Ordre, getOrdres, getOrdre, addOrdre, updateOrdre, deleteOrdre };
