import { defineComponent } from "vue";

export default defineComponent({
  name: "VFormItem",
  props: {
    label: String,
  },
  render() {
    return (
      <div class="v-form-item">
        {this.label ? <label class="form-label">{this.label}</label> : null}

        {this.$slots.default?.()}
      </div>
    );
  },
});
