<template>
  <div class="preview-image">
    <div
      class="preview-wrapper"
      :style="{
        width,
        height,
      }"
    >
      <v-img v-if="url" :src="url" class="image mw-100" />
      <div v-else class="placeholder">{{ placeholder }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PreviewImage",
  props: {
    url: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "100px",
    },
    placeholder: {
      type: String,
      default: "预览图片",
    },
  },
});
</script>

<style lang="scss" scoped>
.preview-image {
  .preview-wrapper {
    border: 2px dashed $gray-500;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: $gray-500;
      font-size: 1.3rem;
    }
  }
}
</style>
