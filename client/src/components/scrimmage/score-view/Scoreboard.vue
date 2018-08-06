<template>
  <div id="scoreboard">
    <v-card class="noBackground scrimmageBorder mx-2 my-2">
    <v-container fluid>
      <v-layout row>
        <v-flex xs3>
            <h2 class="text-md-center">Purple</h2>
        </v-flex>
        <v-flex xs3>
          <div class="large-text text-md-center">{{teamOneScore}}</div>
        </v-flex> 
        <v-flex xs3>
          <div class="large-text text-md-center">{{teamTwoScore}}</div>
        </v-flex>
        <v-flex xs3>
          <h2 class="text-md-center">White</h2>
        </v-flex> 
      </v-layout>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import Score from "./Score.vue";
import {mapGetters} from 'vuex'

export default {
  name: "scoreboard",
  components: {
    Score
  },
  computed: {
    teamOneScore(){return this.$store.getters.getTeam1Score},
    teamTwoScore(){return this.$store.getters.getTeam2Score}
  },
};
</script>

