import { createStore } from "vuex";
import { IState } from "@/typings";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default createStore<IState>({
  state,
  getters,
  mutations,
  actions,
});
