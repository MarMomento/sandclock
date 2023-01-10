<template>
  <Card class="profile-card">
    <template v-slot:header> </template>

    <template v-slot:title>
      <div class="avatar">
        <img :src="author.avatar_url || require('@/assets/user.png')" />
      </div>
    </template>

    <template v-slot:text>
      <div class="text-center">
        <div class="avatar-name fs-2 fw-bolder">{{ author.nickName }}</div>
        <div class="avatar-desc my-3">
          {{ author.description }}
        </div>
        <div class="text-muted">
          <small>
            <i class="bi bi-info-circle"></i> 加入时间
            {{ format(author.created_at) }}</small
          >
        </div>
      </div>
    </template>

    <template v-slot:action>
      <div class="user-operate">
        <router-link
          to="/settings"
          class="btn btn-primary px-3 py-2"
          v-if="(user.info && user.info._id) === author._id"
        >
          编辑个人信息
        </router-link>
        <button
          v-else
          :class="[
            'btn px-3 py-2',
            isFollowing ? 'btn-primary' : 'btn-outline-primary',
          ]"
          type="button"
          @click="followUser(author)"
        >
          {{ isFollowing ? "已关注" : "关注" }}
        </button>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import useUser from "@/hooks/useUser";
import { IUser } from "@/typings";
import { defineComponent, PropType, ref, watch } from "vue";
import Card from "./index.vue";
import useDayjs from "@/hooks/useDayjs";

export default defineComponent({
  name: "UserProfileCard",
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
    const { format } = useDayjs();

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
      format,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-card {
  margin-top: 80px;
  padding-top: 66px !important;
  border-radius: 8px;
  position: relative;

  .avatar {
    width: 128px;
    height: 128px;
    background-color: #194085;
    border-radius: 50%;
    position: absolute;
    top: -30%;
    left: 50%;
    margin-left: -64px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }
  }

  .user-operate {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
}
</style>
