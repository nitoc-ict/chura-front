import Vue from 'vue'
import App from './App.vue'
import { setUp } from './InjectionConfig';
import router from './router'

// Initialize
setUp();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
