//@ts-check

import { SkillRepository } from "../infrastructure/repository/SkillRepository";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";
import { SkillDTO  } from "./dto/SkillDTO";
import { TaskDTO } from "./dto/TaskDTO";

export class SkillTreeApplicationService {

    /**
     * @param {SkillRepository} skillRepository
     * @param {TaskRepository} taskRepository
     */
    constructor(skillRepository, taskRepository) {
        if (!(skillRepository instanceof SkillRepository)) {
            throw "This instance is not SkillRepository.";
        }
        if (!(taskRepository instanceof TaskRepository)) {
            throw "This instance is not TaskRepository.";
        }
        this.skillRepository = skillRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * 固有IDからSkillを取得し、DTOへ変換
     * @param {String} skillId
     * @return {Promise<SkillDTO>}
     */
    async getSkillById(skillId) {
        const skill = await this.skillRepository.getSkillById(skillId);
        const skillDTO = new SkillDTO(skill);
        return skillDTO;
    }

    /**
     * SkillDTOの配列を提供
     * @param {String} characterId
     * @return {Promise<Array<SkillDTO>>}
     */
    async getAllSkillsByCharacterId(characterId) {
        const skillIds = await this.skillRepository.getAllSkillIdsByCharacterId(characterId);
        const skillDTOList = [];
        for await (const skillId of skillIds) {
            
            const skill = await this.skillRepository.getSkillById(skillId);
            skillDTOList.push(new SkillDTO(skill));
        }
        return skillDTOList;
    }

    /**
     * Taskを固有IDで取得、DTOへ変換
     * @param {String} taskId
     * @return {Promise<TaskDTO>}
     */
     async getTaskById(taskId) {
        const task = await this.taskRepository.getTaskById(taskId);
        const taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    /**
     * Skillに紐付けられたすべてのTaskを取得、DTOへ変換
     * @param {String} skillId
     * @return {Promise<Array<TaskDTO>>}
     */
    async getTasksBySkillId(skillId) {
        const skillDTO = await this.getSkillById(skillId);
        const skillDTOList = [];
        for await (const taskId of skillDTO.taskIds) {
            const taskDTO = await this.getTaskById(taskId);
            skillDTOList.push(taskDTO);
        }
        return skillDTOList;
    }

    /**
     * @param {String} taskId
     * @param {Boolean} isDone
     */
    async setTaskIsDone(taskId, isDone) {
        await this.taskRepository.setTaskIsDone(taskId, isDone);
    }
}