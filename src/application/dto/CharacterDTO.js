//@ts-check
// JSDoc用にno-unused-varsを非表示
import { Character } from "../../domain/Character"; // eslint-disable-line no-unused-vars

export class CharacterDTO {
    
    /**
     * @param {Character} character
     */
    constructor(character) {
        /** @type {String} characterId */
        this.characterId = character.id.value;
        /** @type {String} characterName */
        this.characterName = character.name.value;
    }
}