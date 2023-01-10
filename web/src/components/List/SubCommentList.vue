<template>
  <CommentCard
    :comment="comment"
    :isExpand="isExpand"
    @star-comment="starComment"
    @trigger-expand="triggerExpand"
    class="mb-2"
  />
  <div class="ps-3" v-if="comment.children">
    <div
      v-if="!isExpand"
      class="expand-bar ps-4 py-1 mb-3 text-muted fst-italic"
      @click="expandReplyComment"
    >
      <i class="bi bi-chevron-expand me-2"></i>
      共 {{ comment.children.length }} 条回复
    </div>
    <List class="sub-comment-list" v-else>
      <template v-slot:list>
        <template v-for="comment of comment.children" :key="comment._id">
          <SubCommentList :expand="true" :comment="comment" />
        </template>
      </template>
    </List>
  </div>
</template>

<script lang="ts">
import { UPDATE_AFTER_COMMENT_REPLY } from "@/config/constants";
import useComment from "@/hooks/useComment";
import { emitter } from "@/libs/mitt";
import { IComment } from "@/typings";
import { defineComponent, PropType, ref } from "vue";
import List from "@/components/List/index.vue";
import CommentCard from "@/components/Card/CommentCard.vue";

export default defineComponent({
  name: "SubCommentList",
  components: {
    List,
    CommentCard,
  },
  props: {
    expand: {
      type: Boolean,
      default: true,
    },
    comment: {
      type: Object as PropType<IComment>,
      required: true,
    },
  },
  setup(props) {
    const { starTheComment } = useComment();
    const isExpand = ref(props.expand);

    const starComment = async (isStarred: boolean, comment: IComment) => {
      await starTheComment(isStarred, comment);
      emitter.emit(UPDATE_AFTER_COMMENT_REPLY);
    };

    const triggerExpand = () => {
      isExpand.value = !isExpand.value;
    };

    const expandReplyComment = () => {
      isExpand.value = !isExpand.value;
    };

    return {
      isExpand,
      triggerExpand,
      expandReplyComment,
      starComment,
    };
  },
});
</script>

<style lang="scss" scoped>
.expand-bar {
  background: $gray-200;
  border-radius: $bd-radius-sm;

  &:hover {
    cursor: pointer;
  }
}
</style>
