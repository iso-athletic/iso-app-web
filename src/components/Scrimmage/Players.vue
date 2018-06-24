<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 sm6 md6>
        <TeamView TeamName="Purple"/>
      </v-flex>

      <v-flex xs6 sm6 md6>
        <TeamView TeamName="White"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import TeamView from './TeamView.vue'

export default {
  name: 'players',
  components: {
    TeamView,
  },
  data() {
    return{
    }
  },
}
  
</script>

<style>
</style>