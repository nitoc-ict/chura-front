//@ts-check

import { CharacterId } from "./value/CharacterId";
import { CharacterName } from "./value/CharacterName";

export class Character {
    
    /**
     * @param {CharacterId} id
     * @param {CharacterName} name
     */
    constructor(id, name) {
        if (!(id instanceof CharacterId)) throw "ID is not CharacterId.";
        if (!(name instanceof CharacterName)) throw "Name is not CharacterName.";
        this.id = id;
        this.name = name; 
    }
}