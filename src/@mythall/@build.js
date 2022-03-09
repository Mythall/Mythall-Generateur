import { toggleLoading } from "../assets/components/loading-component";
import { getUser } from "./users";
import { Personnage } from "./personnages";
import { getAlignement } from "./alignements";
import { getClasse } from "./classes";
import { getDieu } from "./dieux";
import { getFourberie } from "./fourberies";
import { getOrdre } from "./ordres";
import { getRace } from "./races";

// export class Choix {
//   constructor() {
//     this.type = "";
//     this.quantite = 1;
//     this.niveauObtention = 0;
//     this.ref = [];
//   }

//   type;
//   quantite;
//   niveauObtention;
//   categorie;
//   domaine;
//   ref; // Référence pour choix de don, sort, aptitude, fourberie
// }

// export class ResistanceItem {

//   constructor() {
//     this.resistance = null;
//     this.resistanceRef = '';
//     this.niveau = 1;
//     this.valeur = 0;
//     this.cummulable = false;
//   }

//   resistance;
//   resistanceRef;
//   niveau;
//   valeur;
//   cummulable;
// }

// export class ResistanceValue {

//   constructor() {
//     this.resistance = null;
//     this.valeur = 0;
//   }

//   resistance;
//   valeur;
// }

// export class StatistiqueItem {

//   constructor() {
//     this.statistique = null;
//     this.statistiqueRef = '';
//     this.niveau = 1;
//     this.valeur = 0;
//     this.cummulable = false;
//   }

//   statistique: IStatistique;
//   statistiqueRef: string;
//   niveau: number;
//   valeur: number;
//   cummulable: boolean;
// }

// export class StatistiqueValue {

//   constructor() {
//     this.statistique = null;
//     this.valeur = 0;
//   }

//   statistique: IStatistique;
//   valeur: number;
// }

// const ChoixTypes = ["aptitude", "connaissance", "don", "domaine", "ecole", "esprit", "fourberie", "ordre", "sort"];

const buildPersonnage = async personnage => {
  try {
    toggleLoading(true, "Assemblage de votre personnage...");

    console.log("Building Personnage...");
    await Promise.all([
      _getUser(personnage),
      _getRace(personnage),
      _getClasses(personnage),
      _getAlignement(personnage),
      _getDieu(personnage),
      _getOrdres(personnage),
      _getAllFourberies(personnage)
    ]);

    console.log("Building Niveau Effectif...");
    await _getNiveauEffectif(personnage);

    // console.log("Building Domaines & Esprits...");
    // await Promise.all([this._getDomaines(personnage), this._getEsprit(personnage)]);

    // console.log("Building Aptitudes...");
    // await this._getAllAptitudes(personnage);

    // console.log("Building Sorts & Dons...");
    // await Promise.all([this._getAllSorts(personnage), this.getAllDons(personnage)]);

    // console.log("Building Base Statistiques...");
    // await this._getStatistiquesParDefault(personnage);

    // console.log("Building Statistiques, Resistances & Immunities...");
    // await Promise.all([this._getStatistiques(personnage), this._getResistances(personnage), this._getImmunites(personnage)]);

    // console.log("Building Niveau de dons & Capacité spéciales...");
    // await Promise.all([this._getDonsNiveauEffectif(personnage), this._getCapaciteSpeciales(personnage)]);

    console.log("Personnage Build Completed");
    console.log(personnage);

    // Completed
    toggleLoading(false);
    return new Personnage(personnage.id, personnage);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const _getUser = async personnage => {
  personnage.user = await getUser(personnage.userRef);
  return personnage;
};

const _getRace = async personnage => {
  personnage.race = await getRace(personnage.raceRef);
  return personnage;
};

const _getClasses = async personnage => {
  // ...
  // Pretty sure we can optimize load time with a promise.all here
  personnage.classes.forEach(async classeItem => {
    classeItem.classe = await getClasse(classeItem.classeRef);
  });

  return personnage;
};

const _getAlignement = async personnage => {
  if (personnage.alignementRef) {
    try {
      personnage.alignement = await getAlignement(personnage.alignementRef);
    } catch (e) {
      console.log("Une erreure est survenue lors de la requete pour l'alignement du personnage");
    }
  }
  return personnage;
};

const _getDieu = async personnage => {
  if (personnage.dieuRef) {
    try {
      personnage.dieu = await getDieu(personnage.dieuRef);
    } catch (e) {
      console.log("Une erreure est survenue lors de la requete pour le dieu du personnage");
    }
  }
  return personnage;
};

const _getOrdres = async personnage => {
  if (personnage?.ordresRef?.length > 0) {
    try {
      personnage.ordres = await Promise.all(personnage.ordresRef.map(ref => getOrdre(ref)));
    } catch (e) {
      console.log("Une erreure est survenue lors de la requete des ordres du personnage");
    }
  }
  return personnage;
};

const _getNiveauEffectif = async personnage => {
  personnage.niveauEffectif = 0;
  personnage.niveauReel = 0;
  personnage.niveauProfane = 0;
  personnage.niveauDivin = 0;

  if (personnage.classes) {
    personnage.classes.forEach(classe => {
      personnage.niveauEffectif += classe.niveau;
      personnage.niveauReel += classe.niveau;

      if (classe.classe.sort == "Profane") {
        personnage.niveauProfane += classe.niveau;
      }

      if (classe.classe.sort == "Divin") {
        personnage.niveauDivin += classe.niveau;
      }
    });
  }

  if (personnage.race) {
    if (personnage.race.ajustement) {
      personnage.niveauEffectif += +personnage.race.ajustement;
      personnage.niveauProfane += +personnage.race.ajustement;
      personnage.niveauDivin += +personnage.race.ajustement;
    }
  }

  return personnage;
};

const _getDomaines = async personnage => {
  if (personnage.domainesRef && personnage.domainesRef.length > 0) {
    let count = 0;

    personnage.domainesRef.forEach(async domaineRef => {
      const domaine = await this.domaineService.getDomaine(domaineRef);
      if (!personnage.domaines) personnage.domaines = [];
      personnage.domaines.push(domaine);
      count++;
      if (count == personnage.domainesRef.length) {
        return personnage;
      }
    });
  } else {
    return personnage;
  }
};

const _getEsprit = async personnage => {
  if (personnage.espritRef) {
    const response = await this.espritService.getEsprit(personnage.espritRef);
    personnage.esprit = response;
    return personnage;
  }

  return personnage;
};

const _getAllFourberies = async personnage => {
  let count = 0;
  if (!personnage.fourberies) personnage.fourberies = [];

  if (personnage.fourberies && personnage.fourberies.length > 0) {
    personnage.fourberies.forEach(async fourberieItem => {
      if (!fourberieItem.fourberie) {
        //Avoid fetching Fourberie if already fetch

        fourberieItem.fourberie = await getFourberie(fourberieItem.fourberieRef);
        count++;

        if (count == personnage.fourberies.length) {
          // Filter Duplicates
          personnage.fourberies = personnage.fourberies.filter(
            (fourberie, index, self) => index === self.findIndex(d => d.fourberieRef === fourberie.fourberieRef)
          );

          return personnage;
        }
      } else {
        count++;

        if (count == personnage.fourberies.length) {
          // Filter Duplicates
          personnage.fourberies = personnage.fourberies.filter(
            (fourberie, index, self) => index === self.findIndex(d => d.fourberieRef === fourberie.fourberieRef)
          );

          return personnage;
        }
      }
    });
  } else {
    return personnage;
  }
};

const _getAllAptitudes = async personnage => {
  // Aptitudes Racial
  if (personnage.race && personnage.race.aptitudesRacialRef && personnage.race.aptitudesRacialRef.length > 0) {
    personnage.race.aptitudesRacialRef.forEach(aptitudeRef => {
      let aptitudeItem = new AptitudeItem();
      aptitudeItem.aptitudeRef = aptitudeRef;
      personnage.aptitudes.push(aptitudeItem);
    });
  }

  // Aptitudes Classes
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe.aptitudes && classeItem.classe.aptitudes.length > 0) {
        classeItem.classe.aptitudes.forEach(aptitudeItem => {
          if (classeItem.niveau >= aptitudeItem.niveauObtention) {
            personnage.aptitudes.push(aptitudeItem);
          }
        });
      }
    });
  }

  // Aptitudes Domaines
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domaine => {
      if (domaine.aptitudes && domaine.aptitudes.length > 0) {
        domaine.aptitudes.forEach(aptitudeItem => {
          personnage.classes.forEach(classe => {
            if (classe.classeRef == "fNqknNgq0QmHzUaYEvEd" && classe.niveau >= aptitudeItem.niveauObtention) {
              personnage.aptitudes.push(aptitudeItem);
            }
          });
        });
      }
    });
  }

  // Aptitudes Esprit
  if (personnage.esprit && personnage.esprit.aptitudes && personnage.esprit.aptitudes.length > 0) {
    personnage.esprit.aptitudes.forEach(aptitudeItem => {
      personnage.classes.forEach(classe => {
        if (classe.classeRef == "wW48swrqmr77awfyADMX" && classe.niveau >= aptitudeItem.niveauObtention) {
          personnage.aptitudes.push(aptitudeItem);
        }
      });
    });
  }

  // Remplis la liste de aptitudes complète
  let count = 0;
  if (!personnage.aptitudes) personnage.aptitudes = [];

  if (personnage.aptitudes && personnage.aptitudes.length > 0) {
    personnage.aptitudes.forEach(async aptitudeItem => {
      if (!aptitudeItem.aptitude) {
        const aptitude = await this.aptitudeService.getAptitude(aptitudeItem.aptitudeRef);
        aptitudeItem.aptitude = aptitude;
        count++;
        if (count == personnage.aptitudes.length) {
          // Filter Duplicates
          personnage.aptitudes = personnage.aptitudes.filter(
            (aptitude, index, self) => index === self.findIndex(d => d.aptitudeRef === aptitude.aptitudeRef)
          );

          return personnage;
        }
      } else {
        count++;
        if (count == personnage.aptitudes.length) {
          // Filter Duplicates
          personnage.aptitudes = personnage.aptitudes.filter(
            (aptitude, index, self) => index === self.findIndex(d => d.aptitudeRef === aptitude.aptitudeRef)
          );

          return personnage;
        }
      }
    });
  } else {
    return personnage;
  }
};

const _getAllSorts = async personnage => {
  // Sorts Classes
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe.sorts && classeItem.classe.sorts.length > 0) {
        classeItem.classe.sorts.forEach(sortItem => {
          if (classeItem.niveau >= sortItem.niveauObtention) {
            personnage.sorts.push(sortItem);
          }
        });
      }
    });
  }

  // Sorts Domaines
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domaine => {
      if (domaine.sorts && domaine.sorts.length > 0) {
        domaine.sorts.forEach(sortItem => {
          personnage.classes.forEach(classe => {
            if (classe.classeRef == "fNqknNgq0QmHzUaYEvEd" && classe.niveau >= sortItem.niveauObtention) {
              personnage.sorts.push(sortItem);
            }
          });
        });
      }
    });
  }

  // Sorts Esprit
  if (personnage.esprit && personnage.esprit.sorts && personnage.esprit.sorts.length > 0) {
    personnage.esprit.sorts.forEach(sortItem => {
      personnage.classes.forEach(classe => {
        if (classe.classeRef == "wW48swrqmr77awfyADMX" && classe.niveau >= sortItem.niveauObtention) {
          personnage.sorts.push(sortItem);
        }
      });
    });
  }

  // Sorts Aptitudes (Équivalence)
  if (personnage.aptitudes && personnage.aptitudes.length > 0) {
    personnage.aptitudes.forEach(aptitudeItem => {
      if (aptitudeItem.aptitude.sortsEquivalentRef && aptitudeItem.aptitude.sortsEquivalentRef.length > 0) {
        aptitudeItem.aptitude.sortsEquivalentRef.forEach(aptSortRef => {
          let sortItem = new SortItem();
          sortItem.niveauObtention = aptitudeItem.niveauObtention;
          sortItem.sortRef = aptSortRef;
          personnage.sorts.push(sortItem);
        });
      }
    });
  }

  // Remplis la liste de sorts complète
  let count = 0;
  if (!personnage.sorts) personnage.sorts = [];
  if (personnage.sorts && personnage.sorts.length > 0) {
    personnage.sorts.forEach(async sortItem => {
      if (!sortItem.sort) {
        //Avoid fetching Sort if already fetch
        sortItem.sort = await this.sortService.getSort(sortItem.sortRef);
        count++;
        if (count == personnage.sorts.length) {
          // Filter duplicated
          personnage.sorts = personnage.sorts.filter((sort, index, self) => index === self.findIndex(d => d.sortRef === sort.sortRef));

          return personnage;
        }
      } else {
        count++;
        if (count == personnage.sorts.length) {
          personnage.sorts = personnage.sorts.filter((sort, index, self) => index === self.findIndex(d => d.sortRef === sort.sortRef));

          return personnage;
        }
      }
    });
  } else {
    return personnage;
  }
};

const getAllDons = async personnage => {
  // Dons Racial
  if (personnage.race && personnage.race.donsRacialRef && personnage.race.donsRacialRef.length > 0) {
    personnage.race.donsRacialRef.forEach(donRef => {
      let donItem = new DonItem();
      donItem.donRef = donRef;
      personnage.dons.push(donItem);
    });
  }

  // Dons Classes
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe.dons && classeItem.classe.dons.length > 0) {
        classeItem.classe.dons.forEach(donItem => {
          if (classeItem.niveau >= donItem.niveauObtention) {
            personnage.dons.push(donItem);
          }
        });
      }
    });
  }

  // Dons Domaines
  if (personnage.domaines && personnage.domaines.length > 0) {
    personnage.domaines.forEach(domaine => {
      if (domaine.dons && domaine.dons.length > 0) {
        domaine.dons.forEach(donItem => {
          personnage.classes.forEach(classe => {
            if (classe.classeRef == "fNqknNgq0QmHzUaYEvEd" && classe.niveau >= donItem.niveauObtention) {
              personnage.dons.push(donItem);
            }
          });
        });
      }
    });
  }

  // Dons Esprit
  if (personnage.esprit && personnage.esprit.dons && personnage.esprit.dons.length > 0) {
    personnage.esprit.dons.forEach(donItem => {
      personnage.classes.forEach(classe => {
        if (classe.classeRef == "wW48swrqmr77awfyADMX" && classe.niveau >= donItem.niveauObtention) {
          personnage.dons.push(donItem);
        }
      });
    });
  }

  // Dons Fourberies (Équivalence)
  if (personnage.fourberies && personnage.fourberies.length > 0) {
    personnage.fourberies.forEach(fourberie => {
      if (fourberie.fourberie && fourberie.fourberie.donsEquivalentRef && fourberie.fourberie.donsEquivalentRef.length > 0) {
        fourberie.fourberie.donsEquivalentRef.forEach(aptDonRef => {
          let donItem = new DonItem();
          donItem.niveauObtention = fourberie.niveauObtention;
          donItem.donRef = aptDonRef;
          personnage.dons.push(donItem);
        });
      }
    });
  }

  // Dons Aptitudes (Équivalence)
  if (personnage.aptitudes && personnage.aptitudes.length > 0) {
    personnage.aptitudes.forEach(aptitude => {
      if (aptitude.aptitude.donsEquivalentRef && aptitude.aptitude.donsEquivalentRef.length > 0) {
        aptitude.aptitude.donsEquivalentRef.forEach(aptDonRef => {
          let donItem = new DonItem();
          donItem.niveauObtention = aptitude.niveauObtention;
          donItem.donRef = aptDonRef;
          personnage.dons.push(donItem);
        });
      }
    });
  }

  // Remplis la liste de dons complète
  let count = 0;
  if (!personnage.dons) personnage.dons = [];

  if (personnage.dons && personnage.dons.length > 0) {
    personnage.dons.forEach(async donItem => {
      if (!donItem.don) {
        //Avoid fetching Don if already fetch
        const don = await this.donService.getDon(donItem.donRef, false, true);
        donItem.don = don;
        count++;
        if (count == personnage.dons.length) {
          // Filter duplicated
          personnage.dons = personnage.dons.filter((don, index, self) => index === self.findIndex(d => d.donRef === don.donRef));

          return personnage;
        }
      } else {
        count++;
        if (count == personnage.dons.length) {
          // Filter duplicated
          personnage.dons = personnage.dons.filter((don, index, self) => index === self.findIndex(d => d.donRef === don.donRef));

          return personnage;
        }
      }
    });
  } else {
    return personnage;
  }
};

const _getStatistiquesParDefault = async personnage => {
  const statistiques = await Promise.all([
    this.statistiqueService.getStatistique(StatistiqueIds.Constitution),
    this.statistiqueService.getStatistique(StatistiqueIds.Dextérité),
    this.statistiqueService.getStatistique(StatistiqueIds.Force),
    this.statistiqueService.getStatistique(StatistiqueIds.Intelligence),
    this.statistiqueService.getStatistique(StatistiqueIds.Sagesse),
    this.statistiqueService.getStatistique(StatistiqueIds.PVTorse),
    this.statistiqueService.getStatistique(StatistiqueIds.PVBras),
    this.statistiqueService.getStatistique(StatistiqueIds.PVJambes),
    this.statistiqueService.getStatistique(StatistiqueIds.Lutte),
    this.statistiqueService.getStatistique(StatistiqueIds.Mana)
  ]);

  // Constitution
  const constitution = new StatistiqueValue();
  constitution.statistique = statistiques[0]; // MUST MATCH statistiques INDEX
  constitution.valeur = 0;
  personnage.statistiques.push(constitution);

  // Dexterite
  let dexterite = new StatistiqueValue();
  dexterite.statistique = statistiques[1]; // MUST MATCH statistiques INDEX
  dexterite.valeur = 0;
  personnage.statistiques.push(dexterite);

  // Force
  let force = new StatistiqueValue();
  force.statistique = statistiques[2]; // MUST MATCH statistiques INDEX
  force.valeur = 0;
  personnage.statistiques.push(force);

  // Intelligence
  let intelligence = new StatistiqueValue();
  intelligence.statistique = statistiques[3]; // MUST MATCH statistiques INDEX
  intelligence.valeur = 0;
  personnage.statistiques.push(intelligence);

  // Sagesse
  let sagesse = new StatistiqueValue();
  sagesse.statistique = statistiques[4]; // MUST MATCH statistiques INDEX
  sagesse.valeur = 0;
  personnage.statistiques.push(sagesse);

  // PV Torse
  let pvTorse = new StatistiqueValue();
  pvTorse.statistique = statistiques[5]; // MUST MATCH statistiques INDEX
  pvTorse.valeur = 3;
  personnage.statistiques.push(pvTorse);

  // PV Bras
  let pvBras = new StatistiqueValue();
  pvBras.statistique = statistiques[6]; // MUST MATCH statistiques INDEX
  pvBras.valeur = 2;
  personnage.statistiques.push(pvBras);

  // PV Jambes
  let pvJambes = new StatistiqueValue();
  pvJambes.statistique = statistiques[7]; // MUST MATCH statistiques INDEX
  pvJambes.valeur = 2;
  personnage.statistiques.push(pvJambes);

  // Lutte
  let lutte = new StatistiqueValue();
  lutte.statistique = statistiques[8]; // MUST MATCH statistiques INDEX
  lutte.valeur = 3;
  personnage.statistiques.push(lutte);

  // Mana
  let mana = new StatistiqueValue();
  mana.statistique = statistiques[9]; // MUST MATCH statistiques INDEX
  mana.valeur = 0;
  personnage.statistiques.push(mana);

  return personnage;
};

const _getStatistiques = async personnage => {
  //Race Statistiques
  if (personnage.race.statistiques) {
    personnage.race.statistiques.forEach(statistiqueItem => {
      let found = false;

      if (personnage.statistiques) {
        personnage.statistiques.forEach(personnageStatistiqueItem => {
          if (statistiqueItem.statistiqueRef == personnageStatistiqueItem.statistique.id && personnage.niveauReel >= statistiqueItem.niveau) {
            //Cummulable l'ajoute à la valeur
            if (statistiqueItem.cummulable) {
              personnageStatistiqueItem.valeur += statistiqueItem.valeur;
            }

            //Non Cummulable prend la plus forte des deux
            if (!statistiqueItem.cummulable) {
              personnageStatistiqueItem.valeur = Math.max(personnageStatistiqueItem.valeur, statistiqueItem.valeur);
            }

            found = true;
          }
        });
      }

      if (!found && personnage.niveauReel >= statistiqueItem.niveau) {
        if (!personnage.statistiques) {
          personnage.statistiques = [];
        }

        let statistique = new StatistiqueValue();
        statistique.statistique = statistiqueItem.statistique;
        statistique.valeur = statistiqueItem.valeur;
        personnage.statistiques.push(statistique);
      }
    });
  }

  //Classe Statistiques
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe && classeItem.classe.statistiques) {
        classeItem.classe.statistiques.forEach(statistiqueItem => {
          let found = false;

          if (personnage.statistiques) {
            personnage.statistiques.forEach(personnageStatistiqueItem => {
              if (statistiqueItem.statistiqueRef == personnageStatistiqueItem.statistique.id && classeItem.niveau >= statistiqueItem.niveau) {
                //Cummulable l'ajoute à la valeur
                if (statistiqueItem.cummulable) {
                  personnageStatistiqueItem.valeur += statistiqueItem.valeur;
                }

                //Non Cummulable prend la plus forte des deux
                if (!statistiqueItem.cummulable) {
                  personnageStatistiqueItem.valeur = Math.max(personnageStatistiqueItem.valeur, statistiqueItem.valeur);
                }

                found = true;
              }
            });
          }

          if (!found && personnage.niveauReel >= statistiqueItem.niveau) {
            if (!personnage.statistiques) {
              personnage.statistiques = [];
            }

            let statistique = new StatistiqueValue();
            statistique.statistique = statistiqueItem.statistique;
            statistique.valeur = statistiqueItem.valeur;
            personnage.statistiques.push(statistique);
          }
        });
      }
    });
  }

  //Aptitude Statistiques
  if (personnage.aptitudes) {
    personnage.aptitudes.forEach(aptitudeItem => {
      aptitudeItem.aptitude.statistiques.forEach(aptitudeStatistiqueItem => {
        let found = false;

        if (personnage.statistiques) {
          personnage.statistiques.forEach(personnageStatistiqueItem => {
            // ... Manque potentiellement un attribue de classe dans les aptitutes spéciales pour faire le calcul du niveau selon la classe
            // ... Manque validation du niveau
            if (aptitudeStatistiqueItem.statistiqueRef == personnageStatistiqueItem.statistique.id) {
              //Cummulable l'ajoute à la valeur
              if (aptitudeStatistiqueItem.cummulable) {
                personnageStatistiqueItem.valeur += aptitudeStatistiqueItem.valeur;
              }

              //Non Cummulable prend la plus forte des deux
              if (!aptitudeStatistiqueItem.cummulable) {
                personnageStatistiqueItem.valeur = Math.max(personnageStatistiqueItem.valeur, aptitudeStatistiqueItem.valeur);
              }

              found = true;
            }
          });
        }

        if (!found) {
          if (!personnage.statistiques) {
            personnage.statistiques = [];
          }

          let statistique = new StatistiqueValue();
          statistique.statistique = aptitudeStatistiqueItem.statistique;
          statistique.valeur = aptitudeStatistiqueItem.valeur;
          personnage.statistiques.push(statistique);
        }
      });
    });
  }

  //Don Statistiques
  if (personnage.dons) {
    personnage.dons.forEach(donItem => {
      donItem.don.statistiques.forEach(donStatistiqueItem => {
        let found = false;

        if (personnage.statistiques) {
          personnage.statistiques.forEach(personnageStatistiqueItem => {
            if (donStatistiqueItem.statistiqueRef == personnageStatistiqueItem.statistique.id) {
              //Cummulable l'ajoute à la valeur
              if (donStatistiqueItem.cummulable) {
                personnageStatistiqueItem.valeur += donStatistiqueItem.valeur;
              }

              //Non Cummulable prend la plus forte des deux
              if (!donStatistiqueItem.cummulable) {
                personnageStatistiqueItem.valeur = Math.max(personnageStatistiqueItem.valeur, donStatistiqueItem.valeur);
              }

              found = true;
            }
          });
        }

        if (!found) {
          if (!personnage.statistiques) {
            personnage.statistiques = [];
          }

          let statistique = new StatistiqueValue();
          statistique.statistique = donStatistiqueItem.statistique;
          statistique.valeur = donStatistiqueItem.valeur;
          personnage.statistiques.push(statistique);
        }
      });
    });
  }

  let manaProfane = 0;
  let manaDivine = 0;

  //Modificateurs
  personnage.statistiques.forEach(statistiqueValue => {
    //Modificateur de Constitution
    if (statistiqueValue.statistique.id == StatistiqueIds.Constitution) {
      personnage.statistiques.forEach(statistiqueValueUpdate => {
        //Modificateur de point de vie
        if (
          statistiqueValueUpdate.statistique.id == StatistiqueIds.PVTorse ||
          statistiqueValueUpdate.statistique.id == StatistiqueIds.PVBras ||
          statistiqueValueUpdate.statistique.id == StatistiqueIds.PVJambes
        ) {
          statistiqueValueUpdate.valeur += statistiqueValue.valeur;
        }
      });
    }

    //Modificateur de Lutte
    if (statistiqueValue.statistique.id == StatistiqueIds.Force || statistiqueValue.statistique.id == StatistiqueIds.Dextérité) {
      //Force ou Dextérité
      personnage.statistiques.forEach(statistiqueValueUpdate => {
        //Modificateur de Lutte
        if (statistiqueValueUpdate.statistique.id == StatistiqueIds.Lutte) {
          statistiqueValueUpdate.valeur += statistiqueValue.valeur;
        }
      });
    }

    //Modificateur de Mana
    if (statistiqueValue.statistique.id == StatistiqueIds.Mana) {
      // Profane & Divin
      if (personnage.niveauProfane && personnage.niveauProfane > 0 && personnage.niveauProfane > personnage.race.ajustement) {
        manaProfane = statistiqueValue.valeur;
        manaProfane += personnage.niveauProfane;
        manaProfane += 4;
      }
      if (personnage.niveauDivin && personnage.niveauDivin > 0 && personnage.niveauDivin > personnage.race.ajustement) {
        manaDivine = statistiqueValue.valeur;
        manaDivine += personnage.niveauDivin;
        manaDivine += 4;
      }

      //Modificateurs
      if (manaProfane > 0 || manaDivine > 0) {
        personnage.statistiques.forEach(statistiqueValueUpdate => {
          //Intelligence
          if (statistiqueValueUpdate.statistique.id == StatistiqueIds.Intelligence) {
            manaProfane += statistiqueValueUpdate.valeur;

            if (statistiqueValueUpdate.valeur == 1) {
              manaProfane = Math.round(personnage.niveauProfane / 2 + manaProfane);
            }
            if (statistiqueValueUpdate.valeur > 1) {
              manaProfane = Math.round((personnage.niveauProfane + 1) / 2 + manaProfane);
            }
          }

          //Sagesse
          if (statistiqueValueUpdate.statistique.id == StatistiqueIds.Sagesse) {
            manaDivine += statistiqueValueUpdate.valeur;

            if (statistiqueValueUpdate.valeur == 1) {
              manaDivine = Math.round(personnage.niveauDivin / 2 + manaDivine);
            }
            if (statistiqueValueUpdate.valeur > 1) {
              manaDivine = Math.round((personnage.niveauDivin + 1) / 2 + manaDivine);
            }
          }
        });
      }
    }
  });

  //Correcteur de Statistiques
  personnage.statistiques.forEach(statistiqueValue => {
    //Correcteur de Points de vie
    if (
      statistiqueValue.statistique.id == StatistiqueIds.PVTorse ||
      statistiqueValue.statistique.id == StatistiqueIds.PVBras ||
      statistiqueValue.statistique.id == StatistiqueIds.PVJambes
    ) {
      if (statistiqueValue.valeur <= 0) {
        statistiqueValue.valeur = 1;
      }
    }

    //Correcteur de Lutte
    if (statistiqueValue.statistique.id == StatistiqueIds.Lutte) {
      if (statistiqueValue.valeur < 0) {
        statistiqueValue.valeur = 0;
      }
    }

    //Correcteur de Mana
    if (statistiqueValue.statistique.id == StatistiqueIds.Mana) {
      if (manaProfane >= manaDivine) {
        statistiqueValue.valeur = manaProfane;
      } else {
        statistiqueValue.valeur = manaDivine;
      }
    }
  });

  return personnage;
};

const _getResistances = async personnage => {
  //Race Resistances
  if (personnage.race.resistances) {
    personnage.race.resistances.forEach(resistanceItem => {
      let found = false;

      if (personnage.resistances && personnage.resistances.length > 0) {
        personnage.resistances.forEach(personnageResistanceItem => {
          if (resistanceItem.resistanceRef == personnageResistanceItem.resistance.id && personnage.niveauReel >= resistanceItem.niveau) {
            //Cummulable l'ajoute à la valeur
            if (resistanceItem.cummulable) {
              personnageResistanceItem.valeur += resistanceItem.valeur;
            }

            //Non Cummulable prend la plus forte des deux
            if (!resistanceItem.cummulable) {
              personnageResistanceItem.valeur = Math.max(personnageResistanceItem.valeur, resistanceItem.valeur);
            }

            found = true;
          }
        });
      }

      if (!found && personnage.niveauReel >= resistanceItem.niveau) {
        if (!personnage.resistances) {
          personnage.resistances = [];
        }

        let resistance = new ResistanceValue();
        resistance.resistance = resistanceItem.resistance;
        resistance.valeur = resistanceItem.valeur;
        personnage.resistances.push(resistance);
      }
    });
  }

  //Classe Resistances
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe && classeItem.classe.resistances) {
        classeItem.classe.resistances.forEach(resistanceItem => {
          let found = false;

          if (personnage.resistances) {
            personnage.resistances.forEach(personnageResistanceItem => {
              if (resistanceItem.resistanceRef == personnageResistanceItem.resistance.id && classeItem.niveau >= resistanceItem.niveau) {
                //Cummulable l'ajoute à la valeur
                if (resistanceItem.cummulable) {
                  personnageResistanceItem.valeur += resistanceItem.valeur;
                }

                //Non Cummulable prend la plus forte des deux
                if (!resistanceItem.cummulable) {
                  personnageResistanceItem.valeur = Math.max(personnageResistanceItem.valeur, resistanceItem.valeur);
                }

                found = true;
              }
            });
          }

          if (!found && personnage.niveauReel >= resistanceItem.niveau) {
            if (!personnage.resistances) {
              personnage.resistances = [];
            }

            let resistance = new ResistanceValue();
            resistance.resistance = resistanceItem.resistance;
            resistance.valeur = resistanceItem.valeur;
            personnage.resistances.push(resistance);
          }
        });
      }
    });
  }

  //Aptitude Resistances
  if (personnage.aptitudes) {
    personnage.aptitudes.forEach(aptitudeItem => {
      aptitudeItem.aptitude.resistances.forEach(aptitudeResistanceItem => {
        let found = false;

        if (personnage.resistances) {
          personnage.resistances.forEach(personnageResistanceItem => {
            if (aptitudeResistanceItem.resistanceRef == personnageResistanceItem.resistance.id) {
              //Cummulable l'ajoute à la valeur
              if (aptitudeResistanceItem.cummulable) {
                personnageResistanceItem.valeur += aptitudeResistanceItem.valeur;
              }

              //Non Cummulable prend la plus forte des deux
              if (!aptitudeResistanceItem.cummulable) {
                personnageResistanceItem.valeur = Math.max(personnageResistanceItem.valeur, aptitudeResistanceItem.valeur);
              }

              found = true;
            }
          });
        }

        if (!found) {
          if (!personnage.resistances) {
            personnage.resistances = [];
          }

          let resistance = new ResistanceValue();
          resistance.resistance = aptitudeResistanceItem.resistance;
          resistance.valeur = aptitudeResistanceItem.valeur;
          personnage.resistances.push(resistance);
        }
      });
    });
  }

  //Don Resistances
  if (personnage.dons) {
    personnage.dons.forEach(donItem => {
      donItem.don.resistances.forEach(donResistanceItem => {
        let found = false;

        if (personnage.resistances) {
          personnage.resistances.forEach(personnageResistanceItem => {
            if (donResistanceItem.resistanceRef == personnageResistanceItem.resistance.id) {
              //Cummulable l'ajoute à la valeur
              if (donResistanceItem.cummulable) {
                personnageResistanceItem.valeur += donResistanceItem.valeur;
              }

              //Non Cummulable prend la plus forte des deux
              if (!donResistanceItem.cummulable) {
                personnageResistanceItem.valeur = Math.max(personnageResistanceItem.valeur, donResistanceItem.valeur);
              }

              found = true;
            }
          });
        }

        if (!found) {
          if (!personnage.resistances) {
            personnage.resistances = [];
          }

          let resistance = new ResistanceValue();
          resistance.resistance = donResistanceItem.resistance;
          resistance.valeur = donResistanceItem.valeur;
          personnage.resistances.push(resistance);
        }
      });
    });
  }

  return personnage;
};

const _getImmunites = async personnage => {
  if (!personnage.immunites) personnage.immunites = [];

  //Race Immunites
  if (personnage.race.immunites) {
    personnage.immunites = [...personnage.immunites, ...personnage.race.immunites];
  }

  //Classes Immunites
  if (personnage.classes && personnage.classes.length > 0) {
    personnage.classes.forEach(classeItem => {
      if (classeItem.classe.immunites) {
        personnage.immunites = [...personnage.immunites, ...classeItem.classe.immunites];
      }
    });
  }

  //Aptitudes Immunites
  if (personnage.aptitudes) {
    personnage.aptitudes.forEach(aptitudeItem => {
      if (aptitudeItem.aptitude && aptitudeItem.aptitude.immunites) {
        personnage.immunites = [...personnage.immunites, ...aptitudeItem.aptitude.immunites];
      }
    });
  }

  //Dons Immunites
  if (personnage.dons) {
    personnage.dons.forEach(donItem => {
      if (donItem.don && donItem.don.immunites) {
        personnage.immunites = [...personnage.immunites, ...donItem.don.immunites];
      }
    });
  }

  return personnage;
};

const _getDonsNiveauEffectif = async personnage => {
  if (personnage.dons && personnage.statistiques) {
    personnage.dons.forEach(donItem => {
      if (donItem.don.afficherNiveau) {
        //Niveau Effectif du Personnage et Niveau d'Obtention
        donItem.niveauEffectif = personnage.niveauEffectif - (donItem.niveauObtention - 1);

        //Modificateur de Statistique
        if (donItem.don.modificateurs && donItem.don.modificateurs.length > 0) {
          donItem.don.modificateurs.forEach(modificateur => {
            personnage.statistiques.forEach(statistiqueValue => {
              if (statistiqueValue.statistique.id == modificateur.id) {
                donItem.niveauEffectif += statistiqueValue.valeur;
              }
            });
          });
        }
      }
    });
  }

  // Remplis la liste de dons complète
  return personnage;
};

const _getCapaciteSpeciales = async personnage => {
  if (!personnage.capaciteSpeciales) personnage.capaciteSpeciales = [];
  personnage.statistiques.forEach(statistiqueValue => {
    let found = false;
    Object.values(StatistiqueIds).forEach(statistiqueId => {
      if (statistiqueId == statistiqueValue.statistique.id) {
        found = true;
      }
    });
    if (!found) {
      personnage.capaciteSpeciales.push(statistiqueValue);
    }
  });

  return personnage;
};

export { buildPersonnage };
