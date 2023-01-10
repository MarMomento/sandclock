<template>
  <div class="card">
    <slot name="header"></slot>
    <div class="card-body d-flex flex-column">
      <slot name="title"></slot>
      <slot name="text"></slot>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
});
</script>

<style lang="scss" scoped></style>
