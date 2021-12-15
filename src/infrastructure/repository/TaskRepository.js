//@ts-check
/* eslint-disable no-unused-vars */
import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
     * @param {String} skillId
     * @param {String} taskId
     * @return {Promise<Task>}
     */
    async getTaskById(skillId, taskId) {
        const snapshot = await getDoc(doc(
            this.firestore,
            "users",
            this.firebaseAuth.currentUser.uid,
            "tasks",
            skillId
        ));
        const data = snapshot.data()[taskId];
        const task = this.toTask(taskId, data);
        return task;
    }

    /**
     * TaskIdの配列を取得
     * @param {String} skillId
     * @return {Promise<Array<String>>}
     */
    async getAllTaskIdsBySkillId(skillId) {
        const snapshot = await getDocs(collection(
            this.firestore,
            "users",
            this.firebaseAuth.currentUser.uid,
            "tasks",
            skillId
        ));
        const tasks = snapshot.docs.map((doc) => doc.id);
        return tasks;
    }

    /**
     * @param {String} skillId
     * @param {String} taskId
     * @param {Boolean} isDone
     */
    async setTaskIsDone(skillId, taskId, isDone) {
        await updateDoc(doc(
                this.firestore,
                "users",
                this.firebaseAuth.currentUser.uid,
                "tasks",
                skillId,
                taskId
            ),
            {
                "isDone": isDone
            }
        );
    }
}