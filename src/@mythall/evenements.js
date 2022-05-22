import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class InscriptionItem {
  constructor(userRef, joueur, personnageRef, personnage, groupe, taverne, present) {
    this.userRef = userRef;
    this.joueur = joueur; // Name only to avoid doing requests in the list
    this.personnageRef = personnageRef;
    this.personnage = personnage; // Name only to avoid doing requests in the list
    this.groupe = groupe;
    this.taverne = taverne;
    this.present = present;
  }
}

class Evenement {
  constructor(id, { date, saison, description, inscriptions, inscrits }) {
    this.id = id;
    this.date = date;
    this.saison = saison;
    this.description = description;
    this.inscriptions = inscriptions;
    this.inscrits = inscrits ? inscrits : 0;
  }

  saveState() {
    const inscriptionsMap = this.inscriptions.map(i => {
      return {
        ...i,
        taverne: i.taverne === "true" || i.taverne === true ? true : false,
        present: i.present === "true" || i.present === true ? true : false
      };
    });

    return {
      date: this.date,
      saison: this.saison,
      description: this.description,
      inscriptions: inscriptionsMap,
      inscrits: this.inscrits
    };
  }
}

const getEvenements = async () => {
  return (await getDocs(query(collection(db, "evenements")))).docs.map(snap => {
    return new Evenement(snap.id, snap.data());
  });
};

const getEvenement = async id => {
  const snap = await getDoc(doc(db, `evenements/${id}`));
  const evenement = new Evenement(snap.id, snap.data());
  return evenement;
};

const addEvenement = async evenement => {
  return await addDoc(collection(db, `evenements`), evenement.saveState());
};

const updateEvenement = async evenement => {
  return await updateDoc(doc(db, `evenements/${evenement.id}`), evenement.saveState());
};

const deleteEvenement = async id => {
  return await deleteDoc(doc(db, `evenements/${id}`));
};

export { Evenement, InscriptionItem, getEvenements, getEvenement, addEvenement, updateEvenement, deleteEvenement };
