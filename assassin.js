import { Character } from "./character.js";

export class Assassin extends Character {
    constructor(name) {
        super(name, 12, 160, 5, 20);
        this.shadowHitActive = false; // Définit si Shadow Hit est actif
        this.shadowHitPenalty = false; // Définit si l'Assassin doit subir la pénalité
    }

    shadowHit(target) {
        // Vérifie si l'Assassin est encore en vie avant d'exécuter l'attaque
        if (this.status === 'loser') {
            console.log(`${this.name} cannot use Shadow Hit because he is dead.`);
            return;
        }

        if (this.mana >= 20) {
            this.mana -= 20;
            console.log(`${this.name} uses Shadow Hit, avoiding damage next turn.`);
            this.shadowHitActive = true; // Active l'effet de Shadow Hit pour le tour suivant
        } else {
            console.log(`${this.name} does not have enough mana for Shadow Hit.`);
        }
    }

    executeShadowHit(target) {
        // Vérifie si Shadow Hit est actif avant d'exécuter
        if (this.shadowHitActive) {
            const damage = 7;
            console.log(`${this.name} performs a Shadow Hit on ${target.name}, dealing 7 damage.`);
            target.takeDamage(damage);

            // Vérifie si la cible est morte après avoir infligé les dégâts
            if (target.status !== 'loser') {
                this.shadowHitPenalty = true; // Si la cible n'est pas morte, active la pénalité
            }

            this.shadowHitActive = false; // Désactive l'effet de Shadow Hit après l'attaque
        }
    }

    // Méthode pour infliger la pénalité lors du prochain tour
    applyShadowHitPenalty() {
        if (this.shadowHitPenalty) {
            console.log(`${this.name} suffers 7 damage from the Shadow Hit penalty.`);
            this.takeDamage(7); // Utilise takeDamage pour gérer la perte de HP et la mort potentielle

            if (this.status === 'loser') {
                console.log(`${this.name} has died from the Shadow Hit penalty.`);
            }

            this.shadowHitPenalty = false; // Réinitialise la pénalité après l'application
        }
    }
}
