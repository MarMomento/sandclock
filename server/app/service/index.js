const User = require("../model/User")
const Tag = require("../model/Tag")
const Article = require("../model/Article")
const Comment = require("../model/Comment")

const queryOptions = {
  filterQuery: {},
  populate: "",
  select: "",
  sort: "",
  limit: "",
  skip: "",
  lean: false
}

class ModelService {
  static Model = {
    User,
    Tag,
    Article,
    Comment
  }

  /**
   * 根据查询参数查询所有匹配的
   *
   * @param {String} modelName 模型名称
   * @param {Object} options 查询参数
   * @returns {Array}
   */

  async find(modelName, options = {}) {
    options = Object.assign({}, queryOptions, options)

    return await ModelService.Model[modelName]
      .find(options.filterQuery)
      .populate(options.populate)
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort)
      .lean(options.lean)
  }

  /**
   * 根据查询id,查询参数查询某一个
   *
   * @param {String} modelName 模型名称
   * @param {String} id 实例id
   * @param {Object} options 查询参数
   * @returns {Object}
   */

  async findById(modelName, id, options = {}) {
    options = Object.assign({}, queryOptions, options)

    return await ModelService.Model[modelName]
      .findById(id)
      .populate(options.populate)
      .select(options.select)
      .lean(options.lean)
  }

  /**
   * 创建一个模型实例
   *
   * @param {String} modelName 模型名称
   * @param {Object} data 实例数据
   * @returns {Object}
   */

  async create(modelName, data) {
    return await new ModelService.Model[modelName](data).save()
  }

  /**
   * 更新id实例的数据
   *
   * @param {String} modelName 模型名称
   * @param {String} id 实例id
   * @param {Object} data 实例数据
   * @returns {Object}
   */

  async update(modelName, id, data) {
    return await ModelService.Model[modelName].findByIdAndUpdate(
      id,
      data
    )
  }

  /**
   * 删除id实例
   *
   * @param {String} modelName 模型名称
   * @param {String} id 实例id
   * @returns {Object}
   */

  async del(modelName, id) {
    return await ModelService.Model[modelName].findByIdAndDelete(id)
  }

  /**
   * 根据查询参数查询所有匹配的
   *
   * @param {String} modelName 模型名称
   * @param {Object} options 查询参数
   * @returns {Array}
   */

  async findOne(modelName, options = {}) {
    options = Object.assign({}, queryOptions, options)

    return await ModelService.Model[modelName]
      .findOne(options.filterQuery)
      .select(options.select)
      .lean(options.lean)
  }

  /**
   * 根据过滤参数查询匹配到的数量
   *
   * @param {String} modelName 模型名称
   * @param {Object} filterQuery 过滤参数
   * @returns {Number}
   */

  async countDocuments(modelName, filterQuery = {}) {
    return await ModelService.Model[modelName].countDocuments(
      filterQuery
    )
  }

  /**
   * 查询文档数量
   *
   * @param {String} modelName 模型名称
   * @returns {Number}
   */

  async estimatedDocumentCount(modelName) {
    return await ModelService.Model[
      modelName
    ].estimatedDocumentCount()
  }
}

module.exports = new ModelService()
