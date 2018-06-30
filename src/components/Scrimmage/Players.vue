<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 sm6 md6>
        <TeamView :TeamName="team1"/>
      </v-flex>

      <v-flex xs6 sm6 md6>
        <TeamView :TeamName="team2"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import TeamView from './TeamView'

export default {
  name: 'players',
  components: {
    TeamView,
  },
  data() {
    return{
      team1:"Purple",
      team2:"White",
    }
  },
}
  
</script>

<style>
</style>