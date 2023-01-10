<template>
  <v-card>
    <v-card-header class="bg-white border-0 pt-3">
      <v-img
        :src="comment.commentator.avatar_url"
        :width="40"
        class="rounded-circle me-2"
      />
      <span class="text-muted">
        {{ comment.commentator.name }}
      </span>
    </v-card-header>

    <v-card-body class="ps-5 pt-0">
      <v-card-title class="fs-4 fw-bold">{{
        comment.article_id.title
      }}</v-card-title>

      <v-card-text class="text-muted" v-highlight="hightlightText">
        {{ comment.content }}
      </v-card-text>

      <v-card-actions>
        <router-link to="/" class="btn btn-link btn-sm me-3">
          <i class="bi bi-heart me-1"></i>
          {{ comment.thumb_count }} 赞
        </router-link>
        <router-link to="/" class="btn btn-link btn-sm">
          <i class="bi bi-chat me-1"> </i>
          回复评论
        </router-link>
      </v-card-actions>
    </v-card-body>
  </v-card>
</template>

<script lang="ts">
import { IComment } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CommentCard",
  props: {
    comment: {
      type: Object as PropType<IComment>,
      required: true,
    },
    hightlightText: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-link {
  border-radius: $bd-radius-sm;
  text-decoration: none;
  color: $gray-600;

  &:hover {
    background-color: $gray-200;
  }
}
</style>
