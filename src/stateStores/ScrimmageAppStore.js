import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

var defaultTime = 20 * 6000

const state = {
  LoggedIn: false,
  ActionEntry: {
    teamId: null,
    player: null,
    action: null,
    position: null,
    id: 0,
  },
  Time: {
    currentTime: defaultTime,
    interval: null,
  },
  OrganizationPlayers: [],
  Events: [],
  TeamInformation: {
    team1: {
      teamId: null,
      teamName: 'Team 1',
      players: [],
      score: 0
    },
    team2: {
      teamId: null,
      teamName: 'Team 2',
      players: [],
      score: 0
    },
    editTeamsInfo: {
      editingTeams: false,
      teamEditing: 1
    }
  },
  Errors: {
    forgotTimer: {
      timerStarted: false,
      displayForgotTimer: false
    }
  },
  IsScrimmageMode: false
};

function isActionEntryFull() {
  return state.ActionEntry.player != null &&
    state.ActionEntry.action != null &&
    state.ActionEntry.position != null &&
    state.Time != null && state.ActionEntry.teamId != null;
}

function isFTEntryFull() {
  return state.ActionEntry.player != null &&
    (state.ActionEntry.action == 'Made FT' || state.ActionEntry.action == 'Missed FT') &&
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

      // special case in which action is a free throw
      if (isFTEntryFull()) {
        // these values were eyeballed, check them better later
        state.ActionEntry.position = {
          x: 252,
          y: 366
        }
        if (state.ActionEntry.action == 'Made FT') {
          state.ActionEntry.position.shotValue = 1;
        } else {
          state.ActionEntry.position.shotValue = 0;
        }

        if (state.ActionEntry.action == 'Made FT' && state.ActionEntry.action == 'Missed FT'){
          state.ActionEntry.position.shotWeight = 1;
        }

        if (state.TeamInformation.team1.players.includes(state.ActionEntry.player)){
          updateTeamScore(1, state.ActionEntry.position.shotValue, "add");
        } else {
          updateTeamScore(2, state.ActionEntry.position.shotValue, "add");
        }
        state.Events.push({ ...state.ActionEntry, timeStamp: prettyTime(state.Time.currentTime) });
        resetActionEntry();
      }

      if (isActionEntryFull()) {
        if(state.ActionEntry.action != "Made Shot") {
          state.ActionEntry.position.shotValue = 0;
        }

        if(state.ActionEntry.action != "Missed Shot" && state.ActionEntry.action != "Made Shot"){
          state.ActionEntry.position.shotWeight = 0;
        }

        if (state.TeamInformation.team1.players.includes(state.ActionEntry.player)){
          updateTeamScore(1, state.ActionEntry.position.shotValue, "add");
        } else {
          updateTeamScore(2, state.ActionEntry.position.shotValue, "add");
        }
        state.Events.push({ ...state.ActionEntry, timeStamp: prettyTime(state.Time.currentTime) });
        resetActionEntry();
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
  },
  ADD_PLAYERS_TO_TEAM(state, teamsInfo) {
    state.TeamInformation.team1.players = teamsInfo.team1;
    state.TeamInformation.team2.players = teamsInfo.team2;
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
  EDIT_TEAMS(state, teamNumber) {
    state.TeamInformation.editTeamsInfo.editingTeams = true;
    state.TeamInformation.editTeamsInfo.teamEditing = teamNumber;
  },
  STOP_EDITING_TEAMS(state) {
    state.TeamInformation.editTeamsInfo.editingTeams = false;
    state.TeamInformation.editTeamsInfo.teamEditing = 1;
  },
  TICK_ONE_DECISECOND(state) {
    if (state.Time.currentTime > 0) state.Time.currentTime--;
  },
  RESET_TIMER(state) {
    state.Time.currentTime = defaultTime
  },
  UPDATE_FORGOT_TIMER(state, val) {
    state.Errors.forgotTimer.displayForgotTimer = val;
  },
  SET_ORGANIZATION_PLAYERS(state, players){
    state.OrganizationPlayers = players;
  },
  SET_TEAM_ID(state, idAndIdentifier){
    if (idAndIdentifier[1] == 1) {
      state.TeamInformation.team1.teamId = idAndIdentifier[0];
    } else {
      state.TeamInformation.team2.teamId = idAndIdentifier[0];
    }
  },
  SET_IS_SCRIMMAGE_MODE(state, isScrimmageMode){
    state.IsScrimmageMode = isScrimmageMode;
  },
  SET_ACTIVE_TEAM(state, teamId){
    state.ActionEntry.teamId = teamId;
  }
};

const actions = {
  updateActiveTeam(context, id){
    context.commit("SET_ACTIVE_TEAM", id);
  },
  updateTeamId(context, idAndIdentifier){
    context.commit("SET_TEAM_ID", idAndIdentifier);
  },
  updateIsScrimmageMode(context, isScrimmageMode){
    context.commit("SET_IS_SCRIMMAGE_MODE", isScrimmageMode);
  },
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
  updateDisplayForgotTimer(context, val) {
    context.commit("UPDATE_FORGOT_TIMER", val);
  },
  updateOrganizationPlayers(context, players){
    context.commit("SET_ORGANIZATION_PLAYERS", players);
  },

  /*******************************************************/
  /***************** TEAM ROSTER ACTIONS *****************/
  /*******************************************************/
  addPlayersToTeam(context, teamsInfo) {
    context.commit("ADD_PLAYERS_TO_TEAM", teamsInfo);
  },
  removePlayerFromTeam(context, playerName) {
    context.commit("REMOVE_PLAYER_FROM_TEAM", playerName);
  },
  editTeams(context, teamNumber=1) {
    context.commit("EDIT_TEAMS", teamNumber)
  },
  stopEditingTeams(context) {
    context.commit("STOP_EDITING_TEAMS");
  },

  /*******************************************************/
  /******************** TIMER ACTIONS ********************/
  /*******************************************************/
  startTimer(context) {
    // shoulnd't manipulate state directly in here
    state.Time.interval = setInterval(() => {
      context.commit("TICK_ONE_DECISECOND");
    }, 10);
    state.Errors.forgotTimer.timerStarted = true;
  },
  stopTimer(context) {
    clearInterval(state.Time.interval);
    state.Time.interval = null;
  },
  resetTimer(context) {
    clearInterval(state.Time.interval);
    state.Time.interval = null;
    context.commit("RESET_TIMER");
    state.Errors.forgotTimer.timerStarted = false;
  },
};

const getters = {
  getTeamId: (state) => (teamIdentifier) => {
    if (teamIdentifier == 1){
      return state.TeamInformation.team1.teamId;
    }
    return state.TeamInformation.team2.teamId;
  },
  getIsLoggedIn(state) {
    return state.LoggedIn
  },
  getCurrentEvent(state) {
    return state.ActionEntry;
  },
  getIfForgotTimer(state) {
    return !state.Errors.forgotTimer.timerStarted;
  },
  getDisplayForgotTimer(state) {
    return state.Errors.forgotTimer.displayForgotTimer;
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
  getOrganizationPlayers(state){
    return state.OrganizationPlayers;
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
  getEditTeamsInfo(state) {
    return state.TeamInformation.editTeamsInfo;
  },
  getPrettyTime(state) {
    return prettyTime(state.Time.currentTime)
  },
  getIsTimerRunning(state) {
    return isTimerRunning(state);
  },
  getTeam1Name(state) {
    return state.TeamInformation.team1.teamName;
  },
  getTeam2Name(state) {
    return state.TeamInformation.team2.teamName;
  },
  isScrimmageMode(state){
    return state.isScrimmageMode;
  }
  
};

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state,
  mutations,
  actions,
  getters
});