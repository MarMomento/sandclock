<template>
  <Header :user="user" />
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "BaseLayout",
  components: {
    Header,
    Footer,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 76px;
  background-color: $gray-200;
  flex: 1;
}
</style>
