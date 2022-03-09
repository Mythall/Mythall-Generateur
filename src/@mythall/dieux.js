import { db } from "../assets/js/firebase";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";

class Dieu {
  constructor(
    id,
    {
      nom,
      alignement,
      alignementPermis,
      domaines,
      prononciation,
      titre,
      rang,
      alignementRef,
      alignementPermisRef,
      domainesRef,
      armeDePredilection,
      relations,
      dogmes
    }
  ) {
    this.id = id;
    this.nom = nom;
    this.alignement = alignement;
    this.alignementPermis = alignementPermis;
    this.domaines = domaines;
    this.prononciation = prononciation;
    this.titre = titre;
    this.rang = rang;
    this.alignementRef = alignementRef;
    this.alignementPermisRef = alignementPermisRef;
    this.domainesRef = domainesRef;
    this.armeDePredilection = armeDePredilection;
    this.relations = relations;
    this.dogmes = dogmes;
  }

  saveState() {
    return {
      nom: this.nom,
      prononciation: this.prononciation,
      titre: this.titre,
      rang: this.rang,
      alignementRef: this.alignementRef,
      alignementPermisRef: this.alignementPermisRef,
      domainesRef: this.domainesRef,
      armeDePredilection: this.armeDePredilection,
      relations: this.relations,
      dogmes: this.dogmes
    };
  }
}

const getDieux = async () => {
  return (await getDocs(query(collection(db, "dieux")), orderBy("nom"))).docs.map(snap => {
    return new Dieu(snap.id, snap.data());
  });
};

const getDieu = async id => {
  const snap = await getDoc(doc(db, `dieux/${id}`));
  return new Dieu(snap.id, ...snap.data());
};

const addDieu = async dieu => {
  return await addDoc(collection(db, `dieux`), dieu.saveState());
};

const updateDieu = async dieu => {
  return await updateDoc(doc(db, `dieux/${dieu.id}`), dieu.saveState());
};

const deleteDieu = async id => {
  return await deleteDoc(doc(db, `dieux/${id}`));
};

export { Dieu, getDieux, getDieu, addDieu, updateDieu, deleteDieu };
