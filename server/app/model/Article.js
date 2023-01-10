const { Schema, model } = require("mongoose")
const { ObjectId } = Schema.Types

const articleSchema = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: ObjectId, ref: "User", required: true },
    avatar_url: { type: String },
    tags: [{ type: ObjectId, ref: "Tag" }],
    thumb_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    collected_count: { type: Number, default: 0 },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updatedAt" // 数据变更时间
    }
  }
)

module.exports = model("Article", articleSchema)
