const Router = require("@koa/router")
const router = new Router()
const {
  findById,

  getLatestArticlesByTagId,
  getArticlesByUserId,
  getLatestArticles
} = require("../../controller/article")
const {
  checkArticleExist,
  checkTagExist,
  checkUserExist
} = require("../../middleware/check")

router
  .get("/articles/latest", getLatestArticles) // 获取最新一段时间的文章
  .get("/tags/:tag_id/articles/latest", checkTagExist, getLatestArticlesByTagId) // 获取标签下的最新文章

router.get("/articles/:article_id", checkArticleExist, findById)

router.get("/users/:user_id/articles", checkUserExist, getArticlesByUserId)

module.exports = router
