import { IState } from "@/typings";

export default <IState>{
  token: localStorage.getItem("token") || "",
  isLoading: false,
  user: {
    isLogin: false,
    info: null,
  },
  search: "",
  // tagList: { data: {}, count: 0, currentPage: 0, pageSize: 0 },
  // homeArticleList: { data: {}, count: 0, currentPage: 0 },
  // tagArticleList: { data: {}, count: 0, currentPage: 0 },
  // articleCommentList: { data: {}, count: 0, currentPage: 0 },
};
