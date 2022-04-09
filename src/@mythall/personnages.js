import { db } from "../assets/js/firebase";
import { doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, collection, query, orderBy, where } from "firebase/firestore";

class Personnage {
  constructor(
    id,
    {
      nom,
      user,
      alignement,
      race,
      statistiques,
      capaciteSpeciales,
      resistances,
      immunites,
      immunitesRef,
      esprit,
      ecole,
      dieu,
      ordres,
      domaines,
      userRef,
      classes,
      alignementRef,
      dons,
      aptitudes,
      sorts,
      fourberies,
      raceRef,
      espritRef,
      ecoleRef,
      dieuRef,
      ordresRef,
      ordreRef,
      domainesRef,
      niveauEffectif,
      niveauReel,
      niveauProfane,
      niveauDivin,
      niveauDisponible,
      gnEffectif,
      vie
    }
  ) {
    this.id = id;
    this.nom = nom;
    this.user = user;
    this.alignement = alignement;
    this.race = race;
    this.statistiques = statistiques ? statistiques : [];
    this.capaciteSpeciales = capaciteSpeciales ? capaciteSpeciales : [];
    this.resistances = resistances ? resistances : [];
    this.immunites = immunites ? immunites : [];
    this.immunitesRef = immunitesRef ? immunitesRef : [];
    this.esprit = esprit;
    this.ecole = ecole;
    this.dieu = dieu;
    this.ordres = ordres ? ordres : [];
    this.domaines = domaines ? domaines : [];
    this.userRef = userRef;
    this.classes = classes ? classes : [];
    this.alignementRef = alignementRef;
    this.dons = dons ? dons : [];
    this.aptitudes = aptitudes ? aptitudes : [];
    this.sorts = sorts ? sorts : [];
    this.fourberies = fourberies ? fourberies : [];
    this.raceRef = raceRef;
    this.espritRef = espritRef;
    this.ecoleRef = ecoleRef;
    this.dieuRef = dieuRef;
    this.ordreRef = ordreRef;
    this.ordresRef = ordresRef; // ... Changer pour singulier, un personnage n'as qu'un seul ordre - Valider aussi dans fiche perso pour changer pour un champ singulier au lieu d'un array
    this.domainesRef = domainesRef ? domainesRef : [];
    this.niveauEffectif = niveauEffectif ? niveauEffectif : 1;
    this.niveauReel = niveauReel ? niveauReel : 1;
    this.niveauProfane = niveauProfane ? niveauProfane : 0;
    this.niveauDivin = niveauDivin ? niveauDivin : 0;
    this.niveauDisponible = niveauDisponible ? niveauDisponible : 0;
    this.gnEffectif = gnEffectif ? gnEffectif : 0;
    this.vie = vie ? vie : 5;
  }

  saveState() {
    if (!this.dieuRef) this.dieuRef = "";
    if (!this.ecoleRef) this.ecoleRef = "";
    if (!this.espritRef) this.espritRef = "";
    if (!this.ordreRef) this.ordreRef = "";
    if (!this.domainesRef) this.domainesRef = [];

    this.migrationFixes();

    return {
      nom: this.nom,
      alignementRef: this.alignementRef,
      classes: this.classes.map(classeItem => {
        classeItem.classe = null;
        return { ...classeItem };
      }),
      dons: this.dons.map(donItem => {
        donItem.don = null;
        return { ...donItem };
      }),
      aptitudes: this.aptitudes.map(aptitudeItem => {
        aptitudeItem.aptitude = null;
        return { ...aptitudeItem };
      }),
      sorts: this.sorts.map(sortItem => {
        sortItem.sort = null;
        return { ...sortItem };
      }),
      fourberies: this.fourberies.map(fourberieItem => {
        fourberieItem.fourberie = null;
        return { ...fourberieItem };
      }),
      raceRef: this.raceRef,
      userRef: this.userRef,
      ecoleRef: this.ecoleRef,
      espritRef: this.espritRef,
      dieuRef: this.dieuRef,
      ordreRef: this.ordreRef,
      domainesRef: this.domainesRef,
      vie: this.vie,
      gnEffectif: this.gnEffectif
    };
  }

  migrationFixes() {
    // Fixes for existing personnage with ordres
    if (this.ordresRef && this.ordreRef.length > 0) {
      this.ordreRef = this.ordresRef[0];
    }

    // Filter Out Race Dons / Sorts / Fourberies / Aptitudes
    if (this.race) {
      // Race
      if (this.dons && this.dons.length > 0) {
        let donsTemporaire = [];
        this.dons.forEach(don => {
          let found = false;
          this.race.donsRacialRef.forEach(id => {
            if (id == don.donRef) {
              found = true;
            }
          });

          if (!found) {
            donsTemporaire.push(don);
          }
        });
        this.dons = donsTemporaire;
      }

      // Sorts
      if (this.sorts && this.sorts.length > 0) {
        let sortsTemporaire = [];
        this.sorts.forEach(sort => {
          let found = false;
          this.race.sortsRacialRef.forEach(id => {
            if (id == sort.sortRef) {
              found = true;
            }
          });

          if (!found) {
            sortsTemporaire.push(sort);
          }
        });
        this.sorts = sortsTemporaire;
      }

      // Aptitudes
      if (this.aptitudes && this.aptitudes.length > 0) {
        let aptitudesTemporaire = [];
        this.aptitudes.forEach(aptitude => {
          let found = false;
          this.race.aptitudesRacialRef.forEach(id => {
            if (id == aptitude.aptitudeRef) {
              found = true;
            }
          });

          if (!found) {
            aptitudesTemporaire.push(aptitude);
          }
        });
        this.aptitudes = aptitudesTemporaire;
      }
    }
  }
}

const getPersonnages = async () => {
  return (await getDocs(query(collection(db, "personnages"), orderBy("createdAt")))).docs.map(snap => {
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

const addPersonnage = async personnage => {
  console.log(personnage.saveState());
  return await addDoc(collection(db, `personnages`), personnage.saveState());
};

const updatePersonnage = async personnage => {
  return await updateDoc(doc(db, `personnages/${race.id}`), personnage.saveState());
};

const deletePersonnage = async id => {
  return await deleteDoc(doc(db, `personnages/${id}`));
};

export { Personnage, getPersonnages, getPersonnagesFromUserId, getPersonnage, addPersonnage, updatePersonnage, deletePersonnage };
