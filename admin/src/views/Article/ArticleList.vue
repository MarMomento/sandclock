<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table
              :items="ARTICLE_LIST"
              :headers="headers"
              :search="search"
              sort-by="updated_at"
              :sort-desc="true"
              :loading="isLoading"
              loading-text="Loading... Please wait"
              v-model="selected"
              show-select
              item-key="_id"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-btn
                    color="primary"
                    class="mr-3"
                    @click="$router.push('/article/add')"
                  >
                    添加文章
                  </v-btn>

                  <v-btn color="error" @click="delAll"> 删除所有选中 </v-btn>

                  <v-spacer></v-spacer>
                  <!-- 搜索 -->
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>

                  <!-- 删除 -->
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >确定要删除吗?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >取消</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >确认</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:[`item.avatar_url`]="{ item }">
                <v-avatar
                  tile
                  size="48px"
                  style="width: auto"
                  v-if="item.avatar_url"
                >
                  <img :src="item.avatar_url" :alt="item.name" />
                </v-avatar>
              </template>

              <template v-slot:[`item.title`]="{ item }">
                <span
                  class="d-inline-block text-truncate"
                  style="max-width: 120px"
                >
                  {{ item.title }}
                </span>
              </template>

              <template v-slot:[`item.author`]="{ item }">
                {{ item.author.name }}
              </template>

              <template v-slot:[`item.tags`]="{ item }">
                <div class="d-flex justify-center align-center">
                  <v-chip
                    v-for="tag of item.tags"
                    :key="tag._id"
                    small
                    class="mr-1"
                    color="primary"
                  >
                    {{ tag.name }}
                  </v-chip>
                </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  class="mr-2"
                  color="primary"
                  @click="$router.push(`/article/edit/${item._id}`)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon color="error" @click="del(item)"> mdi-delete </v-icon>
              </template>

              <template v-slot:no-data> 暂时没有数据 </template>

              <template v-slot:no-results> 暂时没有符合条件的数据 </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { FETCH_ARTICLE_LIST } from "@/store/actionTypes";
import { deleteArticle } from "@/api/index";
import { formatDate } from "@/libs/utils";

export default {
  name: "ArticleList",
  data: () => ({
    isLoading: true,
    selected: [],
    isDelAll: false,
    search: "",
    dialogDelete: false,
    currentEditIndex: "",
    headers: [
      // {
      //   text: "封面",
      //   value: "avatar_url",
      //   align: "center",
      //   sortable: false,
      // },
      {
        text: "文章标题",
        value: "title",
        align: "center",
        sortable: false,
      },
      {
        text: "作者",
        value: "author",
        align: "center",
        sortable: false,
      },
      {
        text: "标签",
        value: "tags",
        align: "center",
        sortable: false,
      },
      {
        text: "点赞数",
        value: "thumb_count",
        align: "center",
        sortable: true,
      },
      {
        text: "收藏数",
        value: "collected_count",
        align: "center",
        sortable: true,
      },
      {
        text: "创建时间",
        value: "created_at",
        align: "center",
        sortable: true,
      },
      {
        text: "更新时间",
        value: "updated_at",
        align: "center",
        sortable: true,
      },
      {
        text: "操作",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapState(["articleList"]),
    ARTICLE_LIST() {
      return formatDate(this.articleList);
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    articleList(val) {
      if (val) {
        this.isLoading = false;
      }
    },
  },

  methods: {
    ...mapActions([FETCH_ARTICLE_LIST]),

    del(item) {
      this.dialogDelete = true;
      this.currentEditIndex = item._id;
    },

    delAll() {
      if (this.selected.length) {
        this.dialogDelete = true;
        this.isDelAll = true;
      } else {
        this.$message.error("请先选择要删除项");
      }
    },

    async deleteItemConfirm() {
      this.isLoading = true;
      try {
        if (this.isDelAll) {
          for (const article of this.selected) {
            await deleteArticle(article._id);
          }
        } else {
          await deleteArticle(this.currentEditIndex);
        }
        this.$message.success("删除成功");
        this.FETCH_ARTICLE_LIST({
          page: 1,
          per_page: 300,
        });
      } catch (error) {
        //
        this.isLoading = false;
      }
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.currentEditIndex = "";
      this.isDelAll = false;
    },
  },
  created() {
    this.FETCH_ARTICLE_LIST({
      page: 1,
      per_page: 300,
    });
  },
};
</script>
