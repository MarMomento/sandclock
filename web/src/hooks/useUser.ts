import { followUser, unFollowUser } from "@/api";
import $message from "@/components/Message";
import { ATS } from "@/store/actionTypes";
import { IState, IUser, IUserState } from "@/typings";
import { computed, ComputedRef, Ref, watch, WritableComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

type IUseUser = (
  user_id?: Ref<string> | undefined
) => {
  user: ComputedRef<IUserState>;
  isMe: ComputedRef<boolean>;
  isFollowing: WritableComputedRef<boolean>;
  followTheUser: (isFollowing: boolean, author: IUser) => void;
};

const useUser: IUseUser = (id: Ref<string> | undefined) => {
  const router = useRouter();
  const store = useStore<IState>();
  const user = computed(() => store.state.user);
  const isMe = computed(() => user.value.info?._id === id?.value);

  const isFollowing = computed({
    get: () => {
      if (user.value.info) {
        return user.value.info.following.includes(id ? id.value : "");
      } else {
        return false;
      }
    },
    set: (newVal) => {
      return newVal;
    },
  });

  if (id) {
    watch(id, (newVal) => {
      if (user.value.info) {
        isFollowing.value = user.value.info.following.includes(newVal);
      } else {
        isFollowing.value = false;
      }
    });
  }

  const followTheUser = async (isFollowing: boolean, author: IUser) => {
    if (!user.value.isLogin) {
      router.push("/login");
      return;
    }

    try {
      if (isFollowing) {
        // unFollow
        const { status } = await unFollowUser(author._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "取消关注成功",
          });
        }
      } else {
        // follow
        const { status } = await followUser(author._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "关注成功",
          });
        }
      }
      store.dispatch(ATS.FETCH_CURRENT_USER);
    } catch (error) {
      //
    }
  };

  return {
    user,
    isMe,
    isFollowing,
    followTheUser,
  };
};

export default useUser;
