//@ts-check
/* eslint-disable no-unused-vars */
import { User, UserCredential, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { EmailAddress } from "../domain/auth/value/EmailAddress";
import { Password } from "../domain/auth/value/Password";
import { FirebaseAuthRepository } from "../infrastructure/repository/FirebaseAuthRepository";

export class AuthApplicationService {

    /**
     * @param {FirebaseAuthRepository} authRepository
     */
    constructor(authRepository) {
        if (!(authRepository instanceof FirebaseAuthRepository)) {
            throw "This instance is not FirebaseAuthRepository.";
        }
        this.authRepository = authRepository;
    }

    /**
     * @return {User}
     */
    getSignedInUser() {
        return this.authRepository.getSignedInUser();
    }

    /**
     * @param {String} emailStr
     * @param {String} passwordStr
     * @return {Promise<UserCredential>}
     */
    async registerWithEmailAndPassword(emailStr, passwordStr) {
        const email = new EmailAddress(emailStr);
        const password = new Password(passwordStr);
        const userCredential = (async () => {
            try {
                return await this.authRepository.registerWithEmailAndPassword(
                    email,
                    password
                );
            }
            catch (error) {
                console.log(error);
            }
        });
        return userCredential();
    }

    /**
     * @param {String} emailStr
     * @param {String} passwordStr
     * @return {Promise<UserCredential>}
     */
     async signInWithEmailAndPassword(emailStr, passwordStr) {
        const email = new EmailAddress(emailStr);
        const password = new Password(passwordStr);
        const userCredential = (async () => {
            try {
                return await this.authRepository.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            catch (error) {
                console.log(error);
            }
        });
        return userCredential();
    }

    async signOut() {
        await this.authRepository.signOut();
    }
}