<template>
  <div class="container article-create-edit-page py-3">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9">
        <h2 class="mb-3 fw-bold">{{ isEdit ? "编辑文章" : "创作文章" }}</h2>
        <v-form ref="articleRef">
          <div class="row mb-3">
            <div class="col-lg-6 col-12">
              <v-form-item label="文章标题" class="mb-3">
                <v-input
                  placeholder="请输入文章标题"
                  v-model="articleInfo.title"
                  :rules="titleRules"
                />
              </v-form-item>

              <v-form-item label="文章标签" class="mb-3">
                <v-select
                  placeholder="请最多选择4个标签"
                  v-model="articleInfo.tags"
                  :rules="tagRules"
                  :items="tagItems"
                />
              </v-form-item>

              <v-form-item label="文章封面" class="mb-3">
                <v-upload
                  placeholder="请上传图片"
                  v-model="articleInfo.avatar_url"
                  :rules="checkImg"
                  @upload-success="uploadSuccess"
                />
              </v-form-item>
            </div>

            <div class="col-lg-6 col-12">
              <v-form-item label="封面预览" class="mb-3">
                <preview-image
                  :url="articleInfo.avatar_url"
                  width="100%"
                  height="230px"
                  placeholder="预览封面"
                />
              </v-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <v-form-item label="文章内容">
                <v-editor
                  placeholder="请输入文章内容"
                  v-model="articleInfo.content"
                  :rules="contentRules"
                />
              </v-form-item>
            </div>
          </div>

          <v-btn color="primary mt-3" class="py-2 px-4" @click="publish">
            {{ isEdit ? "重新发布" : "发布" }}
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import {
  computed,
  defineComponent,
  onActivated,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import VEditor from "@/components/Form/VEditor.vue";
import useRules from "@/hooks/useRules";
import { ITag } from "@/typings";
import {
  createArticle,
  fetchArticle,
  fetchPopularTags,
  updateArticle,
} from "@/api";
import $message from "@/components/Message";
import PreviewImage from "@/components/PreviewImage.vue";

export default defineComponent({
  name: "ArticleCreateAndEdit",
  components: {
    VEditor,
    PreviewImage,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.params.id as string);

    const state = reactive({
      isEdit: computed(() => (id.value ? true : false)),
      articleRef: ref<null | HTMLFormElement>(null),
      articleInfo: {
        title: "",
        content: "",
        tags: [] as string[],
        avatar_url: "",
      },
    });
    const tagList = ref<ITag[]>([]);
    const tagItems = computed(() =>
      tagList.value.map((item) => ({
        text: item.name,
        value: item._id,
      }))
    );
    const { titleRules, tagRules, contentRules } = useRules();

    const checkImg = (file: File): boolean => {
      const type = file.type;
      if (type.indexOf("image") === -1) {
        $message({
          type: "warn",
          message: "请上传jpg,jpeg,png格式的文件",
        });
        return false;
      }
      return true;
    };

    const uploadSuccess = () => {
      $message({
        type: "success",
        message: "图片上传成功",
      });
    };

    const getTagList = async () => {
      const { data } = await fetchPopularTags();
      tagList.value = data;
    };

    const getArticle = async () => {
      const { data } = await fetchArticle(id.value);
      state.articleInfo.title = data.title;
      state.articleInfo.content = data.content;
      state.articleInfo.tags = data.tags.map((tag) => tag._id);
      state.articleInfo.avatar_url = data.avatar_url;
    };

    const publish = async () => {
      const result = state.articleRef?.validate();
      if (!result) {
        $message({
          type: "warn",
          message: "请输入正确的数据",
        });
        return;
      }

      try {
        if (state.isEdit) {
          // republic
          await updateArticle(id.value, state.articleInfo);
          $message({
            type: "success",
            message: "编辑成功,即将跳转到文章详情页",
          });
        } else {
          // publish
          const { data } = await createArticle(state.articleInfo);
          id.value = data._id;
          $message({
            type: "success",
            message: "发布成功,即将跳转到文章详情页",
          });
        }
        setTimeout(() => {
          router.push(`/article/${id.value}`);
        }, 500);
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      getTagList();
      if (id.value) {
        getArticle();
      }
    });

    const resetArticleInfo = () => {
      id.value = "";
      state.articleInfo = {
        title: "",
        content: "",
        tags: [],
        avatar_url: "",
      };
    };

    onBeforeRouteLeave((to, from) => {
      if (from.name === "ArticleEdit" && to.name === "ArticleCreate") {
        resetArticleInfo();
      } else if (from.name === "ArticleCreate" && to.name === "ArticleEdit") {
        id.value = to.params.id as string;
        getArticle();
      }
    });

    onActivated(() => {
      resetArticleInfo();
      id.value = route.params.id as string;
      if (id.value) {
        getArticle();
      }
    });

    return {
      ...toRefs(state),
      tagItems,
      publish,
      titleRules,
      tagRules,
      contentRules,
      checkImg,
      uploadSuccess,
    };
  },
});
</script>

<style lang="scss" scoped></style>
