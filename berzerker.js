import { Character } from "./character.js"

export class Berzerker extends Character {
    constructor(name) {
        super(name, 8, 0, 4, 0)
    }

    rage() {
        this.dmg += 1; // Augmente les dégâts
        this.hp -= 1;  // Réduit les HP
        console.log(`${this.name} enters a Rage, gaining +1 damage but losing 1 HP.`);
    }
}
