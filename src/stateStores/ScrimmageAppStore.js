import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

var defaultTime = 20 * 6000

const state = {
  ActionEntry: {
    player: null,
    team: null,
    action: null,
    position: null,
    id: 0,
  },
  Time: {
    currentTime: defaultTime,
    interval: null,
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
  },
  Errors: {
    forgotTimer: false
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

function isTimerRunning(state) {
  return state.Time.interval != null
}

function prettyTime(time) {
  let minute = Math.floor(time / 6000);
  let second = Math.floor((time - minute * 6000) / 100);
  let decisecond = time - minute * 6000 - second * 100;

  let prettyMinute = minute < 10 ? "0" + minute.toString() : minute.toString();
  let prettySecond = second < 10 ? "0" + second.toString() : second.toString();
  let prettyDecisecond = decisecond < 10 ? "0" + decisecond.toString() : decisecond.toString();
  return prettyMinute + ":" + prettySecond + ":" + prettyDecisecond;
}

function updateTeamScore(team, score, method){
  if (team == 1) {
    if (method == "add"){
      state.TeamInformation.team1.score += score;
    }
    if (method == "subtract"){
      state.TeamInformation.team1.score -= score;
    }
  } else {
    if (method == "add"){
      state.TeamInformation.team2.score += score;
    }
    if (method == "subtract"){
      state.TeamInformation.team2.score -= score;
    }
  }
}

const mutations = {
  SET_ACTION_ENTRY(state, entry) {
    if (isTimerRunning(state)) {
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
        state.Events.push({ ...state.ActionEntry, timeStamp: prettyTime(state.Time.currentTime) });
        var freeThrow = (state.ActionEntry.action == "Made FT");
        if (state.ActionEntry.action == "Made FT") {
          state.ActionEntry.position.shotValue = 1
        } else if(state.ActionEntry.action != "Made Shot") {
          state.ActionEntry.position.shotValue = 0
        }
        if (state.TeamInformation.team1.players.includes(state.ActionEntry.player)){
          updateTeamScore(1, state.ActionEntry.position.shotValue, "add");
        } else {
          updateTeamScore(2, state.ActionEntry.position.shotValue, "add");
        }
        resetActionEntry();
      }
      state.Errors.forgotTimer = false;
    } else {
      state.Errors.forgotTimer = true;
    }
  },
  REMOVE_EVENT(state, eventID) {
    let i = state.Events.map(function (e) { return e.id }).indexOf(eventID);
    if (i > -1) {
      var freeThrow = (state.Events[i].action == "Made FT");
      if (state.TeamInformation.team1.players.includes(state.Events[i].player)){
        updateTeamScore(1, freeThrow ? 1 : state.Events[i].position.shotValue, "subtract");
      } else {
        updateTeamScore(2, freeThrow ? 1 : state.Events[i].position.shotValue, "subtract");
      }
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
  },
  RESET_TIMER(state) {
    state.Time.currentTime = defaultTime
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
  updateTeam(context, team) {
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
  startTimer(context) {
    state.Time.interval = setInterval(() => {
      context.commit("TICK_ONE_DECISECOND");
    }, 10);
  },
  stopTimer(context) {
    clearInterval(state.Time.interval);
    state.Time.interval = null;
  },
  resetTimer(context) {
    clearInterval(state.Time.interval);
    state.Time.interval = null;
    context.commit("RESET_TIMER");
  },
};

const getters = {
  getCurrentEvent(state) {
    return state.ActionEntry;
  },
  getIfForgotTimer(state) {
    return state.Errors.forgotTimer;
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
  },
  getTimeLeft(state) {
    return state.Time.currentTime;
  },
  getTeam1Score(state){
    return state.TeamInformation.team1.score;
  },
  getTeam2Score(state){
    return state.TeamInformation.team2.score;
  },
  getPrettyTime(state) {
    return prettyTime(state.Time.currentTime)
  },
  getIsTimerRunning(state) {
    return !isTimerRunning(state);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});