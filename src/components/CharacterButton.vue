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
    console.log('Button')
    console.log(this.character_dto);
  }
}
</script>
