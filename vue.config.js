const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 修改端口号 设置运行自动打开浏览器
  devServer: {
    host: "localhost",
    port: 8090,
    open: true,
  },
});
