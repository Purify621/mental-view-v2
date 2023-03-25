import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";
import createPersistedstate from "vuex-persistedstate"; // vuex持久化插件
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user },
  getters,
  // 持久化配置
  plugins: [
    createPersistedstate({
      key: "mental-view-store",
      paths: ["user"],
    }),
  ],
});

export default store;
