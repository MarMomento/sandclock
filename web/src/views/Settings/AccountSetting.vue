<template>
  <div class="account-setting">
    <v-card>
      <v-card-body class="px-4">
        <v-card-title class="fs-4 fw-bold py-2">重置密码</v-card-title>

        <v-card-text>
          <v-form ref="resetPwdRef">
            <v-form-item label="原密码">
              <v-input
                type="password"
                placeholder="请输入原密码"
                v-model="resetPwdInfo.oldPassword"
                :rules="passwordRules"
              />
            </v-form-item>

            <v-form-item label="新密码" class="my-3">
              <v-input
                type="password"
                placeholder="请输入新密码"
                v-model="resetPwdInfo.newPassword"
                :rules="passwordRules"
              />
            </v-form-item>

            <v-form-item label="新密码" class="mb-3">
              <v-input
                type="password"
                placeholder="请再次输入新密码"
                v-model="resetPwdInfo.againPassword"
                :rules="againPwdRules"
              />
            </v-form-item>

            <v-btn color="primary" class="mb-2" @click="resetUserPwd">
              重置密码
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card-body>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import $message from "@/components/Message";
import useRules from "@/hooks/useRules";
import { resetPwd } from "@/api";
import { RULE_TYPE } from "@/typings";

export default defineComponent({
  name: "AccountSetting",
  setup() {
    const state = reactive({
      resetPwdInfo: {
        oldPassword: "",
        newPassword: "",
        againPassword: "",
      },
      resetPwdRef: ref<null | HTMLFormElement>(null),
    });

    const { passwordRules, againPwdRules } = useRules();

    againPwdRules.push({
      type: RULE_TYPE.CUSTOM,
      message: "两次输入密码不一致",
      validate: () => {
        return (
          state.resetPwdInfo.newPassword === state.resetPwdInfo.againPassword
        );
      },
    });

    const resetUserPwd = async () => {
      const result = state.resetPwdRef?.validate();
      if (!result) {
        $message({
          type: "warn",
          message: "请输入正确的数据",
        });
        return;
      }

      try {
        const { status } = await resetPwd(state.resetPwdInfo);
        if (status === 204) {
          $message({
            type: "success",
            message: "重置成功",
          });
          state.resetPwdInfo = {
            oldPassword: "",
            newPassword: "",
            againPassword: "",
          };
        }
      } catch (error) {
        //
      }
    };

    return {
      ...toRefs(state),
      passwordRules,
      againPwdRules,
      resetUserPwd,
    };
  },
});
</script>

<style lang="scss" scoped></style>
