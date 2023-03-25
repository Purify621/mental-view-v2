<template>
  <div class="container">
    <section class="banner-one" id="banner">
      <span class="banner-one__shape-1"></span>
      <span class="banner-one__shape-2"></span>
      <span class="banner-one__shape-3"></span>
      <span class="banner-one__shape-4"></span>
    </section>
  </div>
</template>
<script>
export default {
  name: "studentInfo",
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
.container {
  margin: 0;
  padding: 0;
}
.banner-one {
  position: relative;
  display: block;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
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
</style>
