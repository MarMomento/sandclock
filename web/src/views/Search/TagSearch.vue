<template>
  <div class="col-12">
    <template v-if="tagList.length">
      <div class="col-12 mb-3" v-for="tag of tagList" :key="tag._id">
        <TagCard :tag="tag" @follow-tag="followTheTag" />
      </div>

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
import TagCard from "@/components/Card/TagCard.vue";
import useTag from "@/hooks/useTag";
import LoadMore from "@/components/LoadMore/index.vue";
import Card from "@/components/Card/index.vue";
import { fetchSearchedTags } from "@/api";
import { IState, ITag } from "@/typings";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useLoadMore from "@/hooks/useLoadMore";

export default defineComponent({
  name: "TagSearch",
  components: {
    Card,
    TagCard,
    LoadMore,
  },
  setup() {
    const store = useStore<IState>();
    const search = computed(() => store.state.search);
    const route = useRoute();

    const tagList = ref<ITag[]>([]);
    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        q: computed(() => store.state.search),
        page: 1,
        per_page: 10,
        count: 0,
      },
      async () => {
        const { data } = await fetchSearchedTags({
          q: pagination.q as string,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        tagList.value = tagList.value.concat(data.data);
        pagination.count = data.count;
      }
    );

    const { followTheTag } = useTag();

    const getArticleList = async () => {
      const { data } = await fetchSearchedTags({
        q: pagination.q as string,
        page: pagination.page,
        per_page: pagination.per_page,
      });
      tagList.value = data.data;
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
      followTheTag,
      search,
      pagination,
      tagList,
      isLastPage,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped></style>
