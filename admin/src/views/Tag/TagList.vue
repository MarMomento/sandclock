<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table
              :items="TAG_LIST"
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
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        添加标签
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="mb-3">
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- 编辑/添加 -->
                            <v-col cols="12" sm="6" md="8">
                              <v-text-field
                                v-model="editItem.name"
                                label="标签名"
                                outlined
                                dense
                              ></v-text-field>

                              <v-file-input
                                accept="image/*"
                                label="上传封面"
                                v-model="uploadFile"
                                outlined
                                dense
                              ></v-file-input>
                            </v-col>

                            <v-col cols="12" sm="6" md="4" class="d-flex">
                              <v-img
                                :src="editItem.avatar_url"
                                aspect-ratio="1.7"
                                contain
                              ></v-img>
                            </v-col>

                            <v-col cols="12" sm="6" md="12">
                              <v-textarea
                                v-model="editItem.description"
                                label="标签简介"
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

              <template v-slot:[`item.avatar_url`]="{ item }">
                <v-avatar size="36px" v-if="item.avatar_url">
                  <img :src="item.avatar_url" :alt="item.name" />
                </v-avatar>
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
import { FETCH_TAG_LIST } from "@/store/actionTypes";
import { createTag, deleteTag, updateTag } from "@/api/index";
import { formatDate, resetReactiveProps } from "@/libs/utils";

export default {
  name: "TagList",
  data: () => ({
    isLoading: true,
    selected: [],
    isDelAll: false,
    search: "",
    uploadFile: null,
    dialog: false, // 添加/编辑dialog
    dialogDelete: false, // 删除dialog
    headers: [
      {
        text: "图标",
        value: "avatar_url",
        align: "center",
        sortable: false,
      },
      {
        text: "标签名",
        value: "name",
        align: "center",
        sortable: false,
      },
      {
        text: "关注人数",
        value: "followers_count",
        align: "center",
        sortable: true,
      },
      {
        text: "发布文章数",
        value: "articles_count",
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
    isEdit: false,
    currentEditIndex: "", // 当前操作对象的id
    // 创建或编辑的对象
    editItem: {
      name: "",
      avatar_url: "",
      description: "",
    },
  }),

  computed: {
    ...mapState(["tagList"]),
    TAG_LIST() {
      return formatDate(this.tagList);
    },
    formTitle() {
      return this.isEdit ? "编辑标签" : "新建标签";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    uploadFile(newValue) {
      if (newValue) {
        this.previewImageBeforeUpload(newValue, (dataURL) => {
          this.editItem.avatar_url = dataURL;
        });
      } else {
        this.editItem.avatar_url = "";
      }
    },
    tagList(val) {
      if (val) {
        this.isLoading = false;
      }
    },
  },

  methods: {
    ...mapActions([FETCH_TAG_LIST]),

    // 编辑/删除
    edit(item) {
      this.dialog = true;
      this.isEdit = true;
      this.currentEditIndex = item._id;
      this.editItem = {
        name: item.name,
        avatar_url: item.avatar_url,
        description: item.description,
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

    // 确认删除
    async deleteItemConfirm() {
      this.isLoading = true;

      try {
        if (this.isDelAll) {
          for (const tag of this.selected) {
            await deleteTag(tag._id);
          }
        } else {
          await deleteTag(this.currentEditIndex);
        }
        this.$message.success("删除成功");
        this.FETCH_TAG_LIST({
          page: 1,
          per_page: 300,
        });
      } catch (error) {
        //
        this.isLoading = false;
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.isEdit = false;
      this.currentEditIndex = "";
      this.editItem = resetReactiveProps(this.editItem);
      this.uploadFile = null;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.currentEditIndex = "";
      this.isDelAll = false;
    },

    async save() {
      try {
        if (this.uploadFile) {
          const { data } = await this.uploadImg(this.uploadFile);
          this.editItem.avatar_url = data.url;
        }
        if (this.isEdit) {
          await updateTag(this.currentEditIndex, this.editItem);
          this.$message.success("更新成功");
        } else {
          await createTag(this.editItem);
          this.$message.success("创建成功");
        }
        this.FETCH_TAG_LIST({
          page: 1,
          per_page: 300,
        });
      } catch (error) {
        //
      }

      this.close();
    },
  },
  created() {
    this.FETCH_TAG_LIST({
      page: 1,
      per_page: 300,
    });
  },
};
</script>
