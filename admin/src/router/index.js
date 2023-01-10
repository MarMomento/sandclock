import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { beforeEach, afterEach } from "./guards";

Vue.use(VueRouter);

// 解决push重复路由报警告的问题
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
