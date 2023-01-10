<template>
  <teleport to="#modal">
    <div class="modal d-block" v-if="isVisible">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <p>{{ body }}</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="confirm">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useCreateDOM from "@/hooks/useCreateDOM";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: String,
    body: String,
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["modal-close", "modal-confirm"],
  setup(props, { emit }) {
    useCreateDOM("modal");

    const close = () => {
      emit("modal-close");
    };

    const confirm = () => {
      emit("modal-confirm");
    };

    return {
      close,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
