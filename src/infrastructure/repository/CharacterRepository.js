//@ts-check
import {Character} from "../../domain/Character.js";
import { CharacterId } from "../../domain/CharacterId.js";
import { CharacterName } from "../../domain/CharacterName.js";
import { dummyData } from "./DummyData.js";
export class CharacterRepository {

    constructor() {
        // this.firebaseInstance = null;
        // TODO: データ形式がまだ決まっていない
        /**
         * @type {object} dummyData
         */
        this.dummyData = dummyData(); // TODO: Firebase DBの代わり
    }

    /**
     * @param {String} id
     * @param {object} data
     * @return {Character}
     */
    toCharacter(id, data) {
        return new Character(
            new CharacterId(id),
            new CharacterName(data["name"])
        );
    }

    /**
     * @param {string} id
     * @return {Character}
     */
    getById(id) {
        let data = this.dummyData[id];
        return this.toCharacter(id, data);
    }

    /**
     * @return {Array<Character>}
     */
    getAllValues() {
        let allCharacters = [];
        for(let id in this.dummyData) {
            allCharacters.push(this.toCharacter(id, this.dummyData[id]));
        }
        return allCharacters;
    }

    /**
     * @return {Array<String>}
     */
    getAllIds() {
        let allCharacterIds = [];
        for(let id in this.dummyData) {
            allCharacterIds.push(id);
        }
        return allCharacterIds;
    }

    /**
     * @param {Character} character
     */
    save(character) {
        if (character instanceof Character) {
            return;
        }
    }
}