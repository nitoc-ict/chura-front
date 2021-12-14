import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vue',
    name: 'Vue',
    component: () => import('../views/VueCharacter.vue')
  },
  {
    path: '/python',
    name: 'Python',
    component: () => import('../views/PythonCharacter.vue')
  },
  {
    path: '/android',
    name: 'Android',
    component: () => import('../views/AndroidCharacter.vue')
  },
  {
    path: '/css',
    name: 'Css',
    component: () => import('../views/CssCharacter.vue')
  },
  {
    path: '/go',
    name: 'Go',
    component: () => import('../views/GoCharacter.vue')
  },
  {
    path: '/html',
    name: 'Html',
    component: () => import('../views/HtmlCharacter.vue')
  },
  {
    path: '/javascript',
    name: 'Javascript',
    component: () => import('../views/JavascriptCharacter.vue')
  },
  {
    path: '/php',
    name: 'Php',
    component: () => import('../views/PhpCharacter.vue')
  },
  {
    path: '/java',
    name: 'Java',
    component: () => import('../views/JavaCharacter.vue')
  },
  {
    path: '/ruby',
    name: 'Ruby',
    component: () => import('../views/RubyCharacter.vue')
  },
  {
    path: '/cs',
    name: 'Cs',
    component: () => import('../views/CsCharacter.vue')
  },
  {
    path: '/swift',
    name: 'Swift',
    component: () => import('../views/SwiftCharacter.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
