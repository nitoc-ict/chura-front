/* eslint-disable no-unused-vars */
//@ts-check
// JSDoc用にno-unused-varsを非表示
import { CharacterApplicationService } from "../../application/CharacterApplicationService";
import { SkillTreeApplicationService } from "../../application/SkillTreeApplicationService";
import { TaskApplicationService } from "../../application/TaskApplicationService";

export class InjectionConfig {

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
     * @param {TaskApplicationService} taskApplication
     */
    injectTaskApplication(taskApplication) {
        this.taskApplication = taskApplication;
    }

    /**
     * @return {InjectionConfig}
     */
    static getInstance() {
        if (!(InjectionConfig.instance instanceof InjectionConfig)) {
            InjectionConfig.instance = new InjectionConfig();
        }
        return InjectionConfig.instance;
    }
}