//@ts-check

import { TaskDescription } from "./value/TaskDescription";
import { TaskId } from "./value/TaskId";
import { TaskTitle } from "./value/TaskTitle";

export class Task {
    /**
     * @param {TaskId} id
     * @param {TaskTitle} title
     * @param {TaskDescription} description
     * @param {Boolean} isDone
     */
    constructor(id, title, description,isDone) {
        if (!(id instanceof TaskId)) throw "ID is not TaskId.";
        if (!(title instanceof TaskTitle)) throw "Title is not TaskTitle.";
        if (!(description instanceof TaskDescription)) throw "Description is not TaskDescription.";
        this.id = id;
        this.title = title;             //タスクのタイトル
        this.description = description; //タスクの説明
        this.isDone = isDone;           //タスクを終了したか
    }
}