import { Character } from "./character.js"

export class Paladin extends Character {
    constructor(name) {
        super(name, 16, 160, 3, 40)
    }

    healingLighting(target) {
        if (this.mana >= 40) {
            this.mana -= 40;
            target.takeDamage(4);
            this.hp += 5; // Récupère des points de vie
            console.log(`${this.name} uses Healing Lighting on ${target.name}, dealing 4 damage and healing for 5 HP.`);
        } else {
            console.log(`${this.name} does not have enough mana for Healing Lighting.`);
        }
    }
}

