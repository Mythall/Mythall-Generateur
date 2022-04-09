import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class Alignement {
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

const getAlignements = async () => {
  return (await getDocs(query(collection(db, "alignements"), orderBy("nom")))).docs.map(snap => {
    return new Alignement(snap.id, snap.data());
  });
};

const getAlignement = async id => {
  const snap = await getDoc(doc(db, `alignements/${id}`));
  return new Alignement(snap.id, snap.data());
};

const addAlignement = async alignement => {
  return await addDoc(collection(db, `alignements`), alignement.saveState());
};

const updateAlignement = async alignement => {
  return await updateDoc(doc(db, `alignements/${alignement.id}`), alignement.saveState());
};

const deleteAlignement = async id => {
  return await deleteDoc(doc(db, `alignements/${id}`));
};

export { Alignement, getAlignements, getAlignement, addAlignement, updateAlignement, deleteAlignement };

// const alignement = [
//   "Loyal Bon",
//   "Neutre Bon",
//   "Chaotique Bon",
//   "Loyal Neutre",
//   "Neutre Stricte",
//   "Chaotique Neutre",
//   "Loyal Mauvais",
//   "Neutre Mauvais",
//   "Chaotique Mauvais"
// ];
