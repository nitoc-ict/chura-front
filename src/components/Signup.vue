<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signUp">Register</button>
    <p>Do you have an account? 
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
// import firebase from 'firebase/app'

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
// const app = 
initializeApp(firebaseConfig)

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const auth = getAuth()

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then(user => {
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>