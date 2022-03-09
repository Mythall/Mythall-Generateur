import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class Resistance {
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

const getResistances = async () => {
  return (await getDocs(query(collection(db, "resistances")), orderBy("nom"))).docs.map(snap => {
    return new Resistance(snap.id, snap.data());
  });
};

const getResistance = async id => {
  const snap = await getDoc(doc(db, `resistances/${id}`));
  return new Resistance(snap.id, snap.data());
};

const addResistance = async resistance => {
  return await addDoc(collection(db, `resistances`), resistance.saveState());
};

const updateResistance = async resistance => {
  return await updateDoc(doc(db, `resistances/${resistance.id}`), resistance.saveState());
};

const deleteResistance = async id => {
  return await deleteDoc(doc(db, `resistances/${id}`));
};

export { Resistance, getResistances, getResistance, addResistance, updateResistance, deleteResistance };

// const resistances = [
//   "Maladie",
//   "Feu",
//   "rage",
//   "Foudre",
//   "Sorts à Zone d'Effet",
//   "Faiblesse aux Effets de Renvoi",
//   "Poison",
//   "Perforant",
//   "Désarmement",
//   "Tranchant",
//   "Répulsion",
//   "Renversement",
//   "Désarmement",
//   "Brise Bouclier",
//   "Attaques Sournoises",
//   "Contondant",
//   "Domination",
//   "Charme",
//   "Froid",
//   "Faiblesse à la Lumière",
//   "confusion",
//   "Terreur",
//   "Mort"
// ];
