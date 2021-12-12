//@ts-check

export class Skill {
    /**
     * @param {String} title
     * @param {String} description
     * @param {Array<TaskId>} taskIds
     * @param {Array<Skill>} dependentSkills
     */
    constructor(title, description, taskIds, dependentSkills) {
        this.title = title;                     //スキルの名前
        this.description = description;         //スキルの説明
        this.taskIds = taskIds;                 //やるべきタスク
        this.dependentSkills = dependentSkills  //依存しているスキル(このスキルを覚える上で、理解しているべきスキル。スキルツリーの根本側で、自分と直接繋がっているスキル)
    }
}