<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <router-link :to="`/profile/${user._id}`">
        <v-img
          :src="user.avatar_url || require('@/assets/user.png')"
          :alt="user.name"
          width="40px"
          height="40px"
          class="rounded-circle"
        />
      </router-link>
      <div class="ms-3">
        <div class="fw-bold">
          <router-link
            class="text-link text-decoration-none text-dark"
            :to="`/profile/${user._id}`"
          >
            {{ user.name }}
          </router-link>
        </div>
        <div>
          <small class="text-muted">{{ user.description }}</small>
        </div>
      </div>
    </div>
    <button
      type="button"
      :disabled="isMe"
      :class="['btn', isFollowing ? 'btn-primary' : 'btn-outline-primary']"
      @click="followTheUser(isFollowing, user)"
    >
      {{ isFollowing ? "已关注" : "关注" }}
    </button>
  </div>
</template>

<script lang="ts">
import useUser from "@/hooks/useUser";
import { IUser } from "@/typings";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "UserCard",
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
  setup(props) {
    const id = ref(props.user._id);
    const { isMe, isFollowing, followTheUser } = useUser(id);

    return {
      isMe,
      isFollowing,
      followTheUser,
    };
  },
});
</script>

<style lang="scss" scoped></style>
