import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  ActionEntry: {
    player: null,
    team: null,
    action: null,
    position: null,
    id: 0,
  },
  Time: {
    currentTime: "20:00:00",
  },
  Events: [],
  TeamInformation: {
    team1: {
      players: [],
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
    switch (entry.type) {
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
      state.Events.push({ ...state.ActionEntry, timeStamp: state.Time.currentTime });
      console.log(state.Events);
      resetActionEntry();
    }
  },
  SET_TIME(state, newTime) {
    let minute = Math.floor(newTime / 6000);
    let second = Math.floor((newTime - minute * 6000) / 100);
    let decisecond = newTime - minute * 6000 - second * 100;

    let prettyMinute = minute < 10 ? "0" + minute.toString() : minute.toString();
    let prettySecond = second < 10 ? "0" + second.toString() : second.toString();
    let prettyDecisecond = decisecond < 10 ? "0" + decisecond.toString() : decisecond.toString();
    state.Time.currentTime = prettyMinute + ":" + prettySecond + ":" + prettyDecisecond;
  },
  REMOVE_EVENT(state, eventID) {
    let i = state.Events.map(function (e) { return e.id }).indexOf(eventID);
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
  },
  REMOVE_PLAYER_FROM_TEAM(state, playerName) {
    let team1Index = state.TeamInformation.team1.players.indexOf(playerName);
    let team2Index = state.TeamInformation.team2.players.indexOf(playerName);

    if (team1Index > -1) {
      state.TeamInformation.team1.players.splice(team1Index, 1);
    } else if (team2Index > -1) {
      state.TeamInformation.team2.players.splice(team2Index, 1);
    } else {
      console.log("Player to be removed wasn't found on either team");
    }
  },
  TICK_ONE_DECISECOND(state) {
    if (state.Time.currentTime > 0) state.Time.currentTime--;
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
  updateTeam(context, team){
    context.commit("SET_TEAM", team)
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
  removeEvent(context, eventID) {
    context.commit("REMOVE_EVENT", eventID);
  },

  /*******************************************************/
  /***************** TEAM ROSTER ACTIONS *****************/
  /*******************************************************/
  addPlayerToTeam(context, playerInformation) {
    context.commit("ADD_PLAYER_TO_TEAM", playerInformation);
  },
  removePlayerFromTeam(context, playerName) {
    context.commit("REMOVE_PLAYER_FROM_TEAM", playerName);
  },

  /*******************************************************/
  /******************** TIMER ACTIONS ********************/
  /*******************************************************/
  runTimer(context) {
    setInterval(() => {
      context.commit("TICK_ONE_DECISECOND");
    }, 10);
  },
  updateTime(context, time) {
    context.commit("SET_TIME", time);
  },
};

const getters = {
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
  },
  getTimeLeft(state) {
    return state.Time.currentTime;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});