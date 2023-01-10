const Router = require("@koa/router")
const router = new Router()
const { findPopularTags, findById } = require("../../controller/tag")
const { checkTagExist } = require("../../middleware/check")

router
  .get("/tags/popular", findPopularTags) // 获取受欢迎的标签
  .get("/tags/:tag_id", checkTagExist, findById) // 获取某个标签

module.exports = router
