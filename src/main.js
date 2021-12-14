import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CharacterApplicationService } from "./application/CharacterApplicationService";
import { CharacterRepository } from "./infrastructure/repository/CharacterRepository";
import { InjectionConfig } from "./views/controller/InjectionConfig";
import { CharacterFactory } from './infrastructure/CharacterFactory';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { SkillRepository } from './infrastructure/repository/SkillRepository';
import { TaskApplicationService } from './application/TaskApplicationService';

const firebaseConfig = {
  apiKey: "AIzaSyAk8QXcTK4ZUe1CvTU9uYvceieuHEu_HSk",
  authDomain: "vue-firebase-8d9e2.firebaseapp.com",
  databaseURL: "https://vue-firebase-8d9e2-default-rtdb.firebaseio.com",
  projectId: "vue-firebase-8d9e2",
  storageBucket: "vue-firebase-8d9e2.appspot.com",
  messagingSenderId: "411186016432",
  appId: "1:411186016432:web:1d28e2f8094c0188c0cb75"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

const characterFactory = new CharacterFactory();
const characterRepository = new CharacterRepository(
  firestore
);

const skillRepository = new SkillRepository(
  firestore,
  firebaseAuth
);

const characterApplication = new CharacterApplicationService(
  characterRepository,
  characterFactory
);

const taskApplication = new TaskApplicationService(
  firestore,
  firebaseAuth
);

const di = InjectionConfig.getInstance();
di.injectCharacterApplication(characterApplication); // 依存性注入
di.injectSkillTreeApplication(skillRepository);
di.injectTaskApplication(taskApplication);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
