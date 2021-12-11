//@ts-check

export class SkillTree {
    /**
     * @param {String} id
     * @param {Array<Skill>} skills
     */
    constructor(id, skills) {
        this.id = id;           //このスキルツリーのid。これをCharacterに登録してそのidを元にスキルツリーを取って来て描画したい
        this.skills = skills;   //このスキルツリーを構成するスキルの配列
    }
}