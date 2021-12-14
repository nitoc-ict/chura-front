//@ts-check
import {Character} from "../../domain/character/Character.js";
import { CharacterId } from "../../domain/character/value/CharacterId.js";
import { CharacterName } from "../../domain/character/value/CharacterName.js";
/* eslint-disable no-unused-vars */
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore";

export class CharacterRepository {

    /**
     * @param {Firestore} firestore
     */
    constructor(firestore) {
        this.firestore = firestore;
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
     * @param {String} id
     * @return {Promise<Character>}
     */
    async getById(id) {
        const docRef = doc(this.firestore, "characters", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (!docSnap.exists()) {
            throw "DocumentSnap is not exists."
        }

        return this.toCharacter(id, data);
    }

    /**
     * すべてのCharacterを取得
     * @return {Promise<Array<Character>>}
     */
    async getAllData() {
        const allCharacters = [];
        const querySnapshot = await getDocs(collection(this.firestore, "characters"));
        querySnapshot.forEach((doc) => {
            allCharacters.push(this.toCharacter(doc.id, doc.data()));
        });
        return allCharacters;
    }

    /**
     * すべてのCharacterの固有IDを取得
     * @return {Promise<Array<String>>}
     */
    async getAllIds() {
        const allCharacterIds = [];
        const snapshot = await getDocs(collection(this.firestore, "characters"));
        snapshot.docs.forEach((doc) => {
            allCharacterIds.push(doc.id);
        });
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