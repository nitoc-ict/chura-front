//@ts-check

import { SkillRepository } from "../infrastructure/repository/SkillRepository";
import { SkillDTO  } from "./dto/SkillDTO";

export class SkillTreeApplicationService {

    /**
     * @param {SkillRepository} skillRepository
     */
    constructor(skillRepository) {
        if (!(skillRepository instanceof SkillRepository)) {
            throw "This instance is not SkillRepository.";
        }
        this.skillRepository = skillRepository;
    }

    /**
     * 固有IDからSkillを取得し、DTOへ変換、提供
     * @param {String} characterId
     * @param {String} skillId
     * @return {Promise<SkillDTO>}
     */
    async getSkillById(characterId, skillId) {
        const skill = await this.skillRepository.getSkillById(characterId, skillId);
        const skillDTO = new SkillDTO(skill);
        return skillDTO;
    }

    /**
     * SkillDTOの配列を提供
     * @param {String} characterId
     * @return {Promise<Array<SkillDTO>>}
     */
    async getSkillTreeById(characterId) {
        const skillTree = await this.skillRepository.getSkillTreeById(characterId);
        const skillDTOList = [];
        for await (const skillId of skillTree) {
            const skill = await this.skillRepository.getSkillById(characterId, skillId);
            skillDTOList.push(new SkillDTO(skill));
        }

        return skillDTOList;
    }
}