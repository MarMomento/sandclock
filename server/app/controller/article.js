const modelService = require("../service/index")
const { STATUS } = require("../config/constants")

class ArticleController {
  /**
   * CRUD
   */

  async find(ctx) {
    ctx.verifyParams({
      q: { type: "string", required: false },
      page: { type: "number", required: false },
      per_page: { type: "number", required: false }
    })

    let { page = 1, per_page = 10, q = "" } = ctx.query
    page = Math.max(page, 1)
    per_page = Math.max(per_page, 1)
    const qReg = new RegExp(q)

    const queryOptions = {
      filterQuery: {
        title: qReg
      },
      populate: "author tags",
      skip: (page - 1) * per_page,
      limit: per_page
    }

    const count = await modelService.countDocuments(
      "Article",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "Article",
      queryOptions
    )

    ctx.body = {
      count,
      currentPage: page,
      pageSize: per_page,
      data
    }
  }

  async findById(ctx) {
    const { article_id } = ctx.params
    ctx.body = await modelService.findById(
      "Article",
      article_id,
      {
        populate: "author tags"
      }
    )
  }

  async create(ctx) {
    ctx.verifyParams({
      title: "string",
      content: "string",
      tags: {
        type: "array",
        required: true,
        min: 1,
        max: 4
      },
      avatar_url: "string?"
    })

    const { _id } = ctx.state.user
    const data = ctx.request.body
    const article = await modelService.create("Article", {
      ...data,
      author: _id
    })
    await modelService.update("User", _id, {
      $push: { articles: article._id }
    })
    if (data.tags) {
      for (const tag_id of data.tags) {
        await modelService.update("Tag", tag_id, {
          $inc: { articles_count: 1 }
        })
      }
    }
    ctx.status = 201
    ctx.body = article
  }

  async update(ctx) {
    const { article_id } = ctx.params
    const data = ctx.request.body
    const article = await modelService.update(
      "Article",
      article_id,
      data
    )
    if (data.tags) {
      const oldTagIds = article.tags.map(oId =>
        oId.toString()
      )
      const newAddTagIds = data.tags.filter(
        tag => !oldTagIds.includes(tag)
      )
      const oldDelTagIds = oldTagIds.filter(
        tag => !data.tags.includes(tag)
      )
      for (let tag_id of oldDelTagIds) {
        await modelService.update("Tag", tag_id, {
          $inc: { articles_count: -1 }
        })
      }
      for (let tag_id of newAddTagIds) {
        await modelService.update("Tag", tag_id, {
          $inc: { articles_count: 1 }
        })
      }
    }
    ctx.body = article
  }

  async del(ctx) {
    const { article_id } = ctx.params
    await modelService.del("Article", article_id)
    ctx.status = 204
  }

  /**
   * ---------------------------------------------
   */

  // 获取某个用户的所有文章
  async getArticlesByUserId(ctx) {
    const { user_id } = ctx.params
    ctx.body = await modelService.find("Article", {
      filterQuery: {
        author: user_id
      },
      populate: "author tags",
      sort: { updated_at: -1 }
    })
  }

  /**
   * 根据ctx.query.date 获取最近一段时间的带分页的文章
   */

  async getLatestArticles(ctx) {
    let { date = 7, page = 1, per_page = 10 } = ctx.query
    date = parseInt(date) || 7
    page = Math.max(page * 1 || 1, 1) - 1 // 0为第一页
    per_page = Math.max(per_page * 1 || 1, 1)
    const now = new Date()
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - date
    )

    const queryOptions = {
      filterQuery: {
        created_at: { $gt: start }
      },
      populate: "author tags",
      sort: {
        created_at: -1,
        thumb_count: -1
      },
      skip: page * per_page,
      limit: per_page
    }

    const count = await modelService.countDocuments(
      "Article",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "Article",
      queryOptions
    )

    ctx.body = {
      count,
      currentPage: page + 1,
      pageSize: per_page,
      data
    }
  }

  /**
   * 根据ctx.query.date 获取最近一段时间的某个标签下的带分页的文章
   */

  async getLatestArticlesByTagId(ctx) {
    const { tag_id } = ctx.params
    let { date = 7, page = 1, per_page = 10 } = ctx.query
    date = parseInt(date) || 7
    page = Math.max(page * 1 || 1, 1) - 1 // 0为第一页
    per_page = Math.max(per_page * 1 || 1, 1)
    const now = new Date()
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - date
    )

    const queryOptions = {
      filterQuery: {
        tags: {
          $in: [tag_id]
        },
        created_at: { $gt: start }
      },
      populate: "author tags",
      sort: { thumb_count: -1 },
      skip: page * per_page,
      limit: per_page
    }

    const count = await modelService.countDocuments(
      "Article",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "Article",
      queryOptions
    )

    ctx.body = {
      count,
      currentPage: page + 1,
      pageSize: per_page,
      data
    }
  }
}

module.exports = new ArticleController()
