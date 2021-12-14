/* eslint-disable no-unused-vars */
//@ts-check
// JSDoc用にno-unused-varsを非表示
import { Skill } from "../../domain/skilltree/skill/Skill";
import { SkillId } from "../../domain/skilltree/skill/value/SkillId";
import { Task } from "../../domain/skilltree/task/Task";

export class SkillDTO {
    
    /**
     * @param {Skill} skill
     */
    constructor(skill) {
        /** @type {String} skillId */
        this.skillId = skill.id.value;
        /** @type {String} skillTitle */
        this.skillTitle = skill.title.value;
        /** @type {String} skillDescription */
        this.skillDescription = skill.description.value;
        /** @type {Array<String>} taskIds */
        this.taskIds = skill.taskIds;
        /** @type {Array<String>} dependentSkillIds */
        this.dependentSkillIds = skill.dependentSkillIds;
    }
}