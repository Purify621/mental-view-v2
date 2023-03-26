<template>
  <el-container class="container">
    <Header></Header>
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>知识科普</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container class="main">
      <div v-html="content"></div>
    </el-container>
    <Footer></Footer>
  </el-container>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { getPopularscienceId } from "@/api/Popularscience";
export default {
  name: "ArticleView",
  components: { Header, Footer },
  props: {},
  data() {
    return {
      id: undefined,
      content: undefined, // 需要渲染的文本内容
    };
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.params.id;
    this.getArticleContent();
  },
  methods: {
    getArticleContent() {
      getPopularscienceId(this.id).then((res) => {
        this.content = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  // 排列方式 纵向排列
  display: flex;
  flex-direction: column;
  .top {
    width: 55%;
    margin: 0 auto;
    padding: 120px 0 0 0;
  }
  .main {
    width: 55%;
    margin: 0 auto;
    padding-top: 40px;
    div {
      padding: 40px;
      background-repeat: no-repeat;
      background-color: rgb(247, 251, 255);
    }
    p {
      line-height: 40px !important;
    }
  }
}
</style>
