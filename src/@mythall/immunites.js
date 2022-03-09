import { db } from "../assets/js/firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";

class Immunite {
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

const getImmunites = async () => {
  return (await getDocs(query(collection(db, "immunites")), orderBy("nom"))).docs.map(snap => {
    return new Immunite(snap.id, snap.data());
  });
};

const getImmunite = async id => {
  const snap = await getDoc(doc(db, `immunites/${id}`));
  return new Immunite(snap.id, ...snap.data());
};

const addImmunite = async immunite => {
  return await addDoc(collection(db, `immunites`), immunite.saveState());
};

const updateImmunite = async immunite => {
  return await updateDoc(doc(db, `immunites/${immunite.id}`), immunite.saveState());
};

const deleteImmunite = async id => {
  return await deleteDoc(doc(db, `immunites/${id}`));
};

export { Immunite, getImmunites, getImmunite, addImmunite, updateImmunite, deleteImmunite };

// const immunites = [
//   "Effet de fracture",
//   "Charme",
//   "Malédictions",
//   "Renversement",
//   "Poisons",
//   "Maladie",
//   "Terreur",
//   "Sorts de mort",
//   "Domination",
//   "Contondant",
//   "Attaque sournoise",
//   "Renvoi",
//   "Cécité",
//   "Sommeil",
//   "Restriction de mouvement",
//   "Brise-Arme",
//   "Perforant",
//   "Sorts à Zone d'Effet",
//   "Ancrage",
//   "Désarmement",
//   "Faiblesse",
//   "Tranchant",
//   "Répulsion"
// ];
