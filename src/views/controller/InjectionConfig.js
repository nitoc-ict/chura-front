//@ts-check
// JSDoc用にno-unused-varsを非表示
import { CharacterApplicationService } from "../../application/CharacterApplicationService"; // eslint-disable-line no-unused-vars

export class InjectionConfig {

    static instance;

    /**
     * @param {CharacterApplicationService} characterApplication
     */
    injectCharacterApplication(characterApplication) {
        this.characterApplication = characterApplication;
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