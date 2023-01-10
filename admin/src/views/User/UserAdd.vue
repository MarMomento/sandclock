<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12">
        <v-stepper v-model="e1" class="transparent elevation-0">
          <v-card class="mb-5">
            <v-stepper-header class="elevation-0">
              <!-- steup 1 -->
              <v-stepper-step
                :complete="e1 > 1"
                :rules="step1Rules"
                editable
                step="1"
              >
                添加账号
              </v-stepper-step>
              <v-divider></v-divider>

              <!-- steup 2 -->
              <v-stepper-step
                :complete="e1 > 2"
                :rules="step2Rules"
                editable
                step="2"
              >
                用户信息
                <small>(可选)</small>
              </v-stepper-step>
            </v-stepper-header>
          </v-card>

          <v-card class="py-5">
            <v-stepper-items>
              <!-- content 1 -->
              <v-stepper-content step="1">
                <v-row class="justify-center">
                  <v-col cols="12" md="6">
                    <p class="text-h5">账号信息</p>
                    <v-form ref="form-account">
                      <v-text-field
                        v-model="accountInfo.name"
                        :rules="nameRules"
                        label="用户名"
                        required
                        outlined
                        dense
                        class="mb-4"
                      ></v-text-field>

                      <v-text-field
                        v-model="accountInfo.password"
                        :rules="passRules"
                        label="密码"
                        type="password"
                        required
                        outlined
                        dense
                        class="mb-4"
                        autocomplete="on"
                      ></v-text-field>

                      <v-select
                        :items="roles"
                        v-model="accountInfo.type"
                        :rules="roleRules"
                        label="角色"
                        outlined
                        dense
                        required
                        class="mb-4"
                      ></v-select>

                      <div class="d-flex justify-space-between">
                        <v-btn color="success" @click="save"> 创建 </v-btn>
                        <v-btn color="primary" outlined @click="e1 = 2">
                          下一项
                        </v-btn>
                      </div>
                    </v-form>
                  </v-col>
                </v-row>
              </v-stepper-content>

              <!-- content 2 -->
              <v-stepper-content step="2">
                <v-row class="justify-center">
                  <v-col cols="12" md="6">
                    <p class="text-h5">用户详细信息</p>
                    <v-form ref="form-profile">
                      <v-text-field
                        v-model="accountInfo.nickName"
                        label="用户昵称"
                        outlined
                        dense
                        class="mb-3"
                      ></v-text-field>

                      <div class="d-flex mb-3">
                        <v-file-input
                          accept="image/*"
                          label="上传头像"
                          v-model="uploadFile"
                          outlined
                          dense
                          class="mr-8"
                        ></v-file-input>

                        <v-avatar v-if="accountInfo.avatar_url">
                          <img :src="accountInfo.avatar_url" />
                        </v-avatar>
                      </div>

                      <v-text-field
                        v-model="accountInfo.email"
                        :rules="emailRules"
                        label="邮箱地址"
                        outlined
                        dense
                        class="mb-3"
                      ></v-text-field>

                      <v-textarea
                        v-model="accountInfo.description"
                        label="用户简介"
                        rows="5"
                        no-resize
                        outlined
                      ></v-textarea>

                      <v-select
                        v-model="accountInfo.following_tags"
                        :items="tagsSelect"
                        label="关注的文章标签"
                        multiple
                        chips
                        persistent-hint
                        outlined
                      ></v-select>

                      <div class="d-flex justify-end">
                        <v-btn color="primary" outlined @click="e1 = 1">
                          上一项
                        </v-btn>
                      </div>
                    </v-form>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-card>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { CREATE_USER, FETCH_TAG_LIST } from "@/store/actionTypes";
import default_avatar_url from "@/assets/user.png";

export default {
  name: "UserAdd",
  data() {
    return {
      e1: 1,
      uploadFile: null,
      roles: [
        { text: "超级管理员", value: "SuperAdmin" },
        {
          text: "管理员",
          value: "Admin",
        },
        { text: "用户", value: "User" },
      ],
      accountInfo: {
        nickName: "",
        name: "",
        email: "",
        password: "",
        type: "",
        description: "",
        following_tags: [],
        avatar_url: default_avatar_url,
      },
      step1Rules: [],
      step2Rules: [],
      nameRules: [(v) => !!v || "用户名不能为空"],
      passRules: [(v) => !!v || "密码不能为空"],
      emailRules: [(v) => (v ? /.+@.+\..+/.test(v) || "邮箱不合法" : true)],
      roleRules: [(v) => !!v || "角色不能为空"],
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
          this.accountInfo.avatar_url = dataURL;
        });
      } else {
        this.accountInfo.avatar_url = default_avatar_url;
      }
    },
  },
  methods: {
    ...mapActions([FETCH_TAG_LIST]),
    async save() {
      const result1 = this.$refs["form-account"].validate();
      const result2 = this.$refs["form-profile"].validate();
      this.step1Rules.splice(0, 1, () => result1);
      this.step2Rules.splice(0, 1, () => result2);
      try {
        if (result1 && result2) {
          if (this.uploadFile) {
            const { data } = await this.uploadImg(this.uploadFile);
            this.accountInfo.avatar_url = data.url;
          }
          await this.$store.dispatch(CREATE_USER, this.accountInfo);
          this.$message.success("创建成功");
          this.$router.push("/user/list");
        }
      } catch (error) {
        //
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
