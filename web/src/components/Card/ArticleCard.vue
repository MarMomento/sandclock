<template>
  <!-- 文章详情卡片 -->
  <Card
    class="article-card article-detail-card position-relative"
    v-bind="$attrs"
    v-if="isDetail"
  >
    <template v-slot:header>
      <a
        :href="`/uploads${article.avatar_url.slice(
          article.avatar_url.lastIndexOf('/')
        )}`"
        target="_blank"
      >
        <img
          v-if="article.avatar_url"
          :src="article.avatar_url"
          class="article-post article-img w-100"
        />
      </a>
    </template>

    <template v-slot:title>
      <h2
        class="card-title article-detail-title fw-bolder text-center px-lg-5 my-4 font-monospace"
      >
        {{ article.title }}
      </h2>

      <div class="article-tags d-flex px-lg-5 mb-3">
        <template v-for="(tag, i) of article.tags" :key="tag._id">
          <router-link
            :to="`/tag/${tag._id}`"
            class="tag-detail px-2 rounded"
            :style="{ backgroundColor: randomColor[i] }"
          >
            <small>#{{ tag.name }}</small>
          </router-link>
        </template>
      </div>

      <div class="author-profile px-lg-5 mb-4">
        <div class="d-flex align-items-center flex-wrap">
          <router-link
            :to="`/profile/${article.author._id}`"
            class="text-decoration-none text-dark"
          >
            <img
              :src="article.author.avatar_url || require('@/assets/user.png')"
              style="width: 40px; height: 40px"
              class="border rounded-circle me-3"
            />
            <span class="author-name fw-bold">
              {{ article.author.nickName }}
            </span>
          </router-link>

          <div class="ms-2 text-muted">
            <small> 创建时间: {{ fromNow(article.created_at) }} </small>
            <small> 更新时间: {{ fromNow(article.updated_at) }} </small>
          </div>

          <div
            v-if="article.author._id === (user.info && user.info._id)"
            class="ms-2 mt-2 mt-lg-0"
          >
            <router-link :to="`/edit/${article._id}`" class="btn btn-secondary">
              <small>编辑文章</small>
            </router-link>
            <router-link to="/dashboard/posts" class="btn btn-secondary ms-2">
              <small>管理文章</small>
            </router-link>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:text>
      <div class="card-text px-lg-5" v-hlight v-html="article.content"></div>
    </template>

    <template v-slot:action>
      <div
        class="article-aside-bar d-flex flex-column d-none d-md-flex"
        ref="asideBarRef"
      >
        <button
          class="btn article-btn py-3 shadow-none"
          type="button"
          @click="starArticle(article)"
        >
          <span :class="['icon-wrapper heart-wrapper', { starred: isStarred }]">
            <i
              :class="['bi fs-5', isStarred ? 'bi-heart-fill' : 'bi-heart']"
            ></i>
          </span>
          <br />
          <span class="text-muted">{{ article.thumb_count }}</span>
        </button>
        <button
          class="btn article-btn py-3 shadow-none"
          type="button"
          @click="collectArticle(article)"
        >
          <span
            :class="[
              'icon-wrapper bookmark-wrapper',
              { collected: isCollected },
            ]"
          >
            <i
              :class="[
                'bi fs-5',
                isCollected ? 'bi-bookmark-fill' : 'bi-bookmark',
              ]"
            ></i>
          </span>
          <br />
          <span class="text-muted">{{ article.collected_count }}</span>
        </button>
        <!-- TODO: 转发等其他功能
        <button
          class="btn article-btn article-more-btn py-3 shadow-none"
          type="button"
        >
          <span class="icon-wrapper more-wrapper"
            ><i class="bi bi-three-dots fs-4"></i
          ></span>
        </button> -->
      </div>
    </template>
  </Card>
  <!-- 文章收藏夹卡片 -->
  <Card v-bind="$attrs" class="article-card" v-else-if="isBookmarks">
    <template v-slot:text>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <router-link :to="`/profile/${article.author._id}`">
            <img
              :src="article.author.avatar_url || require('@/assets/user.png')"
              style="width: 40px; height: 40px"
              class="border rounded-circle me-3"
            />
          </router-link>
          <div class="d-flex flex-column">
            <h5 class="card-title">
              <router-link
                :to="`/article/${article._id}`"
                class="article-title fs-5 text-dark fw-bolder"
              >
                {{ article.title }}
              </router-link>
            </h5>
            <div class="d-flex align-items-center">
              <router-link
                :to="`/profile/${article.author._id}`"
                class="text-decoration-none text-dark"
              >
                <small class="fw-bold me-2">{{
                  article.author.nickName
                }}</small>
              </router-link>
              <div>
                <small class="text-muted me-3">{{
                  fromNow(article.updated_at)
                }}</small>
              </div>
              <div class="article-tags">
                <template v-for="tag of article.tags" :key="tag._id">
                  <router-link :to="`/tag/${tag._id}`" class="tag">
                    <small>#{{ tag.name }}</small>
                  </router-link>
                </template>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          :class="[
            'btn px-3',
            isCollected ? 'btn-primary' : 'btn-outline-primary',
          ]"
          @click="collectArticle(article)"
        >
          {{ isCollected ? "已收藏" : "收藏" }}
        </button>
      </div>
    </template>
  </Card>
  <!-- 文章列表卡片 -->
  <Card v-bind="$attrs" class="article-card" v-else>
    <template v-slot:header>
      <router-link
        v-if="showImg && article.avatar_url"
        :to="`/article/${article._id}`"
        :class="['article-post', { 'top-article-post': showImg }]"
        :style="{
          backgroundImage: showImg ? `url(${article.avatar_url})` : '',
        }"
      >
      </router-link>

      <div class="author-profile px-4 pt-3">
        <div class="d-flex align-items-center">
          <div>
            <router-link :to="`/profile/${article.author._id}`">
              <img
                :src="article.author.avatar_url || require('@/assets/user.png')"
                style="width: 40px; height: 40px"
                class="border rounded-circle me-3"
              />
            </router-link>
          </div>
          <div>
            <router-link
              :to="`/profile/${article.author._id}`"
              class="author-name text-decoration-none text-dark"
              >{{ article.author.nickName }}</router-link
            >
            <div class="text-dark">
              <small>{{ fromNow(article.updated_at) }}</small>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:title>
      <h5 class="card-title ps-5">
        <router-link
          :to="`/article/${article._id}`"
          class="article-title fs-3 text-dark fw-bolder"
        >
          {{ article.title }}
        </router-link>
      </h5>
    </template>

    <template v-slot:text>
      <div class="article-tags ps-5 mb-2">
        <template v-for="tag of article.tags" :key="tag._id">
          <router-link :to="`/tag/${tag._id}`" class="tag">
            <small>#{{ tag.name }}</small>
          </router-link>
        </template>
      </div>
    </template>

    <template v-slot:action>
      <div
        class="article-actions ps-5 d-flex justify-content-between align-items-center"
      >
        <div>
          <router-link
            :to="`/article/${article._id}`"
            class="btn btn-link btn-sm me-3"
          >
            <i class="bi bi-heart me-1"></i>
            {{ article.thumb_count }} 赞
          </router-link>
          <router-link
            :to="`/article/${article._id}`"
            class="btn btn-link btn-sm"
          >
            <i class="bi bi-chat me-1"> </i>
            {{ article.comment_count }} 评论
          </router-link>
        </div>

        <div>
          <button
            type="button"
            :class="[
              'btn px-3',
              isCollected ? 'btn-primary' : 'btn-outline-primary',
            ]"
            @click="collectArticle(article)"
          >
            {{ isCollected ? "已收藏" : "收藏" }}
          </button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { IArticle, IState } from "@/typings";
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import Card from "./index.vue";
import { randomHexColor } from "@/libs/utils";
import useDayjs from "@/hooks/useDayjs";

export default defineComponent({
  name: "ArticleCard",
  components: {
    Card,
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    isBookmarks: {
      type: Boolean,
      default: false,
    },
    showImg: {
      type: Boolean,
      default: true,
    },
    article: {
      type: Object as PropType<IArticle>,
      required: true,
    },
  },
  emits: ["collect-article", "star-article"],
  setup(props, { emit }) {
    const asideBarRef = ref<null | HTMLElement>(null);
    const store = useStore<IState>();
    const user = computed(() => store.state.user);
    const isCollected = computed(() => {
      if (user.value.info) {
        return user.value.info.collected_articles.includes(props.article._id);
      } else {
        return false;
      }
    });
    const isStarred = computed(() => {
      if (user.value.info) {
        return user.value.info.starred_articles.includes(props.article._id);
      } else {
        return false;
      }
    });

    const { fromNow } = useDayjs();

    const collectArticle = (article: IArticle) => {
      emit("collect-article", isCollected.value, article);
    };

    const starArticle = (article: IArticle) => {
      emit("star-article", isStarred.value, article);
    };

    const randomColor = [];
    for (let i = 0; i < 4; i++) {
      randomColor.push(randomHexColor());
    }

    onMounted(() => {
      let offsetTop = 0;
      if (asideBarRef.value) {
        offsetTop = asideBarRef.value.offsetTop;
      }
      document.addEventListener("scroll", () => {
        const top = document.documentElement.scrollTop;
        if (asideBarRef.value) {
          asideBarRef.value.style.top = top + offsetTop + "px";
        }
      });
    });

    return {
      user,
      isCollected,
      isStarred,
      collectArticle,
      starArticle,
      randomColor,
      fromNow,
      asideBarRef,
    };
  },
});
</script>

<style lang="scss">
.article-card {
  border-radius: $bd-radius-sm;
  border-width: 2px;

  &:not(.article-detail-card):hover {
    border-color: $blue;
  }

  &.article-detail-card {
    border-radius: $bd-radius-sm $bd-radius-sm 0 0;
    transform: translate(0, 0);
  }

  .article-post {
    border-radius: $bd-radius-sm $bd-radius-sm 0 0;

    &.top-article-post {
      padding-top: 35%;
      background-size: cover;
    }

    &.article-img {
      object-fit: cover;
      height: 340px;
    }
  }

  .article-title {
    text-decoration: none;

    &:hover {
      color: $blue-600 !important;
    }
  }

  .article-detail-title {
    font-size: 3rem;
  }

  .article-tags {
    .tag {
      text-decoration: none;
      color: $gray-600;

      + .tag {
        margin-left: 1rem;
      }

      &:hover {
        color: $gray-700 !important;
      }
    }

    .tag-detail {
      text-decoration: none;
      color: $gray-100;

      + .tag-detail {
        margin-left: 0.5rem;
      }
    }
  }

  .author-profile {
    .author-name {
      vertical-align: middle;
    }
  }

  .article-actions {
    .btn-link {
      border-radius: $bd-radius-sm;
      text-decoration: none;
      color: $gray-600;

      &:hover {
        background-color: $gray-200;
      }
    }
  }

  .article-aside-bar {
    position: fixed;
    top: 40px;
    left: -11%;

    .article-btn {
      .icon-wrapper {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
      }

      .icon-wrapper {
        [class*=" bi-"]::before {
          font-weight: bold !important;
        }

        &.starred {
          background-color: $color-red-1;
          color: $red;
          border: 2px solid $red;
        }

        &.collected {
          background-color: $color-blue-1;
          color: $blue-600;
          border: 2px solid $blue-600;
        }
      }

      &:hover {
        .icon-wrapper {
          &.heart-wrapper {
            background-color: $color-red-1;
            color: $red;
          }

          &.bookmark-wrapper {
            background-color: $color-blue-1;
            color: $blue-600;
          }

          &.more-wrapper {
            background-color: $gray-300;
            color: #000;
          }
        }
      }
    }
  }
}
.article-detail-card {
  img {
    max-width: 100%;
  }
}
</style>
