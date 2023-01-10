<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table
              :items="USER_LIST"
              :headers="headers"
              :search="search"
              sort-by="created_at"
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
                    class="mr-2"
                    @click="$router.push('/user/add')"
                  >
                    添加用户
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
                <v-avatar size="36px">
                  <img
                    :src="item.avatar_url || require('@/assets/user.png')"
                    :alt="item.name"
                  />
                </v-avatar>
              </template>

              <template v-slot:[`item.articles`]="{ item }">
                {{ item.articles.length }}
              </template>

              <template v-slot:[`item.type`]="{ item }">
                <span v-if="item.type === 'SuperAdmin'">超级管理员</span>
                <span v-else-if="item.type === 'Admin'">管理员</span>
                <span v-else>用户</span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  class="mr-2"
                  color="primary"
                  @click="$router.push(`/user/edit/${item._id}`)"
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
import { DELETE_USER, FETCH_USER_LIST } from "@/store/actionTypes";
import { formatDate } from "@/libs/utils";

export default {
  name: "UserList",
  data: () => ({
    isLoading: false,
    selected: [],
    isDelAll: false,
    search: "",
    dialogDelete: false,
    currentEditIndex: "",
    headers: [
      {
        text: "头像",
        value: "avatar_url",
        align: "center",
        sortable: false,
      },
      {
        text: "用户昵称",
        value: "nickName",
        align: "center",
        sortable: false,
      },
      {
        text: "文章数",
        value: "articles",
        align: "center",
        sortable: true,
      },
      {
        text: "关注数",
        value: "following_count",
        align: "center",
        sortable: true,
      },
      {
        text: "粉丝数",
        value: "followers_count",
        align: "center",
        sortable: true,
      },
      {
        text: "角色",
        value: "type",
        align: "center",
        sortable: false,
      },
      {
        text: "创建时间",
        value: "created_at",
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
    ...mapState(["userList"]),
    USER_LIST() {
      return formatDate(this.userList);
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    userList(val) {
      if (val) {
        this.isLoading = false;
      }
    },
  },

  methods: {
    ...mapActions([FETCH_USER_LIST]),

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
          for (const user of this.selected) {
            await this.$store.dispatch(DELETE_USER, user._id);
          }
        } else {
          await this.$store.dispatch(DELETE_USER, this.currentEditIndex);
        }
        this.$message.success("删除成功");
      } catch (error) {
        this.isLoading = false;
      }
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.currentEditIndex = "";
      this.isDelAll = false;
      this.isLoading = false;
    },
  },
  async created() {
    this.isLoading = true;
    await this.FETCH_USER_LIST({
      page: 1,
      per_page: 300,
    });
    this.isLoading = false;
  },
};
</script>
