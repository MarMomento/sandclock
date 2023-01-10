import Vue from "vue";
import Message from "./Message.vue";
import vuetify from "@/plugins/vuetify";

/**
 * 消息插件
 * this.$message({
 *    type: 'success',
 *    message: 'success'
 * })
 */

const MessageBox = Vue.extend(Message);
let instance;
let timer = null;

const message = function (type = "") {
  return function (options = {}) {
    if (timer) return;

    if (typeof options === "string") {
      options = {
        type,
        message: options,
      };
    }

    instance = new MessageBox({
      vuetify,
      data: options,
    });
    instance.vm = instance.$mount();
    const oVApp = document.querySelector(".v-application");
    oVApp.appendChild(instance.vm.$el);
    instance.vm.isVisible = true;

    timer = setTimeout(() => {
      instance.vm.$destroy();
      instance.vm.$el.parentNode.removeChild(instance.vm.$el);
      timer = null;
    }, instance.vm.duration);
  };
};

const MessagePlugin = {
  install(Vue) {
    Vue.prototype.$message = message();
    Vue.prototype.$message.success = message("success");
    Vue.prototype.$message.error = message("error");
  },
};

export default MessagePlugin;
