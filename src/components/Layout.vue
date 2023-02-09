<template>
  <el-container>
    <el-header>
      <span>
        <img src="../assets/ETO.png" width="50" alt="">
        <b>翻斗花园后端管理系统</b>
      </span>

      <span>
        <el-avatar :size="40" :src="avatarUrl"></el-avatar>
        <el-col :span="16">
          <el-dropdown @command="openPersonal">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right" style="color: #000">{{ user.username }}</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="personal">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" command="updatePass">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </span>

    </el-header>
    <el-container class="container">
      <el-aside width="200px">
        <el-col id="van">

          <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              :collapse-transition="false"
              :router="true"
          >

            <el-menu-item index="/admin/home">
              <i class="el-icon-menu"></i>
              <span slot="title" class="home-menu">首页</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>公告管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/afficheList">公告列表</el-menu-item>
                <el-menu-item index="/admin/afficheAudit">公告审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>教师管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/teacherList">教师列表</el-menu-item>
                <el-menu-item index="2">教师审批</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-postcard"></i>
                <span>学生管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/studentList">学生列表</el-menu-item>
                <el-menu-item>学生审批</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>班级管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/classList">班级列表</el-menu-item>
                <el-menu-item>选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
    <el-drawer :title="title" :visible.sync="drawer" direction="rtl">
      <div class="userInfo">
        <div class="block"  @click="updateAvatar"><el-avatar :size="100" :src="avatarUrl"></el-avatar></div>
        <el-form class="user-info" label-position="right" label-width="80px" :model="this.user">
          <el-form-item label="用户名">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <!--  修改密码页  -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="原密码" >
          <el-input v-model="oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" >
          <el-input v-model="newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" >
          <el-input v-model="rePass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePass">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "Layout",

  data(){
    return {
      title: '',
      drawer: false,
      dialogFormVisible: false,
      user: {},
      avatarUrl: '',
      color: '',
      oldPass : '',
      newPass: '',
      rePass : ''
    }


  },

  methods: {

    updateAvatar(){
      console.log("修改头像")
    },
    openPersonal(comm){
      if (comm === 'personal') {
        this.title = '个人信息';
        this.drawer = true;
      } else if(comm === 'updatePass'){
        this.dialogFormVisible = true;
      } else if(comm === 'settings'){

      } else {
        this.$confirm('是否退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('User/delToken');
          this.$router.replace({
            name: "login"
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })

      }

    },

    /**
     * 修改密码
     */
    updatePass(){
      console.log('执行',this.oldPass)
      //输入原密码是否正确
      if (this.oldPass === this.user.password){
        //原密码正确
        //判断两次输入密码是否一致
        if(this.newPass === this.rePass){
          //一致
        } else {
          //不一致
          this.$message({
            showClose: true,
            message: '两次密码不一致',
            type: 'error'
          });
          this.rePass = '';
        }
      } else {
        //原密码错误
        this.$message({
          showClose: true,
          message: '原密码错误',
          type: 'error'
        });
      }
    },
  },

  created() {
    this.user = this.$store.getters["User/getUser"];
    console.log("this",this.user)
    this.avatarUrl = `http://localhost:8090/admin/home/getAvatar?username=` + this.user.username;
  }

}
</script>

<style scoped lang="less">

.userInfo{
  display: flex;
  justify-content: center;
  flex-flow: row wrap;

  .user-info{
    margin-top: 20px;
    width: 100%;
  }
}

.home-menu{
  text-align: center;
}

#van{
  margin-top: 30px;
}

.el-header {
  background-color: deepskyblue;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-header span {
  display: flex;
  align-items: center;
}

.el-aside {
  display: flex;
  justify-content: center;
  color: #333;
}

.el-main {
  background-color: rgba(154,154,154,0.1);
  color: #333;
}

.container {
  height: calc(100vh - 60px);
}


</style>