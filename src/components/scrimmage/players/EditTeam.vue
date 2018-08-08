<template>
<div>
    <v-layout row>
        <v-flex xs12>
            <div class="text-xs-center">
                <v-btn small fab color="primary" @click.native.stop="editTeamDialog=true">
                    <v-icon>person_add</v-icon>
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
    <v-dialog dark v-model="editTeamDialog" max-width="600" color="blue">
        <v-toolbar class="pa-0">
            <v-toolbar-items style="width:100%">
            <v-btn block flat :ripple="false" color="blue" 
                @click="selectingTeam1=true"
                v-bind:class="{hoverStateTeam1:selectingTeam1}"
            >TEAM ONE</v-btn>
            <v-btn block flat :ripple="false" 
                @click="selectingTeam1=false" color="red" 
                v-bind:class="{hoverStateTeam2:!selectingTeam1}"
            >TEAM TWO</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card v-if="selectingTeam1">
            <v-container>
                <v-layout row wrap justify-center >
                    <v-flex xs12 sm4 md6 v-for="player in playersAvailable" v-bind:key="player" class="body-2">
                        <v-checkbox
                            :label="player"
                            :color="teamColor(player)"
                            :value="player"
                            v-model="team1Players"
                            hide-details
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-card v-if="!selectingTeam1">
            <v-container>
                <v-layout row wrap justify-center >
                    <v-flex xs12 sm4 md6 v-for="player in playersAvailable" v-bind:key="player" class="body-2">
                        <v-checkbox
                            :label="player"
                            :color="teamColor(player)"
                            :value="player"
                            v-model="team2Players"
                            hide-details
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      editTeamDialog: false,
      selectingTeam1: true,
      team1: "Purple",
      team2: "White",
      team1Players: [],
      team2Players: [],
      playersAvailable: [
        "Ryan Greer",
        "Vic Law",
        "Dererk Paron",
        "Miller Kopp",
        "Anthony Gaines",
        "Ryan Taylor",
        "Ryan Young",
        "A.J. Turner",
        "Pete Nance",
        "Jordan Ash",
        "Barret Benson",
        "Tino Malnati",
        "Charlie Hall",
        "Aaron Falzon"
      ]
    };
  },
  computed: {
    availablePlayers() {
      return this.$store.getters.getAvailablePlayers(this.playersAvailable);
    }
  },
  methods: {
    teamColor(playerName) {
      if (this.team1Players.includes(playerName)) return "blue";
      if (this.team2Players.includes(playerName)) return "red";
      return this.selectingTeam1 ? "blue": "red";
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding: 0 0;
}

.hoverStateTeam1:before {
  background-color: #4695EC;
}

.hoverStateTeam2:before {
  background-color: #E25141;
}
</style>