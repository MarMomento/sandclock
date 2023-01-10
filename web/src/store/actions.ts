import { fetchCurrentUser, login } from "@/api";
import { ILoginData, IState } from "@/typings";
import { ActionTree } from "vuex";
import { ATS } from "./actionTypes";

export default <ActionTree<IState, IState>>{
  /**
   * 登录
   */

  async [ATS.LOGIN]({ commit }, loginData: ILoginData) {
    const { data } = await login(loginData);
    commit(ATS.LOGIN, data);
  },

  /**
   * 获取当前登录用户
   */

  async [ATS.FETCH_CURRENT_USER]({ commit }) {
    const { data } = await fetchCurrentUser();
    commit(ATS.FETCH_CURRENT_USER, data);
  },

  /**
   * 登录并获取登录用户
   */

  async [ATS.LOGIN_AND_FETCH_CURRENT_USER](
    { dispatch },
    loginData: ILoginData
  ) {
    await dispatch(ATS.LOGIN, loginData);
    await dispatch(ATS.FETCH_CURRENT_USER);
  },
};
