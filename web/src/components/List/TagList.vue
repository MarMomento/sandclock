<template>
  <List class="tag-list">
    <template v-slot:header>
      <template v-if="user.isLogin">
        <p
          class="fw-bolder fs-5 d-flex justify-content-between align-items-center"
        >
          我的标签
          <router-link to="/dashboard/following-tags">
            <i class="bi bi-nut text-muted fs-4"></i>
          </router-link>
        </p>
      </template>

      <template v-else>
        <p class="fw-bolder fs-5">最近热门标签</p>
      </template>
    </template>

    <template v-slot:list>
      <template v-if="tagList.length">
        <div class="tag-group-wrapper">
          <ul
            class="list-group tag-group"
            :style="{
              maxHeight: 8 * 40 + 'px',
              overflowY: tagList.length > 8 ? 'scroll' : '',
            }"
          >
            <li
              class="list-group-item tag-item"
              v-for="tag of tagList"
              :key="tag._id"
            >
              <router-link
                class="link-dark text-decoration-none tag-link d-block"
                :to="`/tag/${tag._id}`"
              >
                #{{ tag.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <div class="text-muted">
          <small>暂时没有关注的标签</small>
        </div>
      </template>
    </template>
  </List>
</template>

<script lang="ts">
import { IState, ITag } from "@/typings";
import { useStore } from "vuex";
import { computed, defineComponent, PropType } from "vue";
import List from "./index.vue";

export default defineComponent({
  name: "TagList",
  components: {
    List,
  },
  props: {
    tagList: {
      type: Array as PropType<ITag[]>,
      required: true,
    },
  },
  setup() {
    const store = useStore<IState>();
    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-list {
  .tag-group-wrapper {
    overflow-x: hidden;

    .tag-group {
      width: calc(100% + 12px);

      &::-webkit-scrollbar {
        background: $gray-200;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $gray-500;
      }
    }

    .tag-item {
      border: none;
      border-radius: 0.25rem;
      background-color: inherit;

      &:hover {
        background-color: $gray-100;

        .tag-link {
          color: $blue;
        }
      }
    }
  }
}
</style>
