<template>
  <div>
    <slot v-if="articleList.length">
      <template v-for="article of articleList" :key="article._id">
        <ArticleCard
          :showImg="false"
          :article="article"
          class="mb-3"
          @collect-article="collectTheArticle"
        ></ArticleCard>
      </template>
    </slot>

    <template v-else>
      <no-data-card text="还没有收藏文章..."></no-data-card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NoDataCard from "@/components/Card/NoDataCard.vue";
import { IArticle } from "@/typings";
import useArticle from "@/hooks/useArticle";
import ArticleCard from "@/components/Card/ArticleCard.vue";

export default defineComponent({
  name: "ArticleList",
  components: {
    NoDataCard,
    ArticleCard,
  },
  props: {
    articleList: {
      type: Array as PropType<IArticle[]>,
      default: () => [],
    },
  },
  setup() {
    const { collectTheArticle } = useArticle();

    return {
      collectTheArticle,
    };
  },
});
</script>

<style lang="scss" scoped></style>
