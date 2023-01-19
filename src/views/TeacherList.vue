<template>
  <layout>


    <div class="input-search">
      <el-input class="input" :clearable="true" placeholder="请输入搜索内容(名字/手机号码/助记码)" prefix-icon="el-icon-search" v-model="teacherInfo.selectKey" ></el-input>
      <el-button class="btn" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
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
      teacherList: [],
      teacherInfo: {
        uid: null,
        selectKey : '',
      },

    }
  },
  methods: {
    search(){

      this.$store.dispatch('teacher/selectTeacher',this.teacherInfo).then(res => {
        console.log(res)
        this.teacherList = res.data.data
      })
    }
  },

}
</script>

<style lang="less" scoped>
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