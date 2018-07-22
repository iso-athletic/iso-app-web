import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  ActionEntry:  {
    player: null,
    action: null,
    position: null,
    id: 0,
  },
  Time: {
    currentTime: null,
  },
  Events: [],
};

function isActionEntryFull() {
  return state.ActionEntry.player != null && 
          state.ActionEntry.action != null && 
          state.ActionEntry.position != null &&
          state.Time != null;
}

function resetActionEntry() {
  state.ActionEntry.player = null;
  state.ActionEntry.action = null;
  state.ActionEntry.position = null;
  state.ActionEntry.id++;
}

const mutations = {
  SET_ACTION_ENTRY(state, entry) {
    switch(entry.type) {
      case "ACTION":
        state.ActionEntry.action = entry.value;
        break;
      case "POSITION":
        state.ActionEntry.position = entry.value;
        break;
      case "PLAYER":
        state.ActionEntry.player = entry.value;
        break;
      default: 
        alert("this shouldn't happen");
    }

    if (isActionEntryFull()) {
      state.Events.push({...state.ActionEntry, timeStamp: state.Time.currentTime});
      resetActionEntry();
    }
  },
  SET_TIME(state, newTime) {
    state.Time.currentTime = newTime;
  },
};
const actions = {
  updatePlayer(context, player) {
    let entry = {
      type: "PLAYER",
      value: player
    };
    context.commit("SET_ACTION_ENTRY", entry);
  },
  updateAction(context, action) {
    let entry = {
      type: "ACTION",
      value: action 
    };
    context.commit("SET_ACTION_ENTRY", entry);
  },
  updatePosition(context, position) {
    let entry = {
      type: "POSITION",
      value: position 
    };
    context.commit("SET_ACTION_ENTRY", entry);
  },
  updateTime(context, time) {
    context.commit("SET_TIME", time);
  },
};

const getters = {
  getTime(state) {
    let t = state.Time.currentTime;
    return t;
  },
  getEventList(state) {
    return [...state.Events];
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});