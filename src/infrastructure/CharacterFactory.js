import { Character } from "../domain/Character.js";
import { CharacterId } from "../domain/CharacterId.js";
import { CharacterName } from "../domain/CharacterName.js";

//@ts-check
export class CharacterFactory {

    /**
     * @param {String} name
     */
    create(name) {
        return new Character(
            CharacterId("test"), // TODO: IDの生成方法を考える
            CharacterName(name)
        );
    }
}