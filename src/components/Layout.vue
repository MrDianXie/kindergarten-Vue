<template>
  <el-container>
    <el-header>
      <span>
        <img src="../assets/logo.png" width="50" alt="">
        <b>后端管理系统</b>
      </span>

      <span>
        <img :src="avatarUrl" width="50" alt="">
        <i></i>
      </span>
    </el-header>
    <el-container class="container">
      <el-aside width="200px">
        <el-col id="van">

          <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              :collapse-transition="false"
              :collapse="isCollapse"
              :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>公告管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>公告列表</el-menu-item>
                <el-menu-item index="/afficheList">新增公告</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>教师管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1">选项1</el-menu-item>
                <el-menu-item index="2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>学生管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>选项1</el-menu-item>
                <el-menu-item>选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>班级管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>选项1</el-menu-item>
                <el-menu-item>选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>角色管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>选项1</el-menu-item>
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
  </el-container>
</template>

<script>
export default {
  name: "Layout",

  data(){
    return {
      isCollapse: false,
      username : "admin",
      avatarUrl: "http://localhost:8090/admin/home/getAvatar?username=admin",
    }


  },

  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },

  }

}
</script>

<style scoped lang="less">

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