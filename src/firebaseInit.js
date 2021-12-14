import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyAk8QXcTK4ZUe1CvTU9uYvceieuHEu_HSk',
    authDomain: 'vue-firebase-8d9e2.firebaseapp.com"',
    projectId: 'vue-firebase-8d9e2',
    storageBucket: 'vue-firebase-8d9e2.appspot.com',
    messagingSenderId: '411186016432',
    appId: '1:411186016432:web:1d28e2f8094c0188c0cb75'
  }
  
  // Initialize Firebase
export function initFirebase() {
    initializeApp(firebaseConfig) 
}