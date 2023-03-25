<template>
  <!-- 试题详情页 -->
  <el-container class="container">
    <Header></Header>
    <el-container class="main">
      <!-- 左侧信息展示 -->
      <el-aside width="620px">
        <div class="left_top">
          <img :src="questionInfo.picturebox" alt="" />
          <div class="text">
            <h3>{{ questionInfo.title }}</h3>
            <p>{{ questionInfo.details }}</p>
            <span>{{ questionInfo.number }}人已测</span>
            <div class="button">
              <el-button type="primary">
                <!-- 传递当前试题 id 给到答题页面 -->
                <a @click="start">立即测试</a>
              </el-button>
            </div>
          </div>
        </div>
        <div class="left_boottom">
          <div class="text">
            <h3>测评简介</h3>
            <div class="box"></div>
          </div>
          <img :src="questionInfo.pictureinfo" alt="" />
        </div>
      </el-aside>
      <!-- 右侧列表 -->
      <el-main>
        <!-- 文字 -->
        <div class="text">
          <h4>测试列表</h4>
        </div>
        <!-- 列表容器 -->
        <a v-for="item in bankAll" :key="item.id" @click="toInfo(item.id)">
          <div class="img_box"><img :src="item.picturebox" /></div>
          <div class="list_text">
            <!-- 如果列表id跟当前路由id相同则表示已经显示当前id的信息，添加高亮效果 -->
            <p :class="{ active: item.id == id }">{{ item.title }}</p>
            <span>{{ item.number }}人已测</span>
          </div>
        </a>
      </el-main>
    </el-container>
    <Footer></Footer>
  </el-container>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { getByIdQuestionInfo, getQuesionBankAll } from "@/api/question";
import { mapGetters } from "vuex";
export default {
  name: "infoView",
  components: {
    Header,
    Footer,
  },

  Headermixins: [],
  props: {},
  data() {
    return {
      id: 0,
      // 根据id获取的试题信息对象
      questionInfo: {},
      // 所有的试题对象
      bankAll: {},
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  watch: {},
  created() {
    // 获取路由传递的id
    this.id = this.$route.params.id;
    this.getByIdInfo();
    this.getBankAll();
  },
  methods: {
    // 根据试题id查询相关信息
    getByIdInfo() {
      getByIdQuestionInfo(this.id).then((res) => {
        this.questionInfo = res.data;
      });
    },
    // 获取所有试题信息
    getBankAll() {
      getQuesionBankAll().then((res) => {
        this.bankAll = res.data;
      });
    },
    // 立即测试
    start() {
      // 判断当前用户是否已经有信息存在，有则表示已经登录，可以进行测试，如果没有则提示还未登录
      if (this.name) {
        this.$router.push({
          path: `/start/${this.id}`,
        });
      } else {
        this.$message({
          message: "您还未登录，请登录后在进行测试吧！",
          type: "warning",
        });
      }
    },
    toInfo(id) {
      if (this.id == id) {
        this.$message({
          message: "您已经在当前页面了，请不要重复点击！",
          type: "warning",
        });
      } else {
        // 把点击列表中的id通过路由进行传递
        this.$router.push({
          path: `/info/${id}`,
        });
        // 获取路由中的id值,并赋值给data中的id，以便进行测试时传递id值
        this.id = this.$route.params.id;
        // 重新加载数据
        this.getByIdInfo(id);
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
    padding: 120px 20vw 0 20vw;
    .el-aside {
      transition: all 0.5s linear;
      .left_top {
        width: 100%;
        height: 180px;
        display: flex;
        position: relative;
        img {
          width: 180px;
          height: 180px;
          border-radius: 10px;
        }
        .text {
          position: absolute;
          left: 200px;
          width: 64%;
          height: 180px;
          transition: all 0.5s linear;
          h3 {
            margin: 0;
            font-size: 24px;
          }
          p {
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: gray;
          }
          .button {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 98px;
            height: 40px;
            a {
              text-decoration: none;
              color: white;
            }
          }
        }
      }
      .left_boottom {
        width: 100%;
        .text {
          width: 100%;
          height: 100px;
          position: relative;
          margin-bottom: 20px;
          border-bottom: 1px solid #eeeff5;
          h3 {
            position: absolute;
            left: 50%;
            bottom: 5px;
            transform: translateX(-50%);
            color: #666e91;
          }
          .box {
            width: 20px;
            height: 4px;
            border-radius: 5px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
            background: #ffa065;
          }
        }
        img {
          width: 96%;
        }
      }
    }
    // 右侧列表
    .el-main {
      height: 680px;
      border: lightgray solid 1px;
      padding: 0 10px 0 10px;
      overflow: hidden;
      .text {
        border-bottom: lightgray solid 1px;
        h4 {
          font-weight: normal;
        }
      }
      a {
        width: 100%;
        display: block;
        display: flex;
        height: 90px;
        padding-top: 10px;
        text-decoration: none;
        color: black;
        cursor: pointer;
        &:hover {
          color: cornflowerblue;
          img {
            transform: scale(1.1);
            transition: all 0.3s linear;
          }
        }
        .img_box {
          width: 80px;
          height: 80px;
          overflow: hidden;
          img {
            width: 80px;
            height: 80px;
            transition: all 0.3s linear;
          }
        }
        .list_text {
          width: 68%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          p {
            margin: 0 0 10px 10px;
            font-size: 14px;
          }
          span {
            margin-left: 10px;
            font-size: 12px;
            color: gray;
          }
        }
      }
      .active {
        color: cornflowerblue;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// 媒体查询样式
@media screen and (max-width: 992px) {
  .container {
    .main {
      .el-aside {
        width: 550px !important;
        transition: all 0.5s linear;
        .left_top {
          .text {
            transition: all 0.5s linear;
            width: 62%;
          }
        }
      }
    }
    .el-main {
      display: none;
    }
  }
}
</style>
