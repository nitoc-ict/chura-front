//@ts-check

export class Task {
    /**
     * @param {TaskId} taskId
     * @param {String} title
     * @param {String} description
     * @param {Boolean} isDone
     */
    constructor(taskId, title, description,isDone) {
        this.taskId = taskId;           //タスクの識別子
        this.title = title;             //タスクのタイトル
        this.description = description; //タスクの説明
        this.isDone = isDone;           //タスクを終了したか
    }
}