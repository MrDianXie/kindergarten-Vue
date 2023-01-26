<template>
  <div>
    <lantern text="新" :left="10"/>
    <lantern text="春" :left="30"/>
    <lantern text="快" :left="60"/>
    <lantern text="乐" :left="80"/>

    <div class="login-box">
      <vue-particles
          class="bg-par"
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="80"
          shapeType="star"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="repulse"
      />
        <section>
          <h2>翻斗幼儿园后台管理系统</h2>
          <el-alert id="info" v-if="this.resultInfo.msgFlag"
                    :title="this.resultInfo.msg"
                    type="error"
                    :closable=false
                    center
                    show-icon>
          </el-alert>
          <el-form
              :model="loginForm"
              status-icon
              :rules="rules"
              ref="loginForm"
          >
            <el-form-item prop="username">

              <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input class="code"
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="验证码"
                        style="width: 63%"
                        @keyup.enter.native="login"
                        prefix-icon="el-icon-key"
              ></el-input>
              <div class="login-code" >
                <img :src="codeURL" @click="changeCode" />
              </div>
            </el-form-item>
            <el-form-item prop="autoLogin" class="autoLogin-radio-box">
              <el-checkbox class="autoLogin-radio" v-model="loginForm.autoLogin">自动登录</el-checkbox >
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%"
                         type="primary"
                         @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </section>
    </div>

  </div>

</template>

<script>

import lantern from '@/components/Lantern'

export default {
  name: "LoginView",
  components:{
    "lantern" : lantern,
  },


  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123',
        autoLogin: false,
        code: ""
      },

      codeURL:this.$store.getters["loginUser/getCode"],
      index: 1,

      resultInfo: {
        msg: "账号或密码错误",
        msgFlag: false,
      },

      fullscreenLoading : false,

      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],

        code:[
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]

      }
    }
  },


  methods:{


    /**
     * 更改验证码
     */
    changeCode(){
      this.$store.dispatch("loginUser/changeCode",this.index++);
      this.codeURL = this.$store.getters["loginUser/getCode"];
      console.log(this.codeURL);
    },
    async login() {
      //发送请求
      await this.$store.dispatch('loginUser/login',this.loginForm)
      //获取响应结果
      console.log('登录响应码',this.$store.getters['loginUser/getLoginResult'])
      const result = this.$store.getters['loginUser/getLoginResult']

      if (result === '登录成功'){
        const loading = this.$loading({
          lock: true,
          text: '登录中...',
          background: 'rgba(225, 225, 225, 0.7)'
        });
        setTimeout(() => {
          loading.close()
          console.log("进入主页")
          this.$router.replace({
            name: "home"
          })
        }, 1000)

        this.changeCode()
      } else if (result === '账号或密码错误'){
        this.setMsgBox(true,'账号或密码错误')
      } else if (result === '验证码错误'){
        this.setMsgBox(false,'验证码错误')
      }
    },

    /**
     *
     * @param flag 决定清空的输入框
     * @param msg  错误展示信息
     */
    setMsgBox(flag,msg) {
      this.resultInfo.msg = msg;
      this.resultInfo.msgFlag = true
      if (flag){
        this.loginForm.username = '';
        this.loginForm.password = '';
        this.loginForm.code = ''
      } else {
        this.loginForm.code = ''
      }
      this.changeCode()
    },

  },

  created() {
    if (this.$route.query.result === 'unlogin'){

      const h = this.$createElement;

      this.$notify.error({
        title: '非法操作',
        message: h('i', { style: 'color: red'}, '用户未登录，请先登录！')
      });
    }
  }
}
</script>

<style scoped lang="less">

    .login-box{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: url('../assets/bg2.jpg') no-repeat center / cover;
    }

    .login-box h2{
      text-align: center;
      color: #707070;
    }

    .bg-par{
      width: 100%;
      height: 100%;
      position: fixed;

    }

    .login-box section {
      position: fixed;
      border-radius: 6px;
      background: #fff;
      width: 400px;
      padding: 25px 25px 5px 25px;
    }

    .autoLogin-radio-box{
      margin-top: -20px;
      margin-bottom: 0;
    }

    .autoLogin-radio{
      float: left;
    }

    .code{
      float: left;
    }

    #info{
      height: 28px;
    }
</style>