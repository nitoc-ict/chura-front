import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CharacterApplicationService } from "./application/CharacterApplicationService";
import { CharacterRepository } from "./infrastructure/repository/CharacterRepository";
import { InjectionConfig } from "./views/controller/InjectionConfig";
import { CharacterFactory } from './infrastructure/CharacterFactory';

const characterFactory = new CharacterFactory();
const characterRepository = new CharacterRepository();

const characterApplication = new CharacterApplicationService(
  characterRepository,
  characterFactory
);

let di = InjectionConfig.getInstance();
di.injectCharacterApplication(characterApplication); //依存性注入

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
