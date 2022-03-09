import { db } from "../assets/js/firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";

class Duree {
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

const getDurees = async () => {
  return (await getDocs(query(collection(db, "durees")), orderBy("nom"))).docs.map(snap => {
    return new Duree(snap.id, snap.data());
  });
};

const getDuree = async id => {
  const snap = await getDoc(doc(db, `durees/${id}`));
  return new Duree(snap.id, ...snap.data());
};

const addDuree = async duree => {
  return await addDoc(collection(db, `durees`), duree.saveState());
};

const updateDuree = async duree => {
  return await updateDoc(doc(db, `durees/${duree.id}`), duree.saveState());
};

const deleteDuree = async id => {
  return await deleteDoc(doc(db, `durees/${id}`));
};

export { Duree, getDurees, getDuree, addDuree, updateDuree, deleteDuree };

// const durees = [
//   "1 Heure par niveau",
//   "2 Heures",
//   "5 minutes par NLS",
//   "1 seconde + 1 seconde par 5 NLS",
//   "15 secondes par 5 NLS",
//   "Instantanée",
//   "2 Coups",
//   "20 secondes par NLS",
//   "15 Secondes",
//   "1 Combat / 10 Minutes",
//   "1 minute",
//   "1 Heure",
//   "3 Heures",
//   "10 minutes par 5 NLS",
//   "20 secondes",
//   "1 Charge par 3 NLS",
//   "1 min/NLS",
//   "3 minutes par niveau",
//   "30 secondes par 10 NLS",
//   "1 événement",
//   "2 Minutes",
//   "1 Minute par niveau",
//   "Spéciale",
//   "20 Minutes",
//   "15 minutes + 1 minute par NLS",
//   "5 secondes + 5 secondes par 4 NLS",
//   "1 Heure par 2 NLS",
//   "30 secondes par niveau de lanceur de sorts",
//   "30 secondes par 3 NLS",
//   "1 heure par NLS",
//   "2 Minutes par niveau",
//   "10 minutes",
//   "5 minutes",
//   "60 Secondes",
//   "Permanent",
//   "5 secondes",
//   "1 coup par 5 niveaux de lanceur de sorts",
//   "15 minutes par NLS",
//   "10 minutes par NLS",
//   "10 Secondes par niveau",
//   "1 minute par 5 NLS",
//   "1 Heure par 3 niveaux",
//   "5 sec par NLS",
//   "1 seconde par 3 niveaux de lanceur de sorts",
//   "1 minute par 4 NLS",
//   "15 minutes",
//   "30 secondes",
//   "10 minutes par niveau",
//   "5 secondes + 5 secondes par NLS"
// ];
