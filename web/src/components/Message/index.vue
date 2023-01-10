<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
    <div class="toast" :class="isVisible ? 'show' : ''">
      <div class="toast-header">
        <div class="react rounded me-2" :class="currentMessageType"></div>
        <strong class="me-auto">提示</strong>
        <button
          type="button"
          class="btn-close"
          @click="isVisible = false"
        ></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMessageType } from "@/typings";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "Message",
  props: {
    type: {
      type: String as PropType<IMessageType>,
      default: "primary",
    },
    message: {
      type: String,
      default: "这是一条消息提示",
    },
  },
  setup(props) {
    const isVisible = ref(true);

    const currentMessageType = {
      "bg-primary": props.type === "primary",
      "bg-success": props.type === "success",
      "bg-danger": props.type === "error",
      "bg-warning": props.type === "warn",
    };

    return {
      isVisible,
      currentMessageType,
    };
  },
});
</script>

<style lang="scss" scoped>
.react {
  width: 20px;
  height: 20px;
}
</style>
