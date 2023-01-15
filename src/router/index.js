import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("@/views/LoginView")
  },
  {
    path: "/home",
    name: 'home',
    component: () => import("@/views/HomeView")
  },
  {
    path: "/afficheList",
    name: 'afficheList',
    component: () => import("@/views/AfficheListView")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
