import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import mixins from "./mixins/index";
import MessagePlugin from "@/components/Message/Message";

Vue.config.productionTip = false;

Vue.mixin(mixins);
Vue.use(MessagePlugin);

const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export default vm;
