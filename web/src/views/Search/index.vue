<template>
  <div class="container search-page py-3">
    <div class="row justify-content-center">
      <div class="col-9">
        <h2 class="mb-4 fw-bold">搜索结果</h2>

        <Tab type="leftRight" class="justify-content-between">
          <template #menu>
            <div class="col-3 me-3">
              <ul class="list-group settings-menu">
                <router-link
                  v-for="tab of tabs"
                  :key="tab.type"
                  :class="[
                    'list-group-item menu-item d-flex justify-content-between',
                    { active: currentTab.type === tab.type },
                  ]"
                  :to="`/search?q=${q}&filters=${tab.type}`"
                >
                  <span class="menu-link">
                    {{ tab.text }}
                  </span>
                  <span class="badge bg-secondary">{{ tab.count }}</span>
                </router-link>
              </ul>
            </div>
          </template>

          <template #content>
            <div class="col-9">
              <keep-alive>
                <component :is="currentTabComponent"></component>
              </keep-alive>
            </div>
          </template>
        </Tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import Tab from "@/components/Tab/index.vue";
import UserSearch from "./UserSearch.vue";
import TagSearch from "./TagSearch.vue";
import ArticleSearch from "./ArticleSearch.vue";
import CommentSearch from "./CommentSearch.vue";
import { useStore } from "vuex";
import { IState } from "@/typings";
import { ATS } from "@/store/actionTypes";

export default defineComponent({
  name: "Search",
  components: {
    Tab,
    UserSearch,
    TagSearch,
    ArticleSearch,
    CommentSearch,
  },
  setup() {
    const route = useRoute();
    const q = ref(route.query.q as string);
    const store = useStore<IState>();
    const state = reactive({
      q: ref(route.query.q as string),
      currentTab: {
        type: "User",
        text: "用户",
      },
      tabs: [
        {
          type: "User",
          text: "用户",
        },
        {
          type: "Tag",
          text: "标签",
        },
        {
          type: "Article",
          text: "文章",
        },
        {
          type: "Comment",
          text: "评论",
        },
      ],
    });

    const currentTabComponent = computed(() => {
      return state.currentTab.type + "Search";
    });

    const whiteList = ["User", "Tag", "Article", "Comment"];

    const getCurrentTab = () => {
      const filters = route.query.filters as string;

      if (whiteList.includes(filters)) {
        state.tabs.forEach((tab) => {
          if (tab.type === filters) {
            state.currentTab = tab;
          }
        });
      } else {
        state.currentTab = state.tabs[0];
      }
    };

    watch(
      [() => route.query.filters, () => route.query.q],
      ([newFilters, newQ], [oldFilters, oldQ]) => {
        if (newFilters !== oldFilters) {
          getCurrentTab();
        }
        if (newQ !== oldQ) {
          state.q = newQ as string;
        }
      }
    );

    onMounted(() => {
      getCurrentTab();
      if (q.value) {
        store.commit(ATS.SET_SEARCH, q.value);
      }
    });

    return {
      ...toRefs(state),
      currentTabComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  border: none;
  background-color: inherit;
  border-radius: $bd-radius-sm;

  &:hover {
    background-color: $gray-300;
    cursor: pointer;

    .menu-link {
      color: $blue;
    }
  }

  .menu-link {
    text-decoration: none;
    color: $gray-700;
  }

  &.active {
    background-color: $gray-100;

    .menu-link {
      color: $black;
      font-weight: bold;
    }
  }
}
</style>
