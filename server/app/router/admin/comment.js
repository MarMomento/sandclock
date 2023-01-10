const Router = require("@koa/router")
const router = new Router()
const commentController = require("../../controller/comment")
const { AUTH } = require("../../config/constants")
const { Auth } = require("../../middleware/auth")
const {
  checkCommentExist
} = require("../../middleware/check")

/**
 * CRUD
 */

router
  .get(
    "/comments",
    new Auth(AUTH.LEVEL.ADMIN).m,
    commentController.find
  )
  .get(
    "/comments/:comment_id",
    new Auth(AUTH.LEVEL.ADMIN).m,
    checkCommentExist,
    commentController.findById
  )
  .post(
    "/comments",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    commentController.create
  )
  .patch(
    "/comments/:comment_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkCommentExist,
    commentController.update
  )
  .delete(
    "/comments/:comment_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkCommentExist,
    commentController.del
  )

module.exports = router
