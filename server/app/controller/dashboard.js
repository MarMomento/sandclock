const modelService = require("../service/index")

class DashboardController {
  /**
   * 各个模型的数据统计
   *
   * @param {*} ctx
   */

  async getModelCount(ctx) {
    ctx.verifyParams({
      date: "number?"
    })

    let { date = "all" } = ctx.query
    let user_counts, article_counts, tag_counts, comment_counts
    if (date === "all") {
      user_counts = await modelService.estimatedDocumentCount("User")
      article_counts = await modelService.estimatedDocumentCount(
        "Article"
      )
      tag_counts = await modelService.estimatedDocumentCount("Tag")
      comment_counts = await modelService.estimatedDocumentCount(
        "Comment"
      )
    } else {
      date = Math.max(date, 0)
      const now = new Date()
      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - date
      )
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - date + 1
      )
      const filterQuery = {
        created_at: { $gt: start, $lt: end }
      }
      user_counts = await modelService.countDocuments(
        "User",
        filterQuery
      )
      article_counts = await modelService.countDocuments(
        "Article",
        filterQuery
      )
      tag_counts = await modelService.countDocuments(
        "Tag",
        filterQuery
      )
      comment_counts = await modelService.countDocuments(
        "Comment",
        filterQuery
      )
    }

    ctx.body = {
      user_counts,
      article_counts,
      tag_counts,
      comment_counts
    }
  }

  /**
   * 获取流行的标签
   * @param {*} ctx
   */

  async getPopularTags(ctx) {
    ctx.verifyParams({
      limit: "number?"
    })

    let { limit = 10 } = ctx.query
    limit = Math.max(limit, 1)

    ctx.body = await modelService.find("Tag", {
      sort: {
        followers_count: -1,
        articles_count: -1
      },
      limit
    })
  }
}

module.exports = new DashboardController()
