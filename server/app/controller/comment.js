const modelService = require("../service/index")

class CommentController {
  /**
   * CRUD#
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
        content: qReg
      },
      populate: "commentator article_id reply_to",
      skip: (page - 1) * per_page,
      limit: per_page
    }

    const count = await modelService.countDocuments(
      "Comment",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "Comment",
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
    const { comment_id } = ctx.params
    ctx.body = await modelService.findById(
      "Comment",
      comment_id,
      {
        populate: "commentator reply_to"
      }
    )
  }

  async create(ctx) {
    ctx.verifyParams({
      content: "string",
      article_id: "string"
    })

    const { _id } = ctx.state.user
    const data = ctx.request.body
    const comment = await modelService.create("Comment", {
      ...data,
      commentator: _id
    })
    ctx.status = 201
    ctx.body = comment
  }

  async update(ctx) {
    ctx.verifyParams({
      content: "string"
    })

    const { comment_id } = ctx.params
    const data = ctx.request.body
    ctx.body = await modelService.update(
      "Comment",
      comment_id,
      data
    )
  }

  async del(ctx) {
    const { comment_id } = ctx.params
    await modelService.del("Comment", comment_id)
    ctx.status = 204
  }

  /**
   * -------------------------------
   */

  /**
   * 获取某个文章的所有评论
   */

  async getCommentsByArticleId(ctx) {
    const { article_id } = ctx.params
    ctx.body = await modelService.find("Comment", {
      filterQuery: {
        article_id
      },
      populate: "commentator reply_to",
      sort: { created_at: -1 }
    })
  }

  // 获取授权用户的所有评论
  async getAuthUserComments(ctx) {
    const { _id } = ctx.state.user
    ctx.body = await modelService.find("Comment", {
      filterQuery: {
        commentator: _id
      }
    })
  }

  // 授权用户创建评论 or 评论的评论
  async createAuthUserComment(ctx) {
    ctx.verifyParams({
      content: "string"
    })

    const { _id } = ctx.state.user
    const { article_id, comment_id = "" } = ctx.params
    const data = ctx.request.body
    let payload = {
      ...data,
      commentator: _id,
      article_id
    }
    if (comment_id) {
      const replyComment = await modelService.findById(
        "Comment",
        comment_id
      )
      payload.reply_to = comment_id
      payload.root_comment_id =
        replyComment.root_comment_id || comment_id
    }

    const comment = await modelService.create(
      "Comment",
      payload
    )
    await modelService.update("Article", article_id, {
      $inc: { comment_count: 1 }
    })
    ctx.body = comment
  }

  // 授权用户删除某个评论
  async delAuthUserComment(ctx) {
    const { comment_id } = ctx.params
    await modelService.del("Comment", comment_id)
    ctx.status = 204
  }
}

module.exports = new CommentController()
