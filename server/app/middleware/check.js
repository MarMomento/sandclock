const modelService = require("../service/index")
const { isValidObjectId } = require("mongoose")
const { STATUS } = require("../config/constants")

const checkUserExist = async (ctx, next) => {
  const { user_id } = ctx.params
  ctx.assert(isValidObjectId(user_id), 400, STATUS.ERROR_ID)
  const user = await modelService.findById("User", user_id)
  ctx.assert(user, 404, STATUS.NOT_FOUND_USER)
  await next()
}

const checkTagExist = async (ctx, next) => {
  const { tag_id } = ctx.params
  ctx.assert(isValidObjectId(tag_id), 400, STATUS.ERROR_ID)
  const tag = await modelService.findById("Tag", tag_id)
  ctx.assert(tag, 404, STATUS.NOT_FOUND_TAG)
  await next()
}

const checkArticleExist = async (ctx, next) => {
  const { article_id } = ctx.params
  ctx.assert(isValidObjectId(article_id), 400, STATUS.ERROR_ID)
  const article = await modelService.findById("Article", article_id)
  ctx.assert(article, 404, STATUS.NOT_FOUND_ARTICLE)
  await next()
}

const checkCommentExist = async (ctx, next) => {
  const { comment_id } = ctx.params
  ctx.assert(isValidObjectId(comment_id), 400, STATUS.ERROR_ID)
  const comment = await modelService.findById("Comment", comment_id)
  ctx.assert(comment, 404, STATUS.NOT_FOUND_COMMENT)
  await next()
}

// 检查user router的操作对象是否是自己
const checkObjectOfOperation = async (ctx, next) => {
  const { _id } = ctx.state.user
  const { id } = ctx.params
  ctx.assert(id === _id, 403, STATUS.FORBIDDEN)
  await next()
}

const checkArticleAuthor = async (ctx, next) => {
  const { _id } = ctx.state.user
  const { article_id } = ctx.params
  const article = await modelService.findById("Article", article_id)
  ctx.assert(article.author.toString() === _id, 403, STATUS.FORBIDDEN)
  await next()
}

const checkIsAdmin = async (ctx, next) => {
  const { _id } = ctx.state.user
  const user = await modelService.findById("User", _id)
  if (user.type === "User") {
    ctx.throw(403, STATUS.FORBIDDEN)
  } else if (user.type === "Admin") {
  }
  await next()
}

module.exports = {
  checkUserExist,
  checkTagExist,
  checkArticleExist,
  checkCommentExist,
  checkObjectOfOperation,
  checkArticleAuthor
}
