<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-layout align-center justify-center>
          <h2 class="pl-5">{{TeamName}}</h2>
          <v-btn flat icon color="primary" @click.native.stop="editTeams()">
            <v-icon medium>edit</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <PlayerCard
    v-for="player in teamPlayers"
    v-bind:data="player"
    v-bind:key="player.playerName"
    :playerName="player"
    />
  </div>
</template>

<script>
import Vue from "vue";
import PlayerCard from "./PlayerCard";

export default {
  name: "teamView",
  components: {
    PlayerCard,
  },
  data() {
    return {
      players: [],
      editPlayersDialog: false
    };
  },
  props: {
    TeamName: String,
    TeamNumber: String
  },
  computed: {
    teamPlayers() {
      return this.$store.getters.getTeamPlayers(this.TeamNumber);
    },
  },
  methods: {
    editTeams() {
      this.$store.dispatch("editTeams", this.TeamNumber);
    }
  }
  
};
</script>