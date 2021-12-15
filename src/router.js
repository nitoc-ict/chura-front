import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Home from "@/views/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
