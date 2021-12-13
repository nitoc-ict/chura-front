import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CharacterApplicationService } from "./application/CharacterApplicationService";
import { CharacterRepository } from "./infrastructure/repository/CharacterRepository";
import { InjectionConfig } from "./views/controller/InjectionConfig";
import { CharacterFactory } from './infrastructure/CharacterFactory';
import vuetify from './plugins/vuetify'

const characterFactory = new CharacterFactory();
const characterRepository = new CharacterRepository();

const characterApplication = new CharacterApplicationService(
  characterRepository,
  characterFactory
);

const di = InjectionConfig.getInstance();
di.injectCharacterApplication(characterApplication); //依存性注入

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
