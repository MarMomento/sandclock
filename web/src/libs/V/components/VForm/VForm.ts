import { IValidation } from "@/typings";
import { defineComponent, h, provide, ref } from "vue";

interface IInputsValidation {
  uid: number;
  validation: IValidation;
}

export default defineComponent({
  name: "VForm",
  setup() {
    const inputs = ref<IInputsValidation[]>([]);

    const validate = () => {
      return inputs.value
        .map((input) => input.validation())
        .every((res) => res);
    };

    const register = (input: IInputsValidation) => {
      inputs.value.push(input);
    };

    const unregister = (input: IInputsValidation) => {
      inputs.value = inputs.value.filter((item) => item.uid !== input.uid);
    };

    provide("form", { register, unregister });

    return {
      validate,
    };
  },
  render() {
    return h("form", this.$slots.default?.());
  },
});
