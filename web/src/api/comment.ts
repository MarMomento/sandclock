import { AxiosPromise } from "axios";
import http from "@/libs/http";
import { IComment, ICommentData } from "@/typings";

/**
 * 获取某个文章的所有评论
 */

export const fetchCommentsByArticleId = (
  id: string
): AxiosPromise<IComment[]> => {
  return http.get({
    url: `/articles/${id}/comments`,
  });
};

/**
 * 用户 点赞/取赞 评论
 */

export const starComment = (id: string): AxiosPromise<void> => {
  return http.patch({
    url: `/user/starred/comments/${id}`,
  });
};

export const unStarComment = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/starred/comments/${id}`,
  });
};

/**
 * 用户 创建 文章评论，回复评论
 */

export const createArticleComment = (
  id: string,
  data: ICommentData
): AxiosPromise<IComment> => {
  return http.post({
    url: `/user/articles/${id}/comments`,
    data,
  });
};

export const replyComment = (
  article_id: string,
  comment_id: string,
  data: ICommentData
): AxiosPromise<IComment> => {
  return http.post({
    url: `/user/articles/${article_id}/comments/${comment_id}`,
    data,
  });
};
