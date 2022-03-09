import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "../assets/js/firebase";

class Zone {
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

const getZones = async () => {
  return (await getDocs(query(collection(db, "zones")), orderBy("nom"))).docs.map(snap => {
    return new Zone(snap.id, snap.data());
  });
};

const getZone = async id => {
  const snap = await getDoc(doc(db, `zones/${id}`));
  return new Zone(snap.id, snap.data());
};

const addZone = async zone => {
  return await addDoc(collection(db, `zones`), zone.saveState());
};

const updateZone = async zone => {
  return await updateDoc(doc(db, `zones/${zone.id}`), zone.saveState());
};

const deleteZone = async id => {
  return await deleteDoc(doc(db, `zones/${id}`));
};

export { Zone, getZones, getZone, addZone, updateZone, deleteZone };

// const zones = [
//   "5m de rayon",
//   "1 Personne par 2 niveaux du lanceur de sorts à moins de 5 mètres",
//   "1 Créature morte",
//   "Alliés compris dans un rayon de 5 m",
//   "1 Objet",
//   "Portée de voix",
//   "Personnelle",
//   "2 membres (1 cible)",
//   "Spéciale",
//   "3m de rayon (zone statique)",
//   "5 m de rayon (zone statique)",
//   "1 Personne",
//   "3m de rayon",
//   "1 personne par 3 NLS",
//   "1 Personne par 2 Niveau du lanceur de sorts",
//   "1 personnne pour l'éclair ou 2m de rayon s'il pleut",
//   "1 Créature",
//   "3 Mort-vivant par 7 NLS",
//   "1 membre par 2 NLS (1 cible)",
//   "1 Créature touchée",
//   "Jet de Riz",
//   "1 Arme",
//   "2 personnes + 1 par NLS après l’obtention du sort (Lanceur de sort compris)",
//   "3 Personne + le lanceur de sort + 1 Personne par niveau à l’obtention du sort"
// ];
