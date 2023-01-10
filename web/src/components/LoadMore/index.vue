<template>
  <div class="load-more d-flex justify-content-center my-2">
    <template v-if="isLastPage">
      <small class="text-muted" v-if="isLastPage">已经到底啦~~~</small>
    </template>

    <template v-else>
      <button class="btn btn-primary" @click="loadMore">加载更多</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadMore",
  props: {
    isLastPage: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["load-more"],
  setup(props, { emit }) {
    const loadMore = () => {
      emit("load-more");
    };

    return {
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped></style>
