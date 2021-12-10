import { Character } from "../domain/character/Character.js";
import { CharacterId } from "../domain/character/value/CharacterId.js";
import { CharacterName } from "../domain/character/value/CharacterName.js";

//@ts-check
export class CharacterFactory {

    /**
     * @param {String} name
     */
    create(name) {
        return new Character(
            new CharacterId(this.getUniqueStr()), // TODO: UUIDの生成方法を考える
            new CharacterName(name)
        );
    }

    /**
     * ネットから持ってきた代理のID Generator
     * https://qiita.com/coa00/items/679b0b5c7c468698d53f
     */
    getUniqueStr(myStrong){
        let strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }
}