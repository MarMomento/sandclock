import { defineComponent, h } from "vue";
import "./VCard.scss";

export default defineComponent({
  name: "VCard",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  render() {
    return h(
      this.tag,
      {
        class: "card",
      },
      this.$slots.default?.()
    );
  },
});
