<template>
  <v-container fluid class="error-page">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="8">
        <div class="card">
          <span class="error-logo">404</span>
          <p class="error-text">
            Oops. Looks like the page you're looking for no longer exists
          </p>
          <p class="error-subtext">
            But we're here to bring you back to safety
          </p>

          <v-btn
            class="text-capitalize"
            dark
            x-large
            color="#536DFE"
            to="/dashboard"
          >
            Back to Home
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style src="./Error.scss" lang="scss"></style>
