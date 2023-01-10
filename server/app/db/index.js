module.exports = async () => {
  const mongoose = require("mongoose")
  const { DB_URL } = require("../config/index")
  const requireDirectory = require("require-directory")

  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log("DB is connected")
  } catch (error) {
    console.log("DB connect error\n" + error)
  }

  // 预先加载一遍model,提前创建模型
  requireDirectory(module, "../model")
}
