import http from "@/libs/http";

/**
 * 获取文章列表
 */

export const fetchArticleList = (params) => {
  return http.get({
    url: "/articles",
    params,
  });
};

/**
 * 获取某个文章
 */

export const fetchArticleById = (id) => {
  return http.get({
    url: `/articles/${id}`,
  });
};

/**
 * 创建文章
 */

export const createArticle = (data) => {
  return http.post({
    url: "/articles",
    data,
  });
};

/**
 * 更新文章
 */

export const updateArticle = (id, data) => {
  return http.patch({
    url: `/articles/${id}`,
    data,
  });
};

/**
 * 删除文章
 */

export const deleteArticle = (id) => {
  return http.delete({
    url: `/articles/${id}`,
  });
};
