import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "VListGroup",
  props: {
    tag: {
      type: String,
      default: "ul",
    },
    flush: {
      type: Boolean,
      default: false,
    },
    numbered: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const className = computed(() => ({
      "list-group-flush": this.flush,
      "list-group-numbered": this.numbered,
      "list-group-horizontal": this.horizontal,
    }));

    return h(
      this.tag,
      {
        class: ["list-group", className.value],
      },
      this.$slots.default?.()
    );
  },
});
