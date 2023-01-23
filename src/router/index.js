import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/admin/home",
    name: 'home',
    component: () => import("@/views/HomeView"),
    meta:{
      auth: true
    }
  },
  {
    path: "/admin/afficheList",
    name: 'afficheList',
    component: () => import("@/views/AfficheListView"),
    meta:{
      auth: true
    }
  },
  {
    path: '/admin/teacherList',
    name: 'teacherList',
    component: () => import("@/views/TeacherList"),
    meta:{
      auth: true
    }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 开启导航守卫
 */
router.beforeEach((to, from, next) => {

  const token = store.getters['loginUser/getToken'];

  //判断是否要导航确认
  if (to.meta.auth){
    //判断是否存在token
    if (token != null){//token存在
      //验证token的有效性
      store.dispatch('loginUser/whoAmI',token)
      const userInfo = store.getters['loginUser/getUserInfo']
      if (userInfo !== null){
        next()
      } else {
        next("/?result=unlogin")
      }
    } else {//token不存在
      //用户未登录  跳转到登录页面
      next("/?result=unlogin")
    }
  } else {
    next()
  }

})

export default router
