<template>
  <router-view></router-view>
  <loading :show="isLoading" text="拼命加载中..." />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Loading from "@/components/Loading/index.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);

    return {
      isLoading,
    };
  },
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
