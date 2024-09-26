import { Game } from './game.js';
import { Fighter } from './fighter.js'
import { Paladin } from './paladin.js'; 
import { Monk } from './monk.js'; 
import { Berzerker } from './berzerker.js';
import { Assassin } from './assassin.js';

const Grace = new Fighter('Grace');
const Ulder = new Paladin('Ulder');
const Moana = new Monk('Moana');
const Draven = new Berzerker('Draven');
const Carl = new Assassin('Carl');

const game = new Game([Ulder, Grace, Moana, Draven, Carl]);
game.startGame();  // Démarre la partie
game.watchStats(); // Affiche les statistiques
