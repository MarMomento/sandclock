<template>
  <div :class="tag === 'input' ? 'v-input' : 'v-textarea'">
    <input
      v-if="tag === 'input'"
      v-model="val"
      :class="['form-control', { 'is-invalid': error }]"
      type="text"
      autocomplete="on"
      v-bind="$attrs"
    />
    <textarea
      v-else-if="tag === 'textarea'"
      v-model="val"
      :class="['form-control', { 'is-invalid': error }]"
      v-bind="$attrs"
    ></textarea>
    <div class="invalid-feedback" v-show="showError && message">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import useValidation from "@/hooks/useValidation";
import { IRegistrable, IRule } from "@/typings";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  toRefs,
} from "vue";

type ITagType = "input" | "textarea";

export default defineComponent({
  name: "VInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    rules: {
      type: Array as PropType<IRule[]>,
      default: () => [],
    },
    tag: {
      type: String as PropType<ITagType>,
      default: "input",
    },
    showError: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const form = inject<IRegistrable>("form");
    const curInstance = getCurrentInstance();

    const inputVal = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        emit("update:modelValue", newVal);
      },
    });

    const { state, validation } = useValidation(inputVal, props.rules);

    onMounted(() => {
      form?.register({ uid: curInstance?.uid, validation });
    });

    onUnmounted(() => {
      form?.unregister(curInstance);
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
