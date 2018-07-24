import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  Time: null,
  ActionEntry:  {
    id: null,
    player: null,
    team: null,
    action: null,
    position: null,
  },
};

const mutations = {
  SET_PLAYER(state, player) {
    state.ActionEntry.player = player;
  },
  SET_TEAM(state, team){
    state.ActionEntry.team = team;
  },
  SET_ACTION(state, action) {
    state.ActionEntry.action = action;
  },
  SET_POSITION(state, position) {
    state.ActionEntry.position = position;
  },
  RESET_ACTION(state) {
    state.ActionEntry.player = null;
    state.ActionEntry.action = null;
    state.ActionEntry.position = null;
  },
  SET_TIME(state, newTime) {
    state.Time = newTime;
  }
};
const actions = {
  updatePlayer(context, player) {
    context.commit("SET_PLAYER", player);
  },
  updateTeam(context, team){
    context.commit("SET_TEAM", team)
  },
  updateAction(context, action) {
    context.commit("SET_ACTION", action);
  },
  updatePosition(context, position) {
    context.commit("SET_POSITION", position);
  },
  resetAction(context) {
    context.commit("RESET_ACTION");
  },
  updateTime(context, time) {
    context.commit("SET_TIME", time);
  }
};

const getters = {
  isComplete(state) {
    return state.ActionEntry.player != null &&
           state.ActionEntry.action != null &&
           state.ActionEntry.position != null &&
           state.Time != null;
  },
  getEntry(state) {
    let copyActionEntry = {
      player: state.ActionEntry.player,
      action: state.ActionEntry.action,
      position: state.ActionEntry.position,
      team: state.ActionEntry.team
    }
    return copyActionEntry;
  },
  getTime(state) {
    let t = state.Time;
    return t;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
