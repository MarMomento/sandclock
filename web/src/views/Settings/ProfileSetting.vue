<template>
  <div class="profile-setting">
    <v-form ref="profileRef">
      <v-card>
        <v-card-body class="px-4">
          <v-card-title class="fs-4 fw-bold py-2"> 基本信息 </v-card-title>

          <v-card-text>
            <v-form-item label="用户名">
              <v-input placeholder="请输入用户名" v-model="userInfo.name" />
            </v-form-item>

            <v-form-item label="用户昵称" class="my-3">
              <v-input
                placeholder="请输入用户昵称"
                v-model="userInfo.nickName"
              />
            </v-form-item>

            <v-form-item label="邮箱" class="my-3">
              <v-input
                type="email"
                placeholder="请输入邮箱"
                v-model="userInfo.email"
              />
            </v-form-item>

            <v-form-item label="个人简介" class="mb-3">
              <v-textarea
                placeholder="请输入个人简介"
                v-model="userInfo.description"
                rows="3"
              />
            </v-form-item>

            <v-form-item label="头像" class="mb-3">
              <v-upload
                placeholder="上传头像"
                v-model="userInfo.avatar_url"
                :rules="checkImg"
                @upload-success="uploadSuccess"
              />
            </v-form-item>

            <v-form-item label="头像预览" class="mb-3">
              <preview-image :url="userInfo.avatar_url" />
            </v-form-item>
          </v-card-text>
        </v-card-body>
      </v-card>

      <v-card class="mt-3">
        <v-card-body>
          <v-card-actions>
            <v-btn color="primary" block @click="updateUserInfo">
              保存信息
            </v-btn>
          </v-card-actions>
        </v-card-body>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import useUser from "@/hooks/useUser";
import PreviewImage from "@/components/PreviewImage.vue";
import $message from "@/components/Message";
import useRules from "@/hooks/useRules";
import { useStore } from "vuex";
import { ATS } from "@/store/actionTypes";
import { updateUser } from "@/api";

export default defineComponent({
  name: "ProfileSetting",
  components: {
    PreviewImage,
  },
  setup() {
    const { user } = useUser();
    const store = useStore();
    const state = reactive({
      userInfo: {
        nickName: user.value.info?.nickName || "",
        name: user.value.info?.name || "",
        email: user.value.info?.email || "",
        description: user.value.info?.description || "",
        avatar_url: user.value.info?.avatar_url || "",
      },
      profileRef: ref<null | HTMLFormElement>(null),
    });

    const { nameRules, emailRules } = useRules();

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

    const updateUserInfo = async () => {
      const result = state.profileRef?.validate();
      if (!result) {
        $message({
          type: "warn",
          message: "请输入正确的数据",
        });
        return;
      }

      try {
        await updateUser(state.userInfo);
        $message({
          type: "success",
          message: "更新成功",
        });
        store.dispatch(ATS.FETCH_CURRENT_USER);
      } catch (error) {
        //
      }
    };

    return {
      ...toRefs(state),
      updateUserInfo,
      nameRules,
      emailRules,
      checkImg,
      uploadSuccess,
    };
  },
});
</script>

<style lang="scss" scoped></style>
