<template>
  <List class="comment-list">
    <template v-slot:header>
      <p class="fs-4 fw-bold">评论（{{ article.comment_count }}）</p>
      <CommentEditor :article_id="article._id" class="mb-lg-5 mb-3" />
    </template>

    <template v-slot:list>
      <template v-for="comment of commentList" :key="comment._id">
        <SubCommentList :expand="true" :comment="comment" />
      </template>
    </template>
  </List>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import List from "./index.vue";
import CommentEditor from "@/components/Comment/CommentEditor.vue";
import { IArticle, IComment } from "@/typings";
import SubCommentList from "./SubCommentList.vue";

export default defineComponent({
  name: "CommentList",
  components: {
    List,
    CommentEditor,
    SubCommentList,
  },
  props: {
    article: {
      type: Object as PropType<IArticle>,
      required: true,
    },
    commentList: {
      type: Array as PropType<IComment[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
