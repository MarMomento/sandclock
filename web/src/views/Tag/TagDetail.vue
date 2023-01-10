<template>
  <div class="container tag-detail-page py-3">
    <div class="row mb-5">
      <div class="col-12">
        <TagCard
          v-if="tag"
          :tag="tag"
          :isDetail="true"
          @follow-tag="followTag"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7">
        <ArticleTab
          :isUnderTag="true"
          :currentTab="currentTab"
          :tabs="tabs"
          :articleList="articleList"
          @change-tab="getLatest"
        />

        <LoadMore :isLastPage="isLastPage" @load-more="loadMore" />
      </div>
      <div class="col-2">
        <div class="d-flex flex-column">
          <div class="text-muted mb-2">
            已经发布 {{ tag && tag.articles_count }} 篇文章
          </div>
          <div class="text-muted">
            已经有 {{ tag && tag.followers_count }} 用户关注
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TagCard from "@/components/Card/TagCard.vue";
import { useRoute } from "vue-router";
import {
  defineComponent,
  onActivated,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { fetchLatestArticlesByTagId, fetchTag } from "@/api";
import { IArticle, IArticleParams, ITag } from "@/typings";
import useTag from "@/hooks/useTag";
import ArticleTab from "@/components/Tab/ArticleTab.vue";
import LoadMore from "@/components/LoadMore/index.vue";
import useLoadMore from "@/hooks/useLoadMore";

export default defineComponent({
  name: "TagDetail",
  components: {
    TagCard,
    ArticleTab,
    LoadMore,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      id: ref(route.params.id as string),
      currentTab: "",
      tabs: [
        {
          type: "week",
          text: "最近一周",
        },
        {
          type: "month",
          text: "最近一月",
        },
        {
          type: "year",
          text: "最近一年",
        },
      ],
      articleList: [] as IArticle[],
      tag: null as ITag | null,
    });

    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        date: 7,
        page: 1,
        per_page: 10,
        count: 0,
      },
      async () => {
        const { data } = await fetchLatestArticlesByTagId(state.id, {
          date: pagination.date as number,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        state.articleList = state.articleList.concat(data.data);
        pagination.count = data.count;
      }
    );

    const getTagById = async () => {
      const { data } = await fetchTag(state.id);
      state.tag = data;
    };

    const { followTheTag } = useTag();

    const followTag = async (isFollowing: boolean, tag: ITag) => {
      await followTheTag(isFollowing, tag);
      await getTagById();
    };

    const getLatestArticles = async (params: IArticleParams) => {
      const { data } = await fetchLatestArticlesByTagId(state.id, params);
      state.articleList = data.data;
      pagination.count = data.count;
    };

    const getLatest = (type: string) => {
      state.currentTab = type;
      pagination.page = 1;
      switch (type) {
        case "week":
          pagination.date = 7;
          break;
        case "month":
          pagination.date = 30;
          break;
        case "year":
          pagination.date = 365;
          break;
        default:
          break;
      }
      getLatestArticles({
        date: pagination.date as number,
        page: pagination.page,
        per_page: pagination.per_page,
      });
    };

    onMounted(() => {
      getTagById();
      getLatest("week");
    });

    onActivated(() => {
      state.id = route.params.id as string;
      getTagById();
      getLatest("week");
    });

    return {
      ...toRefs(state),
      followTag,
      getLatest,
      isLastPage,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped></style>
