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
     * 固有IDからTaskを取得し、DTOへ変換、提供
     * @param {String} skillId
     * @param {String} taskId
     * @return {Promise<TaskDTO>}
     */
    async getTaskById(skillId, taskId) {
        const task = await this.taskRepository.getTaskById(skillId, taskId);
        const taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    /**
     * TaskDTOの配列を提供
     * @param {String} skillId
     * @return {Promise<Array<TaskDTO>>}
     */
    async getAllTasksBySkillId(skillId) {
        const taskIds = await this.taskRepository.getAllTaskIdsBySkillId(skillId);
        const taskDTOList = [];
        for await (const taskId of taskIds) {
            const task = await this.taskRepository.getTaskById(skillId, taskId);
            taskDTOList.push(new TaskDTO(task));
        }

        return taskDTOList;
    }

    /**
     * @param {String} skillId
     * @param {String} taskId
     * @param {Boolean} isDone
     */
    async setTaskIsDone(skillId, taskId, isDone) {
        await this.taskRepository.setTaskIsDone(skillId, taskId, isDone);
    }

    /**
     * SkillのすべてのTaskが達成されているか
     */
    async isAllTaskIsDone(skillId) {
        const taskDTOList = await this.getAllTasksBySkillId(skillId);

        for (const taskDTO of taskDTOList) {
            if (!(taskDTO.isDone)) {
                return false;
            } 
        }
        return true;
    }
}