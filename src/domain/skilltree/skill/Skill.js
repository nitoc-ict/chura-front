//@ts-check\
/* eslint-disable no-unused-vars */
import { Desctiption } from "./value/SkillDescription.js";
import TaskId from "../task/value/TaskId.js";
import { SkillTitle } from "./value/SkillTitle.js";
import { SkillId } from "./value/SkillId.js";

export class Skill {
    /**
     * @param {SkillId} id
     * @param {SkillTitle} title
     * @param {Desctiption} description
     * @param {Array<TaskId>} taskIds
     * @param {Array<Skill>} dependentSkills
     */
    constructor(id, title, description, taskIds, dependentSkills) {
        this.id = id;
        this.title = title;                     //スキルの名前
        this.description = description;         //スキルの説明
        this.taskIds = taskIds;                 //やるべきタスク
        this.dependentSkills = dependentSkills  //依存しているスキル(このスキルを覚える上で、理解しているべきスキル。スキルツリーの根本側で、自分と直接繋がっているスキル)
    }
}