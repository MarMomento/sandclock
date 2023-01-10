const modelService = require("../service/index")
const { STATUS } = require("../config/constants")
const bcryptjs = require("bcryptjs")
const { secret } = require("../config/index")
const jwt = require("jsonwebtoken")

class LoginController {
  /**
   * 客户端登录
   */

  async login(ctx) {
    ctx.verifyParams({
      name: "string",
      password: "string"
    })

    const { name, password } = ctx.request.body
    const user = await modelService.findOne("User", {
      filterQuery: { name },
      select: "+password"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const isValid = bcryptjs.compareSync(
      password,
      user.password
    )
    ctx.assert(isValid, 422, STATUS.ERROR_PWD)

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        type: user.type
      },
      secret,
      { expiresIn: "30d" }
    )

    ctx.body = {
      token
    }
  }

  /**
   * 客户端注册
   */

  async register(ctx) {
    ctx.verifyParams({
      name: "string",
      password: "string"
    })

    const { name, password } = ctx.request.body
    const hasUser = await modelService.findOne("User", {
      filterQuery: { name }
    })
    ctx.assert(!hasUser, 409, STATUS.CONFLICT_USER_EXIST)
    const user = await modelService.create("User", {
      name,
      password
    })

    ctx.status = 201
    ctx.body = user
  }

  /**
   * 后台登录
   */

  async login_admin(ctx) {
    ctx.verifyParams({
      name: "string",
      password: "string"
    })

    const { name, password } = ctx.request.body
    const user = await modelService.findOne("User", {
      filterQuery: { name },
      select: "+password"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const isValid = bcryptjs.compareSync(
      password,
      user.password
    )
    ctx.assert(isValid, 422, STATUS.ERROR_PWD)

    ctx.assert(user.type !== "User", 403, STATUS.FORBIDDEN)

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        type: user.type
      },
      secret,
      { expiresIn: "30d" }
    )

    ctx.body = {
      token
    }
  }
}

module.exports = new LoginController()
