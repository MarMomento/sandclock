const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  SET_LOADING: "SET_LOADING",
  FETCH_CURRENT_USER: "FETCH_CURRENT_USER",
  LOGIN_AND_FETCH_CURRENT_USER: "LOGIN_AND_FETCH_CURRENT_USER",
  SET_SEARCH: "SET_SEARCH",

  // 标签
  FETCH_TAG_LIST: "fetchTagList",
  FETCH_TAG: "fetchTag",
  FOLLOW_TAG: "followTag",
  UN_FOLLOW_TAG: "unFollowTag",
  FETCH_HOME_ARTICLE_LIST: "fetchHomeArticleLIST",
  FETCH_TAG_ARTICLE_LIST: "fetchTagArticleList",
  FETCH_ARTICLE: "fetchArticle",
} as const;

export { actionTypes as ATS };
