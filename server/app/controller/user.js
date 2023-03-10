const { STATUS } = require("../config/constants")
const bcryptjs = require("bcryptjs")
const modelService = require("../service/index")
const { v4: uuidv4 } = require("uuid")

class UserController {
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
      "User",
      queryOptions.filterQuery
    )
    const data = await modelService.find(
      "User",
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
    const { user_id } = ctx.params
    ctx.body = await modelService.findById(
      "User",
      user_id,
      {
        populate: "following_tags"
      }
    )
  }

  async create(ctx) {
    ctx.verifyParams({
      name: "string",
      password: "string",
      email: {
        type: "email",
        required: false,
        allowEmpty: true
      },
      nickName: "string?"
    })

    const data = ctx.request.body

    const hasUser = await modelService.findOne("User", {
      filterQuery: { name: data.name }
    })
    ctx.assert(!hasUser, 409, STATUS.CONFLICT_USER_EXIST)

    if (data.nickName) {
      const hasNickName = await modelService.findOne(
        "User",
        {
          filterQuery: { nickName: data.nickName }
        }
      )
      ctx.assert(
        !hasNickName,
        409,
        STATUS.CONFLICT_USER_NICKNAME_EXIST
      )
    } else {
      const id = uuidv4().split("-")
      data.nickName = data.name + id[1] + id[2]
    }

    const user = await modelService.create("User", data)
    if (data.following_tags) {
      for (let tag_id of data.following_tags) {
        await modelService.update("Tag", tag_id, {
          $inc: { followers_count: 1 }
        })
      }
    }
    ctx.status = 201
    ctx.body = user
  }

  async update(ctx) {
    const { user_id } = ctx.params
    const data = ctx.request.body
    const user = await modelService.update(
      "User",
      user_id,
      data
    )
    if (data.following_tags) {
      const oldTagIds = user.following_tags.map(oId =>
        oId.toString()
      )
      const newAddTagIds = data.following_tags.filter(
        tag => !oldTagIds.includes(tag)
      )
      const oldDelTagIds = oldTagIds.filter(
        tag => !data.following_tags.includes(tag)
      )
      for (let tag_id of oldDelTagIds) {
        await modelService.update("Tag", tag_id, {
          $inc: { followers_count: -1 }
        })
      }
      for (let tag_id of newAddTagIds) {
        await modelService.update("Tag", tag_id, {
          $inc: { followers_count: 1 }
        })
      }
    }
    ctx.body = user
  }

  async del(ctx) {
    const { user_id } = ctx.params
    await modelService.del("User", user_id)
    ctx.status = 204
  }

  /**
   * --------------------------------------------
   */

  /**
   * ???????????????????????????
   *
   * @param {*} ctx
   */

  async findProfileById(ctx) {
    const { user_id } = ctx.params
    const user = await modelService.findById(
      "User",
      user_id,
      {
        populate: {
          path: "articles",
          options: {
            sort: { updated_at: -1 },
            populate: "tags author"
          }
        },
        lean: true
      }
    )
    const commentList = await modelService.find("Comment", {
      filterQuery: {
        commentator: user_id
      },
      populate: "article_id",
      sort: {
        created_at: -1
      }
    })
    const commentCount = await modelService.countDocuments(
      "Comment",
      {
        commentator: user_id
      }
    )

    ctx.body = {
      user,
      commentList: commentList,
      commentCount: commentCount,
      articleList: user.articles,
      articleCount: user.articles.length
    }
  }

  /**
   * ??????????????????
   */

  async getAuthUser(ctx) {
    const { _id } = ctx.state.user
    ctx.body = await modelService.findById("User", _id)
  }

  /**
   * ??????????????????
   * @param {*} ctx
   */

  async updateAuthUser(ctx) {
    ctx.verifyParams({
      name: "string",
      email: "string",
      description: {
        type: "string",
        required: true,
        allowEmpty: true
      },
      avatar_url: {
        type: "string",
        required: true,
        allowEmpty: true
      }
    })

    const { _id } = ctx.state.user
    const data = ctx.request.body
    ctx.body = await modelService.update("User", _id, data)
  }

  /**
   * ????????????????????????
   * @param {*} ctx
   */

  async resetAuthUserPassword(ctx) {
    ctx.verifyParams({
      newPassword: "string",
      oldPassword: "string",
      againPassword: "string"
    })

    const { _id } = ctx.state.user
    const { oldPassword, newPassword, againPassword } =
      ctx.request.body
    ctx.assert(
      newPassword === againPassword,
      422,
      STATUS.ERROR_DIFF_TWO_PWD
    )

    const user = await modelService.findById("User", _id, {
      select: "+password"
    })

    const isSame_old = bcryptjs.compareSync(
      oldPassword,
      user.password
    )
    ctx.assert(isSame_old, 422, STATUS.ERROR_PWD)

    const isSame_new = bcryptjs.compareSync(
      newPassword,
      user.password
    )

    ctx.assert(!isSame_new, 422, STATUS.ERROR_SAME_PASSWORD)

    await modelService.update("User", _id, {
      password: newPassword
    })
    ctx.status = 204
  }

  // ????????????????????????#
  async resetPassword(ctx) {
    ctx.verifyParams({
      newPassword: "string",
      againPassword: "string"
    })

    const { user_id } = ctx.params
    const { newPassword, againPassword } = ctx.request.body
    ctx.assert(
      newPassword === againPassword,
      422,
      STATUS.ERROR_DIFF_TWO_PWD
    )

    await modelService.update("User", user_id, {
      password: newPassword
    })
    ctx.status = 204
  }

  /**
   * ?????????????????????????????????
   */

  async listAuthUserStarredComments(ctx) {
    const { _id } = ctx.state.user

    const user = await modelService.findById("User", _id, {
      populate: "starred_comments"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.starred_comments
  }

  /**
   * ????????????????????????
   */

  async starComment(ctx) {
    const { _id } = ctx.state.user
    const { comment_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheComment = user.starred_comments
      .map(oId => oId.toString())
      .includes(comment_id)

    if (!hasTheComment) {
      await modelService.update("User", _id, {
        $push: { starred_comments: comment_id }
      })
      await modelService.update("Comment", comment_id, {
        $inc: { thumb_count: 1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ??????????????????????????????
   */

  async unStarComment(ctx) {
    const { _id } = ctx.state.user
    const { comment_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheComment = user.starred_comments
      .map(oId => oId.toString())
      .includes(comment_id)

    if (hasTheComment) {
      await modelService.update("User", _id, {
        $pull: { starred_comments: comment_id }
      })
      await modelService.update("Comment", comment_id, {
        $inc: { thumb_count: -1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ?????????????????????????????????
   */

  async listAuthUserFollowing(ctx) {
    const { _id } = ctx.state.user
    const user = await modelService.findById("User", _id, {
      populate: "following"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.following
  }

  /**
   * ?????????????????????????????????
   */

  async listAuthUserFollowers(ctx) {
    const { _id } = ctx.state.user
    const user = await modelService.findById("User", _id, {
      populate: "followers"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.followers
  }

  /**
   * ??????????????????????????????
   */

  async followUser(ctx) {
    const { _id } = ctx.state.user
    const { user_id } = ctx.params

    if (_id === user_id) {
      ctx.status = 304
    }

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheUser = user.following
      .map(oId => oId.toString())
      .includes(user_id)

    if (!hasTheUser) {
      await modelService.update("User", _id, {
        $push: { following: user_id },
        $inc: { following_count: 1 }
      })
      await modelService.update("User", user_id, {
        $push: { followers: _id },
        $inc: { followers_count: 1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ????????????????????????????????????
   */

  async unFollowUser(ctx) {
    const { _id } = ctx.state.user
    const { user_id } = ctx.params

    if (_id === user_id) {
      ctx.status = 304
    }

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheUser = user.following
      .map(oId => oId.toString())
      .includes(user_id)

    if (hasTheUser) {
      await modelService.update("User", _id, {
        $pull: { following: user_id },
        $inc: { following_count: -1 }
      })
      await modelService.update("User", user_id, {
        $pull: { followers: _id },
        $inc: { followers_count: -1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ?????????????????????????????????
   */

  async listAuthUserStarredArticles(ctx) {
    const { _id } = ctx.state.user

    const user = await modelService.findById("User", _id, {
      populate: "starred_articles"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.starred_articles
  }

  /**
   * ????????????????????????
   */
  async starArticle(ctx) {
    const { _id } = ctx.state.user
    const { article_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheArticle = user.starred_articles
      .map(oId => oId.toString())
      .includes(article_id)

    if (!hasTheArticle) {
      await modelService.update("User", _id, {
        $push: { starred_articles: article_id }
      })
      await modelService.update("Article", article_id, {
        $inc: { thumb_count: 1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ??????????????????????????????
   */

  async unStarArticle(ctx) {
    const { _id } = ctx.state.user
    const { article_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheArticle = user.starred_articles
      .map(oId => oId.toString())
      .includes(article_id)

    if (hasTheArticle) {
      await modelService.update("User", _id, {
        $pull: { starred_articles: article_id }
      })
      await modelService.update("Article", article_id, {
        $inc: { thumb_count: -1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ???????????????????????????????????????
   */

  async listAuthUserCollectedArticles(ctx) {
    const { _id } = ctx.state.user

    const user = await modelService.findById("User", _id, {
      populate: {
        path: "collected_articles",
        options: {
          populate: "tags author"
        }
      }
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.collected_articles
  }

  /**
   * ????????????????????????
   */

  async collectArticle(ctx) {
    const { _id } = ctx.state.user
    const { article_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheArticle = user.collected_articles
      .map(oId => oId.toString())
      .includes(article_id)

    if (!hasTheArticle) {
      await modelService.update("User", _id, {
        $push: { collected_articles: article_id }
      })
      await modelService.update("Article", article_id, {
        $inc: { collected_count: 1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ??????????????????????????????
   */

  async unCollectArticle(ctx) {
    const { _id } = ctx.state.user
    const { article_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheArticle = user.collected_articles
      .map(oId => oId.toString())
      .includes(article_id)

    if (hasTheArticle) {
      await modelService.update("User", _id, {
        $pull: { collected_articles: article_id }
      })
      await modelService.update("Article", article_id, {
        $inc: { collected_count: -1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ???????????????????????????????????????
   */

  async listAuthUserTags(ctx) {
    const { _id } = ctx.state.user

    const user = await modelService.findById("User", _id, {
      populate: "following_tags"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    ctx.body = user.following_tags
  }

  /**
   * ??????????????????????????????
   */

  async followTag(ctx) {
    const { _id } = ctx.state.user
    const { tag_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheTag = user.following_tags
      .map(oId => oId.toString())
      .includes(tag_id)

    if (!hasTheTag) {
      await modelService.update("User", _id, {
        $push: { following_tags: tag_id }
      })
      await modelService.update("Tag", tag_id, {
        $inc: { followers_count: 1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ??????????????????????????????
   */

  async unFollowTag(ctx) {
    const { _id } = ctx.state.user
    const { tag_id } = ctx.params

    const user = await modelService.findById("User", _id)
    ctx.assert(user, 404, STATUS.NOT_FOUND_USER)

    const hasTheTag = user.following_tags
      .map(oId => oId.toString())
      .includes(tag_id)

    if (hasTheTag) {
      await modelService.update("User", _id, {
        $pull: { following_tags: tag_id }
      })
      await modelService.update("Tag", tag_id, {
        $inc: { followers_count: -1 }
      })
      ctx.status = 204
    } else {
      ctx.status = 304
    }
  }

  /**
   * ???????????????????????????????????????
   */

  async listAuthUserArticles(ctx) {
    const { _id } = ctx.state.user
    const user = await modelService.findById("User", _id, {
      populate: "articles"
    })
    ctx.assert(user, 404, STATUS.NOT_FOUND_ARTICLE)

    ctx.body = user.articles
  }

  /**
   * ????????????????????????
   */

  async createAuthUserArticle(ctx) {
    ctx.verifyParams({
      title: "string",
      content: "string",
      tags: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 4,
        required: true
      },
      avatar_url: {
        type: "string",
        required: true,
        allowEmpty: true
      }
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
    for (const tag_id of data.tags) {
      await modelService.update("Tag", tag_id, {
        $inc: { articles_count: 1 }
      })
    }

    ctx.body = article
  }

  /**
   * ????????????????????????
   */

  async updateAuthUserArticle(ctx) {
    ctx.verifyParams({
      title: "string",
      content: "string",
      tags: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 4,
        required: true
      },
      avatar_url: {
        type: "string",
        required: true,
        allowEmpty: true
      }
    })

    const { article_id } = ctx.params
    const data = ctx.request.body
    const article = await modelService.update(
      "Article",
      article_id,
      data
    )

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
    ctx.body = article
  }

  /**
   * ????????????????????????
   */

  async delAuthUserArticle(ctx) {
    const { _id } = ctx.state.user
    const { article_id } = ctx.params

    const article = await modelService.del(
      "Article",
      article_id
    )
    await modelService.update("User", _id, {
      $pull: { articles: article_id }
    })
    const oldTagIds = article.tags.map(oId =>
      oId.toString()
    )
    for (const tag_id of oldTagIds) {
      await modelService.update("Tag", tag_id, {
        $inc: { articles_count: -1 }
      })
    }
    ctx.status = 204
  }
}

module.exports = new UserController()
