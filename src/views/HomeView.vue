<template>
  <!-- 主页 -->
  <el-container>
    <!-- 滚动圆球 -->
    <div class="gard">
      <section class="banner-one" id="banner">
        <span class="banner-one__shape-1"></span>
        <span class="banner-one__shape-2"></span>
        <span class="banner-one__shape-3"></span>
        <span class="banner-one__shape-4"></span>
      </section>
    </div>
    <el-header>
      <nav class="navbar">
        <div class="logo_box">
          <svg
            t="1675828249210"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5130"
            width="40"
            height="40"
          >
            <path
              d="M707.9 229.3H183.7c-48.3 0-87.4 39.1-87.4 87.4v524.2c0 48.3 39.1 87.4 87.4 87.4h524.2c48.3 0 87.4-39.1 87.4-87.4V316.6c0-48.2-39.1-87.3-87.4-87.3z m21.9 611.6c0 12-9.8 21.8-21.8 21.8H183.7c-12 0-21.8-9.8-21.8-21.8V316.6c0-12 9.8-21.8 21.8-21.8h524.2c12 0 21.8 9.8 21.8 21.8v524.3z"
              p-id="5131"
            ></path>
            <path
              d="M920.7 112.7c-5.9-8.7-15.9-14.4-27.2-14.4h-546c-18.1 0-32.8 14.7-32.8 32.8s14.7 32.8 32.8 32.8h513.3V677c0 18.1 14.7 32.8 32.8 32.8 18.1 0 32.8-14.7 32.8-32.8V131c-0.1-6.8-2.1-13.1-5.7-18.3z"
              p-id="5132"
            ></path>
          </svg>
          <span>大学生心理健康测评网站</span>
        </div>
        <!-- 菜单 -->
        <div class="nav">
          <a @click="jump('.navbar')">主页</a>
          <a @click="jump('.evaluation')">心理测评</a>
          <a @click="jump('.knowledge')">知识科普</a>
        </div>
        <!-- 头像和个人信息组件 -->
        <AvatarWrapper v-if="name" class="avatar_wrapper"></AvatarWrapper>
        <div v-else class="border-box">
          <div class="content"><router-link to="/login">登录</router-link></div>
        </div>
      </nav>
      <!-- 汉堡按钮组件 在视图小于992px时显示 -->
      <div
        class="mobile-button"
        :class="{ active: minactive == true }"
        @click="minactive = !minactive"
      >
        <span></span>
      </div>
      <!-- 隐藏的菜单 在视图小于992px时显示 -->
      <nav class="main_nav" :class="{ main_nav_active: minactive == true }">
        <a @click="jump('.navbar')">主页</a>
        <a @click="jump('.evaluation')">心理测评</a>
        <a @click="jump('.knowledge')">知识科普</a>
      </nav>
    </el-header>
    <el-main>
      <div class="index">
        <div class="index_text">
          <h3>我们致力于您的<span>心理</span>健康服务</h3>
          <p>心理健康是大学生成才的基础，因此我们更关注于你的健康</p>
        </div>
        <div class="index_banner"></div>
      </div>
      <!-- 心理测评 -->
      <div class="evaluation">
        <!-- 左侧选择动画 -->
        <div class="site-animation">
          <div class="ani-box ani-1" id="ani-one"></div>
          <div class="ani-box ani-1" id="ani-two"></div>
          <div class="ani-box ani-2" id="ani-three"></div>
          <div class="ani-box ani-2" id="ani-four"></div>
        </div>
        <!-- 背景以及黄色光晕 -->
        <div class="gradient-bg">
          <img src="../../src/assets/img/preview/shape-round-2.png" alt="" />
        </div>
        <!-- 内容区 -->
        <div class="container">
          <h3>心理测评</h3>
          <el-row :gutter="20">
            <el-col v-for="item in questionBank" :key="item.id">
              <router-link :to="'/info/' + item.id">
                <div class="img">
                  <img :src="item.picture" alt="" />
                </div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.number }}人已测</p>
                <div class="bcolor"></div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 知识科普 -->
      <div class="knowledge">
        <div class="preview">
          <img
            class="preview_shape_01"
            src="../../src/assets/img/preview/polygon.png"
          />
          <img
            class="preview_shape_02"
            src="../../src/assets/img/preview/midcircle.png"
            alt=""
          />
          <img
            class="preview_shape_03"
            src="../../src/assets/img/preview/large.png"
            alt=""
          />
        </div>
        <!-- <p style="z-index: 5" v-for="item in popularscience" :key="item.id">
          {{ item.title }}
        </p> -->
        <div class="container">
          <el-col :span="24">
            
          </el-col>
        </div>
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>
<script>
import { getQuesionBankAll } from "@/api/question";
import { getPopularscienceAll } from "@/api/Popularscience";
import Footer from "@/components/footer.vue";
import { mapGetters } from "vuex";
import AvatarWrapper from "@/components/avatarWrapper";
export default {
  name: "HomeView1",
  components: { Footer, AvatarWrapper },
  mixins: [],
  props: {},
  data() {
    return {
      // 试题信息
      questionBank: {},
      // 科普信息
      popularscience: {},
      // 控制汉堡按钮展开和隐藏菜单显示的状态
      minactive: false,
    };
  },
  computed: {
    // 拿到vuex中存储的name,只有登录过后，vuex中才有该数据，因此通过该数据去进行头像个人信息展示
    ...mapGetters(["name"]),
  },
  watch: {},
  mounted() {},
  created() {
    this.QuesionBankAll();
    this.getPopularscience();
  },
  methods: {
    // 获取所有试题
    QuesionBankAll() {
      getQuesionBankAll().then((res) => {
        this.questionBank = res.data;
      });
    },
    getPopularscience() {
      getPopularscienceAll().then((res) => {
        this.popularscience = res.data;
      });
    },
    jump(dom) {
      // 获取到需要跳转的元素
      document
        .querySelector(dom)
        .scrollIntoView({ behavior: "smooth", block: "start" });
      // 隐藏菜单
      this.minactive = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  .el-header {
    padding: 0 !important;
    position: relative;
    height: 70px !important;
    .navbar {
      margin: 0 auto;
      width: 80%;
      height: 70px;
      display: flex;
      position: relative;
      .logo_box {
        height: 70px;
        display: flex;
        align-items: center;
        span {
          margin-left: 15px;
          font-weight: 600;
        }
      }
      .nav {
        position: absolute;
        right: 20%;
        display: flex;
        a {
          display: block;
          margin: 0 30px 0 30px;
          text-decoration: none;
          font-family: "微软雅黑";
          font-weight: 600;
          color: #74727a;
          line-height: 70px;
          transition: all 0.4s ease;
          cursor: pointer;
          &:hover {
            color: #2a2833;
            text-decoration: underline;
          }
        }
      }
      // 渐变登录
      .border-box {
        right: 0;
        top: 10px;
        width: 124px;
        height: 50px;
        border: 2px solid transparent;
        border-radius: 5px;
        position: absolute;
        background-color: #fff;
        background-clip: padding-box;
        cursor: pointer;
        &:hover {
          background-image: linear-gradient(90deg, #ff4eb5 0%, #ffa065 100%);
          transition: background-image 0.3s linear;
          transition: color 0.3s linear;
          a {
            color: white;
          }
        }
      }
      .border-box::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
        margin: -2px;
        border-radius: inherit; /*important*/
        background: linear-gradient(90deg, #ff4eb5 0%, #ffa065 100%);
      }
      // 登录文字样式
      .content {
        text-align: center;
        line-height: 50px;
        a {
          text-decoration: none;
          color: black;
        }
      }
      // 头像位置
      .avatar_wrapper {
        position: absolute;
        right: 0;
        top: 12px;
      }
    }
    // 汉堡按钮
    .mobile-button {
      transition: all 0.3s ease;
      display: none;
      position: absolute;
      width: 26px;
      height: 26px;
      top: 22px;
      right: 50px;
      background-color: transparent;
      cursor: pointer;
    }
    // 隐藏菜单
    .main_nav {
      width: 100%;
      height: 130px;
      padding: 5px 0 5px 0;
      display: none;
      box-shadow: 0 4px 16px 0 rgb(0 20 102 / 6%);
    }
  }
  .el-main {
    padding: 0 !important;
    overflow: hidden;
    // 主页
    .index {
      width: 100%;
      height: 90vh;
      display: flex;
      .index_text {
        width: 50%;
        height: 100%;
        z-index: -1;
        position: relative;
        h3 {
          position: absolute;
          right: 100px;
          top: 200px;
          font-family: "微软雅黑";
          color: #2a2833;
          width: 50%;
          font-weight: normal;
          font-size: 42px;
          span {
            font-weight: 600;
          }
          transition: all 0.3s linear;
        }
        p {
          width: 50%;
          position: absolute;
          right: 100px;
          top: 350px;
          line-height: 30px;
          color: gray;
          transition: all 0.3s linear;
        }
      }
      .index_banner {
        width: 50%;
        height: 100%;
        z-index: -1;
        position: relative;
        // 伪类动画
        &::before {
          content: "";
          width: 550px;
          height: 550px;
          background-image: linear-gradient(40deg, #ff43c0 0%, #ffa95c 100%);
          box-shadow: 0px 20px 60px 0px rgb(244 151 190 / 80%);
          border-radius: 50%;
          position: absolute;
          top: 12%;
          left: 10%;
          transform-origin: center bottom;
          animation-fill-mode: both;
          animation-name: bounce;
          animation-timing-function: ease-out;
          animation-duration: 5s;
          animation-iteration-count: infinite;
          transition: all 0.3s linear;
        }
      }
      // 动画效果
      @keyframes bounce {
        0% {
          -webkit-transform: translateY(0px) translateX(0) rotate(0);
          transform: translateY(0px) translateX(0) rotate(0);
        }
        30% {
          -webkit-transform: translateY(-20px) translateX(0) rotate(0);
          transform: translateY(-20px) translateX(0) rotate(0);
          -webkit-transform-origin: center center;
          transform-origin: center center;
        }
        50% {
          -webkit-transform: translateY(20px) translateX(0) rotate(0);
          transform: translateY(20px) translateX(0) rotate(0);
          -webkit-transform-origin: right bottom;
          transform-origin: right bottom;
        }
        80% {
          -webkit-transform: translateY(-10px) translateX(0) rotate(0);
          transform: translateY(-10px) translateX(0) rotate(0);
          -webkit-transform-origin: left top;
          transform-origin: left top;
        }
        100% {
          -webkit-transform: translateY(0px) translateX(0) rotate(0);
          transform: translateY(0px) translateX(0) rotate(0);
          -webkit-transform-origin: center center;
          transform-origin: center center;
        }
      }
    }
    // 心理测评
    .evaluation {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
      // 四个旋转方块
      .site-animation {
        position: absolute;
        top: -100px;
        left: 20px;
        // 公共的样式大小
        .ani-box {
          width: 80px;
          height: 80px;
        }
        // 单独的样式
        #ani-one {
          top: 150px;
        }
        #ani-two {
          top: 150px;
          right: 80px;
        }
        #ani-three {
          top: 150px;
        }
        #ani-four {
          bottom: 10px;
          left: 80px;
        }
        .ani-1 {
          background-color: #f4f4f7;
          position: relative;
          margin: auto;
          animation: square-to-circle 2.5s 0.5s infinite
            cubic-bezier(1, 0.015, 0.295, 1.225) alternate-reverse;
        }
        @keyframes square-to-circle {
          0% {
            border-radius: 0;
            transform: rotate(45deg);
          }
          25% {
            border-radius: 50% 0 0 0;
            background: #f4f4f7;
            transform: rotate(135deg);
          }
          50% {
            border-radius: 50% 50% 0 0;
            background: #f4f4f7;
            transform: rotate(180deg);
          }
          75% {
            border-radius: 50% 50% 50% 0;
            background: #f4f4f7;
            transform: rotate(315deg);
          }
          100% {
            border-radius: 50%;
            background: #f4f4f7;
            transform: rotate(404deg);
          }
        }
        .ani-2 {
          background-color: #f4f4f7;
          position: relative;
          margin: auto;
          animation: square-to-circle2 2.5s 0.42s infinite
            cubic-bezier(1, 0.015, 0.295, 1.225) alternate-reverse;
        }
        @keyframes square-to-circle2 {
          0% {
            border-radius: 0;
            transform: rotate(45deg);
          }
          25% {
            border-radius: 0 0 50% 0;
            background: #f4f4f7;
            transform: rotate(135deg);
          }
          50% {
            border-radius: 0 0 50% 50%;
            background: #f4f4f7;
            transform: rotate(180deg);
          }
          75% {
            border-radius: 50% 0 50% 50%;
            background: #f4f4f7;
            transform: rotate(315deg);
          }
          100% {
            border-radius: 50%;
            background: #f4f4f7;
            transform: rotate(404deg);
          }
        }
      }
      // 渐变背景及黄色光晕
      .gradient-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 150px;
        right: 0;
        background-image: -moz-linear-gradient(
          -90deg,
          #e6feff 0,
          rgba(230, 254, 255, 0.2) 100%
        );
        background-image: -webkit-linear-gradient(
          -90deg,
          #e6feff 0,
          rgba(230, 254, 255, 0.2) 100%
        );
        z-index: -1;
        img {
          position: absolute;
          top: -500px;
          right: -400px;
        }
      }
      .container {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        border-radius: 20px;
        position: relative;
        // 标题
        h3 {
          display: block;
          position: relative;
          top: 20px;
          text-align: center;
        }
        // 试题布局盒子
        .el-row {
          position: absolute;
          left: 51%;
          transform: translateX(-50%);
          width: 90%;
          height: 76vh;
          top: 70px;
          overflow: hidden;
          .el-col {
            cursor: pointer;
            width: 230px;
            height: 240px;
            padding: 20px;
            margin: 20px;
            position: relative;
            border-radius: 10px;
            border: 2px solid rgba(12, 184, 182, 0.25);
            position: relative;
            overflow: hidden;
            &:hover {
              border: rgb(12, 184, 182) solid 2px;
              .bcolor {
                top: -52px;
                width: 140%;
                height: 140%;
              }
              h4 {
                color: white;
                transition: color 0.5s linear;
              }
              p {
                color: white;
                transition: color 0.3s linear;
              }
            }
            .img {
              position: absolute;
              width: 91%;
              height: 135px;
              z-index: 2;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
            // 试题标题
            h4 {
              position: absolute;
              z-index: 2;
              bottom: 13%;
              transition: color 2s ease-in-out;
            }
            // 测试人数
            p {
              position: absolute;
              z-index: 2;
              font-size: 12px;
              color: gray;
              bottom: 5%;
              transition: color 2s ease-in-out;
            }
            // 背景
            .bcolor {
              width: 140%;
              height: 140%;
              border-radius: 50%;
              position: absolute;
              top: 100%;
              left: -20%;
              z-index: 0;
              background: rgb(12, 184, 182);
              transition: top 1s linear;
            }
          }
        }
      }
    }
    // 知识科普
    .knowledge {
      width: 100%;
      height: 100vh;
      background: rgb(247, 247, 255);
      position: relative;
      // 预览动画
      .preview {
        position: absolute;
        width: 100%;
        height: 100%;
        // 右侧消失六边形
        .preview_shape_01 {
          position: absolute;
          right: 57px;
          top: 50px;
          opacity: 0.3;
          animation: flipInX 10s infinite;
        }
        // 六边形动画
        @keyframes flipInX {
          0% {
            -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
            opacity: 0;
          }
          40% {
            -webkit-transform: perspective(400px) rotateX(-20deg);
            transform: perspective(400px) rotateX(-20deg);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
          }
          60% {
            -webkit-transform: perspective(400px) rotateX(10deg);
            transform: perspective(400px) rotateX(10deg);
            opacity: 1;
          }
          80% {
            -webkit-transform: perspective(400px) rotateX(-5deg);
            transform: perspective(400px) rotateX(-5deg);
          }
          100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
          }
        }
        // 两个圆球
        .preview_shape_02 {
          position: absolute;
          top: 190px;
          left: 60px;
          opacity: 0.3;
          animation: animationFramesOne 30s linear infinite;
        }
        .preview_shape_03 {
          position: absolute;
          top: 200px;
          left: 94px;
          opacity: 0.3;
          animation: animationFramesOne 10s infinite;
        }
        // 圆球动画
        @keyframes animationFramesOne {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          20% {
            transform: translate(73px, -1px) rotate(36deg);
          }
          40% {
            transform: translate(141px, 72px) rotate(72deg);
          }
          60% {
            transform: translate(83px, 122px) rotate(108deg);
          }
          80% {
            transform: translate(-40px, 72px) rotate(144deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }
      }
      // 主内容区
      .container {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        border-radius: 20px;
        position: relative;
        border: red solid 1px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
// 媒体查询样式
@media only screen and (max-width: 1200px) {
  .el-container {
    .el-main {
      .index {
        .index_text {
          h3 {
            width: 60%;
            font-size: 38px;
            right: 50px;
            top: 220px;
            transition: all 0.3s linear;
          }
          p {
            width: 60%;
            right: 50px;
            transition: all 0.3s linear;
          }
        }
        .index_banner {
          &::before {
            width: 450px;
            height: 450px;
            top: 27%;
            left: 10%;
            transition: all 0.3s linear;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .el-container {
    .el-header {
      background: white;
      .navbar {
        width: 75%;
        .nav {
          display: none !important;
        }
      }
      // 汉堡按钮
      .mobile-button {
        display: block !important;
        span {
          position: absolute;
          width: 100%;
          height: 4px;
          left: 0;
          top: 50%;
          overflow: hidden;
          text-indent: 200%;
          background: black;
          transition: all ease 0.3s;
        }
        &::before {
          content: "";
          position: absolute;
          display: block;
          top: 0;
          height: 4px;
          width: 100%;
          left: 0;
          top: 10%;
          transform-origin: 50% 50%;
          background: black;
          transition: all ease 0.3s;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          height: 4px;
          width: 100%;
          left: 0;
          top: 90%;
          transform-origin: 50% 50%;
          background: black;
          transition: all ease 0.3s;
        }
      }
      // 点击之后的样式切换
      .active {
        span {
          opacity: 0;
        }
        &::before {
          width: 120%;
          transform: rotate3d(0, 0, 1, 45deg);
          left: -3px;
          top: 14px;
        }
        &::after {
          width: 120%;
          transform: rotate3d(0, 0, 1, -45deg);
          top: 14px;
          left: -3px;
        }
      }
      // 隐藏菜单
      .main_nav {
        background: white;
        a {
          display: block;
          width: 75%;
          height: 40px;
          line-height: 40px;
          margin: 0 auto;
          color: black;
          text-decoration: none;
          border-bottom: gray solid 1px;
          &:hover {
            color: #0db8ff;
            border-bottom: #0db8ff solid 1px;
          }
        }
      }
      // 隐藏菜单点击之后的样式切换
      .main_nav_active {
        display: block;
        transition: all 0.5s linear;
      }
    }
    .el-main {
      .index {
        .index_text {
          h3 {
            width: 60%;
            font-size: 28px;
            right: 50px;
            top: 245px;
            transition: all 0.3s linear;
          }
          p {
            width: 60%;
            right: 50px;
            top: 335px;
            transition: all 0.3s linear;
          }
        }
        .index_banner {
          &::before {
            width: 350px;
            height: 350px;
            top: 40%;
            left: 13%;
            transition: all 0.3s linear;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
// 心理测评单独媒体查询样式，因为尺寸设计大小较多，单独进行设置
@media screen and (max-width: 1469px) {
  .el-container {
    .el-main {
      .evaluation {
        .container {
          .el-row {
            left: 57%;
            transition: all 0.3s linear;
            .el-col {
              width: 260px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1345px) {
  .el-container {
    .el-main {
      .evaluation {
        .container {
          .el-row {
            left: 57%;
            transition: all 0.3s linear;
            .el-col {
              width: 230px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .el-container {
    .el-main {
      .index {
        .index_text {
          h3 {
            width: 60%;
            font-size: 38px;
            right: 50px;
            top: 220px;
            transition: all 0.3s linear;
          }
          p {
            width: 60%;
            right: 50px;
            transition: all 0.3s linear;
          }
        }
        .index_banner {
          &::before {
            width: 450px;
            height: 450px;
            top: 27%;
            left: 10%;
            transition: all 0.3s linear;
          }
        }
      }
      .evaluation {
        .container {
          .el-row {
            left: 55%;
            transition: all 0.3s linear;
            .el-col {
              width: 200px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1039px) {
  .el-container {
    .el-main {
      .evaluation {
        .container {
          .el-row {
            left: 58%;
            transition: all 0.3s linear;
            .el-col {
              width: 245px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 811px) {
  .el-container {
    .el-main {
      .evaluation {
        .container {
          .el-row {
            left: 52%;
            transition: all 0.3s linear;
            .el-col {
              width: 210px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .el-container {
    .el-main {
      .evaluation {
        .container {
          .el-row {
            left: 60%;
            transition: all 0.3s linear;
            .el-col {
              width: 270px;
              // transition: all 0.3s linear;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
// 滚动圆球
.gard {
  width: 100%;
  height: 98vh;
  z-index: -2;
  position: absolute;
  overflow: hidden;
  .banner-one {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    .banner-one__shape-1 {
      background-image: linear-gradient(40deg, #0db8ff 0%, #f332ff 100%);
      -webkit-box-shadow: 0px 20px 60px 0px rgb(141 142 255 / 80%);
      box-shadow: 0px 20px 60px 0px rgb(141 142 255 / 80%);
      width: 143px;
      height: 143px;
      top: 5%;
      left: 3%;
      -webkit-animation-duration: 8s;
      animation-duration: 8s;
      -webkit-perspective: 150px;
      perspective: 150px;
    }
    .banner-one__shape-2 {
      background-image: linear-gradient(40deg, #39aeff 0%, #3cff53 100%);
      -webkit-box-shadow: 0px 20px 40px 0px rgb(58 212 173 / 80%);
      box-shadow: 0px 20px 40px 0px rgb(58 212 173 / 80%);
      width: 85px;
      height: 85px;
      top: 12%;
      left: 37%;
      -webkit-animation-duration: 10s;
      animation-duration: 10s;
      -webkit-perspective: 85px;
      perspective: 85px;
    }
    .banner-one__shape-3 {
      background-image: linear-gradient(40deg, #ff43c0 0%, #ffa95c 100%);
      -webkit-box-shadow: 0px 20px 40px 0px rgb(255 118 142 / 80%);
      box-shadow: 0px 20px 40px 0px rgb(255 118 142 / 80%);
      width: 85px;
      height: 85px;
      bottom: 12%;
      left: 6%;
      -webkit-animation-duration: 7s;
      animation-duration: 7s;
      -webkit-perspective: 85px;
      perspective: 85px;
    }
    .banner-one__shape-4 {
      background-image: linear-gradient(40deg, #ff703e 0%, #ffec4e 100%);
      -webkit-box-shadow: 0px 20px 40px 0px rgb(255 178 71 / 80%);
      box-shadow: 0px 20px 40px 0px rgb(255 178 71 / 80%);
      width: 85px;
      height: 85px;
      top: 20%;
      right: 4%;
      -webkit-animation-duration: 12s;
      animation-duration: 12s;
      -webkit-perspective: 85px;
      perspective: 85px;
    }
    [class*="banner-one__shape-"] {
      position: absolute;
      border-radius: 50%;
      -webkit-animation-name: bubbleMover;
      animation-name: bubbleMover;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    @keyframes bubbleMover {
      0% {
        -webkit-transform: translateY(0px) translateX(0) rotate(0);
        transform: translateY(0px) translateX(0) rotate(0);
      }
      30% {
        -webkit-transform: translateY(30px) translateX(50px) rotate(15deg);
        transform: translateY(30px) translateX(50px) rotate(15deg);
        -webkit-transform-origin: center center;
        transform-origin: center center;
      }
      50% {
        -webkit-transform: translateY(50px) translateX(100px) rotate(45deg);
        transform: translateY(50px) translateX(100px) rotate(45deg);
        -webkit-transform-origin: right bottom;
        transform-origin: right bottom;
      }
      80% {
        -webkit-transform: translateY(30px) translateX(50px) rotate(15deg);
        transform: translateY(30px) translateX(50px) rotate(15deg);
        -webkit-transform-origin: left top;
        transform-origin: left top;
      }
      100% {
        -webkit-transform: translateY(0px) translateX(0) rotate(0);
        transform: translateY(0px) translateX(0) rotate(0);
        -webkit-transform-origin: center center;
        transform-origin: center center;
      }
    }
  }
}
</style>
