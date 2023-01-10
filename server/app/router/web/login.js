const Router = require("@koa/router")
const router = new Router()
const { login, register } = require("../../controller/login")

/**
 * 登录,注册
 */

router.post("/login", login)
router.post("/register", register)

module.exports = router
