<template>
  <div>
      <button>{{ character_data }}</button>
  </div>
</template>

<script>
export default {
  name: 'CharacterButton',
  props: {
    character_data: String
  },
}
</script>
