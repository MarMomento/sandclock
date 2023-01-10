const { Schema, model } = require("mongoose")
const { ObjectId } = Schema.Types
const bcryptjs = require("bcryptjs")

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: {
      type: String,
      set(val) {
        return bcryptjs.hashSync(val, 10)
      },
      required: true,
      select: false
    },
    nickName: { type: String },
    email: { type: String },
    avatar_url: { type: String },
    description: { type: String },
    following_tags: [{ type: ObjectId, ref: "Tag" }],
    articles: [{ type: ObjectId, ref: "Article" }],
    starred_articles: [{ type: ObjectId, ref: "Article" }],
    collected_articles: [{ type: ObjectId, ref: "Article" }],
    starred_comments: [{ type: ObjectId, ref: "Comment" }],
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    following_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User"
    },
    site_admin: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updatedAt" // 数据变更时间
    }
  }
)

module.exports = model("User", userSchema)
