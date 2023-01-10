const modelService = require("../service/index")

class TagController {
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
        name: qReg
      },
      skip: (page - 1) * per_page,
      limit: per_page
    }

    const count = await modelService.countDocuments(
      "Tag",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "Tag",
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
    const { tag_id } = ctx.params
    ctx.body = await modelService.findById("Tag", tag_id)
  }

  async create(ctx) {
    ctx.verifyParams({
      name: "string",
      description: "string?",
      avatar_url: "string?"
    })

    const data = ctx.request.body
    const tag = await modelService.create("Tag", data)
    ctx.status = 201
    ctx.body = tag
  }

  async update(ctx) {
    ctx.verifyParams({
      name: "string?",
      description: "string?",
      avatar_url: "string?"
    })

    const { tag_id } = ctx.params
    const data = ctx.request.body
    ctx.body = await modelService.update(
      "Tag",
      tag_id,
      data
    )
  }

  async del(ctx) {
    const { tag_id } = ctx.params
    await modelService.del("Tag", tag_id)
    ctx.status = 204
  }

  // ---------------------------------------

  /**
   * 获取受欢迎的标签
   */

  async findPopularTags(ctx) {
    ctx.body = await modelService.find("Tag", {
      sort: {
        followers_count: -1,
        articles_count: -1
      }
    })
  }
}

module.exports = new TagController()
