import http from "@/libs/http";

/**
 * 登录
 */

export const login = (data) => {
  return http.post({
    url: "/login",
    data,
  });
};

/**
 * 获取授权用户
 */

export const fetchCurrentUser = () => {
  return http.get({
    url: "/user",
  });
};

/**
 * 获取带分页的用户列表
 */

export const fetchUserList = (params) => {
  return http.get({
    url: "/users",
    params,
  });
};

/**
 * 获取某个用户
 */

export const fetchUserById = (id) => {
  return http.get({
    url: `/users/${id}`,
  });
};

/**
 * 创建用户
 */

export const createUser = (data) => {
  return http.post({
    url: "/users",
    data,
  });
};

/**
 * 更新用户
 */

export const updateUser = (id, data) => {
  return http.patch({
    url: `/users/${id}`,
    data,
  });
};

/**
 * 删除用户
 */

export const deleteUser = (id) => {
  return http.delete({
    url: `/users/${id}`,
  });
};

/**
 * 上传图片
 */

export const uploadImage = (data) => {
  return http.post({
    url: "/upload",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 重置密码
 */

export const resetPassword = (id, data) => {
  return http.patch({
    url: `/users/${id}/reset/password`,
    data,
  });
};
