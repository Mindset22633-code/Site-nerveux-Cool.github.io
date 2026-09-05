// math.js

// Opérations de base
export const ajouter = (a, b) => a + b;
export const soustraire = (a, b) => a - b;
export const multiplier = (a, b) => a * b;
export const diviser = (a, b) => {
  if (b === 0) throw new Error("Division par zéro impossible !");
  return a / b;
};

// Opération sur une liste de nombres (ex: pour la commande stats)
export const calculerSomme = (nombres) => nombres.reduce((acc, curr) => acc + curr, 0);
