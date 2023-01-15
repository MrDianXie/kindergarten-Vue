<template>
  <div class="login-box">
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
                @keyup.enter.native="true"
                prefix-icon="el-icon-key"
            ></el-input>
            <div class="login-code" >
              <img :src="codeURL" @click="changeCode" id="verifyCode" />
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
</template>

<script>

import Particles from '@/components/particles/Particles'
import Vue from "vue";


export default {
  name: "LoginView",
  components:{
    "Particles" : Particles
  },

  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        autoLogin: false,
        code: ""
      },

      codeURL: "http://localhost:8090/admin/auth/verifyCode",
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
    changeCode(){
      this.codeURL = "http://localhost:8090/admin/auth/verifyCode?" + this.index++;
    },

    login() {

      console.log(this.loginForm.code)
      if (this.loginForm.username != "" && this.loginForm.password != "" && this.loginForm.code != "") {
        axios({
          method: "POST",
          url: "http://localhost:8090/admin/auth/login",
          data: {
            username: this.loginForm.username,
            password: this.loginForm.password,
            code: this.loginForm.code,
            autoLogin: this.autoLogin
          }
        }).then(res => {
          console.log(res.data)

          if (res.data.errno != 408) {
            if (res.data.errno == 103) {
              this.setMsgBox(false, res.data.errmsg)
            } else {
              this.setMsgBox(true, res.data.errmsg)
            }
          } else {//登录成功
            //将token存入store
            this.$store.commit("setToken",res.data.token)
            //将userInfo存入store
            this.$store.commit("setUserInfo",res.data.userInfo)
            //登录加载
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
            },1000)
          }

          this.changeCode()

        })
      }
    },

    //设置信息提示框并清空错误项
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
  }
}
</script>

<style scoped>
    .login-box{
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("../assets/bg2.jpg") no-repeat center / cover;
      height: 100vh;
    }

    .login-box h2{
      text-align: center;
      color: #707070;
    }

    .login-box section {
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