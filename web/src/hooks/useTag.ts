import { IState, ITag } from "@/typings";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import $message from "@/components/Message";
import { ATS } from "@/store/actionTypes";
import { computed } from "vue";
import { followTag, unFollowTag } from "@/api";

type IUseTag = () => {
  followTheTag: (isFollowing: boolean, tag: ITag) => void;
};

const useTag: IUseTag = () => {
  const router = useRouter();
  const store = useStore<IState>();
  const user = computed(() => store.state.user);

  const followTheTag = async (isFollowing: boolean, tag: ITag) => {
    if (!user.value.isLogin) {
      router.push("/login");
      return;
    }

    try {
      if (isFollowing) {
        // unfollow
        const { status } = await unFollowTag(tag._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "取消关注成功",
          });
        }
      } else {
        // follow
        const { status } = await followTag(tag._id);
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
    followTheTag,
  };
};

export default useTag;
