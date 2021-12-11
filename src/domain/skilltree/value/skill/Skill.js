//@ts-check

export class Skill {
    /**
     * @param {String} title
     * @param {String} description
     * @param {Array<Task>} tasks
     * @param {Array<Skill>} dependentSkills
     */
    constructor(title, description, tasks, dependentSkills) {
        this.title = title;                     //スキルの名前
        this.description = description;         //スキルの説明
        this.tasks = tasks;                     //やるべきタスク
        this.dependentSkills = dependentSkills  //依存しているスキル
    }
}