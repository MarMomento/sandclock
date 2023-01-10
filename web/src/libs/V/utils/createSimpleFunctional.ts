import { camelize, capitalize, defineComponent, h } from "vue";

export function createSimpleFunctional(
  className: string,
  tag = "div",
  name?: string
) {
  return defineComponent({
    name: name ?? capitalize(camelize("v-" + className)),
    props: {
      tag: {
        type: String,
        default: tag,
      },
    },
    render() {
      return h(
        this.tag,
        {
          class: className,
        },
        this.$slots.default?.()
      );
    },
  });
}
