//@ts-check
/* eslint-disable no-unused-vars */
import { User, UserCredential, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { EmailAddress } from "../../domain/auth/value/EmailAddress";
import { Password } from "../../domain/auth/value/Password";

export class FirebaseAuthRepository {

    /**
     * @param {Auth} firebaseAuth
     */
    constructor(firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    /**
     * @return {User}
     */
    getSignedInUser() {
        return this.firebaseAuth.currentUser;
    }

    /**
     * @param {EmailAddress} email
     * @param {Password} password
     * @return {Promise<UserCredential>}
     */
    async registerWithEmailAndPassword(email, password) {
        const emailValue = email.value;
        const passwordValue = password.value;
        const userCredential = await createUserWithEmailAndPassword(
            this.firebaseAuth,
            emailValue,
            passwordValue
        );
        return userCredential;
    }

    /**
     * @param {EmailAddress} email
     * @param {Password} password
     * @return {Promise<UserCredential>}
     */
     async signInWithEmailAndPassword(email, password) {
        const emailValue = email.value;
        const passwordValue = password.value;
        const userCredential = await signInWithEmailAndPassword(
            this.firebaseAuth,
            emailValue,
            passwordValue
        );
        return userCredential;
    }

    async signOut() {
        await this.firebaseAuth.signOut();
    }
}