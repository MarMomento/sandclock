exports.STATUS = {
  // 权限 401, 403
  UN_AUTHORIZATION: "没有授权,请先登录",
  FORBIDDEN: "权限不够",

  // 错误的参数 400, 422
  ERROR_ID: "错误的id",
  ERROR_PWD: "密码错误",
  ERROR_USER_INFO: "用户信息不正确",
  ERROR_SAME_PASSWORD: "原密码与新密码不能相同",
  ERROR_DIFF_TWO_PWD: "两次输入密码不一致",
  ERROR_UPLOAD_RESOURCE: "上传的资源不正确",

  // 资源不存 404
  NOT_FOUND_USER: "用户不存在",
  NOT_FOUND_TAG: "标签不存在",
  NOT_FOUND_ARTICLE: "文章不存在",
  NOT_FOUND_COMMENT: "评论不存在",

  // 冲突 409
  CONFLICT_USER_EXIST: "用户已存在",
  CONFLICT_USER_NICKNAME_EXIST: "用户昵称已存在"
}

exports.AUTH = {
  TYPE: {
    USER: "User",
    ADMIN: "Admin",
    SUER_ADMIN: "SuperAdmin"
  },
  LEVEL: {
    USER: 8,
    ADMIN: 16,
    SUPER_ADMIN: 32
  }
}
