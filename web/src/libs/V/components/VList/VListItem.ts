import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "VListItem",
  props: {
    tag: {
      type: String,
      default: "li",
    },
    action: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
  },
  render() {
    const className = computed(() => ({
      "list-group-item-action": this.action,
      [`list-group-item-${this.color}`]: this.color ? true : false,
    }));

    return h(
      this.tag,
      {
        class: ["list-group-item", className.value],
      },
      this.$slots.default?.()
    );
  },
});
