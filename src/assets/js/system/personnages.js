import { db } from "../firebase";
import { doc, getDoc, getDocs, collection, query, orderBy, where } from "firebase/firestore";

class Personnage {
  constructor(id, { nom, user, alignement, race, niveauEffectif, niveauReel, niveauProfane, niveauDivin, niveauDisponible, gnEffectif, vie }) {
    //
    this.id = id ? id : null;
    this.nom = nom ? nom : null;
    // this.user = user ? user : null;
    // this.alignement = alignement ? alignement : null;
    this.race = race ? race : null;
    // this.statistiques: StatistiqueValue[];
    // this.capaciteSpeciales: StatistiqueValue[]; //Display Only, not saved
    // this.resistances: ResistanceValue[];
    // this.immunites: IImmunite[];
    // this.esprit: IEsprit;
    // this.ecole = ecole;
    // this.dieu: IDieu;
    // this.ordres: IOrdre[];
    // this.domaines: IDomaine[];

    // this.niveauEffectif = niveauEffectif ? niveauEffectif : 0;
    // this.niveauReel = niveauReel ? niveauReel : 0;
    // this.niveauProfane = niveauProfane ? niveauProfane : 0;
    // this.niveauDivin = niveauDivin ? niveauDivin : 0;
    // this.niveauDisponible = niveauDisponible ? niveauDisponible : 0;
    // this.gnEffectif = gnEffectif ? gnEffectif : 0;
    // this.vie = vie ? vie : 5;
  }

  // saveState() {
  //   return {
  //     nom: this.nom,
  //     userRef: this.userRef,
  //     // classes: ClasseItem[];
  //     alignement: this.alignement,
  //     // dons: DonItem[];
  //     // aptitudes: AptitudeItem[];
  //     // sorts: SortItem[];
  //     // fourberies: FourberieItem[];
  //     // raceRef: string;
  //     gnEffectif: this.gnEffectif,
  //     // espritRef: string;
  //     ecole: this.ecole,
  //     // dieuRef: string;
  //     // ordresRef: string[];
  //     // domainesRef: string[];
  //     vie: this.vie
  //   };
}

const getPersonnages = async () => {
  return (await getDocs(query(collection(db, "personnages")), orderBy("createdAt"))).docs.map(snap => {
    return new Personnage(snap.id, snap.data());
  });
};

const getPersonnagesFromUserId = async userId => {
  const ref = collection(db, "personnages");
  const q = query(ref, where("userRef", "==", `${userId}`));
  return (await getDocs(q)).docs.map(snap => {
    return new Personnage(snap.id, snap.data());
  });
};

const getPersonnage = async id => {
  const snap = await getDoc(doc(db, `personnages/${id}`));
  return new Personnage(snap.id, snap.data());
};

export { Personnage, getPersonnages, getPersonnagesFromUserId, getPersonnage };
