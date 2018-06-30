import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  ActionEntry:  {
    player: null,
    action: null,
    position: null,
  }
};

const mutations = {
  SET_PLAYER(state, player) {
    state.ActionEntry.player = player;
  },
  SET_ACTION(state, action) {
    state.ActionEntry.action = action;
  },
  SET_POSITION(state, position) {
    state.ActionEntry.position = position;
  }
};
const actions = {
  updatePlayer(context, player) {
    context.commit("SET_PLAYER", player);
  },
  updateAction(context, action) {
    context.commit("SET_ACTION", action);
  },
  updatePosition(context, position) {
    context.commit("SET_POSITION", position);
  },
};

const getters = {
  isComplete(state) {
    return state.ActionEntry.player != null && state.ActionEntry.action != null && state.ActionEntry.position != null;
  },
  getEntry(state) {
    return state.ActionEntry;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});