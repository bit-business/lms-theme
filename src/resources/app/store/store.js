import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: {},
    token: {},
    snackbar: {
      isVisible: false,
      content: "",
    },
  },
  mutations: {
    SET_IS_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },
  },
  actions: {
    SET_IS_AUTHENTICATED({ commit }, payload) {
      commit("SET_IS_AUTHENTICATED", payload);
    },
    SET_USER({ commit }, payload) {
      commit("SET_USER", payload);
    },
    OPEN_SNACKBAR({ commit }, content) {
      commit("SET_SNACKBAR", { content, isVisible: true });
      setTimeout(() => {
        commit("SET_SNACKBAR", { content, isVisible: false });
      }, 1000);
    },
    CLOSE_SNACKBAR({ commit }) {
      commit("SET_SNACKBAR", { isVisible: false });
    },
    LOGOUT({ commit }) {
      commit("SET_IS_AUTHENTICATED", false);
      commit("SET_USER", {});
      localStorage.removeItem("token");
    },
  },
  getters: {
    getGlobalState: (state) => {
      return state;
    },
  },
  plugins: [createPersistedState()],
});
