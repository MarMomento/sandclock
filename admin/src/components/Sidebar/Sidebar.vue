<template>
  <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  >
    <v-list>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <span
              style="padding-left: 32px"
              class="text-body-1 subheader"
              :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
            >
              {{ item.heading }}
            </span>
          </v-col>
          <v-col cols="6" class="text-center"> </v-col>
        </v-row>
        <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
        <v-list-group
          color="primary"
          v-else-if="item.children && DRAWER_STATE"
          :key="item.title"
          v-model="item.model"
          append-icon=""
        >
          <template v-slot:prependIcon>
            <v-icon size="28">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-slot:appendIcon>
            <v-icon size="28">mdi-chevron-down</v-icon>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :to="item.link === '#' ? null : item.link"
          link
        >
          <v-list-item-action>
            <v-icon size="28" :color="item.color ? item.color : ''">{{
              item.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text" link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-home", link: "/dashboard" },
        { title: "个人信息", icon: "mdi-account-circle", link: "/profile" },
        {
          title: "用户管理",
          icon: "mdi-account",
          link: "/icons",
          model: false,
          children: [
            { title: "用户列表", icon: "mdi-circle-small", link: "/user/list" },
            { title: "用户添加", icon: "mdi-circle-small", link: "/user/add" },
            { title: "用户编辑", icon: "mdi-circle-small", link: "/user/edit" },
          ],
        },
        {
          title: "标签管理",
          icon: "mdi-tag",
          link: "/icons",
          model: false,
          children: [
            { title: "标签列表", icon: "mdi-circle-small", link: "/tag/list" },
          ],
        },
        {
          title: "文章管理",
          icon: "mdi-file",
          link: "/icons",
          model: false,
          children: [
            {
              title: "文章列表",
              icon: "mdi-circle-small",
              link: "/article/list",
            },
            {
              title: "文章添加",
              icon: "mdi-circle-small",
              link: "/article/add",
            },
            {
              title: "文章编辑",
              icon: "mdi-circle-small",
              link: "/article/edit",
            },
          ],
        },
        {
          title: "评论管理",
          icon: "mdi-comment-processing",
          link: "/icons",
          model: false,
          children: [
            {
              title: "评论列表",
              icon: "mdi-circle-small",
              link: "/comment/list",
            },
          ],
        },
      ],
      sidebarWidth: 240,
      sidebarMinWidth: 96,
    };
  },
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapMutations(["TOGGLE_DRAWER"]),
  },
};
</script>

<style src="./Sidebar.scss" lang="scss" />
