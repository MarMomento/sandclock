<template>
  <div class="col-12">
    <template v-if="userList.length">
      <v-list-group>
        <v-list-item
          v-for="user of userList"
          :key="user._id"
          class="py-3 px-4"
          action
        >
          <user-card :user="user" />
        </v-list-item>
      </v-list-group>

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
import { fetchSearchedUsers } from "@/api";
import useLoadMore from "@/hooks/useLoadMore";
import { IState, IUser } from "@/typings";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import LoadMore from "@/components/LoadMore/index.vue";
import UserCard from "./components/UserCard.vue";

export default defineComponent({
  name: "UserSearch",
  components: {
    LoadMore,
    UserCard,
  },
  setup() {
    const store = useStore<IState>();
    const search = computed(() => store.state.search);
    const route = useRoute();

    const userList = ref<IUser[]>([]);

    const { pagination, isLastPage, loadMore } = useLoadMore(
      {
        q: computed(() => store.state.search),
        page: 1,
        per_page: 10,
        count: 0,
      },
      async () => {
        const { data } = await fetchSearchedUsers({
          q: pagination.q as string,
          page: pagination.page + 1,
          per_page: pagination.per_page,
        });
        userList.value = userList.value.concat(data.data);
        pagination.count = data.count;
      }
    );

    const getUserList = async () => {
      const { data } = await fetchSearchedUsers({
        q: pagination.q as string,
        page: pagination.page,
        per_page: pagination.per_page,
      });
      userList.value = data.data;
      pagination.count = data.count;
    };

    watch(
      () => route.query.q,
      (newVal) => {
        if (newVal) {
          getUserList();
        }
      }
    );

    onMounted(() => {
      if (pagination.q) {
        getUserList();
      }
    });

    return {
      search,
      pagination,
      userList,
      isLastPage,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped></style>
