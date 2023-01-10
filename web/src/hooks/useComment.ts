import { IComment, IState } from "@/typings";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { starComment, unStarComment } from "@/api";
import $message from "@/components/Message";
import { ATS } from "@/store/actionTypes";

type IUseComment = () => {
  starTheComment: (isStarred: boolean, comment: IComment) => void;
  formatToTree: (data: IComment[]) => IComment[];
};

const useComment: IUseComment = () => {
  const router = useRouter();
  const store = useStore<IState>();
  const user = computed(() => store.state.user);

  const starTheComment = async (isStarred: boolean, comment: IComment) => {
    if (!user.value.isLogin) {
      router.push("/login");
      return;
    }

    try {
      if (isStarred) {
        // unStar
        const { status } = await unStarComment(comment._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "取消点赞成功",
          });
        }
      } else {
        // star
        const { status } = await starComment(comment._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "点赞成功",
          });
        }
      }
      store.dispatch(ATS.FETCH_CURRENT_USER);
    } catch (error) {
      //
    }
  };

  /**
   * 评论 - 扁平化 -> tree
   */

  function formatToTree(data: IComment[] = []): IComment[] {
    return data.filter((p) => {
      const _children = data.filter((c) => c.reply_to?._id === p._id);
      _children.length && (p.children = _children);

      return p.reply_to === null;
    });
  }

  return {
    starTheComment,
    formatToTree,
  };
};

export default useComment;
