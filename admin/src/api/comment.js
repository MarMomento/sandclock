import http from "@/libs/http";

/**
 * 获取评论列表
 */

export const fetchCommentList = (params) => {
  return http.get({
    url: "/comments",
    params,
  });
};

/**
 * 更新评论
 */

export const updateComment = (id, data) => {
  return http.patch({
    url: `/comments/${id}`,
    data,
  });
};

/**
 * 删除评论
 */

export const deleteComment = (id) => {
  return http.delete({
    url: `/comments/${id}`,
  });
};
