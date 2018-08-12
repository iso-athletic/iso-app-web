<template>
<div>
 <v-dialog v-model="editPlayersDialog" max-width="600">
    <v-toolbar class="pa-0 editTeamToolbar">
        <v-toolbar-items style="width:100%">
        <v-btn block flat :ripple="false" color="blue"
            @click="selectingTeam1=true"
            v-bind:class="{editTeamDialogHoverTeam1:selectingTeam1}">TEAM ONE
        </v-btn>
        <v-btn block flat :ripple="false" color="red"
            @click="selectingTeam1=false"
            v-bind:class="{editTeamDialogHoverTeam2:!selectingTeam1}">TEAM TWO
        </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-card class="patternBackground editTeamCheckbox">
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
    {{updateTeamsFromStore}}
    {{checkIfEditing}}
</v-dialog>
</div>
</template>

<script>
import Vue from 'vue'

export default {
    name: "EditTeam",
    data() {
        return {
            editPlayersDialog: false,
            selectingTeam1: true,
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
            ],
        }
    },
    computed: {
        updateTeamsFromStore() {
            this.team1Players = this.$store.getters.getTeamPlayers(1);
            this.team2Players = this.$store.getters.getTeamPlayers(2);
        },
        checkIfEditing() {
            let editTeamsInfo = this.$store.getters.getEditTeamsInfo;
            this.editPlayersDialog = editTeamsInfo.editingTeams;
            this.selectingTeam1 = editTeamsInfo.teamEditing == 1;
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
                if (team.includes(playerName))
                    team.splice(team.indexOf(playerName), 1)
                else if (team.length < 5) team.push(playerName);
                else this.checkboxesSelected.splice(this.checkboxesSelected.indexOf(playerName), 1);
            }
            return team;
            this.$store.dispatch("addPlayersToTeam", {team1: this.team1Players, team2: this.team2Players});
        },
  },
  watch: {
    editPlayersDialog (val) {
      this.checkboxesSelected = this.team1Players.concat(this.team2Players);
      if (!val) {
          this.$store.dispatch("stopEditingTeams");
      }
    },
  }, 
}
</script>

<style>
</style>