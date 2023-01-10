const Router = require("@koa/router")
const router = new Router()
const { auth } = require("../../middleware/auth")
const uploadController = require("../../controller/upload")

/**
 * 图片上传
 */

router.post("/upload", auth, uploadController.upload)

module.exports = router
