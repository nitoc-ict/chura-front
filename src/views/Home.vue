<template>
<div>

  <v-row class="character-buttons">
    <v-col
        cols="1"
        v-for="(character, index) in characterList" :key="index">
      <CharacterButton
          @click.native="updateSelectedCharacter(character)"
          :character_dto=character></CharacterButton>
    </v-col>
  </v-row>

  <div class="character-view">
    <CharacterView :character_id=selectedCharacter.characterId></CharacterView>
  </div>

  <div class="progress-tree-chart">
    <SkillTreeChart
        :character_id=selectedCharacter.characterId
    ></SkillTreeChart>
  </div>
</div>
</template>

<script>
import CharacterButton from "@/components/CharacterButton.vue";
import CharacterView from "@/components/CharacterView.vue";
import SkillTreeChart from "@/components/SkillTreeChart.vue";
import { GetDI } from "./controller/GetDI";
import {CharacterApplicationService} from "@/application/CharacterApplicationService";
import {CharacterDTO} from "@/application/dto/CharacterDTO";

export default {
  name: 'Home',
  components: {
    CharacterButton,
    CharacterView,
    SkillTreeChart,
  },
  data: function() {
    return {
      characterList: [],    //キャラクター選択のボタンに表示するCharacterDTOのリスト
      selectedCharacter: {  //現在選択されているCharacterDTOのcharacterId
        type: CharacterDTO,
        default: null
      },

      characterApp: {   //CharacterApplicationServiceのインスタンス
        type: CharacterApplicationService,
        default: null
      }
    }
  },
  created: function() {
    const di = GetDI.getInstance();
    this.characterApp = di.characterApplication;
  },
  mounted: async function() {
    await this.fetchAllCharacter();
  },
  methods: {
    // 渡されたcharacterでthis.selectedCharacterを更新
    updateSelectedCharacter: function(character) {
      this.selectedCharacter = character;
    },

    // characterListをFirestoreから取ってくる
    fetchAllCharacter: async function(){
      this.characterList = await this.characterApp.getAllCharacter();
    }
  }
}
</script>