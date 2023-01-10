import http from "@/libs/http";

/**
 * 获取标签列表
 */

export const fetchTagList = (params) => {
  return http.get({
    url: "/tags",
    params,
  });
};

/**
 * 创建标签
 */

export const createTag = (data) => {
  return http.post({
    url: "/tags",
    data,
  });
};

/**
 * 更新标签
 */

export const updateTag = (id, data) => {
  return http.patch({
    url: `/tags/${id}`,
    data,
  });
};

/**
 * 删除标签
 */

export const deleteTag = (id) => {
  return http.delete({
    url: `/tags/${id}`,
  });
};
