//@ts-check
import {CharacterRepository} from "../infrastructure/repository/CharacterRepository.js";
// JSDoc用にno-unused-varsを非表示
import { Character } from "../domain/Character.js"; // eslint-disable-line no-unused-vars
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
     * @param {string} id
     */
    getCharacterById(id) {
        if (!(this.characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        return this.characterRepository.getById(id);
    }

    /**
     * @return {Array<CharacterDTO>}
     */
    getAllCharacters() {
        if (!(this.characterRepository instanceof CharacterRepository)) {
            throw "This instance is not CharacterRepository.";
        }
        let characters = this.characterRepository.getAll();
        let characterDTOList = [];

        for (let key in characters) {
            characterDTOList.push(new CharacterDTO(characters[key]));
        }
        return characterDTOList;
    }

    /**
     * @param {String} name
     */
    saveCharacter(name) {
        let character = this.characterFactory.create(name);
        this.characterRepository.save(character);
    }
}