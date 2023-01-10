<template>
  <div :class="['tab', { 'd-flex': type === 'leftRight' }]">
    <slot name="menu"> </slot>
    <slot name="content"> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type ITabType = "topBottom" | "leftRight";

export default defineComponent({
  name: "Tab",
  props: {
    type: {
      type: String as PropType<ITabType>,
      default: "topBottom",
    },
  },
});
</script>

<style lang="scss" scoped></style>
