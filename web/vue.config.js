const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api/web",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/app.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: resolve("../server/public/web"),
};
