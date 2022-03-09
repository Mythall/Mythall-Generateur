import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

const StatistiqueIds = {
  Constitution: "OdzM6YHkYw41HXMIcTsw",
  Dextérité: "oFeJq3NgdDDEwi0Y1rdR",
  Force: "gOg0TFSbU8mvlv8baCXE",
  Intelligence: "yKfNuFBQY5UknrTNOxpA",
  Sagesse: "HkaChqWpHOlINdla02ja",
  PVTorse: "sCcNIQDoWKUIIcSpkB2m",
  PVBras: "ZSnV9s6cyzYihdFR6wfr",
  PVJambes: "69jKTq64XUCk51EmY0Z1",
  Lutte: "Rp8BG8OtlNKl8aeuojdi",
  Mana: "3f75skgSz3CWqdERXcqG",
  Ki: "py44fmGyDCUnkkBZmto9"
};

class Statistique {
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

const getStatistiques = async () => {
  return (await getDocs(query(collection(db, "statistiques")), orderBy("nom"))).docs.map(snap => {
    return new Statistique(snap.id, snap.data());
  });
};

const getStatistique = async id => {
  const snap = await getDoc(doc(db, `statistiques/${id}`));
  return new Statistique(snap.id, snap.data());
};

const addStatistique = async statistique => {
  return await addDoc(collection(db, `statistiques`), statistique.saveState());
};

const updateStatistique = async statistique => {
  return await updateDoc(doc(db, `statistiques/${statistique.id}`), statistique.saveState());
};

const deleteStatistique = async id => {
  return await deleteDoc(doc(db, `statistiques/${id}`));
};

export { Statistique, getStatistiques, getStatistique, addStatistique, updateStatistique, deleteStatistique, StatistiqueIds };

// const statistiques = ["Constitution", "Dextérité", "Force", "Intelligence", "Sagesse", "PVTorse", "PVBras", "PVJambes", "Lutte", "Mana", "Ki"];
