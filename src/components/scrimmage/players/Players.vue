<template>
  <v-card class="noBackground scrimmageBorder mx-2 my-2">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="team1"
          :playersLeft="availablePlayers"
          TeamNumber=1
          />
        </v-flex>

        <v-flex xs6 sm6 md6>
          <TeamView
          :TeamName="team2"
          :playersLeft="availablePlayers"
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
import {mapGetters} from 'vuex'


export default {
  name: 'players',
  components: {
    TeamView,
  },
  data() {
    return{
      team1:"Purple",
      team2:"White",
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
    availablePlayers() {
      return this.$store.getters.getAvailablePlayers(this.playersAvailable);
    }
  },
}

</script>
