const Router = require("@koa/router")
const router = new Router()
const {
  getCommentsByArticleId,
  getAuthUserComments,
  delAuthUserComment,
  createAuthUserComment,
  findById
} = require("../../controller/comment")
const { auth } = require("../../middleware/auth")
const {
  checkArticleExist,
  checkCommentExist
} = require("../../middleware/check")

// 获取某个评论
router.get("/comments/:comment_id", checkCommentExist, findById)

/**
 * 获取某个文章的所有评论
 */

router.get(
  "/articles/:article_id/comments",
  checkArticleExist,
  getCommentsByArticleId
)

/**
 * 授权用户 获取/创建/删除 评论
 */

router
  .get("/user/comments", auth, getAuthUserComments)
  .post(
    "/user/articles/:article_id/comments/:comment_id",
    auth,
    checkArticleExist,
    checkCommentExist,
    createAuthUserComment
  )
  .post(
    "/user/articles/:article_id/comments",
    auth,
    checkArticleExist,
    createAuthUserComment
  )
  .delete(
    "/user/comments/:comment_id",
    auth,
    checkCommentExist,
    delAuthUserComment
  )

module.exports = router
