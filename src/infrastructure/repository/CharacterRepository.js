//@ts-check
import {Character} from "../../domain/character/Character.js";
import { CharacterId } from "../../domain/character/value/CharacterId.js";
import { CharacterName } from "../../domain/character/value/CharacterName.js";
import { getCharacterDummyData } from "./DummyData.js";
export class CharacterRepository {

    constructor() {
        // this.firebaseInstance = null;
        // TODO: データ形式がまだ決まっていない
        /**
         * @type {object} dummyData
         */
        this.dummyData = getCharacterDummyData(); // TODO: Firebase DBの代わり
    }

    /**
     * CharacterをEntityへ変換
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
     * 固有IDからCharacterを取得
     * @param {string} id
     * @return {Character}
     */
    getById(id) {
        const data = this.dummyData[id];
        return this.toCharacter(id, data);
    }

    /**
     * すべてのCharacterを取得
     * @return {Array<Character>}
     */
    getAllData() {
        const allCharacters = [];
        for (const id in this.dummyData) {
            allCharacters.push(this.toCharacter(id, this.dummyData[id]));
        }
        return allCharacters;
    }

    /**
     * すべてのCharacterの固有IDを取得
     * @return {Array<String>}
     */
    getAllIds() {
        const allCharacterIds = [];
        for (const id in this.dummyData) {
            allCharacterIds.push(id);
        }
        return allCharacterIds;
    }

    /**
     * Characterを保存
     * TODO: Character Entityを永続化処理する工程が必要
     * @param {Character} character
     */
    save(character) {
        if (character instanceof Character) {
            return;
        }
    }
}