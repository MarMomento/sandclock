const { STATUS, AUTH } = require("../config/constants")
const { secret } = require("../config/index")
const jwt = require("jsonwebtoken")

// 校验：是否有token 以及 token是否正确
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.headers
  ctx.assert(authorization, 401, STATUS.UN_AUTHORIZATION)

  const token = authorization.split(" ").pop()
  try {
    const user = jwt.verify(token, secret)
    // 校验成功,挂载token中的信息到ctx.state
    ctx.state.user = user
  } catch (error) {
    // 校验失败
    ctx.throw(401, STATUS.UN_AUTHORIZATION)
  }
  await next()
}

class Auth {
  constructor(level) {
    this.level = level || 1
  }

  get m() {
    return async (ctx, next) => {
      const { authorization = "" } = ctx.request.headers
      ctx.assert(authorization, 401, STATUS.UN_AUTHORIZATION)

      const token = authorization.split(" ").pop()
      let user

      try {
        user = jwt.verify(token, secret)
      } catch (error) {
        ctx.throw(401, STATUS.UN_AUTHORIZATION)
      }

      if (user.type) {
        if (user.type === AUTH.TYPE.USER) {
          ctx.throw(403, STATUS.FORBIDDEN)
        } else if (user.type === AUTH.TYPE.ADMIN) {
          if (this.level > AUTH.LEVEL.ADMIN) {
            ctx.throw(403, STATUS.FORBIDDEN)
          }
        }
      }

      ctx.state.user = user

      await next()
    }
  }
}

module.exports = {
  auth,
  Auth
}
