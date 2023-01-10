<template>
  <div class="container bookmarks-page py-3">
    <div class="row">
      <div class="col-12">
        <Tab type="leftRight" class="justify-content-between">
          <template #menu>
            <div class="col-3 pe-3">
              <v-list-group class="side-menu">
                <v-list-item
                  v-for="tag of tagList"
                  :key="tag"
                  :class="['side-menu-item', { active: currentTag === tag }]"
                  @click="currentTag = tag"
                >
                  <span class="side-menu-link"> #{{ tag }} </span>
                </v-list-item>
              </v-list-group>
            </div>
          </template>

          <template #content>
            <div class="col-9">
              <article-list :articleList="filterArticleList" />
            </div>
          </template>
        </Tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchCollectedArticles } from "@/api";
import { IArticle } from "@/typings";
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import Tab from "@/components/Tab/index.vue";
import ArticleList from "@/components/List/ArticleList.vue";

export default defineComponent({
  name: "Bookmarks",
  components: {
    Tab,
    ArticleList,
  },
  setup() {
    const state = reactive({
      articleList: [] as IArticle[],
      tagList: new Set<string>(),
      currentTag: "all tags",
    });

    const filterArticleList = computed(() => {
      if (state.currentTag === "all tags") {
        return state.articleList;
      } else {
        return state.articleList.filter((article) => {
          let hasCurrentTag = false;
          article.tags.forEach((tag) => {
            if (tag.name === state.currentTag) {
              hasCurrentTag = true;
            }
          });
          return hasCurrentTag;
        });
      }
    });

    const getArticleList = async () => {
      const { data } = await fetchCollectedArticles();
      state.articleList = data.reverse();
    };

    const getTagList = () => {
      state.tagList.add(state.currentTag);
      if (state.articleList.length) {
        state.articleList.forEach((article) => {
          if (article.tags.length) {
            article.tags.forEach((tag) => {
              state.tagList.add(tag.name);
            });
          }
        });
      }
    };

    onMounted(async () => {
      await getArticleList();
      getTagList();
    });

    return {
      ...toRefs(state),
      filterArticleList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
