//@ts-check
import {Character} from "../../domain/character/Character.js";
import { CharacterId } from "../../domain/character/value/CharacterId.js";
import { CharacterName } from "../../domain/character/value/CharacterName.js";
/* eslint-disable no-unused-vars */
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore";
import { CodingTime } from "../../domain/character/value/CodingTime.js";
import { Auth } from "firebase/auth";

export class CharacterRepository {

    /**
     * @param {Firestore} firestore
     * @param {Auth} firebaseAuth
     */
     constructor(firestore, firebaseAuth) {
        this.firestore = firestore;
        this.firebaseAuth = firebaseAuth;
    }

    /**
     * CharacterをEntityへ変換
     * @param {String} id
     * @param {Object} characterData
     * @param {Object} userData
     * @return {Character}
     */
    toCharacter(id, characterData, userData) {
        return new Character(
            new CharacterId(id),
            new CharacterName(characterData["name"]),
            new CodingTime(userData["codingTime"])
        );
    }

    /**
     * すべてのCharacterの固有IDを取得
     * @return {Promise<Array<String>>}
     */
    async getAllCharacterIds() {
        const characterCol = collection(
            this.firestore,
            "characters"
        );
        const snapshot = await getDocs(characterCol);
        const allCharacterIds = snapshot.docs.map((doc) => doc.id);
        return allCharacterIds;
    }

    /**
     * 固有IDからCharacterを取得
     * @return {Promise<Character>}
     */
    async getCharacterById(characterId) {
        const characterDoc = doc(
            this.firestore,
            "characters",
            characterId
        );
        const userDoc = doc(
            this.firestore,
            "users",
            this.firebaseAuth.currentUser.uid,
            "characters",
            characterId
        );
        const characterSnapshot = await getDoc(characterDoc);
        const userSnapshot = await getDoc(userDoc);
        const characterData = characterSnapshot.data();
        const userData = userSnapshot.data();
        if (!characterSnapshot.exists()) {
            throw "DocumentSnap is not exists."
        }

        return this.toCharacter(characterId, characterData, userData);
    }
}