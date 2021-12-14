//@ts-check
/* eslint-disable no-unused-vars */
import { Skill } from "../../domain/skilltree/skill/Skill";
import { SkillDesctiption } from "../../domain/skilltree/skill/value/SkillDescription";
import { SkillId } from "../../domain/skilltree/skill/value/SkillId";
import { SkillTitle } from "../../domain/skilltree/skill/value/SkillTitle";
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore";
import { Auth } from "firebase/auth";

export class SkillRepository {

    /**
     * @param {Firestore} firestore
     * @param {Auth} firebaseAuth
     */
    constructor(firestore, firebaseAuth) {
        this.firestore = firestore;
        this.firebaseAuth = firebaseAuth;
    }

    /**
     * @param {String} id
     * @param {Object} data
     */
    toSkill(id, data) {
        return new Skill(
            new SkillId(id),
            new SkillTitle(data["title"]),
            new SkillDesctiption(data["description"]),
            data["taskIds"],
            data["dependentSkillIds"]
        );
    }

    /**
     * 固有IDからSkillを取得
     * @param {String} characterId
     * @param {String} skillId
     * @return {Promise<Skill>}
     */
    async getSkillById(characterId, skillId) {
        const snapshot = await getDoc(doc(
            this.firestore,
            "users", //col
            "user1", //doc
            "characters", //col
            characterId, //doc
            "skilltrees",
            skillId
        ));
        const skill = this.toSkill(snapshot.id, snapshot.data());
        return skill;
    }

    /**
     * SkillIdの配列を取得
     * @param {String} characterId
     * @return {Promise<Array<String>>}
     */
    async getSkillTreeById(characterId) {
        const snapshot = await getDocs(collection(
            this.firestore,
            "users", //col
            "user1", //doc
            "characters", //col
            characterId, //doc
            "skilltrees"
        ));
        const skillTree = snapshot.docs.map((doc) => doc.id);
        return skillTree;
    }
}