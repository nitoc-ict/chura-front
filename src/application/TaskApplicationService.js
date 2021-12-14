//@ts-check
import { TaskRepository } from "../infrastructure/repository/TaskRepository";
import { TaskDTO } from "./dto/TaskDTO";

export class TaskApplicationService {

    /**
     * @param {TaskRepository} taskRepository
     */
    constructor(taskRepository) {
        if (!(taskRepository instanceof TaskRepository)) {
            throw "This instance is not TaskRepository.";
        }
        this.taskRepository = taskRepository;
    }

    /**
     * 固有IDからSkillを取得し、DTOへ変換、提供
     * @param {String} characterId
     * @param {String} taskId
     * @return {Promise<TaskDTO>}
     */
    async getTaskById(characterId, taskId) {
        const task = await this.taskRepository.getTaskById(characterId, taskId);
        const taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    /**
     * SkillDTOの配列を提供
     * @param {String} characterId
     * @return {Promise<Array<TaskDTO>>}
     */
    async getAllTasksByCharacterId(characterId) {
        const taskIds = await this.taskRepository.getAllTasksByCharacterID(characterId);
        const taskDTOList = [];
        for await (const taskId of taskIds) {
            const task = await this.taskRepository.getTaskById(characterId, taskId);
            taskDTOList.push(new TaskDTO(task));
        }

        return taskDTOList;
    }
}