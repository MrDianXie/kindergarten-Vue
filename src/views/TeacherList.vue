<template>
  <layout>


    <div class="input-search">
      <el-input class="input" @keyup.native.enter="search" :clearable="true" placeholder="请输入搜索内容(名字/手机号码/助记码)" prefix-icon="el-icon-search" v-model="selectKey" ></el-input>
      <el-button class="btn" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="btn" @click="" type="primary" icon="el-icon-plus">新增</el-button>
    </div>



    <el-table
        :highlight-current-row="true"
        :height="775"
        class="table"
        ref="filterTable"
        :data="teacherList"
        style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="uid" label="教师id" sortable column-key="date"></el-table-column>
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
          width="150"
          label="手机号码"
          >
      </el-table-column>
      <el-table-column
          prop="email"
          width="180"
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
              @click="">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
        title="我嵌套了 Form !"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>


  </layout>
</template>

<script>
export default {
  name: "TeacherList",

  created() {
    this.$store.dispatch('teacher/teacherList').then(res => {
      this.teacherList = res.data.data
    })
  },
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      teacherList: [],
      selectKey: '',

    }
  },
  methods: {
    /**
     * 查询
     */
    search() {

      this.$store.dispatch('teacher/selectTeacher', this.selectKey).then(res => {
        console.log(res)
        this.teacherList = res.data.data
      })
    },


    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },


  },





}

</script>

<style lang="less">
  .cell{
    text-align: center;
  }

  .input-search{
    line-height: 80px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: right;
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

</style>