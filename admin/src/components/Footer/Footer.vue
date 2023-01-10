<template>
  <v-footer class="px-0 mt-10" color="transparent">
    <v-row no-gutters class="justify-center">
      <div class="primary--text">
        © {{ new Date().getFullYear() }}
        , writed by Momento
      </div>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style src="./Footer.scss" lang="scss" />
