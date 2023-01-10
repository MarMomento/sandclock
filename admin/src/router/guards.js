import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

import store from "@/store/index";
import { FETCH_CURRENT_USER, LOGOUT } from "@/store/actionTypes";

const beforeEach = async (to, from, next) => {
  NProgress.start();

  const { user, token } = store.state;
  const { redirectAlreadyLogin, isPublic } = to.meta;

  if (user.isLogin) {
    // 已经登录
    if (redirectAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  } else {
    // 未登录
    if (token) {
      // 有token
      try {
        await store.dispatch(FETCH_CURRENT_USER);
        next();
      } catch (error) {
        store.commit(LOGOUT);
        next("/login");
      }
    } else {
      //没有token
      if (isPublic) {
        next();
      } else {
        next("/login");
      }
    }
  }
};

const afterEach = () => {
  NProgress.done();
};

export { beforeEach, afterEach };
