<template>
  <!-- 完成报告 -->
  <div class="content">
    <h3>完成报告</h3>
    <div class="report sidebarGlobal">
      <el-col :span="24" class="con" v-for="item in data" :key="item.id">
        <img :src="item.picturebox" alt="" />
        <div class="text">
          <p>{{ item.title }}</p>
          <el-button type="text" @click="viewReport(item.questionId)"
            >查看报告</el-button
          >
          <div class="success">
            <img src="../../assets/svg/success.svg" alt="" />
            <span>已完成</span>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAll } from "@/api/userResult";
export default {
  name: "reportView",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      data: [],
      queryList: { currentPage: 1, pageSize: 10 },
    };
  },
  computed: {
    ...mapGetters(["id"]),
  },
  watch: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.queryList.sid = this.id;
      getAll(this.queryList).then((res) => {
        this.data = res.data.data;
      });
    },
    viewReport(id) {
      this.$router.push({ path: `/result/${id}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  h3 {
    margin: 0;
    margin-bottom: 20px;
  }
  .report {
    width: 100%;
    height: 480px;
    overflow-y: auto;
    .con {
      width: 100%;
      height: 100px;
      margin: 10px 0 10px 0;
      display: flex;
      background: rgb(237, 231, 240);
      &:first-child {
        margin-top: 0;
      }
      img {
        margin: 10px;
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
      .text {
        width: 100%;
        position: relative;
        margin-left: 10px;
        .success {
          position: absolute;
          top: 10px;
          right: 30px;
          width: 50px;
          height: 70px;
          text-align: center;
          img {
            width: 30px;
            height: 30px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
