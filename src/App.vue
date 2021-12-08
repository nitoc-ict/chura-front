<template>
<v-app>
  <v-container>
    <Header />
    <v-row justify="center">
      <router-view/>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components:{
    Header
  }
}
</script>

<style>

</style>
