const Router = require("@koa/router")
const router = new Router()
const articleController = require("../../controller/article")
const { Auth } = require("../../middleware/auth")
const { AUTH } = require("../../config/constants")
const {
  checkArticleExist
} = require("../../middleware/check")

/**
 * CRUD
 */

router
  .get(
    "/articles",
    new Auth(AUTH.LEVEL.ADMIN).m,
    articleController.find
  )
  .get(
    "/articles/:article_id",
    new Auth(AUTH.LEVEL.ADMIN).m,
    checkArticleExist,
    articleController.findById
  )
  .post(
    "/articles",
    new Auth(AUTH.LEVEL.ADMIN).m,
    articleController.create
  )
  .patch(
    "/articles/:article_id",
    new Auth(AUTH.LEVEL.ADMIN).m,
    checkArticleExist,
    articleController.update
  )
  .delete(
    "/articles/:article_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkArticleExist,
    articleController.del
  )

module.exports = router
