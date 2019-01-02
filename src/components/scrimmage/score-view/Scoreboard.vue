<template>
  <div id="scoreboard">
    <v-card class="noBackground scrimmageBorder">
    <v-container fluid>
      <v-layout row align-center>
        <v-flex xs3>
            <h2 class="text-md-center uppercase">{{getTeam1Name}}</h2>
        </v-flex>
        <v-flex xs3>
          <div class="large-text text-md-center">{{getTeam1Score}}</div>
        </v-flex> 
        <v-flex xs3>
          <div class="large-text text-md-center">{{getTeam2Score}}</div>
        </v-flex>
        <v-flex xs3>
          <h2 class="text-md-center">{{getTeam2Name}}</h2>
        </v-flex> 
      </v-layout>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import Score from "./Score.vue";
import {mapGetters} from 'vuex'
export default {
  name: "scoreboard",
  components: {
    Score,
  },
  computed: {
    teamOneScore(){return this.$store.getters.getTeam1Score},
    teamTwoScore(){return this.$store.getters.getTeam2Score},
    ...mapGetters([
      'getTeam1Score',
      'getTeam2Score',
      'getTeam1Name',
      'getTeam2Name'
    ])
  },
};
</script>