import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { getEcole } from "./ecoles";
import { getPorte } from "./portes";
import { getDuree } from "./durees";
import { getZone } from "./zones";

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
    this.porteRef = porteRef;
    this.dureeRef = dureeRef;
    this.zoneRef = zoneRef;
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
      porteRef: this.porteRef,
      dureeRef: this.dureeRef,
      zoneRef: this.zoneRef
    };
  }

  async load() {
    this.ecole = await getEcole(this.ecoleRef);
    this.porte = await getPorte(this.porteRef);
    this.duree = await getDuree(this.dureeRef);
    this.zone = await getZone(this.zoneRef);
    return;
  }
}

const getSorts = async () => {
  return (await getDocs(query(collection(db, "sorts")), orderBy("nom"))).docs.map(snap => {
    return new Sort(snap.id, snap.data());
  });
};

const getSort = async id => {
  const snap = await getDoc(doc(db, `sorts/${id}`));
  const sort = new Sort(snap.id, snap.data());
  await sort.load();
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
