import {
  IArticle,
  IComment,
  IDataWithPagination,
  ISearchParams,
  ITag,
  IUser,
} from "@/typings";
import { AxiosPromise } from "axios";
import http from "@/libs/http";

/**
 * 搜索用户
 */

export const fetchSearchedUsers = (
  params: ISearchParams
): AxiosPromise<IDataWithPagination<IUser[]>> => {
  return http.get({
    url: "/search/users",
    params,
  });
};

/**
 * 搜索标签
 */

export const fetchSearchedTags = (
  params: ISearchParams
): AxiosPromise<IDataWithPagination<ITag[]>> => {
  return http.get({
    url: "/search/tags",
    params,
  });
};

/**
 * 搜索文章
 */

export const fetchSearchedArticles = (
  params: ISearchParams
): AxiosPromise<IDataWithPagination<IArticle[]>> => {
  return http.get({
    url: "/search/articles",
    params,
  });
};

/**
 * 搜索评论
 */

export const fetchSearchedComments = (
  params: ISearchParams
): AxiosPromise<IDataWithPagination<IComment[]>> => {
  return http.get({
    url: "/search/comments",
    params,
  });
};
