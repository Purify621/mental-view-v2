const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 修改端口号 设置运行自动打开浏览器
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    host: "localhost",
    historyApiFallback: true,
    port: 8090,
    open: true,
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "大学生心理健康测评",
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
});
