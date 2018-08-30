<template>
<div>
 <v-dialog v-model="editPlayersDialog" max-width="600">
    <v-toolbar class="pa-0 editTeamToolbar">
        <v-toolbar-items style="width:100%">
        <v-btn block flat :ripple="false" color="blue"
            @click="selectingTeam1=true"
            v-bind:class="{editTeamDialogHoverTeam1:selectingTeam1}">{{getTeam1Name}}
        </v-btn>
        <v-btn block flat :ripple="false" color="red"
            @click="selectingTeam1=false"
            v-bind:class="{editTeamDialogHoverTeam2:!selectingTeam1}">{{getTeam2Name}}
        </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-card class="patternBackground editTeamCheckbox">
    <v-container class="pb-2">
        <v-layout row wrap justify-center >
        <v-flex xs12 sm4 md6 v-for="player in playersAvailable" v-bind:key="player.id" class="body-2">
            <v-checkbox
            :label="player.name"
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
    <v-btn class="mb-3 mr-3 normalButton" @click="submit()">DONE</v-btn>
    </v-layout>
    </v-card>
    {{updateTeamsFromStore}}
    {{checkIfEditing}}
</v-dialog>
</div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import TeamsService from "./../../../api/teamsService";

const teamsService = new TeamsService();
export default {
  name: "EditTeam",
  data() {
    return {
      editPlayersDialog: false,
      selectingTeam1: true,
      team1Players: [],
      team2Players: [],
      checkboxesSelected: [],
      playersAvailable: []
    };
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
    },
    ...mapGetters(["getTeam1Name", "getTeam2Name"])
  },
  methods: {
    teamColor(player) {
      if (this.team1Players.includes(player)) return "blue";
      if (this.team2Players.includes(player)) return "red";
      return this.selectingTeam1 ? "blue" : "red";
    },
    checkboxLogic(player) {
      let team = this.selectingTeam1 ? this.team1Players : this.team2Players;
      let otherTeam = this.selectingTeam1
        ? this.team2Players
        : this.team1Players;
      if (otherTeam.includes(player))
        otherTeam.splice(otherTeam.indexOf(player), 1);
      else {
        if (team.includes(player)) team.splice(team.indexOf(player), 1);
        else if (team.length < 5) team.push(player);
        else
          this.checkboxesSelected.splice(
            this.checkboxesSelected.indexOf(player.name),
            1
          );
      }
      this.$store.dispatch("addPlayersToTeam", {
        team1: this.team1Players,
        team2: this.team2Players
      });
    },
    submit() {
      var teamOnePlayers = this.$store.getters.getTeamPlayers(1);
      var teamOneIds = [];
      teamOnePlayers.forEach(player => {
        teamOneIds.push(player.id);
      });

      var teamTwoPlayers = this.$store.getters.getTeamPlayers(2);
      var teamTwoIds = [];
      teamTwoPlayers.forEach(player => {
        teamTwoIds.push(player.id);
      });

      var drillId = localStorage.getItem("drill_id");
      
      teamsService.createTeam(teamOneIds, this.$store.getters.getTeam1Name, drillId)
                    .then((response) => {
                        this.$store.dispatch("updateTeamId", response.data.id, 1);               
                    });
      teamsService.createTeam(teamTwoIds, this.$store.getters.getTeam2Name, drillId)
                    .then((response) => {
                        this.$store.dispatch("updateTeamId", response.data.id, 2);               
                    });;
       
      this.editPlayersDialog = false;
    }
  },
  created() {
    this.playersAvailable = this.$store.getters.getOrganizationPlayers;
  },
  watch: {
    editPlayersDialog(val) {
      this.checkboxesSelected = this.team1Players.concat(this.team2Players);
      if (!val) {
        this.$store.dispatch("stopEditingTeams");
      }
    }
  }
};
</script>

<style lang="scss">
.editTeamCheckbox {
  .container {
    padding: 24px;
  }
  .v-input {
    margin-top: 0;
  }
  .input-group--selection-controls.input-group,
  .v-input--selection-controls {
    padding: 17px 0;
  }
  .v-label {
    width: 100%;
  }
}
.editTeamToolbar {
  .v-toolbar__items {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  }
}

.editTeamDialogHoverTeam1 {
  &:before,
  .btn__content:before {
    background-color: #4695ec !important;
  }
}
.editTeamDialogHoverTeam2 {
  &:before,
  .btn__content:before {
    background-color: #e25141 !important;
  }
}
</style>