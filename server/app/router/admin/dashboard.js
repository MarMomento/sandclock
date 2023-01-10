const Router = require("@koa/router")
const { AUTH } = require("../../config/constants")
const router = new Router({ prefix: "/dashboard" })
const dashboardController = require("../../controller/dashboard")
const { auth, Auth } = require("../../middleware/auth")

router
  .get(
    "/statistics",
    new Auth(AUTH.LEVEL.ADMIN).m,
    dashboardController.getModelCount
  )
  .get(
    "/tags/popular",
    new Auth(AUTH.LEVEL.ADMIN).m,
    dashboardController.getPopularTags
  )
module.exports = router
