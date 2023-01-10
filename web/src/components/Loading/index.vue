<template>
  <teleport to="#loading">
    <div class="loading-mask" v-show="show">
      <div class="loading">
        <div class="spinner-border text-primary">
          <span class="visually-hidden">{{ text }}</span>
        </div>
        <div class="text-primary">{{ text }}</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateDOM from "@/hooks/useCreateDOM";

export default defineComponent({
  name: "Loading",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "正在加载中...",
    },
  },
  setup() {
    useCreateDOM("loading");

    return {};
  },
});
</script>

<style lang="scss" scoped>
.loading-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10500;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
