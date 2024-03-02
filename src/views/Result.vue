<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="main-box">
        <div class="box">
          <el-col :span="24">
            <h3>您的测评结果</h3>
          </el-col>
          <el-col :span="8">
            <img
              class="picturebox"
              draggable="false"
              :src="data.picturebox"
              alt=""
            />
          </el-col>
          <el-col :span="10">
            <div class="text">
              <p>测评题目为</p>
              <span>{{ data.title }}</span>
            </div>
            <div class="text">
              <p>试题总分数</p>
              <span>{{ Maximum }}</span>
            </div>
            <div class="text">
              <p>您的答题分数</p>
              <span>{{ data.score }}</span>
            </div>
            <div class="text">
              <p>建议结果</p>
              <span>{{ suggestionContent }}</span>
            </div>
          </el-col>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { getQid } from "@/api/userResult";
import { getByIdQuestionAll } from "@/api/question";
import { mapGetters } from "vuex";
export default {
  name: "ResultView",
  components: {
    Header,
    Footer,
  },
  mixins: [],
  props: {},
  data() {
    return {
      rid: "",
      data: [],
      Maximum: 0, // 最大分值
      suggestionContent: "", // 建议内容
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  watch: {},
  created() {
    this.rid = this.$route.params.id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        userId: this.userId,
        questionId: this.rid,
      };
      getQid(data).then((res) => {
        // 对试题数据进行过滤，只要最新的那一次数据
        let data = res.data;
        // 获取到唯一id最大值就是当前用户最新的
        let max = data[0].id;
        data.forEach((item) => {
          if (item.id > max) {
            max = item.id;
          }
        });
        // 通过最大的唯一id去查找索引
        let index = data.findIndex((item) => item.id === max);
        // 赋值数据
        this.data = data[index];
        // 获取建议内容
        this.suggestionContent = this.suggestion();
      });
      // 根据id获取试题信息
      getByIdQuestionAll(this.rid).then((res) => {
        this.Maximum = this.max(res.data);
      });
    },
    // 找出 testQuestionAll 数组下的每一个对象中的 anwsers 数组 并找到其对象里的 answerScore 并比较出最大值 把结果返回成一个新的数组
    max(data) {
      let arr = [];
      let sum = 0;
      data.forEach((item) => {
        let max = 0;
        item.anwsers.forEach((item) => {
          if (item.answerScore > max) {
            max = item.answerScore;
          }
        });
        arr.push(max);
      });
      arr.forEach((item) => {
        sum += item;
      });
      return sum;
    },
    // 把 Maximum 的值分为三个区间，并存储到数组中 然后根据 data.score 的值来判断
    // 1. data.score < 0.3 * Maximum 时，返回数组中的第一个值
    // 2. data.score > 0.3 * Maximum && data.score < 0.6 * Maximum 时，返回数组中的第二个值
    // 3. data.score > 0.6 * Maximum 时，返回数组中的第三个值
    // 4. 以上都不满足时，返回数组中的第一个值
    // 分值建议
    suggestion() {
      let arr = [
        "您的心理健康状态可能需要专业的指导",
        "你不需要对自己抱有太大的心理压力，好好对待自己",
        "您的心理健康状态良好",
        "出错了",
      ];
      let num = this.data.score;
      console.log(num);
      let Maximum = this.Maximum;
      if (num < 0.3 * Maximum) {
        return arr[0];
      } else if (num > 0.3 * Maximum && num < 0.6 * Maximum) {
        return arr[1];
      } else if (num > 0.6 * Maximum) {
        return arr[2];
      } else {
        return arr[3];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  // 排列方式 纵向排列
  display: flex;
  flex-direction: column;
  .main {
    padding-top: 120px;
    margin: 0 auto;
    width: 80%;
    height: 700px;
    background-image: url("../assets/img/header-bg1.svg");
    background-size: cover;
    background-position-x: -50%;
    background-position-y: 40%;
    background-repeat: no-repeat;
    .main-box {
      width: 60%;
      height: 70%;
      margin: 20px auto;
      border-radius: 10px;
      position: relative;
      background-color: rgba($color: rgb(255, 238, 246), $alpha: 1);
      .box {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0 20px 0 20px;
        .picturebox {
          width: 160px;
          height: 150px;
          border-radius: 10px;
        }
        .text {
          display: flex;
          align-items: center;
          span {
            margin-left: 20px;
            color: #f56c6c;
          }
        }
      }
    }
  }
}
</style>
