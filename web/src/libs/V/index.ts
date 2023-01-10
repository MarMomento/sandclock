import { App } from "vue";
import * as components from "./components";

const COMPONENTS: Record<string, any> = components;

export const V = {
  install: (app: App): void => {
    for (const key in COMPONENTS) {
      const component = COMPONENTS[key];

      app.component(key, component);
    }
  },
};

export default V;
