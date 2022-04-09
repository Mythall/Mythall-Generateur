import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getEcole } from "./ecoles";

class SortItem {
  constructor({ sort, sortRef, niveauObtention }) {
    this.sort = sort ? sort : null;
    this.sortRef = sortRef ? sortRef : "";
    this.niveauObtention = niveauObtention ? niveauObtention : 1;
  }
}

class Sort {
  constructor(id, { nom, niveau, incantation, sommaire, description, ecoleRef, ecole, porteRef, porte, dureeRef, duree, zoneRef, zone }) {
    this.id = id;
    this.nom = nom;
    this.niveau = niveau;
    this.incantation = incantation;
    this.sommaire = sommaire;
    this.description = description;
    this.ecoleRef = ecoleRef;
    this.ecole = ecole;
    this.porte = porte;
    this.duree = duree;
    this.zone = zone;
  }

  saveState() {
    return {
      nom: this.nom,
      niveau: this.niveau,
      incantation: this.incantation,
      sommaire: this.sommaire,
      description: this.description,
      ecoleRef: this.ecoleRef,
      porte: this.porte,
      duree: this.duree,
      zone: this.zone
    };
  }

  async load() {
    this.ecole = await getEcole(this.ecoleRef);
    return;
  }
}

const getSorts = async () => {
  return (await getDocs(query(collection(db, "sorts"), orderBy("nom")))).docs.map(snap => {
    const sort = new Sort(snap.id, snap.data());
    return sort;
  });
};

const getSort = async id => {
  const snap = await getDoc(doc(db, `sorts/${id}`));
  const sort = new Sort(snap.id, snap.data());
  return sort;
};

const addSort = async sort => {
  return await addDoc(collection(db, `sorts`), sort.saveState());
};

const updateSort = async sort => {
  return await updateDoc(doc(db, `sorts/${sort.id}`), sort.saveState());
};

const deleteSort = async id => {
  return await deleteDoc(doc(db, `sorts/${id}`));
};

export { Sort, SortItem, getSorts, getSort, addSort, updateSort, deleteSort };
