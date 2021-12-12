//@ts-check

export class Task {
    /**
     * @param {String} title
     * @param {String} description
     * @param {Boolean} isDone
     */
    constructor(title, description,isDone) {
        this.title = title;             //タスクのタイトル
        this.description = description; //タスクの説明
        this.isDone = isDone;           //タスクを終了したか
    }
}