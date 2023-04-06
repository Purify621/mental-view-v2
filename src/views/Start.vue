<template>
  <!-- 答题页面 -->
  <el-container style="overflow-x: hidden" v-if="flag">
    <Header></Header>
    <el-main>
      <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>心理测评</el-breadcrumb-item>
          <el-breadcrumb-item>{{ titleName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
          <h3>{{ titleName }}</h3>
        </div>
        <div class="main">
          <div class="progress">
            <el-progress
              :stroke-width="20"
              :show-text="false"
              :percentage="value"
            ></el-progress>
            <span>{{ index }}/{{ testLength }}</span>
            <i class="el-icon-refresh" @click="retest">重新测试</i>
          </div>
          <!-- 试题 -->
          <div class="question">
            <!-- 试题标题 -->
            <!-- ?.title 判断当前对象里 有没有 title 这个字段 -->
            <h3>
              {{ index >= testLength ? index : index + 1 }}、{{
                testQuestionAll[index]?.title
              }}
            </h3>
            <!-- 试题选项 -->

            <div
              class="option"
              v-for="(item, i) in testQuestionAll[index]?.anwsers"
              :key="item.id"
              @click="next(i, '.option', item.answer, item.answerScore)"
            >
              <div class="letter">{{ letter[i] }}</div>
              <span>{{ item.answer }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { getByIdQuestionInfo, getByIdQuestionAll } from "@/api/question";
import { addUserResult } from "@/api/userResult";
import { mapGetters } from "vuex";
export default {
  name: "startView",
  components: { Header, Footer },
  mixins: [],
  props: {},
  data() {
    return {
      // 路由传递的试题id
      rid: 0,
      // 进度条的值
      value: 0,
      // 字母数组
      letter: ["A", "B", "C", "D", "E", "F"],
      // 标题
      titleName: "试题名称",
      // 试题信息
      testQuestionAll: [],
      // 长度
      testLength: 0,
      // 试题进度索引
      index: 0,
      // 控制页面渲染
      flag: false,
      // 记录用户点击的试题选项及分值
      testData: [],
      // 记录总的得分值
      totalValue: 0,
      picturebox: "", // 记录小图片地址
    };
  },
  // 计算属性
  computed: {
    // 获取当前用户的id
    ...mapGetters(["id", "name"]),
  },
  // 侦听器
  watch: {
    // 侦听题目的变化，当题目到达试题的最大长度时，进行计算分值
  },
  created() {
    // 获取路由传递的id
    this.rid = this.$route.params.id;
    // 查询试题信息
    this.getByIdInfo();
    this.getByIdAll();
    // 数据加载完渲染页面
    this.flag = true;
  },
  methods: {
    // 根据试题id查询相关信息
    getByIdInfo() {
      getByIdQuestionInfo(this.rid).then((res) => {
        this.picturebox = res.data.picturebox;
        this.titleName = res.data.title;
      });
    },
    // 根据试题id获取所有题目及选项
    getByIdAll() {
      getByIdQuestionAll(this.rid).then((res) => {
        // 获取试题总数据
        this.testQuestionAll = res.data;
        // 获取试题总题数 (长度)
        this.testLength = res.data.length;
      });
    },
    // 下一题操作
    // i 表当前选项的索引 dom 是获取到选项的dom元素
    // answer 表选项的内容 answerScore 表选项分值
    next(i, dom, answer, answerScore) {
      // 获取所有选项的dom
      const option = document.querySelectorAll(dom);
      // 根据问题索引来 设置用户 选择的元素设置样式
      option[i].style.background = "rgb(96, 79, 200)";
      option[i].style.color = "white";
      /* 
      遍历所有 dom 元素 禁用其点击事件 防止用户点击过快选择其它选项
      由于数据更新dom也会重新渲染，因此不需要在启用点击事件，会自动刷新为可点击的状态
      */
      option.forEach((item) => {
        item.style.pointerEvents = "none";
      });
      // 获取当前选择的试题标题
      const itemTitle = this.testQuestionAll[this.index]?.title;
      // 把用户当前选择的 试题标题 试题选项以及试题分数存到一个新数组中
      this.testData.push({
        title: itemTitle,
        answer: answer,
        answerScore: answerScore,
      });
      // 延迟1s执行的操作
      setTimeout(() => {
        // 试题进度索引++
        this.index++;
        if (this.index >= this.testLength) {
          console.log(this.testData);
          this.calculation();
          let userId = this.id;
          let id = this.rid; // 获取试题id
          let name = this.name; // 获取用户名称
          let d = this.testData; // 当前用户选择的分值
          let score = this.totalValue; // 当前的分值
          let picturebox = this.picturebox; // 试题图片
          let title = this.titleName; // 试题标题
          // 向数据库中添加答题数据
          let data = {
            userId,
            questionId: id,
            pname: name,
            questionContent: d,
            score,
            picturebox,
            title,
          };
          addUserResult(data).then((res) => {
            if (res.code === 200) {
              this.$router.push({ path: `/result/${id}` });
            }
          });
        }
        // 获取进度条平均值
        const average = this.average();
        // 计算进度条数值
        this.value = this.index * average;
      }, 1000);
    },
    // 返回进度条总数的平均值
    average() {
      // 进度条最大值为100
      const max = 100;
      // 计算出当前试题长度对于最大值的平均值
      const average = max / this.testLength;
      return average;
    },
    // 重新测试
    retest() {
      this.index = 0;
      this.value = 0;
    },
    // 计算分值
    calculation() {
      let count = 0;
      this.testData.forEach((item) => {
        console.log(item.answerScore);
        count = count + item.answerScore;
      });
      this.totalValue = count;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 !important;
  .el-main {
    margin-top: 10vh;
    width: 100vw;
    height: 90vh;
    padding: 0 !important;
    .container {
      width: 70%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .el-breadcrumb {
        position: absolute;
        top: 50px;
      }
      .title {
        position: absolute;
        top: 80px;
        left: 15%;
        width: 70%;
        height: 80px;
        border-bottom: lightgray solid 1px;
        text-align: center;
      }
      // 答题区域
      .main {
        position: absolute;
        top: 190px;
        left: 15%;
        width: 70%;
        height: 460px;
        // 进度条行
        .progress {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
          .el-progress {
            width: 79%;
          }
          span {
            margin: 0 20px 0 20px;
          }
          i {
            cursor: pointer;
            margin-top: 1px;
          }
        }
        .question {
          .option {
            width: 100%;
            height: 50px;
            border: gray solid 1px;
            box-sizing: border-box;
            border-radius: 5px;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 15px;
            transition: all 0.5s linear;
            .letter {
              width: 80px;
              height: 50px;
              border-radius: 5px;
              background-color: rgb(96, 79, 200);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            }
            span {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
