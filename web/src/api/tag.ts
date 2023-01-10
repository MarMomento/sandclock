import { ITag } from "@/typings";
import { AxiosPromise } from "axios";
import http from "@/libs/http";

/**
 * 获取受欢迎的标签
 */

export const fetchPopularTags = (): AxiosPromise<ITag[]> => {
  return http.get({
    url: "/tags/popular",
  });
};

/**
 * 获取某个标签
 */

export const fetchTag = (id: string): AxiosPromise<ITag> => {
  return http.get({
    url: `/tags/${id}`,
  });
};

/**
 * 登录用户 查询/关注/取关 标签
 */

export const followTag = (id: string): AxiosPromise<void> => {
  return http.patch({
    url: `/user/tags/${id}`,
  });
};

export const unFollowTag = (id: string): AxiosPromise<void> => {
  return http.delete({
    url: `/user/tags/${id}`,
  });
};

export const fetchFollowingTags = (): AxiosPromise<ITag[]> => {
  return http.get({
    url: "/user/tags",
  });
};
