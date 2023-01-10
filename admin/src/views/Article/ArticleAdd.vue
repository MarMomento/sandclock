<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5 mb-3">添加文章</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="7">
                  <v-text-field
                    v-model="articleInfo.title"
                    label="文章标题"
                    autocomplete="off"
                    outlined
                    dense
                  ></v-text-field>

                  <v-file-input
                    accept="image/*"
                    label="上传封面"
                    v-model="uploadFile"
                    class="my-5"
                    outlined
                    dense
                  ></v-file-input>

                  <v-select
                    v-model="articleInfo.tags"
                    :items="tagsSelect"
                    :rules="tagRules"
                    label="给文章添加标签"
                    multiple
                    chips
                    persistent-hint
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-img :src="articleInfo.avatar_url"></v-img>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="24">
                  <vue-editor
                    v-model="articleInfo.content"
                    placeholder="请输入文章内容"
                  ></vue-editor>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-btn color="success" class="mr-4 mt-4" @click="submitForm">
                    发布
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FETCH_TAG_LIST } from "@/store/actionTypes";
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";
import { createArticle } from "@/api/index";

export default {
  name: "ArticleAdd",
  components: {
    VueEditor,
  },
  data: () => ({
    articleInfo: {
      title: "",
      content: "",
      avatar_url: "",
      tags: [],
    },
    uploadFile: null,
    tagRules: [
      (v) => !!v.length || "标签不能为空",
      (v) => v.length <= 4 || "最多只能添加4个标签",
    ],
  }),
  computed: {
    ...mapState(["tagList"]),
    tagsSelect() {
      return this.tagList.map((tag) => ({
        text: tag.name,
        value: tag._id,
      }));
    },
  },
  watch: {
    uploadFile(newValue) {
      if (newValue) {
        this.previewImageBeforeUpload(newValue, (dataURL) => {
          this.articleInfo.avatar_url = dataURL;
        });
      } else {
        this.articleInfo.avatar_url = "";
      }
    },
  },
  methods: {
    ...mapActions([FETCH_TAG_LIST]),
    async submitForm() {
      const passed = this.$refs.form.validate();
      if (passed) {
        if (this.uploadFile) {
          try {
            const { data } = await this.uploadImg(this.uploadFile);
            this.articleInfo.avatar_url = data.url;
          } catch (error) {
            //
          }
        }

        try {
          await createArticle(this.articleInfo);
          this.$message.success("发布文章成功");
          this.$router.push("/article/list");
        } catch (err) {
          //
        }
      } else {
        this.$message.error("请按正确格式填写");
      }
    },
  },
  created() {
    this.FETCH_TAG_LIST({
      page: 1,
      per_page: 100,
    });
  },
};
</script>

<style></style>
