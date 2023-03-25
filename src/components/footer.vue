<template>
  <el-footer>
    <div class="line"></div>
    <!-- 摆动的svg -->
    <div class="bg_color">
      <!-- draggable="false" 用来禁止鼠标拖动 -->
      <img src="../assets/v.svg" draggable="false" alt="" />
    </div>
    <div class="main">
      <div class="logo-f">
        <img src="@/assets/logo-f.png" alt="" />
        <span>大学生心理健康测评网站</span>
      </div>
      <div class="text">
        <div class="text_t">
          <div class="text_t_1">
            <span>服务</span>
          </div>
          <div class="text_t_2">
            <span><a>帮助中心</a></span>
            <span><a>最新功能</a></span>
            <span><a>服务条款</a></span>
          </div>
        </div>
        <div class="text_t">
          <div class="text_t_1">
            <span>相关连接</span>
          </div>
          <div class="text_t_2">
            <span>
              <a href="http://www.psych.cas.cn/">中国科学院心理研究所</a>
            </span>
            <span>
              <a href="http://lib.psych.ac.cn/library/home"
                >中国心理科学信息中心</a
              >
            </span>
            <span>
              <a href="http://eap.psych.cn/">中国心理健康应用中心</a>
            </span>
          </div>
        </div>
        <div class="text_t">
          <div class="text_t_1">
            <span>联系我们</span>
          </div>
          <div class="text_t_2">
            <span><a>18300606888</a></span>
            <span><a>2530403643@qq.com</a></span>
            <span><a>用户交流群</a></span>
          </div>
        </div>
      </div>
      <div class="footer">
        <span>Since : 郑州科技学院 | 信息工程学院</span>
        <span>Copyright © 2021 Js.Design Incm. All rights reserved.</span>
      </div>
    </div>
  </el-footer>
</template>
<script>
export default {
  name: "footerView",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-footer {
  width: 100%;
  height: 371px !important;
  padding: 0 !important;
  position: relative;
  overflow: hidden;
  .line {
    width: 100%;
    position: absolute;
    top: 30px;
    border-top: lightgray solid 1px;
  }
  .bg_color {
    width: 180px;
    position: absolute;
    bottom: -4px;
    right: 60px;
  }
  .main {
    width: 75%;
    height: 255px;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    display: flex;
    .logo-f {
      width: 240px;
      height: 40px;
      display: flex;
      align-items: center;
      img {
        border-radius: 10px;
        width: 40px;
        height: 100%;
      }
      span {
        margin-left: 20px;
        font-weight: 600;
      }
    }
    .text {
      position: absolute;
      right: 0;
      width: 42%;
      height: 200px;
      display: flex;
      .text_t {
        min-width: 65px;
        height: 100%;
        margin-right: 40px;
        // border: red solid 1px;
        .text_t_1 {
          height: 40px;
          display: flex;
          align-items: center;
          span {
            font-weight: 550;
            font-family: "微软雅黑";
          }
        }
        .text_t_2 {
          // margin-top: 10px;
          height: 100px;
          span {
            line-height: 30px;
            display: block;
            font-size: 14px;

            font-family: "微软雅黑";
            a {
              color: rgba(103, 110, 121, 1);
              text-decoration: none;
            }
          }
        }
      }
    }
    .footer {
      min-width: 100px;
      height: 40px;
      line-height: 20px;
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        display: block;
        font-size: 12px;
        color: gray;
      }
    }
  }
}
</style>
