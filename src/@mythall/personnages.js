import { db } from "../assets/js/firebase";
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

  // _saveState(item) {
  //   if (!item.dieuRef) item.dieuRef = '';
  //   if (!item.ecoleRef) item.ecoleRef = '';
  //   if (!item.espritRef) item.espritRef = '';
  //   if (!item.ordresRef) item.ordresRef = [];
  //   if (!item.domainesRef) item.domainesRef = [];

  //   // Filter Out Race Dons / Sorts / Fourberies / Aptitudes
  //   if (item.race) {

  //     // Race
  //     if (item.dons && item.dons.length > 0) {
  //       let donsTemporaire = [];
  //       item.dons.forEach(don => {
  //         let found = false;
  //         item.race.donsRacialRef.forEach(id => {
  //           if (id == don.donRef) {
  //             found = true;
  //           }
  //         });

  //         if (!found) {
  //           donsTemporaire.push(don);
  //         }

  //       });
  //       item.dons = donsTemporaire;
  //     }

  //     // Sorts
  //     if (item.sorts && item.sorts.length > 0) {
  //       let sortsTemporaire = [];
  //       item.sorts.forEach(sort => {
  //         let found = false;
  //         item.race.sortsRacialRef.forEach(id => {
  //           if (id == sort.sortRef) {
  //             found = true;
  //           }
  //         });

  //         if (!found) {
  //           sortsTemporaire.push(sort);
  //         }

  //       });
  //       item.sorts = sortsTemporaire;
  //     }

  //     // Aptitudes
  //     if (item.aptitudes && item.aptitudes.length > 0) {
  //       let aptitudesTemporaire = [];
  //       item.aptitudes.forEach(aptitude => {
  //         let found = false;
  //         item.race.aptitudesRacialRef.forEach(id => {
  //           if (id == aptitude.aptitudeRef) {
  //             found = true;
  //           }
  //         });

  //         if (!found) {
  //           aptitudesTemporaire.push(aptitude);
  //         }

  //       });
  //       item.aptitudes = aptitudesTemporaire;
  //     }

  //   }

  //   //Filter Out Populated Objects
  //   item.classes.forEach(classeItem => {
  //     classeItem.classe = null;
  //   });
  //   item.dons.forEach(donItem => {
  //     donItem.don = null;
  //   });
  //   item.aptitudes.forEach(aptitudeItem => {
  //     aptitudeItem.aptitude = null;
  //   });
  //   item.sorts.forEach(sortItem => {
  //     sortItem.sort = null;
  //   });
  //   item.fourberies.forEach(fourberieItem => {
  //     fourberieItem.fourberie = null;
  //   });

  //   return {
  //     nom: item.nom,
  //     classes: item.classes.map((obj) => { return { ...obj } }),
  //     alignementRef: item.alignementRef,
  //     dons: item.dons.map((obj) => { return { ...obj } }),
  //     aptitudes: item.aptitudes.map((obj) => { return { ...obj } }),
  //     sorts: item.sorts.map((obj) => { return { ...obj } }),
  //     fourberies: item.fourberies.map((obj) => { return { ...obj } }),
  //     raceRef: item.raceRef,
  //     userRef: item.userRef,
  //     ecoleRef: item.ecoleRef,
  //     espritRef: item.espritRef,
  //     dieuRef: item.dieuRef,
  //     ordresRef: item.ordresRef,
  //     domainesRef: item.domainesRef,
  //     vie: item.vie,
  //     gnEffectif: item.gnEffectif,
  //   }
  // }
}

const getPersonnages = async () => {
  return (await getDocs(query(collection(db, "personnages")), orderBy("createdAt"))).docs.map(snap => {
    return new Personnage(snap.id, snap.data());
  });
};

const getPersonnagesFromUserId = async userId => {
  const ref = collection(db, "personnages");
  const q = query(ref, where("userRef", "==", `${userId}`), orderBy("createdAt"));
  return (await getDocs(q)).docs.map(snap => {
    return new Personnage(snap.id, snap.data());
  });
};

const getPersonnage = async id => {
  const snap = await getDoc(doc(db, `personnages/${id}`));
  return new Personnage(snap.id, snap.data());
};

export { Personnage, getPersonnages, getPersonnagesFromUserId, getPersonnage };
