//@ts-check
/* eslint-disable no-unused-vars */
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { Task } from "../../domain/skilltree/task/Task";
import { TaskTitle } from "../../domain/skilltree/task/value/TaskTitle";
import { TaskDescription } from "../../domain/skilltree/task/value/TaskDescription";
import { TaskId } from "../../domain/skilltree/task/value/TaskId";

export class TaskRepository {

    /**
     * @param {Firestore} firestore
     * @param {Auth} firebaseAuth
     */
    constructor(firestore, firebaseAuth) {
        this.firestore = firestore;
        this.firebaseAuth = firebaseAuth;
    }

    /**
     * @param {String} id
     * @param {Object} data
     */
    toTask(id, data) {
        return new Task(
            new TaskId(id),
            new TaskTitle(data["title"]),
            new TaskDescription(data["description"]),
            data["isDone"]
        );
    }

    /**
     * 固有IDからTaskを取得
     * @param {String} characterId
     * @param {String} taskId
     * @return {Promise<Task>}
     */
    async getTaskById(characterId, taskId) {
        const snapshot = await getDoc(doc(
            this.firestore,
            "users", //col
            "user1", //doc
            "characters", //col
            characterId, //doc
            "tasks",
            taskId
        ));
        const task = this.toTask(snapshot.id, snapshot.data());
        return task;
    }

    /**
     * TaskIdの配列を取得
     * @param {String} characterId
     * @return {Promise<Array<String>>}
     */
    async getAllTasksByCharacterID(characterId) {
        const snapshot = await getDocs(collection(
            this.firestore,
            "users", //col
            "user1", //doc
            "characters", //col
            characterId, //doc
            "tasks"
        ));
        const tasks = snapshot.docs.map((doc) => doc.id);
        return tasks;
    }
}