import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import { initializeApp } from 'firebase/app'

Vue.config.productionTip = false

// const firebaseConfig = {
//   apiKey: 'AIzaSyAk8QXcTK4ZUe1CvTU9uYvceieuHEu_HSk',
//   authDomain: 'vue-firebase-8d9e2.firebaseapp.com"',
//   projectId: 'vue-firebase-8d9e2',
//   storageBucket: 'vue-firebase-8d9e2.appspot.com',
//   messagingSenderId: '411186016432',
//   appId: '1:411186016432:web:1d28e2f8094c0188c0cb75'
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)

console.log("hoyo");

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
