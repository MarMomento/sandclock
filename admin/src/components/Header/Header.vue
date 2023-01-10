<template>
  <v-app-bar class="main-header" height="64" fixed color="primary" dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="drawer">
        <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-toolbar-title>SandClock</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <Search /> -->

    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <div class="greeting-text mr-3 d-none d-md-block">
          Hi, <span>{{ user.nickName }}</span>
        </div>
        <v-avatar class="mr-2" size="36" dark v-bind="attrs" v-on="on">
          <img :src="user.avatar_url" />
        </v-avatar>
      </template>
      <v-list>
        <div class="text-h5 grey--text text--darken-3 px-4 pt-4">
          {{ user.nickName }}
        </div>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in account" :key="i">
            <v-list-item-icon class="mr-4">
              <v-icon :color="item.color" v-text="item.icon"> </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                :color="config.light.textColor"
                v-text="item.text"
                @click="$router.push(item.link)"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logOut"
            >退出登录
          </v-btn>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import config from "@/config";
// import Search from "@/components/Search/Search";
import { LOGOUT } from "@/store/actionTypes";

export default {
  name: "Header",
  components: {
    // Search,
  },
  data: () => ({
    config,
    searchCollapse: true,
    account: [
      {
        text: "Profile",
        icon: "mdi-account",
        color: "textColor",
        link: "/profile",
      },
    ],
  }),
  computed: {
    ...mapState(["drawer", "user"]),
  },
  methods: {
    ...mapMutations(["TOGGLE_DRAWER"]),
    logOut() {
      this.$store.commit(LOGOUT);
      this.$message.success("退出登录成功");
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
