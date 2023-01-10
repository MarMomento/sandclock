<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
        <div class="d-flex">
          <p>SandClock</p>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="login-part d-flex align-center justify-center"
      >
        <v-row no-gutters class="align-start">
          <v-col
            cols="12"
            class="login-part d-flex align-center justify-center flex-column"
          >
            <div class="login-wrapper pt-md-4 pt-0">
              <v-tabs grow>
                <v-tabs-slider></v-tabs-slider>
                <v-tab> 登录 </v-tab>
                <v-tab-item>
                  <v-form>
                    <v-container>
                      <v-row class="flex-column">
                        <v-col>
                          <p
                            class="login-slogan display-2 text-center font-weight-medium my-10"
                          >
                            欢迎来到 SandClock <br />
                            社区
                          </p>
                        </v-col>
                        <v-form>
                          <v-col>
                            <v-text-field
                              v-model="user.name"
                              :rules="rules.nameRules"
                              label="用户名"
                              required
                              autocomplete="on"
                            ></v-text-field>
                            <v-text-field
                              v-model="user.password"
                              :rules="rules.passwordRules"
                              label="密码"
                              type="password"
                              hint="最少长度为3"
                              required
                              autocomplete="on"
                            ></v-text-field>
                          </v-col>
                          <v-col class="d-flex justify-space-between">
                            <v-btn
                              class="text-capitalize"
                              large
                              :disabled="
                                user.password.length === 0 ||
                                user.name.length === 0
                              "
                              color="primary"
                              @click="login"
                            >
                              登录</v-btn
                            >
                          </v-col>
                        </v-form>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-footer>
              <div class="primary--text">
                © {{ new Date().getFullYear() }}
                , writed by Momento
              </div>
            </v-footer>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LOGIN_AND_FETCH_CURRENT_USER } from "@/store/actionTypes";

export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      rules: {
        nameRules: [(v) => !!v || "用户名不能为空"],
        passwordRules: [
          (v) => !!v || "密码不能为空",
          (v) => v.length >= 3 || "最少长度为3",
        ],
      },
    };
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch(LOGIN_AND_FETCH_CURRENT_USER, this.user);
        this.$message.success("登录成功");
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      } catch (error) {
        //
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss"></style>
