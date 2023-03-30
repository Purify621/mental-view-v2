<template>
  <!-- 基本资料 -->
  <div class="box">
    <h3>基本资料</h3>
    <div class="list">
      <div class="info">
        <span>姓名</span>
        <input :value="user.name" disabled class="text" type="text" />
      </div>
      <div class="info">
        <span>性别</span>
        <input :value="user.gender" disabled class="text" type="text" />
      </div>
      <div class="info">
        <span>手机号</span>
        <input value="18300606888" disabled class="text" type="text" />
      </div>
      <div class="info">
        <span>年级</span>
        <input :value="user.grade" disabled class="text" type="text" />
      </div>
      <div class="info">
        <span>学院</span>
        <input :value="user.college" disabled class="text" type="text" />
      </div>
      <div class="info">
        <span>个签</span>
        <!-- 双向绑定数据值 -->
        <input v-model="user.signature" disabled class="text" type="text" />
        <!-- $event 用来传递当前点击的元素节点信息 -->
        <button @click="modifyStudent($event)">
          {{ modifyText }}
        </button>
      </div>
      <div class="info_school">
        <span>{{ user.school }}</span>
        <p>学号：{{ user.sid }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getByIdInfo, updateStudentInfo } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "basicDataView",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      // 修改状态 true为保存操作  false为修改操作
      modifyState: false,
      // 显示文字
      modifyText: "修改",
      // 用户信息
      user: {},
    };
  },
  computed: {
    ...mapGetters(["sid"]),
  },
  watch: {},
  created() {
    this.getStudentInfo();
  },
  mounted() {},
  methods: {
    // 根据id获取学生信息
    getStudentInfo() {
      getByIdInfo(this.sid).then((res) => {
        this.user = res.data;
      });
    },
    // 修改学生信息
    modifyStudent(e) {
      // e.currentTarget 是获取当前元素
      // 获取当前元素的前一个元素，也就是拿到input输入框
      let beforeDom = e.currentTarget.previousElementSibling;
      if (this.modifyState) {
        // 保存操作
        updateStudentInfo(this.user).then(() => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        });
        // 发请求更改用户信息
        // 移出下边框
        beforeDom.style.borderBottom = "none";
        // 添加禁用状态
        beforeDom.disabled = true;
        // 把状态以及文字改为修改
        this.modifyState = false;
        this.modifyText = "修改";
      } else {
        // 修改操作
        // 添加下边框
        beforeDom.style.borderBottom = "gray solid 1px";
        // 解除禁用状态
        beforeDom.disabled = false;
        // 把状态以及改为保存
        this.modifyState = true;
        this.modifyText = "保存";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  h3 {
    margin-top: 0;
  }
  .list {
    width: 100%;
    .info {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      // border-bottom: lightgray solid 1px;
      display: flex;
      align-items: center;
      position: relative;
      // 文本框样式
      .text {
        height: 50px;
        width: 300px;
        border: none;
        outline: none;
        font-size: 16px;
        color: black;
        background: none;
      }
      span {
        width: 80px;
        display: block;
      }
      // 修改保存按钮
      button {
        position: absolute;
        right: 40px;
        border: none;
        background: none;
        font-size: 16px;
        color: blue;
        cursor: pointer;
      }
    }
    .info_school {
      width: 100%;
      height: 60px;
      padding-left: 10px;
      &:hover {
        background-color: rgb(240, 246, 255);
      }
      span {
        display: block;
        padding-top: 10px;
        font-size: 14px;
      }
      p {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
