<template>

  <layout>
    <div class="header">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公告管理</el-breadcrumb-item>
          <el-breadcrumb-item>公告列表</el-breadcrumb-item>
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
        :default-sort = "{prop: 'state', order: 'descending'}"
        element-loading-background="rgba(192, 192, 192, 0.8)"
        :data="list"
        style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号" column-key="date"></el-table-column>
      <el-table-column
          prop="title"
          label="公告标题">
      </el-table-column>
      <el-table-column
          :show-overflow-tooltip="true"
          prop="body"
          label="公告内容"
      >
      </el-table-column>
      <el-table-column
          prop="state"
          sortable
          label="公告状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 1" type="success">启用中</el-tag>
          <el-tag v-if="scope.row.state === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="publisher"
          sortable
          label="公告发布人"
      ></el-table-column>
      <el-table-column
          prop="createTime"
          sortable
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="updateTime"
          sortable
          label="修改时间">

      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="update(scope.row.aid)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              :title="'确定删除该公告吗？'"
              class="del-btn"
              @confirm="del(scope.row.aid)"
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
        :title="this.handleTitle === 'insert' ? '新增班级':'修改班级信息'"
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
                label="公告标题"
                :label-width="formLabelWidth"
                prop="title"
            >
              <el-input placeholder="请输入公告标题" v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="公告内容"
                :label-width="formLabelWidth"
                prop="body"
            >
              <el-input
                  type="textarea"
                  :rows="20"
                  placeholder="请输入公告内容"
                  v-model="form.body">
              </el-input>
            </el-form-item>
            <el-form-item
                label="公告状态"
                :label-width="formLabelWidth"
                prop="state"
            >
              <el-tooltip :content="form.state === 1 ? '启用':'禁用'" placement="top">
                <el-switch
                    v-model="form.state"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    :active-value="0"
                    :inactive-value="1">
                </el-switch>
              </el-tooltip>
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
      loading: false,
      form: { //表单数据
        title: null,
        body: null,
        uid: this.$store.getters["User/getUser"].uid,
        state: null,
      },

      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
        ],
        body: [
          { required: true, message: '请选择请输入公告内容', trigger: 'blur' }
        ],
      },

      formLabelWidth: '80px',
      timer: null,
      list: [], //公告列表
      teacherList: [],

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
     * 修改教师信息
     * @param aid 公告id
     */
    async update(aid){
      console.log("aid",aid)
      this.dialog = true;
      this.handleTitle = 'update'
      //通过id将要修改的学生
      await this.$store.dispatch('affiche/selectById',aid);
      //将教师信息传到form里
      var affiche = this.$store.getters["affiche/getAffiche"];
      this.form.aid = affiche.aid;
      this.form.state = affiche.state;
      this.form.uid = affiche.uid;
      this.form.title = affiche.title;
      this.form.body = affiche.body;
    },

    /**
     * 批量删除
     */
    async delAll(){
      var aids = '';
      this.multipleSelection.forEach(affiche => {
        aids = aids + affiche.aid + '-';
      })

      await this.$store.dispatch('affiche/delAll',aids);
      const result = this.$store.getters['affiche/getResult'];
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
      await this.loadList()
    },

    /**
     * 删除单条学生数据
     * @param aid 公告id
     * */
    async del(aid){
      await this.$store.dispatch('affiche/del',aid);
      //更新一下列表
      const result = await this.$store.getters['affiche/getResult'];
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
      await this.loadList()
    },
    /**
     * 条件查询（模糊）
     */
    async search() {
      this.loading = true;
      await this.$store.dispatch('affiche/selectByKey',this.pager);
      setTimeout(()=>{
        this.loading = false
        this.list = this.$store.getters['affiche/getList']
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
                  this.$store.dispatch('affiche/insert', this.form)
                } else if (this.handleTitle === 'update'){
                  //修改
                  this.$store.dispatch('affiche/update',this.form)
                }
                this.loading = true;
              } else {
                this.$message({
                  showClose: true,
                  message: '请输入完整的班级信息',
                  type: 'error'
                });
                this.$store.commit("affiche/setResult",false)
              }
            });
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
                this.loadList()
                //清空form
                if (this.handleTitle === 'insert'){
                  if (this.$store.getters["affiche/getResult"]){
                    this.$message({
                      showClose: true,
                      message: '新增成功',
                      type: 'success'
                    });
                  }
                  this.$refs['form'].resetFields();
                } else {
                  if (this.$store.getters["affiche/getResult"]){
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
      //初始化班级列表
      await this.$store.dispatch('affiche/getList',this.pager);
      this.list = this.$store.getters['affiche/getList'];
      //初始化分页数据
      this.pager.total = this.$store.getters['affiche/getPageTotal'];
      //初始化班主任列表
      await this.$store.dispatch('teacher/list');
      this.teacherList = this.$store.getters["teacher/getList"];
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