import "./VImg.scss";

import { computed, defineComponent, h } from "vue";
export default defineComponent({
  name: "VImg",
  props: {
    src: {
      type: String,
      default: "",
    },
    thumbnail: Boolean,
    responsive: Boolean,
    cover: Boolean,
    contain: Boolean,
    alt: String,
    width: [String, Number],
    height: [String, Number],
    circle: Boolean,
  },
  render() {
    const className = computed(() => ({
      "img-fluid": !!this.responsive,
      "img-thumbnail": !!this.thumbnail,
      "v-img--cover": !!this.cover,
      "v-img--contain": !!this.contain,
      "rounded-circle": !!this.circle,
    }));

    const styles = {
      width: typeof this.width === "number" ? this.width + "px" : this.width,
      height:
        typeof this.height === "number" ? this.height + "px" : this.height,
    };

    return h("img", {
      class: ["v-img", className.value],
      style: styles,
      src: this.src,
      alt: this.alt || "",
    });
  },
});
