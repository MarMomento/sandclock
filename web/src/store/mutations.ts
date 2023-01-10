import { ILoginResponse, IState, IUser } from "@/typings";
import { MutationTree } from "vuex";
import { ATS } from "./actionTypes";

export default <MutationTree<IState>>{
  /**
   * 登录
   */

  [ATS.LOGIN](state, data: ILoginResponse) {
    const { token } = data;
    state.token = token;
    localStorage.setItem("token", token);
  },

  /**
   * 设置loading
   */

  [ATS.SET_LOADING](state, isLoading: boolean) {
    state.isLoading = isLoading;
  },

  /**
   * 获取当前登录用户
   */

  [ATS.FETCH_CURRENT_USER](state, data: IUser) {
    state.user = { isLogin: true, info: data };
  },

  /**
   * 退出登录
   */

  [ATS.LOGOUT](state) {
    state.user = { isLogin: false, info: null };
    state.token = "";
    localStorage.removeItem("token");
  },

  /**
   * 设置search
   */

  [ATS.SET_SEARCH](state, search: string) {
    state.search = search;
  },
};
