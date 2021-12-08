//@ts-check
import {Character} from "../../domain/Character.js";
import { CharacterId } from "../../domain/CharacterId.js";
import { CharacterName } from "../../domain/CharacterName.js";
export class CharacterRepository {

    constructor() {
        // this.firebaseInstance = null;
        // TODO: データ形式がまだ決まっていない
        this.dummyData = {
            "1": "vue",
            "2": "java",
            "3": "kotlin",
            "4": "dart",
            "5": "php",
            "6": "haskell",
            "7": "ruby"
        };
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
            allCharacters.push(this.dummyData[key]);
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