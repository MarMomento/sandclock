<template>
  <div class="container-fluid error-page">
    <div class="row justify-content-center align-items-center">
      <div class="col-8">
        <div class="card">
          <span class="error-logo">404</span>
          <p class="error-text my-5">
            Oops. Looks like the page you're looking for no longer exists
          </p>

          <p class="error-subtext my-5">
            But we're here to bring you back to safety
          </p>

          <router-link class="btn btn-primary mt-5" type="button" to="/">
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error",
});
</script>

<style lang="scss" scoped>
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;

  .card {
    padding: 0 50px 50px;
    background-color: white;
    border-radius: 4px;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;

    .error-logo {
      color: $primary;
      font-size: 148px;
      font-weight: 600;
    }

    .error-text {
      color: $primary;
      text-align: center;
      font-size: $h3-font-size;
    }

    .error-subtext {
      text-align: center;
      color: gray;
      font-size: $h4-font-size;
    }
  }
}
</style>
