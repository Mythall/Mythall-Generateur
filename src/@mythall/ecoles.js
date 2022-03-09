import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class Ecole {
  constructor(id, { nom }) {
    this.id = id;
    this.nom = nom;
  }

  saveState() {
    return {
      nom: this.nom
    };
  }
}

const getEcoles = async () => {
  return (await getDocs(query(collection(db, "ecoles")), orderBy("nom"))).docs.map(snap => {
    return new Ecole(snap.id, snap.data());
  });
};

const getEcole = async id => {
  const snap = await getDoc(doc(db, `ecoles/${id}`));
  return new Ecole(snap.id, snap.data());
};

const addEcole = async ecole => {
  return await addDoc(collection(db, `ecoles`), ecole.saveState());
};

const updateEcole = async ecole => {
  return await updateDoc(doc(db, `ecoles/${ecole.id}`), ecole.saveState());
};

const deleteEcole = async id => {
  return await deleteDoc(doc(db, `ecoles/${id}`));
};

export { Ecole, getEcoles, getEcole, addEcole, updateEcole, deleteEcole };

// const ecoles = [
//   "Général",
//   "Abjuration",
//   "Conjuration",
//   "Divination",
//   "Enchantement",
//   "Évocation",
//   "Illusion",
//   "Invocation",
//   "Nécromancie",
//   "Transmutation"
// ];
