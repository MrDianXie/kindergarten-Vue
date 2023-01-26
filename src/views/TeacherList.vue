<template>
  <layout>


    <div class="input-search">
      <el-input class="input" @keyup.native.enter="search" :clearable="true" placeholder="请输入搜索内容(名字/手机号码/助记码)" prefix-icon="el-icon-search" v-model="selectKey" ></el-input>
      <el-button class="btn" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="btn" @click="dialog = true" type="primary" icon="el-icon-plus">新增</el-button>
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
                @click="">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="">删除</el-button>
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
        title="新增教师"
        :size="'50%'"
        :before-close="handleClose"
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
            <el-button class="btn" type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
      loading: false,
      form: {
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
      },

      selectKey: '',

      multipleSelection: [],
    }
  },

  methods: {


    /**
     * 查询
     */
    async search() {
      this.loading = true;
      await this.$store.dispatch('teacher/selectTeacher', this.selectKey);
      setTimeout(()=>{
        this.loading = false
        this.teacherList = this.$store.getters['teacher/getList']
      },1000)

    },


    async handleClose(done) {
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
            this.$store.dispatch('teacher/insert', this.form)
            this.loading = true;
          }
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              // console.log('更新list',this.$store.getters['teacher/getList'])
              this.loadList()
              //清空form
              this.form = []
            }, 400);
          }, 2000);


      }).catch(_ => {

      });


    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },


    /**
     * 加载列表
     * @returns {Promise<void>}
     */
    async loadList(){
      await this.$store.dispatch('teacher/teacherList',this.pager.page)
      this.teacherList = this.$store.getters['teacher/getList']
      this.pager.total = this.$store.getters['teacher/getPageTotal']
    }

  },
}

</script>

<style lang="less">

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