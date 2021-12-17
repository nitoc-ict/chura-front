//@ts-check
/* eslint-disable no-unused-vars */
import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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
     * @param {Object} taskData
     * @param {Object} userData
     */
    toTask(id, taskData, userData) {
        return new Task(
            new TaskId(id),
            new TaskTitle(taskData["title"]),
            new TaskDescription(taskData["description"]),
            userData["isDone"]
        );
    }

    /**
     * @param {String} characterId
     * @return {Promise<Array<String>>}
     */
    async getAllTaskIdsByCharacterId(characterId) {
        const taskCol = collection(
            this.firestore,
            "characters",
            characterId,
            "tasks"
        );
        const snapshot = await getDocs(taskCol);
        const taskIds = snapshot.docs.map((doc) => doc.id);
        return taskIds;
    }

    /**
     * 固有IDからTaskを取得
     * @param {String} taskId
     * @return {Promise<Task>}
     */
     async getTaskById(taskId) {
         const taskDoc = doc(
             this.firestore,
             "tasks",
             taskId
         );
         const userDoc = doc(
             this.firestore,
             "users",
             this.firebaseAuth.currentUser.uid,
             "tasks",
             taskId
         );
         const taskSnapshot = await getDoc(taskDoc);
         const userSnapshot = await getDoc(userDoc);

         if (!(userSnapshot.exists())) {
             await this.setTaskInUser(taskId);
         }

         const task = this.toTask(taskId, taskSnapshot.data(), userSnapshot.data());
         return task;
    }

    async setTaskInUser(taskId) {
        const docRef = doc(
            this.firestore,
            "users",
            this.firebaseAuth.currentUser.uid,
            "tasks",
            taskId
        );
        await setDoc(docRef(taskId));
    }

    /**
     * @param {String} taskId
     * @param {Boolean} isDone
     */
     async setTaskIsDone(taskId, isDone) {
        const docRef = doc(
            this.firestore,
            "users",
            this.firebaseAuth.currentUser.uid,
            "tasks",
            taskId
        );
        await updateDoc(docRef, {"isDone": isDone});
    }
}