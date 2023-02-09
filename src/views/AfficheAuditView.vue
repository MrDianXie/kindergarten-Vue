<template>
  <layout>
    <div class="header">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公告管理</el-breadcrumb-item>
          <el-breadcrumb-item>公告审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="body">
      <el-table
          height="350"
          :default-sort = "{prop: 'state', order: 'descending'}"
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
            <el-tag v-if="scope.row.state === 2" type="success">待审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            sortable
            label="提交时间">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="">详情
            </el-button>
            <el-button
                size="mini"
                @click="">通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </layout>
</template>
<script>
export default {
  name: "AfficheAuditView",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    this.loadList()
  },

  methods:{
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

.header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;

  .bread {
    padding-top: 30px;
    padding-left: 20px;
    width: 50%;
  }
}

.body{

}

</style>