<template>
  <v-container fluid>
    <Header />
    <Sidebar />
    <v-main class="content">
      <BreadCrumb :items="breadCrumbs" />
      <keep-alive>
        <router-view />
      </keep-alive>
      <Footer />
    </v-main>
  </v-container>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import Footer from "@/components/Footer/Footer.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";

export default {
  name: "Layout",
  components: {
    Footer,
    Header,
    Sidebar,
    BreadCrumb,
  },
  data() {
    return {
      breadCrumbs: [],
    };
  },
  watch: {
    ["$route.path"]() {
      this.getNewBreadCrumbs();
    },
  },
  methods: {
    getNewBreadCrumbs() {
      let newBreadCrumbs = [
        {
          text: "Dashboard",
          disabled: false,
          href: "#/dashboard",
        },
      ];
      this.$route.matched.forEach((route) => {
        if (route.path === "") return;
        newBreadCrumbs.push({
          text: route.meta.title,
          href: "#" + route.path,
          disabled: route.path === this.$route.path,
        });
      });
      this.breadCrumbs = newBreadCrumbs;
    },
  },
  created() {
    this.getNewBreadCrumbs();
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
