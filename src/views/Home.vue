<template>
<v-app>
    <v-row class="character-buttons">
      <v-col 
      cols="1" 
      justify="center">
        <v-img
        src="/headerImg/java.png"
        @click.native="updateSelectedCharacter(characterList[0])"
        max-width="70"
        ></v-img>
      </v-col>
      <v-col 
      cols="1" 
      justify="center">
        <v-img
        src="/headerImg/kotlin.png"
        @click.native="updateSelectedCharacter(characterList[1])"
        max-width="70"
        ></v-img>
      </v-col>
      <v-col
      cols="1"
      justify="center"
      >
        <v-img
        src="/headerImg/flutter.png"
        @click.native="updateSelectedCharacter(characterList[2])"
        max-width="70"
        ></v-img>
      </v-col>
      <v-col
      cols="1"
      justify="center"
      >
        <v-img
        src="/headerImg/go.png"
        @click.native="updateSelectedCharacter(characterList[2])"
        max-width="70"
        ></v-img>
      </v-col>
      <v-col
      cols="1"
      justify="center"
      >
        <v-img
        src="/headerImg/html.png"
        @click.native="updateSelectedCharacter(characterList[2])"
        max-width="70"
        ></v-img>
      </v-col> 
      <v-col
      cols="1"
      justify="center"
      >
        <v-img
        src="/headerImg/css.png"
        @click.native="updateSelectedCharacter(characterList[2])"
        max-width="70"
        ></v-img>
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
</v-app>
</template>

<script>
import CharacterView from "@/components/CharacterView.vue";
import SkillTreeChart from "@/components/SkillTreeChart.vue";
import { GetDI } from "./controller/GetDI";
import {CharacterApplicationService} from "@/application/CharacterApplicationService";
import {CharacterDTO} from "@/application/dto/CharacterDTO";

export default {
  name: 'Home',
  components: {
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
<style scoped>
.character-buttons{
  background-color: #448AFF;
  margin: 0;
  max-height: 100px;
}
</style>