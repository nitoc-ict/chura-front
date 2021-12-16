/* eslint-disable no-unused-vars */
//@ts-check
// JSDoc用にno-unused-varsを非表示
import { AuthApplicationService } from "../../application/AuthApplicationService";
import { CharacterApplicationService } from "../../application/CharacterApplicationService";
import { SkillTreeApplicationService } from "../../application/SkillTreeApplicationService";

export class GetDI {

    static instance;

    /**
     * @param {CharacterApplicationService} characterApplication
     */
    injectCharacterApplication(characterApplication) {
        this.characterApplication = characterApplication;
    }

    /**
     * @param {SkillTreeApplicationService} skillTreeApplication
     */
    injectSkillTreeApplication(skillTreeApplication) {
        this.skillTreeApplication = skillTreeApplication;
    }

    /**
     * @param {AuthApplicationService} authApplication
     */
    injectAuthApplication(authApplication) {
        this.authApplication = authApplication;
    }

    /**
     * @return {GetDI}
     */
    static getInstance() {
        if (!(GetDI.instance instanceof GetDI)) {
            GetDI.instance = new GetDI();
        }
        return GetDI.instance;
    }
}