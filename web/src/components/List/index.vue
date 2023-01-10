<template>
  <div class="list">
    <slot name="header"></slot>
    <div class="list-body">
      <slot name="list"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "List",
});
</script>

<style lang="scss" scoped></style>
