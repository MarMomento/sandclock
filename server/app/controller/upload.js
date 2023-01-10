const { STATUS } = require("../config/constants")
const path = require("path")
const OSS_store = require("../middleware/oss")()

class UploadController {
  /**
   * 图片上传
   * @param {*} ctx
   */

  async upload(ctx) {
    const file = ctx.request.files.file
    ctx.assert(
      file && file.name,
      422,
      STATUS.ERROR_UPLOAD_RESOURCE
    )

    if (file.type.indexOf("image") === -1) {
      ctx.throw(422, STATUS.ERROR_UPLOAD_RESOURCE)
    }

    let url = ""
    const basename = path.basename(file.path)

    if (process.env.NODE_ENV === "production") {
      if (file.size < 4000000) {
        const result = await new Promise(
          (resolve, reject) => {
            OSS_store.put(basename, file.path)
              .then(result => {
                resolve(result)
              })
              .catch(err => {
                reject(err)
              })
          }
        )
        url = result.url
      } else {
        url = `http://123.57.83.12/uploads/${basename}`
      }
    } else {
      url = `${ctx.origin}/uploads/${basename}`
    }

    ctx.body = {
      url
    }
  }
}

module.exports = new UploadController()
