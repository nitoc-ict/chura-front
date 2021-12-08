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
     * @param {object} data
     * @return {Character}
     */
    toCharacter(data) {
        return new Character(
            new CharacterId(data["id"]),
            new CharacterName(data["name"])
        );
    }

    /**
     * @param {string} id
     * @return {Character}
     */
    getById(id) {
        let data = this.dummyData[id];
        return this.toCharacter(data);
    }

    /**
     * @return {Array<Character>}
     */
    getAll() {
        let allCharacters = [];
        for(let key in this.dummyData) {
            allCharacters.push(this.toCharacter(this.dummyData[key]));
        }
        return allCharacters;
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