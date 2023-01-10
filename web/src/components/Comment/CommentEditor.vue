<template>
  <div class="comment-editor d-flex">
    <div v-if="showAvatar" class="me-3">
      <img
        :src="
          (user.info && user.info.avatar_url) || require('@/assets/user.png')
        "
        style="width: 42px; height: 42px"
        class="rounded-circle border"
      />
    </div>
    <v-form class="w-100" ref="commentRef">
      <v-textarea
        v-model="content"
        placeholder="添加评论"
        :rules="contentRules"
      />

      <div class="mt-3">
        <v-btn color="primary " @click="publish"> 发表评论 </v-btn>
        <v-btn color="secondary ms-3" v-if="isReply" @click="cancel">
          取消
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { IState } from "@/typings";
import useRules from "@/hooks/useRules";
import $message from "../Message";
import { createArticleComment, replyComment } from "@/api";
import { emitter } from "@/libs/mitt";
import {
  DESTROY_COMMENT_REPLY,
  UPDATE_AFTER_COMMENT_REPLY,
} from "@/config/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CommentEditor",
  props: {
    showAvatar: {
      type: Boolean,
      default: true,
    },
    article_id: {
      type: String,
      required: true,
    },
    comment_id: {
      type: String,
      default: "",
    },
  },
  emits: ["publish-success"],
  setup(props) {
    const commentRef = ref<null | HTMLFormElement>(null);
    const content = ref("");
    const store = useStore<IState>();
    const user = computed(() => store.state.user);
    const { contentRules } = useRules();
    const isReply = ref(props.comment_id ? true : false);
    const router = useRouter();

    const publish = async () => {
      const result = commentRef.value?.validate();
      if (!result) {
        $message({
          type: "warn",
          message: "请输入正确的数据",
        });
        return;
      }

      if (!user.value.isLogin) {
        router.push("/login");
      }

      try {
        if (isReply.value) {
          await replyComment(props.article_id, props.comment_id, {
            content: content.value,
          });
          emitter.emit(DESTROY_COMMENT_REPLY, props.comment_id);
        } else {
          await createArticleComment(props.article_id, {
            content: content.value,
          });
        }
        content.value = "";
        $message({
          type: "success",
          message: "评论成功",
        });
        emitter.emit(UPDATE_AFTER_COMMENT_REPLY);
      } catch (error) {
        //
      }
    };

    const cancel = () => {
      emitter.emit(DESTROY_COMMENT_REPLY, props.comment_id);
    };

    return {
      commentRef,
      content,
      user,
      contentRules,
      publish,
      cancel,
      isReply,
    };
  },
});
</script>

<style lang="scss" scoped></style>
