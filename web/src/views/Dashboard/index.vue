<template>
  <div class="container settings-page py-3">
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4 fw-bold">Dashboard >> {{ currentTab.text }}</h2>

        <Tab type="leftRight" class="justify-content-between">
          <template #menu>
            <div class="col-3 me-3">
              <v-list-group class="side-menu">
                <v-list-item
                  v-for="tab of tabs"
                  :key="tab.type"
                  :class="[
                    'side-menu-item',
                    { active: currentTab.type === tab.type },
                  ]"
                >
                  <router-link
                    class="d-flex justify-content-between text-decoration-none"
                    :to="`/dashboard/${PascalToKebab(tab.type)}`"
                  >
                    <span class="side-menu-link">
                      {{ tab.text }}
                    </span>
                    <span class="badge bg-secondary">{{ tab.count }}</span>
                  </router-link>
                </v-list-item>
              </v-list-group>
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
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import Tab from "@/components/Tab/index.vue";
import FollowingUsersDashboard from "./FollowingUsersDashboard.vue";
import FollowingTagsDashboard from "./FollowingTagsDashboard.vue";
import PostsDashboard from "./PostsDashboard.vue";
import FollowersDashboard from "./FollowersDashboard.vue";
import useUser from "@/hooks/useUser";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Dashboard",
  components: {
    Tab,
    PostsDashboard,
    FollowersDashboard,
    FollowingUsersDashboard,
    FollowingTagsDashboard,
  },
  setup() {
    const { user } = useUser();
    const route = useRoute();

    const state = reactive({
      currentTab: {
        type: "Posts",
        text: "发布的文章",
      },
      tabs: [
        {
          type: "Posts",
          text: "发布的文章",
          count: user.value.info?.articles.length,
        },
        {
          type: "FollowingUsers",
          text: "关注的用户",
          count: user.value.info?.following_count,
        },
        {
          type: "Followers",
          text: "粉丝",
          count: user.value.info?.followers_count,
        },
        {
          type: "FollowingTags",
          text: "关注的标签",
          count: user.value.info?.following_tags.length,
        },
      ],
    });

    const currentTabComponent = computed(() => {
      return state.currentTab.type + "Dashboard";
    });

    const KebabToPascal = (str: string) => {
      const strs = str.split("-");
      return strs
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join("");
    };

    const PascalToKebab = (str: string) => {
      return str.replace(/[A-Z]/g, (c, i) => {
        return i === 0 ? c.toLowerCase() : "-" + c.toLowerCase();
      });
    };

    const whiteList = [
      "following-tags",
      "following-users",
      "posts",
      "followers",
    ];

    const getCurrentTab = () => {
      const pathMath = route.params.pathMatch;
      const path = typeof pathMath === "string" ? pathMath : pathMath[0];
      const newPath = KebabToPascal(path || "");

      if (whiteList.includes(path)) {
        state.tabs.forEach((tab) => {
          if (tab.type === newPath) {
            state.currentTab = tab;
          }
        });
      }
    };

    watch(
      () => route.params,
      (newVal) => {
        if (newVal.pathMatch) {
          getCurrentTab();
        }
      }
    );

    onMounted(() => {
      getCurrentTab();
    });

    return {
      ...toRefs(state),
      currentTabComponent,
      PascalToKebab,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings-menu {
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
}
</style>
