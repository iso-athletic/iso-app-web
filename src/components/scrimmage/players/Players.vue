<template>
  <v-card class="noBackground scrimmageBorder">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="getTeam1Name"
          TeamNumber=1
          />
        </v-flex>
        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="getTeam2Name"
          TeamNumber=2
          />
        </v-flex>
      </v-layout>
    </v-container>
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
  computed: {
    ...mapGetters([
      'getTeam1Name',
      'getTeam2Name',
    ])
  },
  data() {
    return {
      team1: this.$store.getters.getTeam1Name,
      team2: this.$store.getters.getTeam2Name,
    }
  },   
}
</script>

<style>
</style>