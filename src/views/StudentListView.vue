<template>

  <layout>
    <div class="header">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生管理</el-breadcrumb-item>
          <el-breadcrumb-item>学生列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="input-search">
        <el-input class="input"
                  @keyup.native.enter="search"
                  :clearable="true"
                  placeholder="请输入搜索内容(名字)"
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
        :data="list"
        style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号" sortable column-key="date"></el-table-column>
      <el-table-column
          prop="sname"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="gander"
          label="性别"
      >
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
      >
      </el-table-column>
      <el-table-column
          prop="address"
          width="260"
          label="家庭地址"
      >
      </el-table-column>
      <el-table-column
          prop="className"
          label="班级">
      </el-table-column>
      <el-table-column
          prop="patriarchName"
          label="家长">
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
              @click="update(scope.row.sid)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              :title="'确定删除'+ scope.row.sname +'的信息吗？'"
              class="del-btn"
              @confirm="del(scope.row.sid)"
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
        :title="this.handleTitle === 'insert' ? '新增学生':'修改学生信息'"
        :size="'50%'"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <div class="form">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item
                label="学生姓名"
                :label-width="formLabelWidth"
                prop="sname"
            >
              <el-input v-model="form.sname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="年龄"
                :label-width="formLabelWidth"
                prop="age"
            >
            <el-input maxlength="2" show-word-limit v-model.number="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="家庭地址"
                :label-width="formLabelWidth"
                prop="address"
            >
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                prop="gander"
            >
              <el-select v-model="form.gander" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
                label="班级"
                :label-width="formLabelWidth"
                prop="cid"
            >
              <el-select v-model="form.cid" filterable placeholder="请选择">
                <el-option
                    v-for="item in this.classAndGrade"
                    :key="item.cid"
                    :label="item.cname"
                    :value="item.cid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
                label="家长"
                :label-width="formLabelWidth"
                prop="uid"
            >
              <el-select v-model="form.uid" filterable placeholder="请选择">
                <el-option
                    v-for="item in this.parentList"
                    :key="item.uid"
                    :label="item.username"
                    :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div class="demo-drawer__footer">
            <el-button class="btn" @click="cancelForm()">取 消</el-button>
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


      table: false, //模态框标识
      dialog: false, //是否开启模态框
      handleTitle: '', //模态框标题
      loading: false, //家长状态
      form: { //表单数据
        sid: null,
        sname: null,
        gander: null,
        age: null,
        address: null,
        cid: null,
        uid: null,
      },

      rules: {
        sname: [
          { required: true, message: '请输入学生名字', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入学生家庭地址', trigger: 'blur' }
        ],
        age: [
          { type: 'number', required: true, message: '请输入学生年龄', trigger: 'blur' }
        ],
        gander: [
          { required: true, message: '请选择学生性别', trigger: 'change' }
        ],
        cid: [
          { type: 'number', required: true, message: '请选择学生班级', trigger: 'change' }
        ],
      },


      classAndGrade:[],//班级列表
      parentList: [], //家长列表

      formLabelWidth: '80px',
      timer: null,
      list: [], //学生列表

      pager:{ //分页数据
        page: 1,
        total: 0,
        size: 10,
        selectKey: '',
      },
      multipleSelection: [], //选择列表
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
     * 修改信息
     * @param sid 学生id
     */
    async update(sid){
      this.dialog = true;
      this.handleTitle = 'update'
      //通过id将要修改的学生
      await this.$store.dispatch('student/selectById',sid);
      //将教师信息传到form里
      var student = this.$store.getters["student/getStudent"];
      this.form.sid = student.sid;
      this.form.sname = student.sname;
      this.form.gander = student.gander;
      this.form.age = parseInt(student.age);
      this.form.address = student.address;
      this.form.cid = student.cid;
      this.form.uid = student.uid;
    },

    /**
     * 批量删除
     */
    async delAll(){
      // console.log("users",this.multipleSelection)
      var sids = '';
      this.multipleSelection.forEach(student => {
        console.log(student.sid)
        sids = sids + student.sid + '-';
      })

      await this.$store.dispatch('student/delAll',sids);
      const result = this.$store.getters['student/getResult'];
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
     * 删除单条学生数据
     * @param sid 学生id
     * */
    async del(sid){
      await this.$store.dispatch('student/del',sid);
      //更新一下列表
      const result = await this.$store.getters['student/getResult'];
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
      console.log("selectKey",this.pager.selectKey)
      await this.$store.dispatch('student/selectByKey',this.pager);
      setTimeout(()=>{
        this.loading = false
        this.list = this.$store.getters['student/getList']
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
            this.$refs['form'].validate((valid) => {
              if (valid) {
                if (this.handleTitle === 'insert'){
                  //新增
                  this.$store.dispatch('student/insert', this.form)
                } else if (this.handleTitle === 'update'){
                  //修改
                  this.$store.dispatch('student/update',this.form)
                }
                this.loading = true;
              } else {
                this.$message({
                  showClose: true,
                  message: '请输入完整的学生信息',
                  type: 'error'
                });
                return false;
              }
            });
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
                // console.log('更新list',this.$store.getters['teacher/getList'])
                this.loadList()
                //清空form
                if (this.handleTitle === 'insert'){
                  if (this.$store.getters["student/getResult"]){
                    this.$message({
                      showClose: true,
                      message: '新增成功',
                      type: 'success'
                    });
                  }
                  this.$refs['form'].resetFields();
                } else {
                  if (this.$store.getters["student/getResult"]){
                    this.$message({
                      showClose: true,
                      message: '修改成功',
                      type: 'success'
                    });
                  }
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
      //初始化学生列表
      await this.$store.dispatch('student/getStudentList',this.pager);
      this.list = this.$store.getters['student/getList'];
      //初始化分页数据
      this.pager.total = this.$store.getters['student/getPageTotal'];
      //初始化班级列表
      await this.$store.dispatch('classAndGrade/getClassList');
      this.classAndGrade = this.$store.getters["classAndGrade/getList"];
      //初始化家长列表
      await this.$store.dispatch('parent/list');
      this.parentList = this.$store.getters["parent/getList"];
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