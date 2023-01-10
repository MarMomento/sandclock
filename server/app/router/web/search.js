const Router = require("@koa/router")
const router = new Router({ prefix: "/search" })
const searchController = require("../../controller/search")

/**
 * 结果按最佳匹配降序排序
 *
 * 1.rate limit 速率限制 // TODO: rate limit
 * 授权用户每分钟30请求, 未授权用户每分钟10个请求
 */

router
  .get(
    "/users",
    searchController.verifyParams,
    searchController.searchUsers
  ) // 搜索用户
  .get(
    "/tags",
    searchController.verifyParams,
    searchController.searchTags
  ) // 搜索标签
  .get(
    "/articles",
    searchController.verifyParams,
    searchController.searchArticles
  ) // 搜索文章
  .get(
    "/comments",
    searchController.verifyParams,
    searchController.searchComments
  ) // 搜索评论

module.exports = router
