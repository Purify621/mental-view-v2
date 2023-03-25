<template>
  <!-- 登录页 -->
  <el-container>
    <img
      class="bglogin"
      src="https://img.js.design/assets/Resources/background/login-bg-5.jpg"
    />
    <el-header>
      <div class="loginbtn">
        <svg
          t="1675771771498"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6875"
          width="35"
          height="35"
        >
          <path
            d="M707.9 229.3H183.7c-48.3 0-87.4 39.1-87.4 87.4v524.2c0 48.3 39.1 87.4 87.4 87.4h524.2c48.3 0 87.4-39.1 87.4-87.4V316.6c0-48.2-39.1-87.3-87.4-87.3z m21.9 611.6c0 12-9.8 21.8-21.8 21.8H183.7c-12 0-21.8-9.8-21.8-21.8V316.6c0-12 9.8-21.8 21.8-21.8h524.2c12 0 21.8 9.8 21.8 21.8v524.3z"
            p-id="6876"
            fill="#ffffff"
          ></path>
          <path
            d="M920.7 112.7c-5.9-8.7-15.9-14.4-27.2-14.4h-546c-18.1 0-32.8 14.7-32.8 32.8s14.7 32.8 32.8 32.8h513.3V677c0 18.1 14.7 32.8 32.8 32.8 18.1 0 32.8-14.7 32.8-32.8V131c-0.1-6.8-2.1-13.1-5.7-18.3z"
            p-id="6877"
            fill="#ffffff"
          ></path>
        </svg>
        <span>大学生心理健康测评网站</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="50%">
        <div class="title">
          <h1>在同一个地方，开始、认识、 内心，那个自己。</h1>
        </div>
      </el-aside>
      <el-main>
        <!-- 注意 ： 因为该页面有两个不同的表单，因此需要用不同的key来区分表单 -->
        <div class="container">
          <!-- 登录表单 -->
          <div v-if="formstate === true" class="form">
            <h2>登录您的账户</h2>
            <p>
              没有账户？<button @click="formstate = false">免费注册</button>
            </p>
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              label-width="0"
              key="login"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="请输入学号或用户名"
                ></el-input>
              </el-form-item>
              <el-form-item class="check" prop="password">
                <el-input
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item class="check">
                <el-checkbox v-model="checked">记住账户</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onLogin('loginForm')"
                  >登录</el-button
                >
              </el-form-item>
              <p class="clause">
                点击「登录」表示已阅读并同意 <span>服务条款</span>
              </p>
            </el-form>
          </div>
          <!-- 登录表单 -->
          <!-- 注册表单 -->
          <div v-else class="form">
            <h2>注册您的账户</h2>
            <p>已有账户？<button @click="formstate = true">前去登录</button></p>
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="registerRules"
              label-width="0"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="registerForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  placeholder="请输入密码"
                  v-model="registerForm.password"
                  show-password
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>

              <el-form-item prop="checkPass">
                <el-input
                  placeholder="请再次输入密码"
                  v-model="registerForm.checkPass"
                  show-password
                  prefix-icon="el-icon-lock"
                ></el-input>
              </el-form-item>
              <el-form-item class="check">
                <el-button type="primary" @click="onRegister('registerForm')"
                  >注册</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="checked"
                  ><p class="clause">
                    已阅读并同意以下协议 <span>服务条款</span>
                  </p></el-checkbox
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 注册表单 -->
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <span>© 2021 Js.Design Inc. All rights reserved.</span>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "loginView",
  components: {},
  data() {
    // 关于自定义校验，一定要在最后写 else { callback();} 这个回调，不然会出现验证通过但里面代码不执行的问题
    // 登录校验
    var lvalidateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 6) {
        callback(new Error("用户名长度应至少为6位"));
      } else {
        callback();
      }
    };
    var lvalidatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度应至少为6位"));
      } else {
        callback();
      }
    };
    // 注册校验
    // 正则表达式
    const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z]{6,15}$/;
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名要求数字、字母的组合 长度为6-15个字符"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 登录表单
      loginForm: {
        username: "student",
        password: "student",
      },
      // 注册表单
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      // 登录校验
      loginRules: {
        username: [{ validator: lvalidateUsername, trigger: "blur" }],
        password: [{ validator: lvalidatePass, trigger: "blur" }],
      },
      // 注册校验
      registerRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      // 复选框
      checked: true,
      // 表单显示状态 用于切换登录/注册
      formstate: true,
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 登录
    onLogin(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 验证通过执行的代码
        if (valid) {
          await this.$store
            .dispatch("user/login", this.loginForm)
            .then((data) => {
              // data是返回回来的提示信息
              this.$message({
                message: data,
                type: "success",
              });
              this.$router.push("/home");
            })
            .catch((err) => {
              // err是登录失败的提示信息
              this.$message({
                message: err,
                type: "error",
              });
            });
        }
        // 验证失败
        else {
          return false;
        }
      });
    },
    // 注册按钮
    onRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bglogin {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: -1;
}
// 头部区域
.el-header {
  position: relative;
  cursor: pointer;
  .loginbtn {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }
    span {
      position: relative;
      left: 10px;
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
// 左侧区域
.el-aside {
  width: 50vw;
  height: 81vh;
  position: relative;
  .title {
    position: absolute;
    right: 2vw;
    top: 28vh;
    width: 28vw;
    h1 {
      color: white;
      font-size: 32px;
      font-weight: 400;
    }
  }
}
// 右侧主区域
.el-main {
  position: relative;
  .container {
    position: absolute;
    top: 7vh;
    left: 5vw;
    width: 400px;
    height: 500px;
    background: white;
    border-radius: 5%;
    .form {
      position: absolute;
      left: 10%;
      top: 10%;
      width: 80%;
      height: 80%;
      h2 {
        margin-top: 0;
      }
      p {
        color: gray;
        font-size: 16px;
        button {
          font-size: 16px;
          cursor: pointer;
          color: #009dff;
          background: none;
          border: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .el-input {
        height: 50px;
        // 深度选择器
        ::v-deep .el-input__inner {
          height: 50px !important;
          line-height: 50px;
          &:hover {
            border: gray solid 1px;
          }
          &:focus {
            border: #009dff solid 2px !important;
          }
        }
        ::v-deep .el-input__prefix {
          font-size: 18px;
          line-height: 50px;
        }
      }
      .check {
        margin-bottom: 7px;
      }
      .el-button {
        width: 100%;
      }
      // 服务条款样式
      .clause {
        text-align: center;
        font-size: 14px;
        span {
          color: #009dff;
          cursor: pointer;
        }
      }
    }
  }
}

// 底部区域
.el-footer {
  position: relative;
  span {
    cursor: pointer;
    position: absolute;
    top: 20px;
    display: block;
    color: lightgray;
    font-size: 10px;
  }
}
</style>
