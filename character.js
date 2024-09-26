export class Character {
    constructor(name, hp, mana, dmg, skillCost) {
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.dmg = dmg;
        this.skillCost = skillCost;
        this.status = 'playing';
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.status = 'loser';
            console.log(`${this.name} has lost.`);
        } else {
            console.log(`${this.name} now has ${this.hp} HP.`);
        }
    }

    dealDamage(victim) {
        if (this.status === "playing") {
            console.log(`${this.name} attacks ${victim.name} and deals ${this.dmg} damage.`);
            victim.takeDamage(this.dmg);

            if (victim.hp === 0) {
                console.log(`${this.name} has defeated ${victim.name}!`);
                this.mana += 20;
                console.log(`${this.name} regains 20 mana points. Current mana: ${this.mana}`);
            }
        } else {
            console.log(`${this.name} cannot attack because they have the status ${this.status}.`);
        }
    }
}
