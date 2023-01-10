import { GetterTree } from "vuex";
import { IState } from "@/typings";
// import { objToArr } from "@/libs/utils";

export default <GetterTree<IState, IState>>{
  // getTagList: (state) => objToArr(state.tagList.data),
  // getTagById: (state) => (id: string) => state.tagList.data[id],
  // getHomeArticleList: (state) => objToArr(state.homeArticleList.data),
  // getTagArticleList: (state) => objToArr(state.tagArticleList.data),
  // getArticleById: (state) => (id: string) => {
  //   if (state.homeArticleList.data[id]) {
  //     return state.homeArticleList.data[id];
  //   } else if (state.tagArticleList.data[id]) {
  //     return state.tagArticleList.data[id];
  //   }
  // },
  // getComments: (state) => objToArr(state.comments.data),
};
