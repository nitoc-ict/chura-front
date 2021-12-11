<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account? 
      <router-link to="/signup">create account now!!</router-link>
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

initializeApp(firebaseConfig)

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth()

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      signInWithEmailAndPassword(auth, this.username, this.password).then(
        user => {
          alert('Success!' + user)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
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
.signin {
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