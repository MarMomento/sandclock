import { AxiosPromise } from "axios";
import http from "@/libs/http";
import {
  IArticle,
  IArticleData,
  IArticleParams,
  IDataWithPagination,
} from "@/typings";

/**
 * 获取最新一段时间的文章
 */

export const fetchLatestArticles = (
  params: IArticleParams
): AxiosPromise<IDataWithPagination<IArticle[]>> => {
  return http.get({
    url: "/articles/latest",
    params,
  });
};

/**
 * 获取某一个文章
 */

export const fetchArticle = (id: string): AxiosPromise<IArticle> => {
  return http.get({
    url: `/articles/${id}`,
  });
};

/**
 * 获取某个标签下最新一段时间的文章
 */

export const fetchLatestArticlesByTagId = (
  id: string,
  params: IArticleParams
): AxiosPromise<IDataWithPagination<IArticle[]>> => {
  return http.get({
    url: `/tags/${id}/articles/latest`,
    params,
  });
};

/**
 * 登录用户CRUD文章
 */

export const fetchArticles = (): AxiosPromise<IArticle[]> => {
  return http.get({
    url: "/user/articles",
  });
};

export const createArticle = (data: IArticleData): AxiosPromise<IArticle> => {
  return http.post({
    url: "/user/articles",
    data,
  });
};

export const updateArticle = (
  id: string,
  data: IArticleData
): AxiosPromise<IArticle> => {
  return http.patch({
    url: `/user/articles/${id}`,
    data,
  });
};

export const deleteArticle = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/articles/${id}`,
  });
};

/**
 * 登录用户 收藏/取收 文章
 */

export const collectArticle = (id: string): AxiosPromise<void> => {
  return http.patch({
    url: `/user/collected/articles/${id}`,
  });
};

export const unCollectArticle = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/collected/articles/${id}`,
  });
};

export const fetchCollectedArticles = (): AxiosPromise<IArticle[]> => {
  return http.get({
    url: "/user/collected/articles",
  });
};
