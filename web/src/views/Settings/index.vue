<template>
  <div class="container settings-page py-3">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9">
        <h2 class="mb-4 fw-bold">设置 >> {{ currentTab.text }}</h2>

        <Tab type="leftRight">
          <template #menu>
            <div class="col-3 me-3">
              <v-list-group class="side-menu">
                <v-list-item
                  v-for="tab of tabs"
                  :key="tab.type"
                  :class="[
                    'side-menu-item',
                    { active: currentTab.type === tab.type },
                  ]"
                  @click="currentTab = tab"
                >
                  <span class="side-menu-link">
                    {{ tab.text }}
                  </span>
                </v-list-item>
              </v-list-group>
            </div>
          </template>

          <template #content>
            <div class="col-9">
              <keep-alive>
                <component :is="currentTabComponent"></component>
              </keep-alive>
            </div>
          </template>
        </Tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import Tab from "@/components/Tab/index.vue";
import ProfileSetting from "./ProfileSetting.vue";
import AccountSetting from "./AccountSetting.vue";

export default defineComponent({
  name: "Settings",
  components: {
    Tab,
    ProfileSetting,
    AccountSetting,
  },
  setup() {
    const state = reactive({
      currentTab: {
        type: "Profile",
        text: "个人信息",
      },
      tabs: [
        {
          type: "Profile",
          text: "个人信息",
        },
        {
          type: "Account",
          text: "账号信息",
        },
      ],
    });
    const currentTabComponent = computed(() => {
      return state.currentTab.type + "Setting";
    });
    return {
      ...toRefs(state),
      currentTabComponent,
    };
  },
});
</script>

<style lang="scss" scoped></style>
