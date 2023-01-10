<template>
  <div class="container-fluid profile-page pb-4">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="row mb-4">
          <div class="col-12">
            <UserProfileCard
              v-if="user"
              :author="user"
              @follow-user="followTheUser"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <List v-if="user" class="avatar-intro p-3 text-muted border">
              <template v-slot:list>
                <div>
                  <i class="bi bi-vector-pen"></i>
                  发表了 {{ articleCount }} 篇文章
                </div>
                <div>
                  <i class="bi bi-stickies"></i>
                  编写了 {{ commentCount }} 条评论
                </div>
                <div>
                  <i class="bi bi-tags"></i>
                  关注了
                  {{ user.following_tags && user.following_tags.length }}
                  个标签
                </div>
                <div>
                  <i class="bi bi-people"></i>
                  关注 {{ user.following_count }} 个用户
                </div>
                <div>
                  <i class="bi bi-people-fill"></i>
                  拥有 {{ user.followers_count }} 个粉丝
                </div>
              </template>
            </List>
          </div>

          <div class="col-8">
            <ArticleCard
              v-if="articleList[0]"
              :showImg="false"
              :article="articleList[0]"
              class="mb-3"
              @collect-article="collectTheArticle"
            ></ArticleCard>

            <RecentCommentList
              v-if="commentList"
              :commentList="commentList"
              class="mb-3"
            />

            <template v-for="(article, i) of articleList" :key="article._id">
              <ArticleCard
                v-if="i !== 0"
                :showImg="false"
                :article="article"
                class="mb-3"
                @collect-article="collectTheArticle"
              ></ArticleCard>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {
  defineComponent,
  onActivated,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { fetchUserProfile } from "@/api";
import { IArticle, IComment, IUser } from "@/typings";
import UserProfileCard from "@/components/Card/UserProfileCard.vue";
import useUser from "@/hooks/useUser";
import List from "@/components/List/index.vue";
import RecentCommentList from "@/components/List/RecentCommentList.vue";
import ArticleCard from "@/components/Card/ArticleCard.vue";
import useArticle from "@/hooks/useArticle";

export default defineComponent({
  name: "Profile",
  components: {
    UserProfileCard,
    List,
    RecentCommentList,
    ArticleCard,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id as string);
    const state = reactive({
      user: null as IUser | null,
      commentList: [] as IComment[],
      commentCount: 0,
      articleList: [] as IArticle[],
      articleCount: 0,
    });

    const { followTheUser } = useUser();
    const { collectTheArticle } = useArticle();

    const getUserProfile = async () => {
      const { data } = await fetchUserProfile(id.value);
      state.user = data.user;
      state.commentList = data.commentList;
      state.commentCount = data.commentCount;
      state.articleList = data.articleList;
      state.articleCount = data.articleCount;
    };

    onMounted(() => {
      getUserProfile();
    });

    onActivated(() => {
      id.value = route.params.id as string;
      getUserProfile();
    });

    return {
      ...toRefs(state),
      followTheUser,
      collectTheArticle,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-page {
  background: linear-gradient(
    180deg,
    #194085 0%,
    #194085 150px,
    rgba(0, 0, 0, 0) 150px
  );

  .avatar-intro {
    background-color: #f9fafa;
    border-radius: 8px;

    div {
      + div {
        margin-top: 14px;
      }

      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
