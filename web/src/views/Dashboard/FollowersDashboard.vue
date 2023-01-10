<template>
  <div class="row">
    <template v-if="userList.length">
      <div
        class="col-12 col-md-6 col-lg-3 mb-3"
        v-for="user of userList"
        :key="user._id"
      >
        <Card class="user-card py-3">
          <template #title>
            <router-link
              class="align-self-center border mb-2 rounded-circle overflow-hidden"
              :to="`/profile/${user._id}`"
            >
              <img
                :src="user.avatar_url || require('@/assets/user.png')"
                style="width: 50px; height: 50px"
              />
            </router-link>
          </template>

          <template #text>
            <div class="text-center">
              <router-link
                :to="`/profile/${user._id}`"
                class="text-dark text-decoration-none fs-5"
                >{{ user.nickName }}</router-link
              >
            </div>
          </template>

          <template #action> </template>
        </Card>
      </div>
    </template>

    <template v-else>
      <Card class="py-5">
        <template #text>
          <div class="text-center text-muted">还没有粉丝...</div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Card from "@/components/Card/index.vue";
import { IUser } from "@/typings";
import { fetchUserFollowers } from "@/api";

export default defineComponent({
  name: "FollowersDashboard",
  components: {
    Card,
  },
  setup() {
    const userList = ref<IUser[]>([]);

    const getUserList = async () => {
      const { data } = await fetchUserFollowers();
      userList.value = data;
    };

    onMounted(() => {
      getUserList();
    });

    return {
      userList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
