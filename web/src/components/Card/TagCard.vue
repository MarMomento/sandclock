<template>
  <!-- 标签列表卡片 -->
  <Card class="tag-card" v-if="!isDetail">
    <template v-slot:header>
      <div class="tag-color-bar" :style="{ backgroundColor: color }"></div>
    </template>

    <template v-slot:title>
      <img
        class="tag-icon position-absolute end-0 bottom-0"
        v-if="tag.avatar_url"
        :src="tag.avatar_url"
      />
      <h5 class="card-title fw-bolder tag-title">
        <router-link
          class="text-decoration-none text-dark"
          :to="`/tag/${tag._id}`"
          >#{{ tag.name }}</router-link
        >
      </h5>
    </template>

    <template v-slot:text>
      <p class="card-text">
        {{ tag.description }}
      </p>
    </template>

    <template v-slot:action>
      <div class="mt-auto">
        <p class="tag-detail text-muted">
          <small class="me-2"> 已发表 {{ tag.articles_count }} 篇文章 </small>
          <small> 已有 {{ tag.followers_count }} 人关注 </small>
        </p>
        <button
          type="button"
          :class="[
            'btn  px-4 mt-auto',
            isFollowing ? 'btn-secondary' : 'btn-outline-secondary',
          ]"
          @click="followTag(tag)"
        >
          {{ isFollowing ? "已关注" : "关注" }}
        </button>
      </div>
    </template>
  </Card>

  <!-- 标签详情卡片 -->
  <Card class="tag-card tag-detail-card" v-else>
    <template v-slot:header>
      <div class="tag-color-bar" :style="{ backgroundColor: color }"></div>
    </template>

    <template v-slot:text>
      <div class="d-flex px-lg-4 py-lg-3">
        <img class="tag-icon" v-if="tag.avatar_url" :src="tag.avatar_url" />
        <div class="w-100 ms-4">
          <h5 class="card-title fw-bolder d-flex justify-content-between">
            <span class="text-dark fs-2">#{{ tag.name }}</span>
            <button
              type="button"
              :class="[
                'btn  px-4 mt-auto',
                isFollowing ? 'btn-secondary' : 'btn-outline-secondary',
              ]"
              @click="followTag(tag)"
            >
              {{ isFollowing ? "已关注" : "关注" }}
            </button>
          </h5>
          <p class="card-text col-12 col-md-8">
            {{ tag.description }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { IState, ITag } from "@/typings";
import { computed, defineComponent, PropType } from "vue";
import { randomHexColor } from "@/libs/utils";
import { useStore } from "vuex";
import Card from "./index.vue";

export default defineComponent({
  name: "TagCard",
  components: {
    Card,
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: Object as PropType<ITag>,
      required: true,
    },
  },
  emits: ["follow-tag"],
  setup(props, { emit }) {
    const color = randomHexColor();

    const store = useStore<IState>();
    const user = computed(() => store.state.user);
    const isFollowing = computed(() => {
      if (user.value.info) {
        return user.value.info.following_tags.includes(props.tag._id);
      } else {
        return false;
      }
    });

    const followTag = (tag: ITag) => {
      emit("follow-tag", isFollowing.value, tag);
    };

    return {
      color,
      isFollowing,
      followTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-card {
  border-radius: $bd-radius-sm;
  height: 100%;

  .tag-color-bar {
    height: 0.8rem;
    border-radius: $bd-radius-sm $bd-radius-sm 0 0;
  }

  .tag-icon {
    transform: rotate(-10deg);
    width: 64px;
    height: 64px;
  }

  .tag-title {
    a:hover {
      color: $blue !important;
    }
  }
}
</style>
