import { getRaces } from "./races";
import { getClasses } from "./classes";
import { getAlignements } from "./alignements";
import { getDomaines } from "./domaines";
import { getEcoles } from "./ecoles";
import { getEsprits } from "./esprits";
import { getOrdres } from "./ordres";
import { getDieux } from "./dieux";
import { getDons } from "./dons";
import { getFourberies } from "./fourberies";
import { getSort } from "./sorts";
import { getAptitude } from "./aptitudes";

class Choix {
  constructor({ type, quantite, niveauObtention, categorie, domaine, ref }) {
    this.type = type ? type : "";
    this.quantite = quantite ? quantite : 1;
    this.niveauObtention = niveauObtention ? niveauObtention : 0;
    this.categorie = categorie ? categorie : null;
    this.domaine = domaine ? domaine : null;
    this.ref = ref ? ref : []; // Référence pour choix de don, sort, aptitude, fourberie
  }
}

const getAvailableRaces = async () => {
  return (await getRaces()).sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableClasses = async personnage => {
  let list = await getClasses();

  // Filtre selon la race
  if (personnage.race) {
    list = list.filter(classe => {
      return personnage.race.classesDisponibleRef.includes(classe.id);
    });
  }

  // Filtre selon les classes existante
  if (personnage.classes) {
    personnage.classes.forEach(classePerso => {
      // Multiclassement
      list = list.filter(classe => {
        return classePerso.classe.multiclassementRef.includes(classe.id);
      });

      // Ajoute la classe actuelle (Filtré au multiclassement);
      list.push(classePerso.classe);

      // Alignement Permis
      if (personnage.alignementRef) {
        list = list.filter(classe => {
          return classePerso.classe.alignementPermisRef.includes(personnage.alignementRef);
        });
      }
    });
  }

  // Ordres
  if (personnage.ordres && personnage.ordres.length > 0) {
    personnage.ordres.forEach(ordre => {
      list = list.filter(classe => {
        return ordre.classeRef.includes(classe.id);
      });
    });
  }

  // Domaines
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domaine => {
      list = list.filter(classe => {
        return domaine.multiclassementRef.includes(classe.id);
      });
    });
  }

  // Ajoute les classes existante
  if (personnage.classes) {
    // Retire les autres classes si déjà 3 existantes
    if (personnage.classes.length >= 3) {
      list = [];
    }

    // Ajoute Chaques classe existante
    personnage.classes.forEach(classePerso => {
      list.push(classePerso.classe);
    });

    // Filtre les doubles
    list = list.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj["id"]).indexOf(obj["id"]) === pos;
    });
  }

  // Trie en Ordre Alphabetic
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableAlignements = async personnage => {
  let alignements = await getAlignements();

  // Filtre selon la race
  if (personnage.race) {
    alignements = alignements.filter(alignement => {
      return personnage.race.alignementPermisRef.includes(alignement.id);
    });
  }

  // Filtre selon les classes
  if (personnage.classes) {
    personnage.classes.forEach(classe => {
      alignements = alignements.filter(alignement => {
        return classe.classe.alignementPermisRef.includes(alignement.id);
      });
    });
  }

  return alignements;
};

const getAvailableChoix = async (personnage, progressingClasse) => {
  let listChoix = [];

  // Dons aux 3 niveaux & don niveau 1
  if (personnage.niveauReel % 3 == 0 || personnage.niveauReel == 1) {
    const don = new Choix({
      type: "don",
      categorie: "Normal",
      niveauObtention: personnage.niveauReel,
      quantite: 1
    });

    // console.log("Don 3 niveau ou lvl 1");

    listChoix.push(Object.assign({}, don));
  }

  // Don Racial Humain
  if (personnage.raceRef == "RkYWeQrxFkmFaepDM09n" && personnage.niveauReel == 1) {
    const existingChoix = listChoix.find(c => c.type == "don" && c.categorie == "Normal");
    if (existingChoix) {
      existingChoix.quantite++;
    } else {
      const don = new Choix({
        type: "don",
        categorie: "Normal",
        niveauObtention: 1,
        quantite: 1
      });
      listChoix.push({ ...don });
    }
  }

  // Don Racial Elf
  if (personnage.raceRef == "5hteaYQ4K8J1MaAvU9Zh" && personnage.niveauReel == 1) {
    const existingChoix = listChoix.find(c => c.type == "don" && c.categorie == "Connaissance");
    if (existingChoix) {
      existingChoix.quantite++;
    } else {
      const don = new Choix({
        type: "don",
        categorie: "Connaissance",
        niveauObtention: 1,
        quantite: 1
      });
      listChoix.push({ ...don });
    }
  }

  // Get Choix de Classe
  if (personnage.classes) {
    personnage.classes.forEach(classeItem => {
      // Choix de classe
      if (classeItem.classeRef == progressingClasse.classeRef && classeItem.niveau == progressingClasse.niveau) {
        classeItem.classe.choix.forEach(choix => {
          if (choix.niveauObtention == progressingClasse.niveau) {
            const existingChoix = listChoix.find(c => c.type == choix.type && c.categorie == choix.categorie);
            if (existingChoix) {
              existingChoix.quantite++;
            } else {
              listChoix.push(choix);
            }
          }
        });
      }
    });
  }

  // Domaines
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domaine => {
      // Prêtre
      if (progressingClasse.classeRef == "fNqknNgq0QmHzUaYEvEd") {
        domaine.choix.forEach(choixDomaine => {
          if (choixDomaine.niveauObtention == progressingClasse.niveau) {
            const existingChoix = listChoix.find(c => c.type == choixDomaine.type && c.categorie == choixDomaine.categorie);
            console.log(existingChoix);
            if (existingChoix) {
              existingChoix.quantite++;
            } else {
              listChoix.push(choixDomaine);
            }
          }
        });
      }
    });
  }

  return listChoix;
};

const getAvailableDomaines = async personnage => {
  let list = await getDomaines();

  // Filtre selon l'alignement du personnage
  if (personnage.alignementRef) {
    list = list.filter(domaine => {
      return domaine.alignementPermisRef.includes(personnage.alignementRef);
    });
  }

  // Filtre selon les domaines du personnage
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domainePersonnage => {
      // Filtre domaine existant
      list = list.filter(domaine => {
        return domaine.id != domainePersonnage.id;
      });

      // Filtre domaine oposé
      list = list.filter(domaine => {
        return domaine.id != domainePersonnage.domaineContraireRef;
      });
    });
  }

  // Trie en Ordre Alphabetic
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableEcoles = async () => {
  return await getEcoles();
};

const getAvailableEsprits = async () => {
  return await getEsprits();
};

const getAvailableOrdres = async personnage => {
  const ordres = await getOrdres();

  let list = ordres;

  // Filtre selon l'alignement du personnage
  if (personnage.alignementRef) {
    list = list.filter(function (ordre) {
      return ordre.alignementPermisRef.includes(personnage.alignementRef);
    });
  }

  // Filtre selon les classes
  if (personnage.classes) {
    personnage.classes.forEach(classe => {
      list = list.filter(function (ordre) {
        return ordre.classeRef.includes(classe.classeRef);
      });
    });
  }

  // Trie en Ordre Alphabetic
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableAptitudes = async (personnage, progressingClasse) => {
  let aptitudeRefs = progressingClasse.classe.choix
    .filter(x => x.type == "aptitude" && x.niveauObtention === progressingClasse.niveau)
    .map(x => x.ref)
    .flat();

  let rodeurUnavailableCombatStyleProgressAptitudeRef = _getRodeurUnavailableCombatStyleProgress(personnage);

  if (rodeurUnavailableCombatStyleProgressAptitudeRef) {
    aptitudeRefs = aptitudeRefs.filter(x => x != rodeurUnavailableCombatStyleProgressAptitudeRef);
  }

  return await Promise.all(aptitudeRefs.map(async ref => await getAptitude(ref)));
};

const rangedCombatStyleAptitudeRefs = [
  "g5NSyyh4n2M9A69Gpcj3", // Style
  "2QK0QnyPsu9WljfWqBAC", // Science
  "bqZBLKSRTdZibeAQ5jKE" // Maîtrise
];

const dualWieldCombatStyleAptitudeRefs = [
  "fvb07AqehmArvoHyw929", // Style
  "VM4yz2QmWy101SzPWw2C", // Science
  "xUliJugimhST8EY3YRS7" // Maîtrise
];

const _getRodeurUnavailableCombatStyleProgress = personnage => {
  let currentAptitudes = personnage.aptitudes.map(x => x.aptitudeRef);

  if (currentAptitudes.length <= 0) {
    return null;
  }

  let isRanged = currentAptitudes.some(x => rangedCombatStyleAptitudeRefs.includes(x));
  let isDualWield = currentAptitudes.some(x => dualWieldCombatStyleAptitudeRefs.includes(x));

  let aptitudesToCheck;
  let aptitudesFromWhichToRemove;

  if (isRanged) {
    aptitudesToCheck = rangedCombatStyleAptitudeRefs;
    aptitudesFromWhichToRemove = dualWieldCombatStyleAptitudeRefs;
  } else if (isDualWield) {
    aptitudesToCheck = dualWieldCombatStyleAptitudeRefs;
    aptitudesFromWhichToRemove = rangedCombatStyleAptitudeRefs;
  } else {
    return null;
  }

  let newAvailableAptitudeRefIndex;
  currentAptitudes.forEach(x => {
    let currentAptitudeIndex = aptitudesToCheck.indexOf(x);
    if (currentAptitudeIndex > -1) {
      newAvailableAptitudeRefIndex = currentAptitudeIndex + 1;
    }
  });

  return aptitudesFromWhichToRemove[newAvailableAptitudeRefIndex];
};

const getAvailableConnaissances = async personnage => {
  const dons = await getDons("Connaissance");

  let list = dons;

  // Filtre les dons déjà existant
  if (personnage.dons && personnage.dons.length > 0) {
    personnage.dons.forEach(donPerso => {
      list = list.filter(don => {
        return don.id != donPerso.donRef;
      });
    });
  }

  // Filtre les prérequis de dons
  if (personnage.dons) {
    let result = [];

    list.forEach(don => {
      let add = true;

      // No requirements
      if (don.donsRequisRef && don.donsRequisRef.length > 0) {
        // Make sure all requirements is filled
        don.donsRequisRef.forEach(donReqRef => {
          let found = false;

          personnage.dons.forEach(donPerso => {
            if (donReqRef == donPerso.donRef) {
              found = true;
            }
          });

          if (!found) {
            add = false;
          }
        });
      }

      if (add) {
        result.push(don);
      }
    });

    list = result;
  }

  // Filtre les restrictions de niveaux
  if (personnage.niveauReel) {
    // Filtre Niveau Max D'Obtention
    list = list.filter(don => {
      return don.niveauMaxObtention <= personnage.niveauReel;
    });

    // Filtre Niveau Requis
    list = list.filter(don => {
      return don.niveauRequis <= personnage.niveauReel;
    });
  }

  // Trie en Ordre Alphabétique
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableDons = async personnage => {
  const dons = await getDons();
  let list = dons;

  // Filtre les dons déjà existants
  if (personnage.dons && personnage.dons.length > 0) {
    personnage.dons.forEach(donPerso => {
      list = list.filter(don => {
        return don.id != donPerso.donRef;
      });
    });
  }

  // Filtre les Races Autorisées
  if (personnage.raceRef) {
    list = list.filter(function (don) {
      return don.racesAutoriseRef.includes(personnage.raceRef);
    });
  }

  // Filtre les classes autorisées
  if (personnage.classes) {
    let result = [];

    list.forEach(don => {
      don.classesAutorise.forEach(ca => {
        personnage.classes.forEach(classePerso => {
          if (classePerso.classeRef == ca.classeRef && classePerso.niveau >= ca.niveau) {
            if (!result.find(r => r.id == don.id)) {
              result.push(don);
            }
          }
        });
      });
    });

    list = result;
  }

  // Filtre les prérequis de dons
  if (personnage.dons) {
    let result = [];

    list.forEach(don => {
      let add = true;

      // No requirements
      if (don.donsRequisRef && don.donsRequisRef.length > 0) {
        // Make sure all requirements is filled
        don.donsRequisRef.forEach(donReqRef => {
          let found = false;

          personnage.dons.forEach(donPerso => {
            if (donReqRef == donPerso.donRef) {
              found = true;
            }
          });

          if (!found) {
            add = false;
          }
        });
      }

      if (add) {
        if (!result.find(r => r.id == don.id)) {
          result.push(don);
        }
        result.push(don);
      }
    });

    list = result;
  }

  // Filtre les restrictions de niveaux
  if (personnage.niveauReel) {
    // Filtre Niveau Max D'Obtention
    list = list.filter(don => {
      return don.niveauMaxObtention <= personnage.niveauReel;
    });

    // Filtre Niveau Requis
    list = list.filter(don => {
      return don.niveauRequis <= personnage.niveauReel;
    });
  }

  // Trie en Ordre Alphabetic
  list = list.sort((a, b) => (a.nom > b.nom ? 1 : -1));

  // Filter Duplicates
  list = list.filter((don, index, self) => index === self.findIndex(d => d.id === don.id));

  return list;
};

const getAvailableFourberies = async personnage => {
  const fourberies = await getFourberies();

  let list = fourberies;

  // Filtre les fourberies déjà existant
  if (personnage.fourberies && personnage.fourberies.length > 0) {
    personnage.fourberies.forEach(fourberiesPerso => {
      list = list.filter(fourberie => {
        return fourberie.id != fourberiesPerso.fourberieRef;
      });
    });
  }

  // Filtre les prérequis de fourberie
  if (personnage.fourberies) {
    let result = [];

    list.forEach(fourberie => {
      let add = true;

      // No requirements
      if (fourberie.fourberiesRequisRef && fourberie.fourberiesRequisRef.length > 0) {
        // Make sure all requirements is filled
        fourberie.fourberiesRequisRef.forEach(fourberieReqRef => {
          let found = false;

          personnage.fourberies.forEach(fourberiePerso => {
            if (fourberieReqRef == fourberiePerso.fourberieRef) {
              found = true;
            }
          });

          if (!found) {
            add = false;
          }
        });
      }

      if (add) {
        result.push(fourberie);
      }
    });

    list = result;
  }

  // Trie en Ordre Alphabétique
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableSorts = async (personnage, progressingClasse, niveauObtentionSortPermis) => {
  // Liste des sorts disponible pour la classe qui progresse actuellement selon son niveau
  let list = progressingClasse.classe.sortsDisponible.filter(sd => sd.niveauObtention <= niveauObtentionSortPermis);

  // Filtre les sorts déjà existants
  list = list.filter(sd => !personnage.sorts.find(s => s.sortRef == sd.sortRef));

  // Get Sort(s)
  list = await Promise.all(
    list.map(sd => {
      return getSort(sd.sortRef);
    })
  );

  // Trie en Ordre Alphabétique
  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

const getAvailableDivinites = async personnage => {
  let list = await getDieux();

  // Filtre selon l'alignement du personnage
  if (personnage.alignementRef) {
    list = list.filter(function (dieu) {
      return dieu.alignementPermisRef.includes(personnage.alignementRef);
    });
  }

  return list.sort((a, b) => (a.nom > b.nom ? 1 : -1));
};

export {
  getAvailableRaces,
  getAvailableClasses,
  getAvailableAlignements,
  getAvailableAptitudes,
  getAvailableChoix,
  getAvailableDomaines,
  getAvailableEcoles,
  getAvailableEsprits,
  getAvailableOrdres,
  getAvailableConnaissances,
  getAvailableDons,
  getAvailableFourberies,
  getAvailableSorts,
  getAvailableDivinites
};
