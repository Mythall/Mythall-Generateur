import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { Timestamp } from "firebase/firestore";

class Featured {
  constructor(src, width, height) {
    this.src = src;
    this.width = width;
    this.height = height;
  }
}

class InscriptionItem {
  constructor(userRef, joueur, personnageRef, personnage, groupe, taverne, mobeu, present, tavernePaye) {
    this.userRef = userRef;
    this.joueur = joueur; // Name only to avoid doing requests in the list
    this.personnageRef = personnageRef;
    this.personnage = personnage; // Name only to avoid doing requests in the list
    this.groupe = groupe;
    this.taverne = taverne;
    this.mobeu = mobeu;
    this.present = present;
    this.tavernePaye = tavernePaye;
  }
}

class Evenement {
  constructor(id, { date, saison, titre, description, featured, inscriptions, inscrits, taverne, taverneLimit, mobeux, journee }) {
    this.id = id;
    this.date = date;
    this.saison = saison;
    this.featured = featured;
    this.titre = titre;
    this.description = description;
    this.inscriptions = inscriptions;
    this.inscrits = inscrits ? inscrits : 0;
    this.taverne = taverne;
    this.taverneLimit = taverneLimit ? taverneLimit : 0;
    this.mobeux = mobeux;
    this.journee = journee;
  }

  saveState() {
    return {
      date: this.date,
      saison: this.saison,
      featured: this.featured ? this.featured : {},
      titre: this.titre,
      description: this.description,
      inscriptions: this.inscriptions
        ? this.inscriptions.map(i => {
            return {
              ...i,
              mobeu: i.mobeu === "true" || i.mobeu === true ? true : false,
              taverne: i.taverne === "true" || i.taverne === true ? true : false,
              present: i.present === "true" || i.present === true ? true : false,
              tavernePaye: i.tavernePaye === "true" || i.tavernePaye === true ? true : false
            };
          })
        : [],
      inscrits: this.inscrits,
      taverne: this.taverne,
      taverneLimit: this.taverneLimit,
      mobeux: this.mobeux,
      journee: this.journee,
      updatedAt: Timestamp.now()
    };
  }
}

const getEvenements = async () => {
  return (await getDocs(query(collection(db, "evenements"), orderBy("updatedAt", "desc")))).docs.map(snap => {
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
  // Loading existing evenement & merging data to avoid overwriting other fields
  const existingEvenement = await getEvenement(evenement.id);
  const data = new Evenement(evenement.id, {
    ...existingEvenement,
    titre: evenement.titre,
    date: evenement.date,
    saison: evenement.saison,
    description: evenement.description,
    taverne: evenement.taverne,
    taverneLimit: evenement.taverneLimit,
    mobeux: evenement.mobeux,
    journee: evenement.journee
  });
  return await updateDoc(doc(db, `evenements/${evenement.id}`), data.saveState());
};

const updateInscription = async (evenement, inscription) => {
  const existingEvenement = await getEvenement(evenement.id);

  const entry = existingEvenement.inscriptions.find(i => i.userRef === inscription.userRef);
  entry.mobeu = inscription.mobeu;
  entry.taverne = inscription.taverne;
  entry.tavernePaye = inscription.tavernePaye;
  entry.present = inscription.present;

  return await updateDoc(doc(db, `evenements/${evenement.id}`), existingEvenement.saveState());
};

const deleteEvenement = async id => {
  return await deleteDoc(doc(db, `evenements/${id}`));
};

const preinscription = async (evenement, inscription) => {
  const existingEvenement = await getEvenement(evenement.id);
  existingEvenement.inscriptions.push(inscription);
  existingEvenement.inscrits++;
  return await updateDoc(doc(db, `evenements/${evenement.id}`), existingEvenement.saveState());
};

export { Evenement, InscriptionItem, getEvenements, getEvenement, addEvenement, updateEvenement, updateInscription, deleteEvenement, preinscription };
