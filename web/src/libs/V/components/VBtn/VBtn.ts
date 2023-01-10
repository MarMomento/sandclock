import { computed, defineComponent, h, PropType } from "vue";
import "./VBtn.scss";

type IBtnType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

type IBtnSize = "lg" | "sm";

export default defineComponent({
  name: "VBtn",
  props: {
    color: {
      type: String as PropType<IBtnType>,
      default: "primary",
    },
    outline: Boolean,
    size: String as PropType<IBtnSize>,
    tile: Boolean,
    circle: Boolean,
    block: Boolean,
  },
  render() {
    const classes = computed(() => ({
      [`btn-${this.color}`]: !this.outline && !!this.color,
      [`btn-outline-${this.color}`]: this.outline && !!this.color,
      [`btn-${this.size}`]: !!this.size,
      "rounded-0": !!this.tile,
      "rounded-circle": !!this.circle,
      "v-btn-block": !!this.block,
    }));

    return h(
      "button",
      {
        class: ["v-btn btn", classes.value],
        type: "button",
      },
      this.$slots.default?.()
    );
  },
});
