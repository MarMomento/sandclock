<template>
  <Tab class="article-tab">
    <template v-slot:menu>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="fw-bolder fs-5">最新文章</div>
        <ul class="nav nav-tabs article-tabs">
          <li class="nav-item" v-for="tab of tabs" :key="tab.type">
            <button
              :class="['nav-link', { active: currentTab === tab.type }]"
              type="button"
              @click="changeTab(tab.type)"
            >
              {{ tab.text }}
            </button>
          </li>
        </ul>
      </div>
    </template>

    <template v-slot:content>
      <template v-for="(article, i) of articleList" :key="article._id">
        <ArticleCard
          :showImg="isUnderTag ? false : i === 0"
          :article="article"
          class="mb-3"
          @collect-article="collectTheArticle"
        ></ArticleCard>
      </template>
    </template>
  </Tab>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Tab from "./index.vue";
import ArticleCard from "@/components/Card/ArticleCard.vue";
import { IArticle, ITab } from "@/typings";
import useArticle from "@/hooks/useArticle";

export default defineComponent({
  name: "ArticleTab",
  components: {
    Tab,
    ArticleCard,
  },
  props: {
    isUnderTag: {
      type: Boolean,
      default: false,
    },
    currentTab: {
      type: String,
      required: true,
    },
    tabs: {
      type: Object as PropType<ITab[]>,
      required: true,
    },
    articleList: {
      type: Array as PropType<IArticle[]>,
      required: true,
    },
  },
  emits: ["change-tab"],
  setup(props, { emit }) {
    const { collectTheArticle } = useArticle();

    const changeTab = (type: string) => {
      if (props.currentTab === type) return;
      emit("change-tab", type);
    };

    return {
      collectTheArticle,
      changeTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-tabs {
  border: none;

  .nav-link {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0.2rem;
    margin-left: 1rem;
    border: none;
    color: #000;

    &.active {
      border: none;
      background-color: transparent;
      color: $blue;
      border-bottom: 3px solid $blue;
      font-weight: bold;
    }
  }
}
</style>
