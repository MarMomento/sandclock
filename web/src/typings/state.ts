import { IUser } from "./model";

export interface IState {
  token: string;
  isLoading: boolean;
  user: IUserState;
  search: string;
  // tagList: ITagList;
  // homeArticleList: IArticleList;
  // tagArticleList: IArticleList;
  // articleCommentList: ICommentList;
}

export interface IUserState {
  isLogin: boolean;
  info: null | IUser;
}

// interface IListProp<T> {
//   [key: string]: T;
// }

// export interface ITagList {
//   data: IListProp<ITag>;
//   count: number;
//   currentPage: number;
//   pageSize: number;
// }

// export interface IArticleList {
//   data: IListProp<IArticle>;
//   count: number;
//   currentPage: number;
// }

// export interface ICommentList {
//   data: IListProp<IComment>;
//   count: number;
//   currentPage: number;
// }

// export interface IState {
//   tagList: ITagList;
//   homeArticleList: IArticleList;
//   tagArticleList: IArticleList;
//   articleCommentList: ICommentList;
// }
