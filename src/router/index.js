import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

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

  //获取token
  const token = store.getters['loginUser/getToken'];
  //判断是否要导航确认
  if (to.meta.auth){
    //获取登录状态
    const status = store.getters['loginUser/getStatus'];
    //判断是否存在token
    if (token !== null){//token存在
      //验证token的有效性
      if (status === 'loading'){//登录中
        console.log("状态",status)
      } else if (status === 'login'){//已登陆
        console.log("状态",status)
          next()
      } else{//未登录
        console.log("状态",status)
          next("/?result=unlogin")
      }
    } else {//token不存在
      //跳转到登录页面
      next("/?result=unlogin")
    }
  } else {
    next()
  }

})


export default router
