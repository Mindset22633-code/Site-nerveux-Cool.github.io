#!/usr/bin/env node

import { Command } from 'commander';
import * as math from './math.js'; // Importation de toutes les fonctions du module

const program = new Command();

program
  .name('calculateur')
  .description('Une CLI arithmétique propulsée par Commander.js')
  .version('1.0.0');

// 1. Commande principale de calcul : "calc"
program
  .command('calc')
  .description('Effectue une opération arithmétique de base entre deux nombres')
  .argument('<nombre1>', 'Le premier nombre', parseFloat) // Convertit directement l'argument en nombre
  .argument('<operateur>', 'L\'opérateur (+, -, x, /)')
  .argument('<nombre2>', 'Le second nombre', parseFloat)
  .action((n1, operateur, n2) => {
    // Vérification que les entrées sont bien des nombres valides
    if (isNaN(n1) || !isNaN(operateur) || isNaN(n2)) {
      console.error('Erreur : Veuillez entrer des nombres valides.');
      process.exit(1);
    }

    try {
      let resultat;
      switch (operateur) {
        case '+': resultat = math.ajouter(n1, n2); break;
        case '-': resultat = math.soustraire(n1, n2); break;
        case 'x': 
        case '*': resultat = math.multiplier(n1, n2); break;
        case '/': resultat = math.diviser(n1, n2); break;
        default:
          console.error(`Erreur : Opérateur '${operateur}' inconnu. Utilisez +, -, x ou /.`)
          process.exit(1);
      }
      console.log(`Résultat : ${n1} ${operateur} ${n2} = ${resultat}`);
    } catch (error) {
      console.error(`Erreur : ${error.message}`);
    }
  });

// 2. Commande avancée : "somme"
program
  .command('somme')
  .description('Calcule la somme d\'une liste de nombres séparés par des espaces')
  .argument('<nombres...>', 'Liste de nombres', (val) => val.split(' ').map(parseFloat))
  .action((nombresTableau) => {
    // Commander peut regrouper les arguments restants dans un tableau
    // Si l'utilisateur tape : 10 20 30 -> nombresTableau vaut [10, 20, 30]
    const nombresValides = nombresTableau.flat().filter(n => !isNaN(n));
    
    if (nombresValides.length === 0) {
      console.error('Erreur : Aucun nombre valide fourni.');
      process.exit(1);
    }

    const total = math.calculerSomme(nombresValides);
    console.log(`Somme des éléments [${nombresValides.join(', ')}] = ${total}`);
  });

program.parse(process.argv);
