const OSS = require("ali-oss")

module.exports = function () {
  const store = new OSS({
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESSKEYID,
    accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
    bucket: process.env.OSS_BUCKET
  })
  return store
}
