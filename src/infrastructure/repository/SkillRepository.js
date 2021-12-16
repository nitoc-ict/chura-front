//@ts-check
/* eslint-disable no-unused-vars */
import { Skill } from "../../domain/skilltree/skill/Skill";
import { SkillDescription } from "../../domain/skilltree/skill/value/SkillDescription";
import { SkillId } from "../../domain/skilltree/skill/value/SkillId";
import { SkillTitle } from "../../domain/skilltree/skill/value/SkillTitle";
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore";

export class SkillRepository {

    /**
     * @param {Firestore} firestore
     */
    constructor(firestore) {
        this.firestore = firestore;
    }

    /**
     * @param {String} id
     * @param {Object} data
     */
    toSkill(id, data) {
        return new Skill(
            new SkillId(id),
            new SkillTitle(data["title"]),
            new SkillDescription(data["description"]),
            data["taskIds"],
            data["dependentSkillIds"]
        );
    }

    /**
     * Characterの固有IDからすべてのSkillの固有IDを取得
     * @param {String} characterId
     * @return {Promise<Array<String>>}
     */
    async getAllSkillIdsByCharacterId(characterId) {
        const skillCol = collection(
            this.firestore,
            "characters",
            characterId,
            "skills",
        );
        const snapshot = await getDocs(skillCol);
        const allSkillIds = snapshot.docs.map((doc) => doc.id);
        return allSkillIds;
    }

    /**
     * Characterの固有IDとSkillの固有IDからSkillを取得
     * @param {String} skillId
     * @return {Promise<Skill>}
     */
     async getSkillById(skillId) {
        const docRef = doc(
            this.firestore,
            "skills",
            skillId
        );
        const snapshot = await getDoc(docRef);
        const skill = this.toSkill(skillId, snapshot.data());
        return skill;
    }
}