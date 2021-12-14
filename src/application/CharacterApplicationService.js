//@ts-check
import {CharacterRepository} from "../infrastructure/repository/CharacterRepository.js";
// JSDoc用にno-unused-varsを非表示
import { Character } from "../domain/character/Character.js"; // eslint-disable-line no-unused-vars
import {CharacterDTO} from "./dto/CharacterDTO.js";
import { CharacterFactory } from "../infrastructure/CharacterFactory.js";

export class CharacterApplicationService {

    /**
     * @param {CharacterRepository} characterRepository
     * @param {CharacterFactory} characterFactory
     */
    constructor(characterRepository, characterFactory) {
        if (!(characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        if (!(characterFactory instanceof CharacterFactory)) {
            throw "This instance is not CharacterFactory";
        }
        this.characterRepository = characterRepository;
        this.characterFactory = characterFactory;
    }

    /**
     * 取得したCharacterをDTOへ変換し、提供
     * @param {String} id
     * @return {Promise<CharacterDTO>}
     */
    async getCharacterById(id) {
        if (!(this.characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        const character = await this.characterRepository.getById(id);
        const characterDTO = new CharacterDTO(character);
        return characterDTO;
    }

    /**
     * 取得したすべてのCharacterをDTOへ変換し、提供
     * @return {Array<CharacterDTO>}
     */
    getAllCharacters() {
        if (!(this.characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        const characters = this.characterRepository.getAllData();
        const characterDTOList = [];

        for (const id in characters) {
            characterDTOList.push(new CharacterDTO(characters[id]));
        }
        return characterDTOList;
    }

    /**
     * すべてのCharacterの固有IDを提供
     * @return {Promise<Array<String>>}
     */
    async getAllCharacterIds() {
        if (!(this.characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        return await this.characterRepository.getAllIds();
    }

    /**
     * 入力された名前のCharacterを生成し、保存
     * @param {String} name
     */
    saveCharacter(name) {
        const character = this.characterFactory.create(name);
        this.characterRepository.save(character);
    }
}