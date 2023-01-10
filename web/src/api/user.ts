import http from "@/libs/http";
import {
  ILoginData,
  ILoginResponse,
  IRegisterData,
  IUploadResponse,
  IUser,
  IUserProfile,
  IUserResetPwd,
  IUserUpdateData,
} from "@/typings";
import { AxiosPromise } from "axios";

/**
 * 登录
 *
 * @param data
 * @returns
 */
export const login = (data: ILoginData): AxiosPromise<ILoginResponse> => {
  return http.post({
    url: "/login",
    data,
  });
};

/**
 * 注册
 *
 * @param data
 * @returns
 */

export const register = (data: IRegisterData): AxiosPromise<void> => {
  return http.post({
    url: "/register",
    data,
  });
};

export const uploadImg = (data: FormData): AxiosPromise<IUploadResponse> => {
  return http.post({
    url: "/upload",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 获取当前登录用户
 */

export const fetchCurrentUser = (): AxiosPromise<IUser> => {
  return http.get({
    url: "/user",
  });
};

/**
 * 获取用户所有信息
 */

export const fetchUserProfile = (id: string): AxiosPromise<IUserProfile> => {
  return http.get({
    url: `/users/${id}/profile`,
  });
};

/**
 * 更新用户信息
 */

export const updateUser = (data: IUserUpdateData): AxiosPromise<IUser> => {
  return http.patch({
    url: "/user",
    data,
  });
};

/**
 * 重置密码
 */

export const resetPwd = (data: IUserResetPwd): AxiosPromise<void> => {
  return http.patch({
    url: "/user/reset/password",
    data,
  });
};

/**
 * 登录用户 点赞/取赞 文章
 */

export const starArticle = (id: string): AxiosPromise<void> => {
  return http.patch({
    url: `/user/starred/articles/${id}`,
  });
};

export const unStarArticle = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/starred/articles/${id}`,
  });
};

/**
 * 登录用户 关注/取关 用户
 */

export const followUser = (id: string): AxiosPromise<void> => {
  return http.patch({
    url: `/user/following/${id}`,
  });
};

export const unFollowUser = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/following/${id}`,
  });
};

export const fetchUserFollowing = (): AxiosPromise<IUser[]> => {
  return http.get({
    url: "/user/following",
  });
};

export const fetchUserFollowers = (): AxiosPromise<IUser[]> => {
  return http.get({
    url: "/user/followers",
  });
};
