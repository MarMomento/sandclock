const { Schema, model } = require("mongoose")
const { ObjectId } = Schema.Types

const commentSchema = new Schema(
  {
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    commentator: { type: ObjectId, ref: "User", required: true },
    article_id: { type: ObjectId, ref: "Article", required: true },
    reply_to: { type: ObjectId, ref: "Comment", default: null },
    root_comment_id: { type: String, default: "" },
    thumb_count: { type: Number, default: 0 },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updatedAt" // 数据变更时间
    }
  }
)

module.exports = model("Comment", commentSchema)
