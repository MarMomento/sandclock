<template>
  <li
    class="v-select-item"
    :class="item.selected ? 'selected' : ''"
    @click="setItem(item)"
  >
    {{ item.text }}
    <i v-show="item.selected" class="bi bi-check2 fs-5"></i>
  </li>
</template>

<script lang="ts">
import { ISelectItem } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VSelectItem",
  props: {
    item: {
      type: Object as PropType<ISelectItem>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const setItem = (item: ISelectItem) => {
      if (item.selected) {
        emit("set-select-item", false, item.value);
      } else {
        emit("set-select-item", true, item.value);
      }
    };

    return {
      setItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-select-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 20px;

  &:hover {
    background-color: $gray-100;
    color: $blue-500;
  }

  &.selected {
    color: $blue-500;
  }
}
</style>
