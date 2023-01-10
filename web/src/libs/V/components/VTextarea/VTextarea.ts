import { defineComponent, h } from "vue";
import { VInput } from "../VInput/index";

export default defineComponent({
  name: "VTextarea",
  render() {
    return h(VInput, {
      tag: "textarea",
    });
  },
});
