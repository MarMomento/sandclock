<template>
  <Modal
    :isVisible="dialogDel"
    title="删除"
    body="确定要删除这篇文章么?"
    @modal-close="closeDel"
    @modal-confirm="confirmDel"
  />
  <article-list :articleList="articleList">
    <v-list-group>
      <v-list-item
        v-for="article of articleList"
        :key="article._id"
        action
        class="d-flex justify-content-between align-items-center p-4"
      >
        <div class="col-8">
          <div class="d-flex flex-column">
            <router-link
              :to="`/article/${article._id}`"
              class="text-decoration-none text-dark mb-1 fw-bold fs-5"
            >
              {{ article.title }}
            </router-link>
            <div>
              <small>创建时间: {{ fromNow(article.created_at) }}</small>
              <small class="ms-3">
                更新时间: {{ fromNow(article.updated_at) }}
              </small>
            </div>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-between align-items-center">
          <div class="l">
            <span>
              <i class="bi bi-heart"></i>
              {{ article.thumb_count }}
            </span>
            <span class="mx-3">
              <i class="bi bi-chat"></i>
              {{ article.comment_count }}
            </span>
          </div>
          <div class="r">
            <router-link :to="`/edit/${article._id}`" class="btn btn-secondary">
              编辑
            </router-link>
            <v-btn color="danger" class="ms-3" @click="del(article)">
              删除
            </v-btn>
          </div>
        </div>
      </v-list-item>
    </v-list-group>
  </article-list>
</template>

<script lang="ts">
import { deleteArticle, fetchArticles } from "@/api";
import { IArticle } from "@/typings";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import Modal from "@/components/Modal/index.vue";
import $message from "@/components/Message";
import useDayjs from "@/hooks/useDayjs";
import ArticleList from "@/components/List/ArticleList.vue";

export default defineComponent({
  name: "PostsDashboard",
  components: {
    Modal,
    ArticleList,
  },
  setup() {
    const articleList = ref<IArticle[]>([]);
    const state = reactive({
      dialogDel: false,
      deleteId: "",
    });

    const { fromNow } = useDayjs();

    const getArticles = async () => {
      const { data } = await fetchArticles();
      articleList.value = data.reverse();
    };

    const del = (article: IArticle) => {
      state.dialogDel = true;
      state.deleteId = article._id;
    };

    const confirmDel = async () => {
      try {
        const { status } = await deleteArticle(state.deleteId);
        if (status === 204) {
          $message({
            type: "success",
            message: "删除成功",
          });
        }
        getArticles();
      } catch (error) {
        //
      }
      closeDel();
    };

    const closeDel = () => {
      state.dialogDel = false;
      state.deleteId = "";
    };

    onMounted(() => {
      getArticles();
    });

    return {
      ...toRefs(state),
      articleList,
      del,
      confirmDel,
      closeDel,
      fromNow,
    };
  },
});
</script>

<style lang="scss" scoped></style>
