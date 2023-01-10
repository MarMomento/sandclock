import { NavigationGuardWithThis, NavigationHookAfter } from "vue-router";
import store from "@/store";
import { ATS } from "@/store/actionTypes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const beforeEach: NavigationGuardWithThis<undefined> = async (
  to,
  from,
  next
) => {
  NProgress.start();

  const { user, token } = store.state;
  const { isPublic, redirectAlreadyLogin } = to.meta;

  if (!user.isLogin) {
    // 未登录
    if (token) {
      // 有token
      try {
        await store.dispatch(ATS.FETCH_CURRENT_USER);
        // 获取当前用户成功
        if (redirectAlreadyLogin) {
          next("/");
        } else {
          next();
        }
      } catch (error) {
        // token失效或错误
        store.commit(ATS.LOGOUT);
        next("/login");
      }
    } else {
      // 没有token
      if (isPublic) next();
      else next("/login");
    }
  } else {
    // 已登录
    if (redirectAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  }
};

const afterEach: NavigationHookAfter = () => {
  NProgress.done();
};

export { beforeEach, afterEach };
