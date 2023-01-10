const Router = require("@koa/router")
const { AUTH } = require("../../config/constants")
const router = new Router()
const tagController = require("../../controller/tag")
const { Auth } = require("../../middleware/auth")
const { checkTagExist } = require("../../middleware/check")

/**
 * CRUD
 */

router
  .get(
    "/tags",
    new Auth(AUTH.LEVEL.ADMIN).m,
    tagController.find
  )
  .get(
    "/tags/:tag_id",
    new Auth(AUTH.LEVEL.ADMIN).m,
    checkTagExist,
    tagController.findById
  )
  .post(
    "/tags",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    tagController.create
  )
  .patch(
    "/tags/:tag_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkTagExist,
    tagController.update
  )
  .delete(
    "/tags/:tag_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkTagExist,
    tagController.del
  )

module.exports = router
