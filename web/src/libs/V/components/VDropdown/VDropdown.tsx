import { defineComponent } from "vue";

export default defineComponent({
  name: "VDropdown",
  render() {
    return (
      <div class="dropdown">
        <div data-bs-toggle="dropdown">{this.$slots.trigger?.()}</div>
        <div class="dropdown-menu py-0 overflow-hidden">
          {this.$slots.default?.()}
        </div>
      </div>
    );
  },
});
