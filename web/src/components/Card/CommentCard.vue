<template>
  <Card class="comment-card flex-row">
    <template v-slot:header>
      <div class="me-3 d-flex flex-column align-items-center">
        <router-link :to="`/profile/${comment.commentator._id}`">
          <img
            :src="
              comment.commentator.avatar_url || require('@/assets/user.png')
            "
            style="width: 42px; height: 42px"
            class="rounded-circle border mb-2"
          />
        </router-link>
        <i
          v-if="comment.children && comment.children.length"
          :class="[
            'bi expand-icon',
            isExpand ? 'bi-chevron-expand' : 'bi-chevron-contract',
          ]"
          @click="triggerExpand"
        ></i>
      </div>
    </template>

    <template v-slot:text>
      <div class="border rounded-3 p-3 mb-2">
        <div class="comment-header d-flex justify-content-between mb-3">
          <div class="text-muted">
            <router-link
              :to="`/profile/${comment.commentator._id}`"
              class="text-decoration-none"
            >
              {{ comment.commentator.nickName }}
            </router-link>
            ·
            {{ fromNow(comment.created_at) }}
          </div>
          <!-- TODO: 评论编辑，删除
          <div class="comment-operations">
            <i class="bi bi-three-dots"></i>
          </div> -->
        </div>
        <div class="comment-content">
          {{ comment.content }}
        </div>
      </div>
    </template>

    <template v-slot:action>
      <div class="comment-actions mb-lg-3" ref="actionsRef">
        <div class="mb-1">
          <button
            type="button"
            :class="['btn-action', { starred: isStarred }]"
            @click="starComment(comment)"
          >
            <i
              :class="['bi me-2', isStarred ? 'bi-heart-fill' : 'bi-heart']"
            ></i>
            <span class="text-muted">{{ comment.thumb_count }} 赞</span>
          </button>
          <button
            class="btn-action"
            type="button"
            @click="replyComment(comment)"
          >
            <i class="bi bi-chat me-2"></i>
            回复
          </button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { IComment, IState } from "@/typings";
import {
  App,
  computed,
  createApp,
  defineComponent,
  onUnmounted,
  PropType,
  ref,
} from "vue";
import Card from "./index.vue";
import { useStore } from "vuex";
import CommentEditor from "@/components/Comment/CommentEditor.vue";
import { emitter } from "@/libs/mitt";
import { DESTROY_COMMENT_REPLY } from "@/config/constants";
import useDayjs from "@/hooks/useDayjs";
import { useRouter } from "vue-router";
import V from "@/libs/V";

export default defineComponent({
  name: "CommentCard",
  components: {
    Card,
  },
  emits: ["star-comment", "trigger-expand"],
  props: {
    comment: {
      type: Object as PropType<IComment>,
      required: true,
    },
    isExpand: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore<IState>();
    const user = computed(() => store.state.user);
    const router = useRouter();
    const isStarred = computed(() => {
      if (user.value.info) {
        return user.value.info.starred_comments.includes(props.comment._id);
      } else {
        return false;
      }
    });

    const editor_instance = ref<null | App>(null);
    const actionsRef = ref<null | HTMLElement>(null);
    const mountEle = ref<null | HTMLDivElement>(null);

    const { fromNow } = useDayjs();

    const triggerExpand = () => {
      emit("trigger-expand");
    };

    const starComment = (comment: IComment) => {
      emit("star-comment", isStarred.value, comment);
    };

    const replyComment = (comment: IComment) => {
      if (editor_instance.value) return;

      editor_instance.value = createApp(CommentEditor, {
        showAvatar: false,
        article_id: comment.article_id,
        comment_id: comment._id,
      })
        .use(V)
        .use(store)
        .use(router);

      mountEle.value = document.createElement("div");
      if (actionsRef.value) {
        actionsRef.value.appendChild(mountEle.value);
        editor_instance.value.mount(mountEle.value);
      }
    };

    const callback = (id: string | undefined) => {
      if (props.comment._id === id) {
        editor_instance.value?.unmount();
        mountEle.value?.remove();
        editor_instance.value = null;
      }
    };

    emitter.on(DESTROY_COMMENT_REPLY, callback);

    onUnmounted(() => {
      emitter.off(DESTROY_COMMENT_REPLY, callback);
    });

    return {
      actionsRef,
      isStarred,
      starComment,
      replyComment,
      triggerExpand,
      fromNow,
    };
  },
});
</script>

<style lang="scss">
.comment-card {
  border: none;

  .expand-icon {
    color: $gray-500;

    &:hover {
      cursor: pointer;
      color: $black;
    }
  }

  .card-body {
    padding: 0;
  }

  .btn-action {
    outline: none;
    border: none;
    background-color: $white;
    padding: 4px 10px;
    border-radius: $bd-radius-sm;
    margin-right: 8px;

    &:hover {
      background-color: $gray-200;
    }

    &.starred {
      color: $red;
    }
  }
}
</style>
