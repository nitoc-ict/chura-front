/* eslint-disable no-unused-vars */
//@ts-check
// JSDoc用にno-unused-varsを非表示
import { Task } from "../../domain/skilltree/task/Task";

export class TaskDTO {
    
    /**
     * @param {Task} task
     */
    constructor(task) {
        /** @type {String} taskId */
        this.taskId = task.id.value;
        /** @type {String} taskTitle */
        this.taskTitle = task.title.value;
        /** @type {String} taskDescription */
        this.taskDescription = task.description.value;
        /** @type {Boolean} isDone */
        this.isDone = task.isDone;
    }
}