const resistances = [
  "Maladie",
  "Feu",
  "rage",
  "Foudre",
  "Sorts à Zone d'Effet",
  "Faiblesse aux Effets de Renvoi",
  "Poison",
  "Perforant",
  "Désarmement",
  "Tranchant",
  "Répulsion",
  "Renversement",
  "Désarmement",
  "Brise Bouclier",
  "Attaques Sournoises",
  "Contondant",
  "Domination",
  "Charme",
  "Froid",
  "Faiblesse à la Lumière",
  "confusion",
  "Terreur",
  "Mort"
];

class Resistance {
  constructor({ nom, valeur, cummulable }) {
    this.nom = nom;
    this.valeur = valeur ? valeur : 0;
    this.cummulable = cummulable ? cummulable : false;
  }
}

export { Resistance, resistances };
