<template>
  <!-- 公用的头部文件 -->
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
      <div class="nav">
        <router-link to="/home">主页</router-link>
        <router-link to="/home">心理测评</router-link>
        <router-link to="/home">知识科普</router-link>
      </div>
      <!-- 用户头像信息组件 -->
      <AvatarWrapper v-if="name" class="avatar_wrapper"></AvatarWrapper>
      <div v-else class="border-box">
        <div class="content">登录</div>
      </div>
    </nav>
    <!-- 汉堡菜单 在页面小于992px的情况下展示 -->
    <div
      class="mobile-button"
      :class="{ active: minactive == true }"
      @click="minactive = !minactive"
    >
      <span></span>
    </div>
    <!-- 菜单 页面小于992的情况下展示 -->
    <nav class="main_nav" :class="{ main_nav_active: minactive == true }">
      <router-link to="/home">主页</router-link>
      <router-link to="/home">心理测评</router-link>
      <router-link to="/home">知识科普</router-link>
    </nav>
  </el-header>
</template>
<script>
import { mapGetters } from "vuex";
import AvatarWrapper from "@/components/avatarWrapper";
export default {
  name: "headerView",
  components: { AvatarWrapper },
  mixins: [],
  props: {},
  data() {
    return {
      // 控制汉堡按钮和菜单的样式
      minactive: false,
    };
  },
  computed: {
    ...mapGetters(["avatar", "name"]),
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0 !important;
  position: fixed;
  width: 100vw;
  height: 70px !important;
  box-shadow: 0 4px 16px 0 rgb(0 20 102 / 6%);
  background: white;
  z-index: 2;
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
        color: white;
        transition: background-image 0.3s linear;
        transition: color 0.3s linear;
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
    .content {
      text-align: center;
      line-height: 50px;
    }
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
</style>

<style lang="scss" scoped>
// 媒体查询样式
@media screen and (max-width: 992px) {
  .el-header {
    .navbar {
      width: 75%;
      transition: all 0.5s ease;
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
    // 汉堡按钮点击之后的样式切换
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
    }
  }
}
</style>
