const { Schema, model } = require("mongoose")

const tagSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    avatar_url: { type: String },
    description: { type: String },
    followers_count: { type: Number, default: 0 },
    articles_count: { type: Number, default: 0 },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updatedAt" // 数据变更时间
    }
  }
)

module.exports = model("Tag", tagSchema)
