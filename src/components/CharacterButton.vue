<template>
  <div>
      <v-btn>{{character_dto.characterName}}</v-btn>
  </div>
</template>

<script>
import {CharacterDTO} from "@/application/dto/CharacterDTO";

export default {
  name: 'CharacterButton',
  props: {
    character_dto: {
      type: CharacterDTO,
    }
  },
  mounted() {
  }
}
</script>
