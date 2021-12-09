<template>
<div>
  <div class="debug">
    <div class="character-id-view">
      Character ID: {{ character_id }}
    </div>
  </div>

  <div class="character-buttons">
    <div v-for="character_id in characters" :key="character_id.key">
      <CharacterButton @click.native="onSelectCharacter(character_id)" :character_data=character_id></CharacterButton>
    </div>
  </div>

  <div class="character-view">
    <CharacterView :character_id=character_id></CharacterView>
  </div>

  <div class="progress-tree-chart">
    <ProgressTreeChart></ProgressTreeChart>
  </div>
</div>
</template>

<script>
import CharacterButton from "@/components/CharacterButton.vue";
import CharacterView from "@/components/CharacterView.vue";
import ProgressTreeChart from "@/components/ProgressTreeChart.vue"
import { InjectionConfig } from "./controller/InjectionConfig";
export default {
  name: 'Home',
  components: {
    CharacterButton,
    CharacterView,
    ProgressTreeChart
  },
  data: function() {
    return {
      characters: [""],
      character_id: "test1"
    }
  },
  created: function() {
    let di = InjectionConfig.getInstance();
    let characterApp = di.characterApplication;
    this.characters = characterApp.getAllCharacterIds();
  },
  methods: {
    onSelectCharacter(value) {
      console.log(value);
      this.character_id = value;
    }
  }
}
</script>