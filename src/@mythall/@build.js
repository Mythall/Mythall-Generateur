import { toggleLoading } from "../assets/components/loading-component";
import { getUser } from "./users";
import { Personnage } from "./personnages";
import { getAlignement } from "./alignements";
import { getAptitude, AptitudeItem } from "./aptitudes";
import { getClasse } from "./classes";
import { getDieu } from "./dieux";
import { getDomaine } from "./domaines";
import { getDon, DonItem } from "./dons";
import { getEcole } from "./ecoles";
import { getEsprit } from "./esprits";
import { getFourberie } from "./fourberies";
import { getOrdre } from "./ordres";
import { getRace } from "./races";
import { getResistance, Resistance, ResistanceValue } from "./resistances";
import { getSort, SortItem } from "./sorts";
import { getStatistique, Statistique, statistiqueIds, StatistiqueValue } from "./statistiques";
import { getImmunite } from "./immunites";

const buildPersonnage = async personnage => {
  try {
    _updateLoadingState("Assemblage de votre personnage...");
    await Promise.all([
      _getUser(personnage),
      _getRace(personnage),
      _getClasses(personnage),
      _getAlignement(personnage),
      _getDieu(personnage),
      _getOrdres(personnage),
      _getAllFourberies(personnage)
    ]);

    _updateLoadingState("Niveau Effectif...");
    await _getNiveauEffectif(personnage);

    _updateLoadingState("École, Domaines & Esprits...");
    await Promise.all([_getEcole(personnage), _getDomaines(personnage), _getEsprit(personnage)]);

    _updateLoadingState("Aptitudes...");
    await _getAllAptitudes(personnage);

    _updateLoadingState("Sorts & Dons...");
    await Promise.all([_getAllSorts(personnage), _getAllDons(personnage)]);

    _updateLoadingState("Statistiques de base...");
    await _getStatistiquesParDefault(personnage);

    _updateLoadingState("Statistiques, Resistances & Immunities...");
    await Promise.all([_getStatistiques(personnage), _getResistances(personnage), _getImmunites(personnage)]);

    _updateLoadingState("Niveau de dons & Capacité spéciales...");
    await Promise.all([_getDonsNiveauEffectif(personnage), _getCapaciteSpeciales(personnage)]);

    _updateLoadingState("Assemblage du personnage terminé!");

    // Completed
    toggleLoading(false);
    return new Personnage(personnage.id, personnage);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const buildPersonnageForProgression = async personnage => {
  try {
    _updateLoadingState("Assemblage de votre personnage...");
    await Promise.all([
      _getUser(personnage),
      _getRace(personnage),
      _getClasses(personnage),
      _getAlignement(personnage),
      _getDieu(personnage),
      _getOrdres(personnage)
    ]);

    _updateLoadingState("Niveau Effectif...");
    await _getNiveauEffectif(personnage);

    _updateLoadingState("Domaines & Esprits...");
    await Promise.all([_getDomaines(personnage), _getEsprit(personnage)]);

    _updateLoadingState("Aptitudes...");
    await _getAllAptitudes(personnage);

    _updateLoadingState("Dons...");
    await _getAllDons(personnage);

    _updateLoadingState("Statistiques de base...");
    await _getStatistiquesParDefault(personnage);

    _updateLoadingState("Statistiques...");
    await _getStatistiques(personnage);

    _updateLoadingState("Assemblage du personnage terminé!");

    // Completed
    toggleLoading(false);
    return new Personnage(personnage.id, personnage);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const _updateLoadingState = msg => {
  toggleLoading(true, msg);
  console.log(msg);
};

const _getUser = async personnage => {
  personnage.user = await getUser(personnage.userRef);
  return personnage;
};

const _getRace = async personnage => {
  personnage.race = await getRace(personnage.raceRef);
  personnage.race.sortsRacial = await Promise.all(personnage.race.sortsRacialRef.map(ref => getSort(ref)));
  await Promise.all(personnage.race.sortsRacial.map(sort => sort.load()));
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
      console.log("Une erreur est survenue lors de la requete pour l'alignement du personnage");
    }
  }
  return personnage;
};

const _getDieu = async personnage => {
  if (personnage.dieuRef) {
    try {
      personnage.dieu = await getDieu(personnage.dieuRef);
    } catch (e) {
      console.log("Une erreur est survenue lors de la requete pour le dieu du personnage");
    }
  }
  return personnage;
};

const _getOrdres = async personnage => {
  if (personnage?.ordresRef?.length > 0) {
    try {
      personnage.ordres = await Promise.all(personnage.ordresRef.map(ref => getOrdre(ref)));
    } catch (e) {
      console.log("Une erreur est survenue lors de la requete des ordres du personnage");
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
      personnage.niveauEffectif += +classe.niveau;
      personnage.niveauReel += +classe.niveau;

      if (classe.classe.sort == "Profane") {
        personnage.niveauProfane += +classe.niveau;
      }

      if (classe.classe.sort == "Divin") {
        personnage.niveauDivin += +classe.niveau;
      }
    });
  }

  if (personnage.race) {
    if (personnage.race.ajustement) {
      personnage.niveauEffectif += +personnage.race.ajustement;
      if (personnage.niveauProfane > 0) personnage.niveauProfane += +personnage.race.ajustement;
      if (personnage.niveauDivin > 0) personnage.niveauDivin += +personnage.race.ajustement;
    }
  }

  return personnage;
};

const _getEcole = async personnage => {
  if (personnage.ecoleRef) {
    const response = await getEcole(personnage.ecoleRef);
    personnage.ecole = response.nom;
    return personnage;
  }

  return personnage;
};

const _getDomaines = async personnage => {
  if (personnage.domainesRef && personnage.domainesRef.length > 0) {
    let count = 0;

    personnage.domainesRef.forEach(async domaineRef => {
      const domaine = await getDomaine(domaineRef);
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
    const response = await getEsprit(personnage.espritRef);
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
      let aptitudeItem = new AptitudeItem({});
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
        const aptitude = await getAptitude(aptitudeItem.aptitudeRef);
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
      if (aptitudeItem.aptitude?.sortsEquivalentRef.length > 0) {
        aptitudeItem.aptitude.sortsEquivalentRef.forEach(aptSortRef => {
          let sortItem = new SortItem({});
          sortItem.niveauObtention = aptitudeItem.niveauObtention;
          sortItem.sortRef = aptSortRef;
          personnage.sorts.push(sortItem);
        });
      }
    });
  }

  // Filter duplicated
  personnage.sorts = personnage.sorts.filter((sort, index, self) => index === self.findIndex(d => d.sortRef === sort.sortRef));
  const sorts = await Promise.all(personnage.sorts.map(item => getSort(item.sortRef)));
  personnage.sorts.forEach((item, i) => {
    item.sort = sorts[i];
  });

  // Load Sort data
  await Promise.all(personnage.sorts.map(item => item.sort.load()));
};

const _getAllDons = async personnage => {
  // Dons Racial
  if (personnage.race && personnage.race.donsRacialRef && personnage.race.donsRacialRef.length > 0) {
    personnage.race.donsRacialRef.forEach(donRef => {
      let donItem = new DonItem({});
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
          let donItem = new DonItem({});
          donItem.niveauObtention = fourberie.niveauObtention;
          donItem.donRef = aptDonRef;
          personnage.dons.push(donItem);
        });
      }
    });
  }

  // Dons Aptitudes (Équivalence)
  if (personnage.aptitudes?.length > 0) {
    personnage.aptitudes.forEach(aptitude => {
      if (aptitude.aptitude?.donsEquivalentRef.length > 0) {
        aptitude.aptitude.donsEquivalentRef.forEach(aptDonRef => {
          let donItem = new DonItem({});
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
        const don = await getDon(donItem.donRef, false, true);
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
    getStatistique(statistiqueIds.Constitution),
    getStatistique(statistiqueIds.Dextérité),
    getStatistique(statistiqueIds.Force),
    getStatistique(statistiqueIds.Intelligence),
    getStatistique(statistiqueIds.Sagesse),
    getStatistique(statistiqueIds.PVTorse),
    getStatistique(statistiqueIds.PVBras),
    getStatistique(statistiqueIds.PVJambes),
    getStatistique(statistiqueIds.Lutte),
    getStatistique(statistiqueIds.Mana),
    getStatistique(statistiqueIds.Ki)
  ]);

  if (!personnage.statistiques) personnage.statistiques = [];

  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[0] })); // Constitution
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[1] })); // Dexterité
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[2] })); // Force
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[3] })); // Intelligence
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[4] })); // Sagesse
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[5], valeur: 3 })); // PV Torse
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[6], valeur: 2 })); // PV Bras
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[7], valeur: 2 })); // PV Jambes
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[8], valeur: 3 })); // Lutte
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[9], valeur: 0 })); // Mana
  personnage.statistiques.push(new StatistiqueValue({ statistique: statistiques[10], valeur: 0 })); // Ki
  return personnage;
};

const _getStatistiques = async personnage => {
  // Ajoute ou Update la statistique avec la bonne valeur, cumulable ou non
  const _setStatistique = statistiqueItem => {
    const matchingIndex = personnage.statistiques.findIndex(statistiqueValue => statistiqueValue.statistique.id == statistiqueItem.statistiqueRef);
    if (matchingIndex > -1) {
      const statistique = personnage.statistiques[matchingIndex];
      if (statistique) {
        statistique.valeur = statistiqueItem.cummulable
          ? (statistique.valeur += statistiqueItem.valeur) // Cumulable l'ajoute à la valeur
          : (statistique.valeur = Math.max(statistique.valeur, statistiqueItem.valeur)); // Non Cumulable prend la plus forte valeur
      }
    } else {
      personnage.statistiques.push(
        new StatistiqueValue({ statistique: new Statistique(statistiqueItem.statistiqueRef, {}), valeur: statistiqueItem.valeur })
      );
    }
  };

  //Race Statistiques
  personnage.race.statistiques.forEach(statistiqueItem => {
    if (personnage.niveauReel >= statistiqueItem.niveau) {
      _setStatistique(statistiqueItem);
    }
  });

  //Classe Statistiques
  const classesWithStatistiques = personnage.classes.filter(classeItem => classeItem.classe.statistiques?.length > 0);
  if (classesWithStatistiques) {
    classesWithStatistiques.forEach(classeItem => {
      classeItem.classe.statistiques.forEach(statistiqueItem => {
        if (classeItem.niveau >= statistiqueItem.niveau) {
          _setStatistique(statistiqueItem);
        }
      });
    });
  }

  //Aptitude Statistiques
  const aptitudesWithStatistiques = personnage.aptitudes.filter(aptitudeItem => aptitudeItem.aptitude.statistiques?.length > 0);
  if (aptitudesWithStatistiques) {
    const statistiquesModifiers = aptitudesWithStatistiques.map(aptitudeItem => aptitudeItem.aptitude.statistiques).flat();
    statistiquesModifiers.forEach(statistiqueItem => {
      if (personnage.niveauReel >= statistiqueItem.niveau) {
        _setStatistique(statistiqueItem);
      }
    });
  }

  //Don Statistiques
  const donsWithStatistiques = personnage.dons.filter(donItem => donItem.don.statistiques?.length > 0);
  if (donsWithStatistiques) {
    const statistiquesModifiers = donsWithStatistiques.map(donItem => donItem.don.statistiques).flat();
    statistiquesModifiers.forEach(statistiqueItem => {
      _setStatistique(statistiqueItem);
    });
  }

  // Load nom of statistiques without one currently
  const statistiquesWithoutNom = personnage.statistiques.filter(statistiqueItem => !statistiqueItem.statistique.nom);
  const statistiquesWithNom = await Promise.all(statistiquesWithoutNom.map(statistiqueValue => getStatistique(statistiqueValue.statistique.id)));
  statistiquesWithNom.forEach(sv => {
    personnage.statistiques.find(s => s.statistique.id == sv.id).statistique.nom = sv.nom;
  });

  // Base values
  let manaProfane = 0;
  let manaDivine = 0;

  //Modificateurs
  personnage.statistiques.forEach(statistiqueValue => {
    //Modificateur de Constitution
    if (statistiqueValue.statistique.id == statistiqueIds.Constitution) {
      personnage.statistiques.forEach(statistiqueValueUpdate => {
        //Modificateur de point de vie
        if (
          statistiqueValueUpdate.statistique.id == statistiqueIds.PVTorse ||
          statistiqueValueUpdate.statistique.id == statistiqueIds.PVBras ||
          statistiqueValueUpdate.statistique.id == statistiqueIds.PVJambes
        ) {
          statistiqueValueUpdate.valeur += statistiqueValue.valeur;
        }
      });
    }

    //Modificateur de Lutte
    if (statistiqueValue.statistique.id == statistiqueIds.Force || statistiqueValue.statistique.id == statistiqueIds.Dextérité) {
      //Force ou Dextérité
      personnage.statistiques.forEach(statistiqueValueUpdate => {
        //Modificateur de Lutte
        if (statistiqueValueUpdate.statistique.id == statistiqueIds.Lutte) {
          statistiqueValueUpdate.valeur += statistiqueValue.valeur;
        }
      });
    }

    //Modificateur de Mana
    if (statistiqueValue.statistique.id == statistiqueIds.Mana) {
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
          if (statistiqueValueUpdate.statistique.id == statistiqueIds.Intelligence) {
            manaProfane += statistiqueValueUpdate.valeur;

            if (statistiqueValueUpdate.valeur == 1) {
              manaProfane = Math.round(personnage.niveauProfane / 2 + manaProfane);
            }
            if (statistiqueValueUpdate.valeur > 1) {
              manaProfane = Math.round((personnage.niveauProfane + 1) / 2 + manaProfane);
            }
          }

          //Sagesse
          if (statistiqueValueUpdate.statistique.id == statistiqueIds.Sagesse) {
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
      statistiqueValue.statistique.id == statistiqueIds.PVTorse ||
      statistiqueValue.statistique.id == statistiqueIds.PVBras ||
      statistiqueValue.statistique.id == statistiqueIds.PVJambes
    ) {
      if (statistiqueValue.valeur <= 0) {
        statistiqueValue.valeur = 1;
      }
    }

    //Correcteur de Lutte
    if (statistiqueValue.statistique.id == statistiqueIds.Lutte) {
      if (statistiqueValue.valeur < 0) {
        statistiqueValue.valeur = 0;
      }
    }

    //Correcteur de Mana
    if (statistiqueValue.statistique.id == statistiqueIds.Mana) {
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
  // Set Resistance cummulable ou non
  const _setResistance = resistanceItem => {
    const matchingIndex = personnage.resistances.findIndex(resistanceValue => resistanceValue.resistance.id == resistanceItem.resistanceRef);
    if (matchingIndex > -1) {
      const resistance = personnage.resistances[matchingIndex];
      if (resistance) {
        resistance.valeur = resistanceItem.cummulable
          ? (resistance.valeur += resistanceItem.valeur) // Cummulable l'ajoute à la valeur
          : (resistance.valeur = Math.max(resistance.valeur, resistanceItem.valeur)); // Non Cummulable prend la plus forte valeur
      }
    } else {
      personnage.resistances.push(
        new ResistanceValue({ resistance: new Resistance(resistanceItem.resistanceRef, {}), valeur: resistanceItem.valeur })
      );
    }
  };

  // Race Resistances
  personnage.race.resistances.forEach(resistanceItem => {
    _setResistance(resistanceItem);
  });

  // Classes Resistances
  const classesWithResistances = personnage.classes.filter(classeItem => classeItem.resistances?.length > 0);
  const classesItemsWithResistances = classesWithResistances.map(classeItem => classeItem).flat();
  classesItemsWithResistances.forEach(classeItem => {
    classeItem.resistances.forEach(resistanceItem => {
      if (classeItem.niveau >= resistanceItem.niveau) {
        _setResistance(resistanceItem);
      }
    });
  });

  // Aptitudes Resistances
  const aptitudesWithResistances = personnage.aptitudes.filter(aptitudeItem => aptitudeItem.resistances?.length > 0);
  const aptitudesItemsWithResistances = aptitudesWithResistances.map(aptitudeItem => aptitudeItem).flat();
  aptitudesItemsWithResistances.forEach(aptitudeItem => {
    aptitudeItem.resistances.forEach(resistanceItem => {
      _setResistance(resistanceItem);
    });
  });

  // Dons Resistances
  const donsWithResistances = personnage.dons.filter(donItem => donItem.resistances?.length > 0);
  const donsItemsWithResistances = donsWithResistances.map(donItem => donItem).flat();
  donsItemsWithResistances.forEach(donItem => {
    donItem.resistances.forEach(resistanceItem => {
      _setResistance(resistanceItem);
    });
  });

  // Load nom of resistances
  const itemsWithoutNom = personnage.resistances.filter(item => !item.resistance.nom);
  const items = await Promise.all(itemsWithoutNom.map(value => getResistance(value.resistance.id)));
  items.forEach(item => {
    personnage.resistances.find(r => r.resistance.id == item.id).resistance.nom = item.nom;
  });

  return personnage;
};

const _getImmunites = async personnage => {
  //Race Immunites
  if (personnage.race.immunitesRef) {
    personnage.immunitesRef = [...personnage.immunitesRef, ...personnage.race.immunitesRef];
  }

  //Classes Immunites
  personnage.classes?.forEach(classeItem => {
    if (classeItem.classe.immunitesRef) {
      personnage.immunitesRef = [...personnage.immunitesRef, ...classeItem.classe.immunitesRef];
    }
  });

  //Aptitudes Immunites
  personnage.aptitudes?.forEach(aptitudeItem => {
    if (aptitudeItem.aptitude?.immunites) {
      personnage.immunitesRef = [...personnage.immunitesRef, ...aptitudeItem.aptitude.immunitesRef];
    }
  });

  //Dons Immunites
  personnage.dons?.forEach(donItem => {
    if (donItem.don?.immunites) {
      personnage.immunitesRef = [...personnage.immunitesRef, ...donItem.don.immunitesRef];
    }
  });

  // Load Immunites
  personnage.immunites = await Promise.all(personnage.immunitesRef.map(id => getImmunite(id)));

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
    Object.values(statistiqueIds).forEach(statistiqueId => {
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

export { buildPersonnage, buildPersonnageForProgression };
