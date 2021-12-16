//@ts-check

import { CharacterId } from "./value/CharacterId";
import { CharacterName } from "./value/CharacterName";
import { CodingTime } from "./value/CodingTime";

export class Character {
    
    /**
     * @param {CharacterId} id
     * @param {CharacterName} name
     * @param {CodingTime} codingTime
     */
    constructor(id, name, codingTime) {
        if (!(id instanceof CharacterId)) throw "ID is not CharacterId.";
        if (!(name instanceof CharacterName)) throw "Name is not CharacterName.";
        if (!(codingTime instanceof CodingTime)) throw "This is not CodingTime.";
        this.id = id;
        this.name = name; 
        this.codingTime = codingTime;
    }
}