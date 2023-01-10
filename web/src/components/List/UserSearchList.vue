<template>
  <v-list-group>
    <v-list-item
      v-for="user of userList"
      :key="user._id"
      class="d-flex justify-content-between align-items-center py-3 px-4"
      action
    >
      <div class="d-flex align-items-center">
        <v-img
          :src="user.avatar_url || require('@/assets/user.png')"
          :alt="user.name"
          width="40px"
          height="40px"
          class="rounded-circle"
        />
        <div class="ms-3">
          <div class="fw-bold">{{ user.name }}</div>
          <div>
            <small class="text-muted">{{ user.description }}</small>
          </div>
          <small class="text-muted">粉丝: {{ user.followers_count }}</small>
        </div>
      </div>
      <button class="btn btn-primary">关注</button>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import { IUser } from "@/typings";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "",
  props: {
    userList: {
      type: Array as PropType<IUser[]>,
    },
  },
});
</script>

<style lang="scss" scoped></style>
