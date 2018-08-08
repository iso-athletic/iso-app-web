<template>
  <v-card class="noBackground scrimmageBorder">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="team1"
          TeamNumber=1
          />
        </v-flex>
        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="team2"
          TeamNumber=2
          />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
        <div class="text-xs-center">
          <v-btn small fab color="primary" @click.native.stop="editPlayersDialog=true">
            <v-icon>person_add</v-icon>
          </v-btn>
        </div>
        <v-dialog v-model="editPlayersDialog" max-width="600">
           <v-toolbar class="pa-0">
              <v-toolbar-items style="width:100%">
                <v-btn block flat :ripple="false" color="blue" 
                  @click="selectingTeam1=true"
                  v-bind:class="{hoverStateTeam1:selectingTeam1}">TEAM ONE
                </v-btn>
                <v-btn block flat :ripple="false" 
                  @click="selectingTeam1=false" color="red" 
                  v-bind:class="{hoverStateTeam2:!selectingTeam1}">TEAM TWO
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card class="patternBackground">
            <v-container class="pb-2">
              <v-layout row wrap justify-center >
                <v-flex xs12 sm4 md6 v-for="player in playersAvailable" v-bind:key="player" class="body-2">
                  <v-checkbox
                    :label="player"
                    :color="teamColor(player)"
                    :value="player"
                    v-model="checkboxesSelected"
                    hide-details
                    @change="checkboxLogic(player)"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
            <v-layout justify-end>
            <v-btn class="mb-3 mr-3 normalButton" @click="editPlayersDialog=false">DONE</v-btn>
            </v-layout>
            </v-card>
        </v-dialog>
      </v-flex>
      </v-layout>
    </v-container>
    {{updateTeamsFromStore}}
  </v-card>
</template>

<script>
import Vue from 'vue'
import TeamView from './TeamView'
import PlayerCard from './PlayerCard'
import {mapGetters} from 'vuex'


export default {
  name: 'players',
  components: {
    TeamView,
    PlayerCard,
  },
  data() {
    return{
      editPlayersDialog: false,
      selectingTeam1: true,
      team1:"Purple",
      team2:"White",
      team1Players: [],
      team2Players: [],
      checkboxesSelected: [],
      playersAvailable: [
        'Ryan Greer',
        'Vic Law',
        'Dererk Paron',
        'Miller Kopp',
        'Anthony Gaines',
        'Ryan Taylor',
        'Ryan Young',
        'A.J. Turner',
        'Pete Nance',
        'Jordan Ash',
        'Barret Benson',
        'Tino Malnati',
        'Charlie Hall',
        'Aaron Falzon'
      ]
    }
  },
  computed: {
      updateTeamsFromStore() {
        this.team1Players = this.$store.getters.getTeamPlayers(1);
        this.team2Players = this.$store.getters.getTeamPlayers(2);
      }
  },
  methods: {
    teamColor(playerName) {
      if (this.team1Players.includes(playerName)) return "blue";
      if (this.team2Players.includes(playerName)) return "red";
      return this.selectingTeam1 ? "blue": "red";
    },
    checkboxLogic(playerName) {
      let team = this.selectingTeam1 ? this.team1Players: this.team2Players;
      let otherTeam = this.selectingTeam1 ? this.team2Players: this.team1Players;
      if (otherTeam.includes(playerName)) otherTeam.splice(otherTeam.indexOf(playerName), 1);
      else {
        team.includes(playerName) ? team.splice(team.indexOf(playerName), 1): team.push(playerName);
      }
      return team;
      this.$store.dispatch("addPlayersToTeam", {team1: this.team1Players, team2: this.team2Players});
    },
  },
  watch: {
    editPlayersDialog (val) {
      this.selectingTeam1 = true;
      this.checkboxesSelected = this.team1Players.concat(this.team2Players);
    },
  },    
}
</script>

<style>
.hoverStateTeam1:before {
  background-color: #4695EC;
}
.hoverStateTeam2:before {
  background-color: #E25141;
}
</style>