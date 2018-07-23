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
  TeamInformation: {
    team1: {
      players: ['Vic Law'],
      score: 0
    },
    team2: {
      players: [],
      score: 0
    }
  }
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
        console.log("Entry type: " + entry.type + " doesn't exist");
    }

    if (isActionEntryFull()) {
      state.Events.push({...state.ActionEntry, timeStamp: state.Time.currentTime});
      resetActionEntry();
    }
  },
  SET_TIME(state, newTime) {
    state.Time.currentTime = newTime;
  },
  REMOVE_EVENT(state, eventID) {
    let i = state.Events.map(function(e) { return e.id }).indexOf(eventID);
    if (i > -1) {
      state.Events.splice(i, 1);
    }
    console.log(state.Events);
  },
  ADD_PLAYER_TO_TEAM(state, playerInformation) {
    if (playerInformation.teamNumber == 1) {
      state.TeamInformation.team1.players.push(playerInformation.playerName);
    } else {
      state.TeamInformation.team2.players.push(playerInformation.playerName);
    }
  }
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
  removeEvent(context, eventID) {
    context.commit("REMOVE_EVENT", eventID);
  },
  addPlayerToTeam(context, playerInformation) {
    context.commit("ADD_PLAYER_TO_TEAM", playerInformation);
  }
};

const getters = {
  getTime(state) {
    let t = state.Time.currentTime;
    return t;
  },
  getEventList(state) {
    return [...state.Events];
  },
  getAvailablePlayers: (state) => (roster) => {
    return roster.filter(player => !state.TeamInformation.team1.players.includes(player) && 
                                   !state.TeamInformation.team2.players.includes(player))
  },
  getTeamPlayers: (state) => (teamNumber) => {
    if (teamNumber == 1) {
      return state.TeamInformation.team1.players;
    } else {
      return state.TeamInformation.team2.players;
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});