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
    path: "/admin/home",
    name: 'home',
    component: () => import("@/views/HomeView")
  },
  {
    path: "/admin/afficheList",
    name: 'afficheList',
    component: () => import("@/views/AfficheListView")
  },
  {
    path: '/admin/teacherList',
    name: 'teacherList',
    component: () => import("@/views/TeacherList")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
