<template>
<div>
  <div class="debug">
    <div class="character-id-view">
      Character ID: {{ character_id }}
    </div>
  </div>

  <div class="character-buttons">
    <div v-for="character in characters" :key="character.id">
      <CharacterButton @onSelectCharacter="onSelectCharacter" :character_id=character></CharacterButton>
    </div>
  </div>

  <div class="character-view">
    <CharacterView></CharacterView>
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

export default {
  name: 'Home',
  components: {
    CharacterButton,
    CharacterView,
    ProgressTreeChart
  },
  props: {
    character_id: {
      type: String,
      default: "1",
      require: true
    },
  },
  // ダミーデータ（Firebaseを使用する）
  data: function() {
    return {
      characters: [
        "vue",
        "java",
        "php",
        "haskell",
        "ruby"
      ]
    }
  },
  methods: {
    onSelectCharacter(character_id) {
      this.character_id = character_id;
    }
  }
}
</script>
