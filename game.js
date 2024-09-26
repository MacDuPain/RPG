import { Fighter } from './fighter.js'
import { Paladin } from './paladin.js';
import { Monk } from './monk.js';
import { Berzerker } from './berzerker.js';
import { Assassin } from './assassin.js';


export class Game {
    constructor(characters) {
        this.characters = characters; // Liste des personnages dans le jeu
        this.turnLeft = 10;           // Nombre de tours restants, initialisé à 10
        this.currentTurn = 1;         // Compteur de tours
    }

    // Méthode pour réduire le nombre de tours restants
    skipTurn() {
        this.turnLeft -= 1;
        if (this.turnLeft <= 0) {
            this.endGame();
        }
    }

    // Méthode pour démarrer un tour
    startTurn() {
        console.log(`It's turn ${this.currentTurn}`);

        // Mélange les personnages pour un ordre aléatoire de jeu
        const shuffledCharacters = this.characters
            .filter(c => c.status === 'playing')
            .sort(() => Math.random() - 0.5);

        // Chaque personnage joue à son tour
        shuffledCharacters.forEach(character => {
            if (character.status === 'playing') {
                console.log(`It's time for ${character.name} to play.`);

                // Si c'est l'Assassin, applique la pénalité de "Shadow Hit" avant de jouer
                if (character instanceof Assassin) {
                    character.applyShadowHitPenalty(); // Applique la pénalité si elle est active
                }

                // Choix aléatoire de la victime
                const target = this.getRandomOpponent(character);

                // Gestion des attaques spéciales ou normales selon les conditions
                if (character instanceof Fighter && character.mana >= 20) {
                    character.darkVision(target);
                } else if (character instanceof Paladin && character.mana >= 40) {
                    character.healingLighting(target);
                } else if (character instanceof Monk && character.mana >= 25) {
                    character.heal();
                } else if (character instanceof Berzerker) {
                    character.rage();
                } else if (character instanceof Assassin && character.mana >= 20) {
                    character.shadowHit(target);
                } else {
                    character.dealDamage(target);
                }

                // Si c'est l'Assassin et que Shadow Hit est actif, applique l'effet spécial
                if (character instanceof Assassin && character.shadowHitActive) {
                    character.executeShadowHit(target); // Applique les 7 dégâts
                }
            }
        });

        // Affiche les personnages restants
        this.displayAliveCharacters();
        this.skipTurn(); // Réduit le nombre de tours
        this.currentTurn += 1;
    }


    // Méthode pour choisir un ennemi aléatoire encore en vie
    getRandomOpponent(attacker) {
        const opponents = this.characters.filter(c => c.status === 'playing' && c !== attacker);
        if (opponents.length === 0) return null;
        return opponents[Math.floor(Math.random() * opponents.length)];
    }

    // Méthode pour afficher les statistiques des personnages
    watchStats() {
        this.characters.forEach(character => {
            console.log(`${character.name}: HP = ${character.hp}, Mana = ${character.mana}, Status = ${character.status}`);
        });
    }

    // Méthode pour afficher les personnages encore en vie
    displayAliveCharacters() {
        const aliveCharacters = this.characters.filter(c => c.status === 'playing');
        console.log("Characters still alive:");
        aliveCharacters.forEach(c => console.log(`${c.name} with ${c.hp} HP`));

        if (aliveCharacters.length === 1) {
            aliveCharacters[0].status = 'winner';
            console.log(`${aliveCharacters[0].name} is the winner!`);
            this.endGame();
        }
    }

    // Méthode pour terminer la partie
    endGame() {
        console.log("Game over.");
        const winners = this.characters.filter(c => c.status === 'playing');
        winners.forEach(winner => {
            winner.status = 'winner';
            console.log(`${winner.name} is a winner!`);
        });
        this.turnLeft = 0;
    }

    // Méthode pour démarrer la partie
    startGame() {
        console.log("The game has started!");
        while (this.turnLeft > 0 && this.characters.filter(c => c.status === 'playing').length > 1) {
            this.startTurn();
        }
    }
}
