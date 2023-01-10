import { starArticle } from "./../api/user";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { IArticle, IState } from "@/typings";
import { computed } from "vue";
import { ATS } from "@/store/actionTypes";
import { collectArticle, unCollectArticle, unStarArticle } from "@/api";
import $message from "@/components/Message";

type IUseArticle = () => {
  collectTheArticle: (isCollected: boolean, article: IArticle) => void;
  starTheArticle: (isStarred: boolean, article: IArticle) => void;
};

const useArticle: IUseArticle = () => {
  const router = useRouter();
  const store = useStore<IState>();
  const user = computed(() => store.state.user);

  const collectTheArticle = async (isCollected: boolean, article: IArticle) => {
    if (!user.value.isLogin) {
      router.push("/login");
      return;
    }

    try {
      if (isCollected) {
        // unCollect
        const { status } = await unCollectArticle(article._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "取消收藏成功",
          });
        }
      } else {
        // collect
        const { status } = await collectArticle(article._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "收藏成功",
          });
        }
      }
      store.dispatch(ATS.FETCH_CURRENT_USER);
    } catch (error) {
      //
    }
  };

  const starTheArticle = async (isStarred: boolean, article: IArticle) => {
    if (!user.value.isLogin) {
      router.push("/login");
      return;
    }

    try {
      if (isStarred) {
        // unStar
        const { status } = await unStarArticle(article._id);
        if (status === 204) {
          $message({
            type: "success",
            message: "取消点赞成功",
          });
        }
      } else {
        // star
        const { status } = await starArticle(article._id);
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

  return {
    collectTheArticle,
    starTheArticle,
  };
};

export default useArticle;
