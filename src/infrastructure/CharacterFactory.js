import { Character } from "../domain/character";
import { CharacterId } from "../domain/CharacterId";
import { CharacterName } from "../domain/CharacterName";

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