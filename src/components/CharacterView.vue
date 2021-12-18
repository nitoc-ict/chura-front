<template>
  <v-container>
    <v-row dense
           align="end"
    >
      <v-col
          cols="8"
          style="
              height: 400px;
              border: solid 2px black;
              "
      >
        <div
            ref="characterSpacer"
        />
        <v-img
            contain
            :src="character_img"
            :max-height="character_height"
        >
        </v-img>
      </v-col>
      <v-col
          cols="4"
      >
        <div
            style="
              padding: 16px;
              border: solid 2px black;
              background-color: whitesmoke;
            "
        >
          <h1>{{character_dto.characterName}}</h1>
          <h3>コーディング時間：{{ character_dto.codingTime / 60 }}分</h3>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CharacterDTO } from '@/application/dto/CharacterDTO';
import { Character } from '@/domain/character/Character';
import { CharacterId } from '@/domain/character/value/CharacterId';
import { CharacterName } from '@/domain/character/value/CharacterName';
import { CodingTime } from '@/domain/character/value/CodingTime';
import { GetDI } from '@/views/controller/GetDI';

require('path');

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
          new CharacterName(""),
          new CodingTime(0)
        )
      ),
      character_img: "",
      character_height: 50,
    }
  },
  mounted() {
    this.updateCharacter(this.character_dto.characterId);
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
    async updateCharacter(id) {
      const di = GetDI.getInstance();
      const characterApp = di.characterApplication;
      const characterDTO = await characterApp.getCharacterById(id);
      this.character_img = this.getCharacterImgUri(characterDTO.characterName);
      this.character_dto = characterDTO;
      this.character_height = this.executeCharHeight(characterDTO.codingTime);
      this.$refs.characterSpacer.style = ("height:" + (390 - this.character_height) + "px");
    },

    executeCharHeight: function (codingTime){
      const height = (codingTime / 60) + 50;
        if (height >= 400) return 400;

      return height
    },

    getCharacterImgUri: function (name){
      switch (name) {
        case 'Java':
          return "/characterImage/Java.png";

        case 'Kotlin':
          return "/characterImage/Kotlin.png";
      }
    }
  }
}
</script>