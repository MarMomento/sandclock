/**
 * 模型数据接口
 */

export interface IUser {
  _id: string;
  name: string;
  nickName: string;
  email: string;
  avatar_url: string;
  description: string;
  following_tags: string[];
  starred_articles: string[];
  collected_articles: string[];
  following: string[];
  followers: string[];
  articles: string[];
  starred_comments: string[];
  following_count: number;
  followers_count: number;
  created_at: string;
}

export interface ITag {
  _id: string;
  name: string;
  description: string;
  avatar_url: string;
  followers_count: number;
  articles_count: number;
}

export interface IArticle {
  _id: string;
  title: string;
  content: string;
  author: IUser;
  avatar_url: string;
  thumb_count: number;
  collected_count: number;
  tags: ITag[];
  created_at: string;
  updated_at: string;
}

export interface IComment {
  _id: string;
  content: string;
  commentator: IUser;
  thumb_count: number;
  reply_to: null | IComment;
  root_comment_id: null | string;
  article_id: string | IArticle;
  created_at: string;
  updated_at: string;
  children?: IComment[];
}
