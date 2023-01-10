const Router = require("@koa/router")
const router = new Router()
const {
  findById,
  getAuthUser,
  updateAuthUser,
  listAuthUserStarredArticles,
  starArticle,
  unStarArticle,
  listAuthUserStarredComments,
  starComment,
  unStarComment,
  listAuthUserCollectedArticles,
  collectArticle,
  unCollectArticle,
  listAuthUserFollowing,
  listAuthUserFollowers,
  followUser,
  unFollowUser,
  listAuthUserTags,
  followTag,
  unFollowTag,
  resetAuthUserPassword,
  listAuthUserArticles,
  createAuthUserArticle,
  updateAuthUserArticle,
  delAuthUserArticle,
  findProfileById
} = require("../../controller/user")
const { auth } = require("../../middleware/auth")
const {
  checkUserExist,
  checkTagExist,
  checkArticleExist,
  checkCommentExist,
  checkArticleAuthor
} = require("../../middleware/check")

router
  .get("/users/:user_id", checkUserExist, findById)
  .get("/users/:user_id/profile", checkUserExist, findProfileById) // 获取用户的所有信息

/**
 * 授权用户
 */

router
  .get("/user", auth, getAuthUser)
  .patch("/user", auth, updateAuthUser)
  .patch("/user/reset/password", auth, resetAuthUserPassword)

/**
 * 用户 - 关注/取关 - 用户
 * following: 关注
 * followers: 粉丝
 */

router
  .get("/user/following", auth, listAuthUserFollowing)
  .get("/user/followers", auth, listAuthUserFollowers)
  .patch("/user/following/:user_id", auth, checkUserExist, followUser)
  .delete("/user/following/:user_id", auth, checkUserExist, unFollowUser)

/**
 * 用户 - 点赞/取赞 - 评论
 */

router
  .get("/user/starred/comments", auth, listAuthUserStarredComments)
  .patch(
    "/user/starred/comments/:comment_id",
    auth,
    checkCommentExist,
    starComment
  )
  .delete(
    "/user/starred/comments/:comment_id",
    auth,
    checkCommentExist,
    unStarComment
  )

/**
 * 用户 - 点赞/取赞 - 文章
 */

router
  .get("/user/starred/articles", auth, listAuthUserStarredArticles)
  .patch(
    "/user/starred/articles/:article_id",
    auth,
    checkArticleExist,
    starArticle
  )
  .delete(
    "/user/starred/articles/:article_id",
    auth,
    checkArticleExist,
    unStarArticle
  )

/**
 * 用户 - 收藏/取消收藏 - 文章
 */

router
  .get("/user/collected/articles", auth, listAuthUserCollectedArticles)
  .patch(
    "/user/collected/articles/:article_id",
    auth,
    checkArticleExist,
    collectArticle
  )
  .delete(
    "/user/collected/articles/:article_id",
    auth,
    checkArticleExist,
    unCollectArticle
  )

/**
 * 用户 - 关注/取关 - 标签
 */

router
  .get("/user/tags", auth, listAuthUserTags)
  .patch("/user/tags/:tag_id", auth, checkTagExist, followTag)
  .delete("/user/tags/:tag_id", auth, checkTagExist, unFollowTag)

/**
 * 登录用户CRUD文章
 */

router
  .get("/user/articles", auth, listAuthUserArticles)
  .post("/user/articles", auth, createAuthUserArticle)
  .patch(
    "/user/articles/:article_id",
    auth,
    checkArticleExist,
    checkArticleAuthor,
    updateAuthUserArticle
  )
  .delete(
    "/user/articles/:article_id",
    auth,
    checkArticleExist,
    checkArticleAuthor,
    delAuthUserArticle
  )

module.exports = router
