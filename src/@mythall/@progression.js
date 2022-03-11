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

// const ChoixTypes = ["aptitude", "connaissance", "don", "domaine", "ecole", "esprit", "fourberie", "ordre", "sort"];

const getChoixPersonnage = async (personnage, progressingClasse) => {
  let listChoix = [];

  // Dons aux 3 niveaux & don niveau 1
  if (personnage.niveauReel % 3 == 0 || personnage.niveauReel == 1) {
    const don = new Choix();
    don.type = "don";
    don.categorie = "Normal";
    don.niveauObtention = personnage.niveauReel;
    don.quantite = 1;

    listChoix.push(Object.assign({}, don));
  }

  // Don Racial Humain
  if (personnage.raceRef == "RkYWeQrxFkmFaepDM09n" && personnage.niveauReel == 1) {
    const don = new Choix();
    don.type = "don";
    don.categorie = "Normal";
    don.niveauObtention = 1;
    don.quantite = 1;

    listChoix.push({ ...don });
  }

  // Don Racial Elf
  if (personnage.raceRef == "5hteaYQ4K8J1MaAvU9Zh" && personnage.niveauReel == 1) {
    const don = new Choix();
    don.type = "don";
    don.categorie = "Connaissance";
    don.niveauObtention = 1;
    don.quantite = 1;

    listChoix.push({ ...don });
  }

  // Get Choix de Classe
  if (personnage.classes) {
    personnage.classes.forEach(classeItem => {
      // Choix de classe
      if (classeItem.classeRef == progressingClasse.classeRef && classeItem.niveau == progressingClasse.niveau) {
        classeItem.classe.choix.forEach(choix => {
          if (choix.niveauObtention == progressingClasse.niveau) {
            listChoix.push(choix);
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
            listChoix.push(choixDomaine);
          }
        });
      }
    });
  }

  // ...

  return listChoix;
};

const getChoixClasse = (personnage, progressingClasse) => {
  let listChoix = [];

  // Get All Classes Choices
  if (personnage.classes) {
    personnage.classes.forEach(classeItem => {
      // Choix de classe
      if (classeItem.classeRef == progressingClasse.classeRef && classeItem.niveau == progressingClasse.niveau) {
        classeItem.classe.choix.forEach(choix => {
          listChoix.push(choix);
        });
      }
    });
  }

  return listChoix;
};

const getChoixDomaine = (personnage, progressingClasse) => {
  let listChoix = [];

  // Get All Classes Choices
  if (progressingClasse.classeRef == "fNqknNgq0QmHzUaYEvEd") {
    personnage.classes.forEach(classeItem => {
      // Choix de domaine
      if (classeItem.classeRef == "fNqknNgq0QmHzUaYEvEd" && progressingClasse.niveau == classeItem.niveau) {
        // ID de prêtre
        personnage.domaines.forEach(domaine => {
          domaine.choix.forEach(choix => {
            listChoix.push(choix);
          });
        });
      }
    });
  }

  return listChoix;
};

const getAvailableAlignements = async personnage => {
  let alignements = await this.alignementService.getAlignements();

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

const getAvailableClasses = async personnage => {
  let list = await this.classeService.getClasses();

  // Filtre selon la race
  if (personnage.race) {
    list = list.filter(classe => {
      return personnage.race.classesDisponibleRef.includes(classe.id);
    });
  }

  // Filtre selon les classes
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
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  return list;
};

const getAvailableConnaissances = async personnage => {
  const dons = await this.donService.getDons("Connaissance");

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

  // Trie en Ordre Alphabetic
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  return list;
};

const getAvailableDons = async personnage => {
  const dons = await this.donService.getDons();

  let list = dons;

  // Filtre les dons déjà existant
  if (personnage.dons && personnage.dons.length > 0) {
    personnage.dons.forEach(donPerso => {
      list = list.filter(don => {
        return don.id != donPerso.donRef;
      });
    });
  }

  // Filtre les Race Authorisé
  if (personnage.raceRef) {
    list = list.filter(function (don) {
      return don.racesAutoriseRef.includes(personnage.raceRef);
    });
  }

  // Filtre les classes authorisé
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
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  // Filter Duplicates
  list = list.filter((don, index, self) => index === self.findIndex(d => d.id === don.id));

  return list;
};

const getAvailableDomaines = async personnage => {
  let list = await this.domaineService.getDomaines();

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

  return list;
};

const getAvailableEcoles = async () => {
  return await this.ecoleService.getEcoles();
};

const getAvailableEsprits = async () => {
  return await this.espritService.getEsprits();
};

const getAvailableOrdres = async personnage => {
  const ordres = await this.ordreService.getOrdres();

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

  return list;
};

const getAvailableFourberies = async personnage => {
  const fourberies = await this.fourberieService.getFourberies();

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

  // Trie en Ordre Alphabetic
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  return list;
};

const getAvailableSorts = async personnage => {
  let list = [];

  // Get list de sort disponible
  if (personnage.classes) {
    personnage.classes.forEach(classe => {
      classe.classe.sortsDisponible.forEach(async sortDispo => {
        if (sortDispo.niveauObtention <= classe.niveau) {
          list.push(await this.sortService.getSort(sortDispo.sortRef));
        }
      });
    });
  }

  // Filtre les sorts déjà existant
  if (personnage.sorts && personnage.sorts.length > 0) {
    personnage.sorts.forEach(sortPerso => {
      list = list.filter(sort => {
        return sort.id != sortPerso.sortRef;
      });
    });
  }

  // Trie en Ordre Alphabetic
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  return list;
};

const getAvailableDieux = async personnage => {
  let list = await this.dieuService.getDieux();

  // Filtre selon l'alignement du personnage
  if (personnage.alignementRef) {
    list = list.filter(function (dieu) {
      return dieu.alignementPermisRef.includes(personnage.alignementRef);
    });
  }

  // Trie en Ordre Alphabetic
  list = list.sort((a, b) => {
    if (a.nom > b.nom) {
      return 1;
    }
    if (a.nom < b.nom) {
      return -1;
    }
    return 0;
  });

  return list;
};
