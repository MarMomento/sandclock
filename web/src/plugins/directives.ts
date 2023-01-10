import { App } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

/**
 * 高亮代码
 */

export default {
  install: (app: App): void => {
    app.directive("hlight", (el: HTMLElement) => {
      const targets = el.querySelectorAll<HTMLElement>("code");
      targets.forEach((target) => {
        hljs.highlightBlock(target);
      });
    });

    app.directive("highlight", (el: HTMLElement, binding) => {
      let innerText = el.innerText;
      if (binding.value) {
        const textReg = new RegExp(binding.value, "gi");
        const replaceText = `<mark>${binding.value}</mark>`;
        innerText = innerText.replace(textReg, (a, b) => {
          return replaceText;
        });
        el.innerHTML = innerText;
      } else {
        el.innerHTML = innerText;
      }
    });
  },
};
