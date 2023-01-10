const modelService = require("../service/index")

class SearchController {
  /**
   * 校验搜索的查询参数
   *
   * @param {*} ctx
   * @param {*} next
   */

  async verifyParams(ctx, next) {
    ctx.verifyParams({
      q: "string",
      page: { type: "number", required: false },
      per_page: { type: "number", required: false }
    })
    await next()
  }

  /**
   * 搜索用户, 分页
   *
   * @param {*} ctx
   */

  async searchUsers(ctx) {
    let { q, page = 1, per_page = 10 } = ctx.query
    page = Math.max(page, 1)
    per_page = Math.min(Math.max(per_page, 1), 100)
    const qReg = new RegExp(q, "i")

    const queryOptions = {
      filterQuery: {
        name: qReg
      },
      skip: (page - 1) * per_page,
      limit: per_page,
      sort: {
        followers_count: -1
      }
    }

    const count = await modelService.countDocuments(
      "User",
      queryOptions.filterQuery
    )
    const data = await modelService.find("User", queryOptions)

    ctx.body = {
      count,
      currentPage: page,
      pageSize: per_page,
      data
    }
  }

  /**
   * 搜索标签, 分页
   *
   * @param {*} ctx
   */

  async searchTags(ctx) {
    let { q, page = 1, per_page = 10 } = ctx.query
    page = Math.max(page, 1)
    per_page = Math.min(Math.max(per_page, 1), 100)
    const qReg = new RegExp(q, "i")

    const queryOptions = {
      filterQuery: {
        $or: [{ name: qReg }, { description: qReg }]
      },
      skip: (page - 1) * per_page,
      limit: per_page,
      sort: {
        followers_count: -1,
        articles_count: -1
      }
    }

    const count = await modelService.countDocuments(
      "Tag",
      queryOptions.filterQuery
    )
    const data = await modelService.find("Tag", queryOptions)

    ctx.body = {
      count,
      currentPage: page,
      pageSize: per_page,
      data
    }
  }

  /**
   * 搜索文章, 分页
   *
   * @param {*} ctx
   */

  async searchArticles(ctx) {
    let { q, page = 1, per_page = 10 } = ctx.query
    page = Math.max(page, 1)
    per_page = Math.min(Math.max(per_page, 1), 100)
    const qReg = new RegExp(q, "i")

    const queryOptions = {
      filterQuery: {
        $or: [{ title: qReg }, { content: qReg }]
      },
      populate: "author tags",
      skip: (page - 1) * per_page,
      limit: per_page,
      sort: {
        created_at: -1,
        updated_at: -1,
        collected_count: -1,
        comment_count: -1
      }
    }

    const count = await modelService.countDocuments(
      "Article",
      queryOptions.filterQuery
    )
    const data = await modelService.find("Article", queryOptions)

    ctx.body = {
      count,
      currentPage: page,
      pageSize: per_page,
      data
    }
  }

  /**
   * 搜索评论, 分页
   *
   * @param {*} ctx
   */

  async searchComments(ctx) {
    let { q, page = 1, per_page = 10 } = ctx.query
    page = Math.max(page, 1)
    per_page = Math.min(Math.max(per_page, 1), 100)
    const qReg = new RegExp(q, "i")

    const queryOptions = {
      filterQuery: {
        content: qReg
      },
      populate: "article_id commentator",
      skip: (page - 1) * per_page,
      limit: per_page,
      sort: {
        created_at: -1,
        updated_at: -1,
        thumb_count: -1
      }
    }

    const count = await modelService.countDocuments(
      "Comment",
      queryOptions.filterQuery
    )
    const data = await modelService.find("Comment", queryOptions)

    ctx.body = {
      count,
      currentPage: page,
      pageSize: per_page,
      data
    }
  }
}

module.exports = new SearchController()
