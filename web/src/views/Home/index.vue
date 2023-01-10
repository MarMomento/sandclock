<template>
  <div class="container home-page py-3">
    <div class="row justify-content-center">
      <div class="col-lg-3 d-lg-block d-none">
        <LoginCard v-if="!user.isLogin" class="mb-4" />
        <TagList :tagList="tagList" class="mb-4" />
        <NotificationCard header="通知">
          <template v-slot:title>
            <div>欢迎来到SandClock社区</div>
          </template>
        </NotificationCard>
      </div>
      <div class="col-12 col-lg-7">
        <ArticleTab
          :currentTab="currentTab"
          :tabs="tabs"
          :articleList="articleList"
          @change-tab="getLatest"
        />

        <LoadMore :isLastPage="isLastPage" @load-more="loadMore" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  fetchFollowingTags,
  fetchLatestArticles,
  fetchPopularTags,
} from "@/api";
import { IArticle, IArticleParams, ITag } from "@/typings";
import { defineComponent, onActivated, onMounted, reactive, toRefs } from "vue";
import LoginCard from "@/components/Card/LoginCard.vue";
import TagList from "@/components/List/TagList.vue";
import NotificationCard from "@/components/Card/NotificationCard.vue";
import LoadMore from "@/components/LoadMore/index.vue";
import ArticleTab from "@/components/Tab/ArticleTab.vue";
import useLoadMore from "@/hooks/useLoadMore";
import useUser from "@/hooks/useUser";

export default defineComponent({
  name: "Home",
  components: {
    LoginCard,
    TagList,
    NotificationCard,
    ArticleTab,
    LoadMore,
  },
  setup() {
    const { user } = useUser();
    const state = reactive({
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
      tagList: [] as ITag[],
    });

    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        date: 7,
        page: 1,
        per_page: 15,
        count: 0,
      },
      async () => {
        const { data } = await fetchLatestArticles({
          date: pagination.date as number,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        state.articleList = state.articleList.concat(data.data);
        pagination.count = data.count;
      }
    );

    const getPopularTags = async () => {
      const { data } = await fetchPopularTags();
      state.tagList = data.slice(0, 15);
    };

    const getFollowingTags = async () => {
      const { data } = await fetchFollowingTags();
      state.tagList = data;
    };

    const getLatestArticles = async (params: IArticleParams) => {
      const { data } = await fetchLatestArticles(params);
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

    onMounted(async () => {
      if (user.value.isLogin) {
        getFollowingTags();
      } else {
        getPopularTags();
      }
      getLatest("week");
    });

    onActivated(() => {
      if (user.value.isLogin) {
        getFollowingTags();
      } else {
        getPopularTags();
      }
      getLatest("week");
    });

    return {
      user,
      ...toRefs(state),
      isLastPage,
      loadMore,
      getLatest,
    };
  },
});
</script>

<style lang="scss" scoped></style>
