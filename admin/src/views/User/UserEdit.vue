<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-card class="py-2 mb-5">
          <v-tabs v-model="tab" centered light>
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-account" class="mr-5">
              <v-icon class="mr-3">mdi-shield-account</v-icon>
              账号
            </v-tab>

            <v-tab href="#tab-profile" class="mr-5">
              <v-icon class="mr-3">mdi-account</v-icon>
              个人信息
            </v-tab>

            <v-tab href="#tab-password">
              <v-icon class="mr-3">mdi-lock</v-icon>
              修改密码
            </v-tab>

            <!-- <v-tab href="#tab-settings">
              <v-icon class="mr-3">mdi-cog</v-icon>
              设置
            </v-tab> -->
          </v-tabs>
        </v-card>

        <v-card>
          <v-tabs-items v-model="tab">
            <!-- account -->
            <v-tab-item value="tab-account">
              <v-card flat class="py-5">
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="12" md="6">
                      <p class="text-h5">账号信息</p>
                      <v-form ref="form-account">
                        <v-text-field
                          v-model="accountInfo.name"
                          label="用户名"
                          required
                          outlined
                          dense
                        ></v-text-field>

                        <v-text-field
                          v-model="accountInfo.email"
                          label="邮箱"
                          required
                          outlined
                          dense
                        ></v-text-field>

                        <v-select
                          :items="roles"
                          v-model="accountInfo.type"
                          label="角色"
                          outlined
                          dense
                          required
                        ></v-select>
                      </v-form>

                      <div class="d-flex justify-space-between mt-5">
                        <v-btn color="success" @click="saveAccount">
                          保存
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- profile -->
            <v-tab-item value="tab-profile">
              <v-card flat class="py-5">
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="12" md="6">
                      <p class="text-h5">用户信息</p>
                      <v-form ref="form-profile">
                        <v-text-field
                          v-model="profileInfo.nickName"
                          label="用户昵称"
                          no-resize
                          rows="5"
                          outlined
                          dense
                          placeholder="请填写用户昵称"
                        ></v-text-field>

                        <div class="d-flex">
                          <v-file-input
                            accept="image/*"
                            label="上传头像"
                            v-model="uploadFile"
                            outlined
                            dense
                            class="mr-8"
                          ></v-file-input>
                          <v-avatar>
                            <img
                              :src="
                                profileInfo.avatar_url ||
                                require('@/assets/user.png')
                              "
                            />
                          </v-avatar>
                        </div>

                        <v-textarea
                          v-model="profileInfo.description"
                          label="用户简介"
                          no-resize
                          rows="5"
                          outlined
                          placeholder="请填写标签简介"
                        ></v-textarea>

                        <v-select
                          v-model="profileInfo.following_tags"
                          :items="tagsSelect"
                          label="关注的文章标签"
                          multiple
                          chips
                          persistent-hint
                          outlined
                        ></v-select>
                      </v-form>

                      <div class="d-flex justify-space-between mt-5">
                        <v-btn color="success" @click="saveProfile">
                          保存
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- password -->
            <v-tab-item value="tab-password">
              <v-card flat class="py-5">
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="12" md="6">
                      <p class="text-h5">修改密码</p>
                      <v-form ref="form-password">
                        <v-text-field
                          v-model="changePassword.newPassword"
                          type="password"
                          label="新密码"
                          placeholder="请输入新密码"
                          outlined
                          hint="请输入新密码"
                          persistent-hint
                          dense
                          class="mb-4"
                          autocomplete="on"
                        ></v-text-field>

                        <v-text-field
                          v-model="changePassword.againPassword"
                          type="password"
                          label="新密码"
                          placeholder="请再次输入新密码"
                          outlined
                          hint="请再次输入新密码"
                          persistent-hint
                          dense
                          autocomplete="on"
                        ></v-text-field>
                      </v-form>

                      <div class="d-flex justify-space-between mt-5">
                        <v-btn color="success" @click="savePassword">
                          保存
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- settings -->
            <!-- <v-tab-item value="tab-settings">
              <v-card flat class="py-5">
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="12" md="6"> settings </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item> -->
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { resetPassword, updateUser, fetchUserById } from "@/api/index";
import { mapActions, mapState } from "vuex";
import { FETCH_TAG_LIST } from "@/store/actionTypes";
import { resetReactiveProps } from "@/libs/utils";

export default {
  name: "UserEdit",
  data() {
    return {
      tab: null,
      userId: "",
      cur_avatar_url: "",
      uploadFile: null,
      roles: [
        {
          text: "超级管理员",
          value: "SuperAdmin",
        },
        {
          text: "管理员",
          value: "Admin",
        },
        {
          text: "用户",
          value: "User",
        },
      ],
      accountInfo: {
        name: "",
        email: "",
        type: "",
      },
      profileInfo: {
        nickName: "",
        avatar_url: "",
        description: "",
        following_tags: [],
      },
      changePassword: {
        newPassword: "",
        againPassword: "",
      },
    };
  },
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
          this.profileInfo.avatar_url = dataURL;
        });
      } else {
        this.profileInfo.avatar_url = this.cur_avatar_url;
      }
    },
  },
  methods: {
    ...mapActions([FETCH_TAG_LIST]),
    async fetchCurUserById() {
      this.userId = this.$route.params.id;
      const { data } = await fetchUserById(this.userId);
      this.accountInfo = {
        name: data.name,
        email: data.email,
        type: data.type,
      };
      this.profileInfo = {
        nickName: data.nickName,
        description: data.description,
        avatar_url: data.avatar_url,
        following_tags: data.following_tags.map((tag) => tag._id),
      };
      this.cur_avatar_url = data.avatar_url;
    },

    async saveAccount() {
      const passed = this.$refs["form-account"].validate();
      if (!passed) return;

      try {
        await updateUser(this.userId, this.accountInfo);
        this.$message.success("更新成功");
        this.$router.push("/user/list");
      } catch {
        //
      }
    },

    async saveProfile() {
      const passed = this.$refs["form-profile"].validate();
      if (!passed) return;
      try {
        if (this.uploadFile) {
          const { data } = await this.uploadImg(this.uploadFile);
          this.profileInfo.avatar_url = data.url;
        }
        await updateUser(this.userId, this.profileInfo);
        this.$message.success("更新成功");
        this.$router.push("/user/list");
      } catch (error) {
        //
      }
    },
    async savePassword() {
      const passed = this.$refs["form-password"].validate();
      if (!passed) return;

      try {
        await resetPassword(this.userId, this.changePassword);
        this.$message.success("修改密码成功");
        this.changePassword = resetReactiveProps(this.changePassword);
        this.$router.push("/user/list");
      } catch (error) {
        //
      }
    },
  },
  async created() {
    await this.FETCH_TAG_LIST({
      page: 1,
      per_page: 100,
    });
    await this.fetchCurUserById();
  },
};
</script>

<style></style>
