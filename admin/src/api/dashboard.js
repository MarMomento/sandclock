import http from "@/libs/http";

/**
 * 获取模型数据总量
 */

export const fetchModelStatistics = (params) => {
  return http.get({
    url: "/dashboard/statistics",
    params,
  });
};

/**
 * 获取受欢迎的标签
 * @param {*} params
 * @returns
 */

export const fetchPopularTags = (params) => {
  return http.get({
    url: "/dashboard/tags/popular",
    params,
  });
};
