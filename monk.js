import { Character } from "./character.js"

export class Monk extends Character {
    constructor(name) {
        super(name, 8, 200, 2, 25)
    }

    heal() {
        if (this.mana >= 25) {
            this.mana -= 25;
            this.hp += 8; // Récupère des points de vie
            console.log(`${this.name} heals for 8 HP.`);
        } else {
            console.log(`${this.name} does not have enough mana for healing.`);
        }
    }
}
