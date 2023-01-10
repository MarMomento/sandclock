import { IArticle } from "@/typings";
import { IComment } from "@/typings";
import { IUser } from "@/typings";
/**
 * api接口对应的参数类型和返回类型
 */

/**
 * 登录
 */

export interface ILoginData {
  name: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

/**
 * 注册
 */

export interface IRegisterData {
  name: string;
  password: string;
}

/**
 * 更新数据
 */

export interface IUserUpdateData {
  nickName: string;
  name: string;
  email: string;
  description: string;
  avatar_url: string;
}

/**
 * 重置密码
 */

export interface IUserResetPwd {
  oldPassword: string;
  newPassword: string;
  againPassword: string;
}

/**
 * 文章查询参数
 */

export interface IArticleParams {
  page: number;
  per_page: number;
  date: number;
}

/**
 * 分页查询结果
 */

export interface IDataWithPagination<T> {
  count: number;
  currentPage: number;
  pageSize: number;
  data: T;
}

/**
 * 上传图片
 */

export interface IUploadResponse {
  url: string;
}

/**
 * 文章数据
 */

export interface IArticleData {
  title: string;
  content: string;
  tags: string[];
  avatar_url: string;
}

/**
 * 评论数据
 */

export interface ICommentData {
  content: string;
}

/**
 * 用户所有数据
 */

export interface IUserProfile {
  user: IUser;
  commentList: IComment[];
  commentCount: number;
  articleList: IArticle[];
  articleCount: number;
}

/**
 * 搜索参数
 */

export interface ISearchParams {
  q: string;
  page?: number;
  per_page?: number;
}
