<template>
  <Card class="login-card">
    <template v-slot:title>
      <h5 class="card-title">
        SandClock Community is a community of many amazing developers
      </h5>
    </template>

    <template v-slot:text>
      <p class="card-text text-muted">
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
    </template>

    <template v-slot:action>
      <div class="d-grid gap-2 col-12">
        <router-link to="/login?state=new-user" class="btn btn-primary">
          注册账号
        </router-link>
        <router-link
          to="/login"
          class="btn btn-link text-decoration-none go-login"
        >
          登录
        </router-link>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "./index.vue";

export default defineComponent({
  name: "LoginCard",
  components: {
    Card,
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  .go-login {
    &:hover {
      background-color: $gray-200;
    }
  }
}
</style>
