const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias // 配置resolve.alias
      .set("@", resolve("./src"));
  },

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api/admin",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },

  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
  outputDir: resolve("../server/public/admin"),
};
