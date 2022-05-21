import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { statistiqueIds } from "./statistiques";

const collectionName = 'progressionSortsRecopiables';

class ProgressionSortsRecopiablesItem {
  constructor({ niveauMagicien, niveauSortPermis, quantiteSortsPermis }) {
    this.niveauMagicien = niveauMagicien ? niveauMagicien : null;
    this.niveauSortPermis = niveauSortPermis ? niveauSortPermis : 0;
    this.quantiteSortsPermis = quantiteSortsPermis ? quantiteSortsPermis : 0;
  }
}

class ProgressionSortsRecopiables {
  constructor(id, { niveauMagicien, niveauSortPermis, quantiteSortsPermis }) {
    this.id = id;
    this.niveauMagicien = niveauMagicien;
    this.niveauSortPermis = niveauSortPermis;
    this.quantiteSortsPermis = quantiteSortsPermis;
  }

  saveState() {
    return {
      niveauMagicien: this.niveauMagicien,
      niveauSortPermis: this.niveauSortPermis,
      quantiteSortsPermis: this.quantiteSortsPermis,
    };
  }
}

const getAllProgressionSortsRecopiables = async () => {
  return (await getDocs(query(collection(db, collectionName)))).docs.map(snap => {
    return new ProgressionSortsRecopiables(snap.id, snap.data());
  });
};

const findProgressionSortsRecopiablesById = async id => {
  const snap = await getDoc(doc(db, `${collectionName}/${id}`));
  return new ProgressionSortsRecopiables(snap.id, snap.data());
};

const findProgressionSortsRecopiables = async (personnage, progressingClasse) => {
  let progressionSortsRecopiables = await _findProgressionSortsRecopiablesByNiveauMagicien(progressingClasse.niveau);

  if (progressionSortsRecopiables.niveauSortPermis < 9 && personnage.statistiques.filter(stat => stat.statistique.id === statistiqueIds.Intelligence && stat.valeur > 0).length > 0) {
    progressionSortsRecopiables.niveauSortPermis += 1;
  }

  return progressionSortsRecopiables;
};

const _findProgressionSortsRecopiablesByNiveauMagicien = async niveau => {
  const q = query(collection(db, collectionName), where("niveauMagicien", "==", niveau));
  const snapDocs = (await getDocs(q)).docs;

  if (snapDocs.length < 1) {
    console.log('Sorts recopiables non trouvés');
    return;
  }

  return new ProgressionSortsRecopiables(snapDocs[0].id, snapDocs[0].data());
};

const addProgressionSortsRecopiables = async progression => {
  return await addDoc(collection(db, collectionName), progression.saveState());
};

const updateProgressionSortsRecopiables = async progression => {
  return await updateDoc(doc(db, `${collectionName}/${progression.id}`), progression.saveState());
};

const deleteProgressionSortsRecopiables = async id => {
  return await deleteDoc(doc(db, `${collectionName}/${id}`));
};

export {
  ProgressionSortsRecopiablesItem,
  ProgressionSortsRecopiables,
  findProgressionSortsRecopiables
};
