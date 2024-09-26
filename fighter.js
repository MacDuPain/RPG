import { Character } from "./character.js"

export class Fighter extends Character {
    constructor(name) {
        super(name, 12, 40, 4, 20)
    }

    darkVision(target) {
        if (this.mana >= 20) {
            this.mana -= 20;
            target.takeDamage(5);
            console.log(`${this.name} uses Dark Vision on ${target.name}, dealing 5 damage.`);
            this.damageReductionNextTurn = true; // Attribut pour réduire les dégâts reçus
        } else {
            console.log(`${this.name} does not have enough mana for Dark Vision.`);
        }
    }
}



