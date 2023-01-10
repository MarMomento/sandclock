<template>
  <div class="container article-detail-page py-3">
    <div class="row">
      <div class="offset-lg-1 col-lg-8 offset-md-1 col-md-11 col-12">
        <ArticleCard
          v-if="article"
          :article="article"
          :isDetail="true"
          @collect-article="collectArticle"
          @star-article="starArticle"
        />

        <CommentList
          v-if="article"
          class="comment-area bg-white p-lg-5 p-3"
          :article="article"
          :commentList="commentList"
        />
      </div>

      <div
        class="col-lg-3 col-md-12 col-sm-12 d-none d-md-block mt-md-3 mt-lg-0"
      >
        <AuthorProfileCard
          v-if="article"
          :author="article.author"
          class="mb-3"
          @follow-user="followTheUser"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, onActivated, onMounted, onUnmounted, ref } from "vue";
import { IArticle, IComment } from "@/typings";
import { fetchArticle, fetchCommentsByArticleId } from "@/api";
import ArticleCard from "@/components/Card/ArticleCard.vue";
import useArticle from "@/hooks/useArticle";
import AuthorProfileCard from "@/components/Card/AuthorProfileCard.vue";
import useUser from "@/hooks/useUser";
import useComment from "@/hooks/useComment";
import { emitter } from "@/libs/mitt";
import { UPDATE_AFTER_COMMENT_REPLY } from "@/config/constants";
import CommentList from "@/components/List/CommentList.vue";

export default defineComponent({
  name: "ArticleDetail",
  components: {
    ArticleCard,
    AuthorProfileCard,
    CommentList,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id as string);
    const article = ref<IArticle | null>(null);
    const commentList = ref<IComment[]>([]);

    const { followTheUser } = useUser();
    const { formatToTree } = useComment();
    const { collectTheArticle, starTheArticle } = useArticle();

    const getArticle = async () => {
      const { data } = await fetchArticle(id.value);
      article.value = data;
    };

    const getComments = async () => {
      const { data } = await fetchCommentsByArticleId(id.value);
      commentList.value = formatToTree(data);
    };

    const collectArticle = async (isCollected: boolean, article: IArticle) => {
      await collectTheArticle(isCollected, article);
      await getArticle();
    };

    const starArticle = async (isStarred: boolean, article: IArticle) => {
      await starTheArticle(isStarred, article);
      await getArticle();
    };

    const callback = () => {
      getComments();
    };
    emitter.on(UPDATE_AFTER_COMMENT_REPLY, callback);

    onUnmounted(() => {
      emitter.off(UPDATE_AFTER_COMMENT_REPLY, callback);
    });

    onMounted(() => {
      getArticle();
      getComments();
    });

    onActivated(() => {
      id.value = route.params.id as string;
      getArticle();
      getComments();
    });

    return {
      id,
      article,
      commentList,
      collectArticle,
      starArticle,
      followTheUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-detail-page {
  .comment-area {
    border: 2px solid rgba(0, 0, 0, 0.125);
    border-top: none;
    border-radius: 0 0 $bd-radius-sm $bd-radius-sm;
  }
}
</style>
