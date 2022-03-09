import { db } from "../assets/js/firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";

class Porte {
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

const getPortes = async () => {
  return (await getDocs(query(collection(db, "portes")), orderBy("nom"))).docs.map(snap => {
    return new Porte(snap.id, snap.data());
  });
};

const getPorte = async id => {
  const snap = await getDoc(doc(db, `portes/${id}`));
  return new Porte(snap.id, ...snap.data());
};

const addPorte = async porte => {
  return await addDoc(collection(db, `portes`), porte.saveState());
};

const updatePorte = async porte => {
  return await updateDoc(doc(db, `portes/${porte.id}`), porte.saveState());
};

const deletePorte = async id => {
  return await deleteDoc(doc(db, `portes/${id}`));
};

export { Porte, getPortes, getPorte, addPorte, updatePorte, deletePorte };

// const portes = ["Spécial", "Jet de riz", "5 Mètres", "Personnelle", "Portée de voix", "2 Mètres", "Contact"];
