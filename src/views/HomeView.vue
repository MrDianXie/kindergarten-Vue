<template>
  <layout>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- 首页user信息 -->
            <el-card shadow='hover'>
              <div class="userCard">
                <el-avatar :size="150" :src=imgUrl></el-avatar>
                <div class="userInfo">
                  <p class="important-font">Admin</p>
                  <p class="secondary-font">管理员</p>
                </div>
              </div>
              <div class="login-info">
                <p>上次登录时间: 2022/07/06 18:16</p>
              </div>
            </el-card>
            <el-card class="dai" shadow='hover'>
              <div slot="header" class="clearfix">
                <span><b>代办事项</b></span>
              </div>
              <div class="body">
                <div class="infoBox">
                  <span>待审核公告</span>
                  <div class="info">99+</div>
                </div>
                <div class="infoBox">
                  <span>待审核教师信息</span>
                  <div class="info">99+</div>
                </div>
                <div class="infoBox">
                  <span>待审核学生信息</span>
                  <div class="info">99+</div>
                </div>
                <div class="infoBox">
                  <span>待审核学生信息</span>
                  <div class="info">99+</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <!-- 柱状图 -->
          <el-card style="height: 280px;">
            <div style="height:280px;" ref="barEcharts">{{ initBarEcharts() }}</div>
          </el-card>
          <div class="num graph">
            <el-card style="width: 34%;height: 265px;marginRight:1%;">
              <div style="width: 100%;height: 265px;" ref="pieEcharts">{{ initPieEcharts() }}</div>
            </el-card>
            <el-card style="width:65%;height: 265px;">
              <div>
                <el-calendar v-model="value"></el-calendar>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="24">
          <el-card shadow='hover' class="bottom">
            <el-descriptions class="margin-top" title="版本信息" :column="3">
              <el-descriptions-item label="当前版本">2.0bt</el-descriptions-item>
              <el-descriptions-item label="开发团队成员">谢金宏、李雄璘、肖剑锋、黄耀锋、黄恒祥</el-descriptions-item>
              <el-descriptions-item label="居住地">广西壮族自治区南宁市</el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">广西交通职业技术学院东区B栋408宿舍</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Index",
  data() {
    return {
      nowTime: '',
      nowWeek: '',
      imgUrl: "http://localhost:8090/admin/home/getAvatar?username=admin",
      value: new Date(),
      countData: [
      ]
    }
  },

  methods: {
    //柱状图
    initBarEcharts() {
      // 新建一个promise对象
      let p = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      p.then(() => {
        //	此dom为echarts图标展示dom
        let myChart = echarts.init(this.$refs.barEcharts)
        let option = {
          title: {
            text: '班级'
          },
          tooltip: {},
          xAxis: {
            data: ['大豆班', '中豆班', '小豆班', '红豆班', '绿豆班', '黄豆班']
          },
          yAxis: {},
          series: [
            {
              name: '班级人数',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })
    },
    //饼图
    initPieEcharts() {
      let p = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      p.then(() => {
        let myChart = echarts.init(this.$refs.pieEcharts);
        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'left'
          },
          series: [
            {
              name: '学生年龄分布',
              type: 'pie',
              radius: ['20%', '65%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'left'
              },
              labelLine: {
                show: false,
              },
              data: [
                {value: 1048, name: '3岁'},
                {value: 735, name: '4岁'},
                {value: 580, name: '5岁'},
                {value: 484, name: '6岁'},
                {value: 300, name: '7岁以上'}
              ]
            }
          ]
        }
        myChart.setOption(option);
      })
    }
  }
}
</script>

<style lang="less">

.bottom{
  margin-top: 20px;
  height: 225px;
}
.el-card__body{
  margin: 0;
  padding: 0;
}
.dai{
  margin-top: 20px;
  height: 284px;
  .body{
    width: 100%;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    .infoBox{
      border-radius: 10px;
      width: 150px;
      height: 80px;
      margin: 8px;
      color: #000;
      background-color: rgba(245,245,245,1);
      span{
        margin-left: 10px;
        font-size: 13px;
      }
      .info{
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #3CB371;
      }
    }
  }
}

.el-card__body {
  padding: 10px;
}

.userCard {
  height: 180px;
  display: flex;
  border-bottom: 2px solid #DCDFE6;
  border-radius: 2px;
}

.userInfo {
  width: auto;
  padding: 6% 0 0 6%;
}

.important-font {
  font-weight: 900;
  font-size: 25px;
}

.secondary-font {
  color: #909399;
}

.login-info {
  height: 40px;
  text-align: left;
  color: #909399;
}

.tableInfo {
  margin: 20px 0 0 0;
}

.OrderCard {
  margin: 0 0 30px 30px;
  border: #DCDFE6 1px solid;
  border-radius: 10px;

  i {
    width: 30%;
    line-height: 120px;
    font-size: 30px;
    color: #fff
  }

  div {
    width: 300px;
  }
}

.el-card {
  border: none;
}

.num {
  display: flex;
  flex-wrap: wrap;
}

.graph {
  margin: 15px 0 0 0;
}

.el-calendar {
  height: 265px;
}
</style>