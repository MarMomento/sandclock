<template>
  <div class="col-12">
    <template v-if="commentList.length">
      <template v-for="comment of commentList" :key="comment._id">
        <comment-card
          :comment="comment"
          :hightlight-text="
            typeof pagination.q === 'string' ? pagination.q : ''
          "
          class="mb-3"
        />
      </template>

      <load-more :isLastPage="isLastPage" @load-more="loadMore" />
    </template>

    <template v-else>
      <v-card class="py-5">
        <v-card-text class="text-center text-muted">
          没有搜索结果...
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import LoadMore from "@/components/LoadMore/index.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useLoadMore from "@/hooks/useLoadMore";
import { IComment, IState } from "@/typings";
import { fetchSearchedComments } from "@/api";
import CommentCard from "./components/CommentCard.vue";

export default defineComponent({
  name: "CommentSearch",
  components: {
    LoadMore,
    CommentCard,
  },
  setup() {
    const store = useStore<IState>();
    const search = computed(() => store.state.search);
    const route = useRoute();

    const commentList = ref<IComment[]>([]);

    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        q: computed(() => store.state.search),
        page: 1,
        per_page: 10,
        count: 0,
      },
      async () => {
        const { data } = await fetchSearchedComments({
          q: pagination.q as string,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        commentList.value = commentList.value.concat(data.data);
        pagination.count = data.count;
      }
    );

    const getCommentList = async () => {
      const { data } = await fetchSearchedComments({
        q: pagination.q as string,
        page: pagination.page,
        per_page: pagination.per_page,
      });
      commentList.value = data.data;
      pagination.count = data.count;
    };

    watch(
      () => route.query.q,
      (newVal) => {
        if (newVal) {
          getCommentList();
        }
      }
    );

    onMounted(() => {
      if (pagination.q) {
        getCommentList();
      }
    });

    return {
      search,
      pagination,
      commentList,
      isLastPage,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped></style>
