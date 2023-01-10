<template>
  <v-list-group>
    <v-list-item>
      <div class="fs-5 fw-bold py-2">最近的评论</div>
    </v-list-item>

    <template v-if="commentList.length">
      <template v-if="isExpand">
        <v-list-item v-for="comment of commentList" :key="comment._id" action>
          <div class="d-flex w-100 justify-content-between">
            <span class="mb-1 fw-bold">{{
              comment.article_id && comment.article_id.title
            }}</span>
            <small>{{ fromNow(comment.created_at) }}</small>
          </div>
          <p class="mb-1">{{ comment.content }}</p>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item
          v-for="comment of commentList.slice(0, 3)"
          :key="comment._id"
          action
        >
          <div class="d-flex w-100 justify-content-between">
            <span class="mb-1 fw-bold">{{
              comment.article_id && comment.article_id.title
            }}</span>
            <small>{{ fromNow(comment.created_at) }}</small>
          </div>
          <p class="mb-1">{{ comment.content }}</p>
        </v-list-item>
        <v-list-item class="text-center text-muted">
          <a class="text-link text-decoration-none" @click="isExpand = true">
            查看所用的{{ commentList.length }}评论
          </a>
        </v-list-item>
      </template>
    </template>

    <template v-else>
      <v-list-item class="text-center text-muted"> 最近没有评论 </v-list-item>
    </template>
  </v-list-group>
</template>

<script lang="ts">
import useDayjs from "@/hooks/useDayjs";
import { IComment } from "@/typings";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "RecentCommentList",
  props: {
    commentList: {
      type: Object as PropType<IComment[]>,
      required: true,
    },
  },
  setup(props) {
    const { fromNow } = useDayjs();

    const isExpand = ref(props.commentList?.length > 3 ? false : true);

    return {
      fromNow,
      isExpand,
    };
  },
});
</script>

<style lang="scss" scoped></style>
