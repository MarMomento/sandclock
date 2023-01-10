const Router = require("@koa/router")
const router = new Router()
const loginController = require("../../controller/login")
const userController = require("../../controller/user")
const uploadController = require("../../controller/upload")
const { Auth } = require("../../middleware/auth")
const { AUTH } = require("../../config/constants")
const { checkUserExist } = require("../../middleware/check")

/**
 * 登录
 */

router.post("/login", loginController.login_admin)

/**
 * 图片上传
 */

router.post(
  "/upload",
  new Auth(AUTH.LEVEL.ADMIN).m,
  uploadController.upload
)

/**
 * CRUD
 */

router
  .get(
    "/users",
    new Auth(AUTH.LEVEL.ADMIN).m,
    userController.find
  )
  .get(
    "/users/:user_id",
    new Auth(AUTH.LEVEL.ADMIN).m,
    checkUserExist,
    userController.findById
  )
  .post(
    "/users",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    userController.create
  )
  .patch(
    "/users/:user_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkUserExist,
    userController.update
  )
  .delete(
    "/users/:user_id",
    new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
    checkUserExist,
    userController.del
  )

/**
 * authenticated user
 * reset password
 */

router.get(
  "/user",
  new Auth(AUTH.LEVEL.ADMIN).m,
  userController.getAuthUser
)
router.patch(
  "/users/:user_id/reset/password",
  new Auth(AUTH.LEVEL.SUPER_ADMIN).m,
  checkUserExist,
  userController.resetPassword
)

module.exports = router
