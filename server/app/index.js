const Koa = require("koa")
const app = new Koa()
const koaBody = require("koa-body")
const koaJsonError = require("koa-json-error")
const koaLogger = require("koa-logger")
const path = require("path")
const koaStatic = require("koa-static")
const compress = require("koa-compress")
const cors = require("@koa/cors")
require("dotenv").config()
const {
  historyApiFallback
} = require("koa2-connect-history-api-fallback")

app.use(
  historyApiFallback({
    whiteList: ["/api", "/admin", "/uploads"]
  })
)
app.use(
  compress({
    threshold: 2048
  })
)
app.use(koaLogger())
app.use(cors())
// 全局错误捕获
app.use(
  koaJsonError({
    postFormat: (e, { stack, status, message, ...reset }) =>
      process.env.NODE_ENV === "production"
        ? reset.errors
          ? { status, message, errors: reset.errors }
          : { status, message }
        : reset.errors
        ? { status, message, errors: reset.errors, stack }
        : { status, message, stack }
  })
)
app.use(koaStatic(path.resolve(__dirname, "../public")))
app.use(koaStatic(path.resolve(__dirname, "../public/web")))
require("./db/index")()
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.resolve(
        __dirname,
        `../public/uploads`
      ),
      keepExtensions: true
    }
  })
)
require("./middleware/parameter")(app, {
  convert: true
})
require("./router/index")(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`)
})
