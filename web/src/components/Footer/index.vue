<template>
  <footer class="footer text-center py-2 text-primary">
    <small>&copy; {{ new Date().getFullYear() }} , writed by Momento</small>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style scoped lang="scss">
footer {
  background-color: $gray-400;
}
</style>
