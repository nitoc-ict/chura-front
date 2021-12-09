<template>
  <div>
    <div class="character-id-view">
      選択されたキャラのID: {{ character_dto.characterId }}
    </div>
    <div class="character-name-view">
      選択されたキャラのNAME: {{ character_dto.characterName }}
    </div>
  </div>
</template>

<script>
import { CharacterDTO } from '../application/dto/CharacterDTO';
import { Character } from '../domain/Character';
import { CharacterId } from '../domain/CharacterId';
import { CharacterName } from '../domain/CharacterName';
//import { CharacterDTO } from '../application/dto/CharacterDTO';
import { InjectionConfig } from '../views/controller/InjectionConfig';

export default {
  name: 'CharacterView',
  props: {
    character_id: {
      type: String,
      default: ""
    },
  },
  data: function() {
    return {
      character_dto: new CharacterDTO(
        new Character(
          new CharacterId(this.character_id),
          new CharacterName("")
        )
      ),
      character_id_value: this.character_id
    }
  },
  created() {
    this.updateCharacter(this.character_id_value);
  },
  watch: {
    character_id: function(newId) {
      this.updateCharacter(newId);
    }
  },
  methods: {
    /**
     * @param {String} id
     */
    updateCharacter(id) {
      const di = InjectionConfig.getInstance();
      const characterApp = di.characterApplication;
      let characterDTO = characterApp.getCharacterById(id);
      this.character_dto = characterDTO;
    }
  }
}
</script>