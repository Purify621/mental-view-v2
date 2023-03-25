<template>
  <div>
    <el-dropdown>
      <div class="avatar-wrapper">
        <!-- 用户头像 -->
        <img :src="avatar" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
        <span class="name">{{ name }}</span>
      </div>
      <!-- 下拉菜单 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="state === 'default'"
          @click.native="toView('/my')"
          >个人信息</el-dropdown-item
        >
        <el-dropdown-item v-if="state === 'my'" @click.native="toView('/home')"
          >回到主页</el-dropdown-item
        >
        <el-dropdown-item @click.native="logout">Log Out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AvatarWrapper",
  components: {},
  mixins: [],
  props: {
    // 接受一个参数值用来显示当前是默认还是在个人中心页面
    // 注意：此状态如果不传递参数则默认显示是default，也就是个人信息列表会显示
    state: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["avatar", "name"]),
  },
  watch: {},
  mounted() {},
  methods: {
    async logout() {
      // 用户登出，清空用户信息
      await this.$store.dispatch("user/logout");
    },
    // 根据状态跳转至个人中心或者主页
    toView(data) {
      // data是要跳转的路由路径
      this.$router.push({
        path: data,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    font-size: 12px;
  }
  .name {
    margin: 0 0 0 10px;
    color: black;
  }
}
</style>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-dropdown-item {
  border: black solid 1px !important;
}
</style>
