<template>
  <div class="col-12">
    <template v-if="articleList.length">
      <template v-for="article of articleList" :key="article._id">
        <ArticleCard
          :showImg="false"
          :article="article"
          class="mb-3"
          @collect-article="collectTheArticle"
        ></ArticleCard>
      </template>

      <LoadMore :isLastPage="isLastPage" @load-more="loadMore" />
    </template>

    <template v-else>
      <Card class="py-5">
        <template #text>
          <div class="text-center text-muted">没有搜索结果...</div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Card from "@/components/Card/index.vue";
import { IArticle, IState } from "@/typings";
import ArticleCard from "@/components/Card/ArticleCard.vue";
import { fetchSearchedArticles } from "@/api";
import { useStore } from "vuex";
import useArticle from "@/hooks/useArticle";
import { useRoute } from "vue-router";
import LoadMore from "@/components/LoadMore/index.vue";
import useLoadMore from "@/hooks/useLoadMore";

export default defineComponent({
  name: "ArticleSearch",
  components: {
    Card,
    ArticleCard,
    LoadMore,
  },
  setup() {
    const store = useStore<IState>();
    const route = useRoute();

    const articleList = ref<IArticle[]>([]);
    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        q: computed(() => store.state.search),
        page: 1,
        per_page: 10,
        count: 0,
      },
      async () => {
        const { data } = await fetchSearchedArticles({
          q: pagination.q as string,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        articleList.value = articleList.value.concat(data.data);
        pagination.count = data.count;
      }
    );

    const { collectTheArticle } = useArticle();

    const getArticleList = async () => {
      const { data } = await fetchSearchedArticles({
        q: pagination.q as string,
        page: pagination.page,
        per_page: pagination.per_page,
      });
      articleList.value = data.data;
      pagination.count = data.count;
    };

    watch(
      () => route.query.q,
      (newVal) => {
        if (newVal) {
          getArticleList();
        }
      }
    );

    onMounted(() => {
      if (pagination.q) {
        getArticleList();
      }
    });

    return {
      collectTheArticle,
      isLastPage,
      loadMore,
      pagination,
      articleList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
