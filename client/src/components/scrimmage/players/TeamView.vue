<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <h2 class="text-md-center">{{TeamName}}</h2>
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
    PlayerCard
  },
  data() {
    return {
      players: [],
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
  
};
</script>