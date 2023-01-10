const fs = require("fs")
const path = require("path")

/**
 * 添加前缀,注册路由
 */

module.exports = app => {
  registerRouter(__dirname, "router")

  function registerRouter(dirPath, dirName) {
    fs.readdirSync(dirPath, { withFileTypes: true }).forEach(file => {
      if (file.isDirectory()) {
        const subDir = path.join(dirPath, file.name)
        registerRouter(subDir, file.name)
      } else {
        if (file.name === "index.js") return

        const router = require(`${dirPath}/${file.name}`)
        switch (dirName) {
          case "admin":
            router.prefix("/api/admin")
            break
          case "web":
            router.prefix("/api/web")
            break
          default:
            break
        }
        app.use(router.routes()).use(router.allowedMethods())
      }
    })
  }
}
