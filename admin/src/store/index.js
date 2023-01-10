import Vue from "vue";
import Vuex from "vuex";
import {
  TOGGLE_DRAWER,
  LOGIN,
  LOGOUT,
  FETCH_CURRENT_USER,
  LOGIN_AND_FETCH_CURRENT_USER,
  FETCH_USER_LIST,
  DELETE_USER,
  CREATE_USER,
  FETCH_TAG_LIST,
  FETCH_ARTICLE_LIST,
  FETCH_COMMENT_LIST,
} from "./actionTypes";
import {
  login,
  fetchCurrentUser,
  fetchUserList,
  deleteUser,
  createUser,
  fetchTagList,
  fetchArticleList,
  fetchCommentList,
} from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    token: localStorage.getItem("token") || "",
    user: {
      isLogin: false,
    },
    userList: [],
    tagList: [],
    articleList: [],
    commentList: [],
  },
  getters: {},
  mutations: {
    /**
     * 更改侧边栏状态
     */

    [TOGGLE_DRAWER](state) {
      state.drawer = !state.drawer;
    },

    /**
     * 登录,获取授权用户,退出登录
     */

    [LOGIN](state, data) {
      const { token } = data;
      state.token = token;
      localStorage.setItem("token", token);
    },

    [FETCH_CURRENT_USER](state, data) {
      state.user = { isLogin: true, ...data };
    },

    [LOGOUT](state) {
      state.user = { isLogin: false };
      state.token = "";
      localStorage.removeItem("token");
    },

    /**
     * 用户列表,分页
     */

    [FETCH_USER_LIST](state, data) {
      state.userList = data.data;
    },

    [DELETE_USER](state, id) {
      state.userList = state.userList.filter((user) => user._id !== id);
    },

    [CREATE_USER](state, data) {
      state.userList = state.userList.concat(data);
    },

    /**
     * 标签列表,分页
     */

    [FETCH_TAG_LIST](state, data) {
      state.tagList = data.data;
    },

    [FETCH_ARTICLE_LIST](state, data) {
      state.articleList = data.data;
    },

    [FETCH_COMMENT_LIST](state, data) {
      state.commentList = data.data;
    },
  },
  actions: {
    /**
     * 登录,获取授权用户
     */

    async [LOGIN]({ commit }, loginData) {
      const { data } = await login(loginData);
      commit(LOGIN, data);
    },

    async [FETCH_CURRENT_USER]({ commit }) {
      const { data } = await fetchCurrentUser();
      commit(FETCH_CURRENT_USER, data);
    },

    async [LOGIN_AND_FETCH_CURRENT_USER]({ dispatch }, loginData) {
      await dispatch(LOGIN, loginData);
      await dispatch(FETCH_CURRENT_USER);
    },

    /**
     * 用户列表,分页
     */

    async [FETCH_USER_LIST]({ commit }, params) {
      const { data } = await fetchUserList(params);
      commit(FETCH_USER_LIST, data);
    },

    async [DELETE_USER]({ commit }, id) {
      await deleteUser(id);
      commit(DELETE_USER, id);
    },

    async [CREATE_USER]({ commit }, userData) {
      const { data } = await createUser(userData);
      commit(CREATE_USER, data);
    },

    /**
     * 标签列表,分页
     */

    async [FETCH_TAG_LIST]({ commit }, params) {
      const { data } = await fetchTagList(params);
      commit(FETCH_TAG_LIST, data);
    },

    async [FETCH_ARTICLE_LIST]({ commit }, params) {
      const { data } = await fetchArticleList(params);
      commit(FETCH_ARTICLE_LIST, data);
    },

    async [FETCH_COMMENT_LIST]({ commit }, params) {
      const { data } = await fetchCommentList(params);
      commit(FETCH_COMMENT_LIST, data);
    },
  },
});
