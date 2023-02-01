<template>
  <layout>
    <div class="header">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>教师管理</el-breadcrumb-item>
          <el-breadcrumb-item>教师列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="input-search">
        <el-input class="input"
                  @keyup.native.enter="search"
                  :clearable="true"
                  placeholder="请输入搜索内容(名字/手机号码/助记码)"
                  prefix-icon="el-icon-search"
                  v-model="pager.selectKey" ></el-input>
        <el-button class="btn" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button class="btn" @click="insert" type="primary" icon="el-icon-plus">新增</el-button>
        <template>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              slot="reference"
              :title="'确定批量删除吗？'"
              @confirm="delAll()"
          >
            <el-button slot="reference" class="btn" type="danger" icon="el-icon-delete">批量删除</el-button>
          </el-popconfirm>
        </template>
      </div>
    </div>

      <el-table
          :highlight-current-row="true"
          :height="610"
          ref="filterTable"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(192, 192, 192, 0.8)"
          :data="teacherList"
          style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号" sortable column-key="date"></el-table-column>
        <el-table-column
            prop="username"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="gander"
            label="性别"
            >
        </el-table-column>
        <el-table-column
            prop="phone"
            width="120"
            label="手机号码"
            >
        </el-table-column>
        <el-table-column
            prop="email"
            width="185"
            label="电子邮箱"
            >
        </el-table-column>
        <el-table-column
            prop="createTime"
            width="180"
            label="创建时间">
        </el-table-column>
        <el-table-column
            width="180"
            prop="updateTime"
            label="修改时间">
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="update(scope.row.uid)">编辑</el-button>
            <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                :title="'确定删除'+ scope.row.username +'的信息吗？'"
                class="del-btn"
                @confirm="del(scope.row.uid)"
            >
              <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <!-- 分页  -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="pager.total"
            @current-change="loadList"
            :current-page.sync="pager.page"

        >

        </el-pagination>
      </div>


    <!--  新增  -->
    <el-drawer
        class="drawer"
        :title="this.handleTitle === 'insert' ? '新增教师':'修改教师信息'"
        :size="'50%'"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <div class="form">
          <el-form :model="form">
              <el-form-item
                  label="教师姓名"
                  :label-width="formLabelWidth"
                  prop="username"
                  :rules="[
                    { required: true, message: '教师名字不能为空'},
                  ]"
              >
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="手机号码"
                :label-width="formLabelWidth"
                prop="phone"
                maxlength="2"
                :rules="[
                  { required: true, message: '手机号码不能为空'},
                  { type: 'number', message: '手机号码必须为数字值'}
                ]"
              >
                <el-input show-word-limit maxlength="11" v-model.number="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                  label="性别"
                  :label-width="formLabelWidth">
                <el-select v-model="form.gander" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>

          </el-form>
          <div class="demo-drawer__footer">
            <el-button class="btn" @click="cancelForm">取 消</el-button>
            <el-button class="btn" type="primary" @click="handleClose()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </div>
    </el-drawer>


  </layout>
</template>

<script>
export default {
  name: "TeacherList",

  created() {
    this.loadList()
  },
  data() {

    return {
      table: false,
      dialog: false,
      handleTitle: '',
      loading: false,
      form: {
        uid: null,
        username: '',
        gander: '',
        phone: null,
        email: '',
      },
      formLabelWidth: '80px',
      timer: null,
      teacherList: [],

      pager:{
        page: 1,
        total: 0,
        size: 10,
        selectKey: '',
      },
      multipleSelection: [],
    }
  },

  watch:{
    pager:{
      handler(val){
        if (val.selectKey === '' || val.selectKey === null){
          this.loadList()
        }
      },
      //开启深度监听
      deep:true
    }

  },

  methods: {


    /**
     * 修改教师信息
     */
    async update(uid){
      this.dialog = true;
      this.handleTitle = 'update'
      //通过id将要修改的教师
      await this.$store.dispatch('teacher/selectById',uid);
      //将教师信息传到form里
      var teacher = this.$store.getters['teacher/getTeacher'];
      this.form.username = teacher.username;
      this.form.gander = teacher.gander;
      this.form.phone = parseInt(teacher.phone);
      this.form.email = teacher.email;
      this.form.uid = teacher.uid;
      console.log('form',this.form)
    },

    /**
     * 批量删除
     */
    async delAll(){
      // console.log("users",this.multipleSelection)
      var uids = '';
      this.multipleSelection.forEach(user => {
        console.log(user.uid)
        uids = uids + user.uid + '-';
      })

      await this.$store.dispatch('teacher/delAll',uids);
      const result = this.$store.getters['teacher/getDelResult'];
      if (result){
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      } else {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      }
      this.loadList()

    },

    async del(uid){
      await this.$store.dispatch('teacher/del',uid);
      //更新一下列表
      const result = this.$store.getters['teacher/getDelResult'];
      if (result){
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      } else {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      }
      this.loadList()
    },
    /**
     * 条件查询（模糊）
     */
    async search() {
      this.loading = true;
      console.log(this.selectKey)
      await this.$store.dispatch('teacher/selectTeacher',this.pager);
      setTimeout(()=>{
        this.loading = false
        this.teacherList = this.$store.getters['teacher/getList']
      },1000)

    },

    insert(){
      this.dialog = true;
      this.handleTitle = 'insert'
    },



    /**
     * 打开新增/修改
     */
    async handleClose() {
      console.log('form',this.form)
      if (this.loading) {
        return;
      }
      await this.$confirm('确定要提交表单吗？')
        .then(_ => {
          console.log("提交")
          if (this.form.username !== ''
              && this.form.email !== ''
              && this.form.phone !== ''
              && this.form.gander !== ''
          ) {
            console.log("title",this.handleTitle)
            if (this.handleTitle === 'insert'){
              //新增
              this.$store.dispatch('teacher/insert', this.form)
            } else if (this.handleTitle === 'update'){
              //修改
              this.$store.dispatch('teacher/update',this.form)
            }
            this.loading = true;
          } else if (this.form.username === ''
              || this.form.email === ''
              || this.form.phone === ''
              || this.form.gander === ''
          ) {
            this.$message({
              showClose: true,
              message: '请输入完整的教师信息',
              type: 'error'
            });
            return;
          }
          this.timer = setTimeout(() => {
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              // console.log('更新list',this.$store.getters['teacher/getList'])
              this.loadList()
              //清空form
              if (this.handleTitle === 'insert'){
                this.form = {}
              } else {
                this.dialog = false;
              }
            }, 400);
          }, 2000);

      }).catch(_ => {});
    },


    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },


    /**
     * 加载列表
     * @returns {Promise<void>}
     */
    async loadList(){
      await this.$store.dispatch('teacher/teacherList',this.pager)
      this.teacherList = this.$store.getters['teacher/getList']
      this.pager.total = this.$store.getters['teacher/getPageTotal']
    }

  },
}

</script>

<style lang="less">

  .header{
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;

    .bread{
      padding-top: 30px;
      padding-left: 20px;
      width: 50%;
    }
    .input-search{
      line-height: 80px;
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: right;
      //justify-content: space-between;
      background-color: #ffffff;

      .input{
        margin-right: 30px;
        width: 200px;
      }

      .btn{
        margin-top: 20px;
        margin-right: 30px;
        height: 40px;
      }
    }
  }

  .el-popconfirm__main{
    color: deepskyblue;
  }

  .del-btn{
    margin-left: 10px;
  }

  .page{
    background-color: #ffffff;
    padding-top: 30px;
    height: 85px;
    display: flex;
    justify-content: center;
  }

  .drawer{
    display: flex;
    flex-flow: wrap row;
    .form{
      margin: 30px;
    }

    .demo-drawer__footer{
      position: fixed;
      bottom: 30px;
      width: 100%;

      .btn{
        width: 22%;
      }
    }
  }

  .cell{
    text-align: center;
  }



</style>