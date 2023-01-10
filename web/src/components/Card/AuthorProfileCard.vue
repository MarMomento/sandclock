<template>
  <Card class="author-profile-card">
    <template v-slot:header> </template>

    <template v-slot:title>
      <div class="card-title d-flex">
        <router-link :to="`/profile/${author._id}`">
          <img
            :src="author.avatar_url || require('@/assets/user.png')"
            style="width: 50px"
            class="rounded-circle me-3"
          />
        </router-link>
        <h4 class="card-text align-self-end">
          <router-link
            class="text-decoration-none text-dark fw-bold"
            :to="`/profile/${author._id}`"
            >{{ author.nickName }}</router-link
          >
        </h4>
      </div>
    </template>

    <template v-slot:text>
      <p class="card-text">{{ author.description }}</p>
    </template>

    <template v-slot:action>
      <button
        type="button"
        :disabled="author._id === (user.info && user.info._id)"
        :class="[
          'btn w-100 py-2',
          isFollowing ? 'btn-primary' : 'btn-outline-primary',
        ]"
        @click="followUser(author)"
      >
        {{ isFollowing ? "已关注" : "关注" }}
      </button>
    </template>
  </Card>
</template>

<script lang="ts">
import { IUser } from "@/typings";
import { defineComponent, PropType, ref, watch } from "vue";
import Card from "./index.vue";
import useUser from "@/hooks/useUser";

export default defineComponent({
  name: "AuthorProfileCard",
  components: {
    Card,
  },
  props: {
    author: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
  emits: ["follow-user"],
  setup(props, { emit }) {
    const id = ref(props.author._id);
    const { user, isFollowing } = useUser(id);

    const followUser = (user: IUser) => {
      emit("follow-user", isFollowing.value, user);
    };

    watch(
      () => props.author,
      (newVal) => {
        id.value = newVal._id;
      }
    );

    return {
      user,
      isFollowing,
      followUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.author-profile-card {
  border-top-width: 32px;
  border-top-color: $blue-600;

  .card-title {
    margin-top: -32px;
  }
}
</style>
