<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table
              :items="COMMENT_LIST"
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
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-title class="mb-3">
                        <span class="headline">编辑评论</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- 编辑/添加 -->
                            <v-col cols="12" sm="6" md="12">
                              <v-textarea
                                v-model="editItem.content"
                                label="评论内容"
                                rows="5"
                                no-resize
                                outlined
                                hide-details
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions class="justify-end">
                        <v-btn color="blue darken-1" text @click="close">
                          取消
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          保存
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

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

              <template v-slot:[`item.content`]="{ item }">
                <span
                  class="d-inline-block text-truncate"
                  style="max-width: 200px"
                >
                  {{ item.content }}
                </span>
              </template>

              <template v-slot:[`item.commentator`]="{ item }">
                {{ item.commentator && item.commentator.nickName }}
              </template>

              <template v-slot:[`item.reply_to`]="{ item }">
                <span
                  class="d-inline-block text-truncate"
                  style="max-width: 150px"
                >
                  {{ item.reply_to && item.reply_to.content }}
                </span>
              </template>

              <template v-slot:[`item.article_id`]="{ item }">
                <span
                  class="d-inline-block text-truncate"
                  style="max-width: 100px"
                >
                  {{ item.article_id && item.article_id.title }}
                </span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="mr-2" color="primary" @click="edit(item)">
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
import { FETCH_COMMENT_LIST } from "@/store/actionTypes";
import { deleteComment, updateComment } from "@/api/index";
import { formatDate, resetReactiveProps } from "@/libs/utils";

export default {
  name: "CommentList",
  data: () => ({
    isLoading: true,
    selected: [],
    isDelAll: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    currentEditIndex: "",
    headers: [
      {
        text: "评论内容",
        value: "content",
        align: "center",
        sortable: false,
      },
      {
        text: "评论人",
        value: "commentator",
        align: "center",
        sortable: false,
      },
      {
        text: "被回复的评论",
        value: "reply_to",
        align: "center",
        sortable: false,
      },
      {
        text: "评论的文章",
        value: "article_id",
        align: "center",
        sortable: false,
      },
      {
        text: "评论的点赞数",
        value: "thumb_count",
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
    editItem: {
      content: "",
    },
  }),

  computed: {
    ...mapState(["commentList"]),
    COMMENT_LIST() {
      return formatDate(this.commentList);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    commentList(val) {
      if (val) {
        this.isLoading = false;
      }
    },
  },

  methods: {
    ...mapActions([FETCH_COMMENT_LIST]),

    edit(item) {
      this.dialog = true;
      this.currentEditIndex = item._id;
      this.editItem = {
        content: item.content,
      };
    },

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
          for (const comment of this.selected) {
            await deleteComment(comment._id);
          }
        } else {
          await deleteComment(this.currentEditIndex);
        }
        this.$message.success("删除成功");
        this.FETCH_COMMENT_LIST({
          page: 1,
          per_page: 300,
        });
      } catch (error) {
        this.isLoading = false;
      }

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.currentEditIndex = "";
      this.editItem = resetReactiveProps(this.editItem);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.currentEditIndex = "";
      this.isDelAll = false;
    },

    async save() {
      await updateComment(this.currentEditIndex, this.editItem);
      this.$message.success("更新成功");

      this.FETCH_COMMENT_LIST({
        page: 1,
        per_page: 300,
      });
      this.isLoading = true;
      this.close();
    },
  },
  created() {
    this.FETCH_COMMENT_LIST({
      page: 1,
      per_page: 300,
    });
  },
};
</script>
