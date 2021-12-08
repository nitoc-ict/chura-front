<template>
  <div>
      <button @click="onClick">{{ character_id }}</button>
  </div>
</template>

<script>
export default {
  name: 'Character',
  props: {
    character_id: String
  },
  methods: {
    onClick: function() {
      this.$emit("onSelectCharacter", this.character_id);
    }
  }
}
</script>
